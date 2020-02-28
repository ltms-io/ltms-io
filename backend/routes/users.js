//azure code pulled from https://github.com/Azure-Samples/azure-sdk-for-js-storage-blob-stream-nodejs/

const axios = require('axios');
const express = require('express');
const router = express.Router();
const User = require('../models/user-model');
const sgMail = require('@sendgrid/mail');
const dev_config = require('../config/dev-params')

const { BlobServiceClient, StorageSharedKeyCredential, newPipeline } = require('@azure/storage-blob');
const multer = require('multer');
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single('file');
const getStream = require('into-stream');
const uuidv1 = require('uuidv1');

const ONE_MEGABYTE = 1024 * 1024;
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };
const ONE_MINUTE = 60 * 1000;

const sharedKeyCredential = new StorageSharedKeyCredential(
    dev_config.AZURE_STORAGE_ACCOUNT_NAME || process.env.AZURE_STORAGE_ACCOUNT_NAME,
    dev_config.AZURE_STORAGE_ACCOUNT_ACCESS_KEY || process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY);
const pipeline = newPipeline(sharedKeyCredential);

const blobServiceClient = new BlobServiceClient(
    `https://${dev_config.AZURE_STORAGE_ACCOUNT_NAME || process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
    pipeline
)

const getBlobName = originalName => {
    const ident = uuidv1();
    return `${ident}-${originalName}`;
}

sgMail.setApiKey(dev_config.SENDGRID_API_KEY || process.env.SENDGRID_API_KEY);

/* GET */

//GET all users listings
router.get('/', (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) {
            res.status(500).send(err);
        }

        res.send(users);
    })
});




//GET specific user
router.get('/:id', (req, res) => {
    User.findById(req.params.id).then(user => {
        if (!user) {
            return res.status(404).send("user not found");
        }

        return res.status(200).send(user);
    })
});


/* POST */

router.post("/register", (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).send("Need email and name at minimum");
    }

    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            return res.status(400).send("User email exists");
        }
        else {
            const createdUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                eventAuthorizer: req.body.eventAuthorizer,
                userAuthorizer: req.body.userAuthorizer,
                profilePic: {
                    is_azure: false,
                    thumbUrl: req.body.thumbPicture,
                    imgUrl: req.body.picture
                }
            });
            createdUser.save().then((user) => res.send(user)).catch((err) => console.log(err));
        }
    });
});

router.post("/uploadpicture", uploadStrategy, async (req, res) => {
    if (!req.file || req.file.mimetype.indexOf("image/") === -1 || req.b)  {
        res.status(400).send("Make sure you upload a file that is an image");
    }

    const blobName = getBlobName(req.file.originalname);
    const stream = getStream(req.file.buffer);
    // console.log(req.file);
    console.log(req.id);
    const containerClient = blobServiceClient.getContainerClient('images');
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    User.findById(req.body.id).then((user) => {
        console.log("User:");
        console.log(user);
        if (!user) {
            return res.status(404).send("User not found");
        }

        user.profilePic.is_azure = true;
        user.profilePic.thumbUrl = `https://ltmsstore.blob.core.windows.net/thumbnails/${blobName}`;
        user.profilePic.imgUrl = `https://ltmsstore.blob.core.windows.net/images/${blobName}`;
        user.save();
        blockBlobClient.uploadStream(stream,
            uploadOptions.bufferSize, uploadOptions.maxBuffers,
            {
                blobHTTPHeaders: {
                    blobContentType: req.file.mimetype
                }
            }).then(() => {
                return res.status(200).send("File upload success")
            }).catch((err) => {
                console.log(err);
                return res.status(500).send(err);
            });
    }).catch((err) => {
        console.log(err);
        res.status(500).send(err);
    });

});

router.post("/profilepic", (req, res) =>{
    const m_id = req.body.id;
    console.log(m_id);

    User.findById(m_id).then((user) => {
        console.log(user);
        if (!user) {
            return res.status(404).send("User was not found");
        }
        if (!user.profilePic.imgUrl && !user.profilePic.thumUrl) {
            return res.status(404).send("User has no profile picture");
        }

        if (user.profilePic.is_azure) {
            return res.status(200).send({thumbUrl: user.profilePic.thumbUrl, imgUrl: user.profilePic.imgUrl});
        }
        else {
            return res.status(200).send(user.profilePic.url);
        }
    }).catch((err) => {console.log(err)});

//POST search for user by included values
router.post('/search', (req, res) => {
    if (!req.body.email && !req.body.name) {
        res.status(400).send("body is empty");
        return;
    }

    // Valid search terms are email, name
    const body = {};
    if (req.body.email) {
        body.email = req.body.email;
    }

    if (req.body.name) {
        body.name = req.body.name;
    }

    User.findOne(body, (err, user) => {
        if(err) {
            return res.status(500).send(err);
        }
        
        if(!user) {
            return res.status(404).send("User not found");
        }
        console.log("user:");
        return res.status(200).send({email: user.email, name: user.name, _id: user._id});
    });
});

/* PATCH */

//PATCH an existing user
//  -user id is supplied as URL param
//  -changes are supplied via body
//  -if no change to a field, don't send it
router.patch('/:id', (req, res) => {
    if (Object.keys(req.body).length == 0) {
        return res.status(400).send("body is empty");
    }

    User.findById(req.params.id).then((user) => {
        if (!user) {
            return res.status(404).send("user not found");
        }

        summaryOfChanges = '';

        if (req.body.name) {
            user.name = req.body.name;
            summaryOfChanges += `•Name has been updated to ${req.body.name}\n`
        }

        if (req.body.email) { //TODO add email validator
            user.email = req.body.email;
            summaryOfChanges += `•Email has been updated to ${req.body.email}\n` //TODO: maybe ask to confirm on old email if this is the case?
        }

        if (req.body.password) { //TODO: NOTE: adding this becaue it is in schema but I do not think we need this as Auth0 is managing passwords
            //TODO
            summaryOfChanges += "•Password has been updated.\n"
        }

        if (req.body.eventAuthorizer) { //TODO: add authorization to this
            user.eventAuthorizer = req.body.eventAuthorizer;
            summaryOfChanges += "•You have been authorized to create official events.\n"
        }

        if (req.body.userAuthorizer) { //TODO: add authorization to this
            user.userAuthorizer = req.body.userAuthorizer;
            summaryOfChanges += "•You have been authorized to authorize other users to create official events.\n"
        }

        if (req.body.picture) {
            user.profilePic.imgUrl = req.body.picture;
            user.is_azure = false;
            summaryOfChanges += "•Your profile picture has set to an external source.\n"
        }

        if (req.body.thumb) {
            user.profilePic.thumbUrl = req.body.thumb;
        }

        user.save().then((user) => res.send(user)).catch((err) => console.log(err)); //TODO: as a .then() or an await?

        const msg = {
            to: req.body.email,
            from: 'noreply@ltmsio.codes',
            subject: 'Changes have been made to your account',
            text: summaryOfChanges,
            html: summaryOfChanges,
        };

        // console.log(msg);

        // sgMail.send(msg).then(() => {
        //     res.status(200).send("changes made successfully");
        // }).catch(err => {
        //     console.log(err)
        //     res.status(500).send(err);
        // });
    })
});

/* DELETE */

//DELETE user

router.delete('/:id', (req, res) => {
    User.findOneAndDelete({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(501).send("Server error.");
        }
        else {
            res.status(200).send("User eradicated");
        }
    });
});

module.exports = router;
