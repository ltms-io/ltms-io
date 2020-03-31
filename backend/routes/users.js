//azure code pulled from https://github.com/Azure-Samples/azure-sdk-for-js-storage-blob-stream-nodejs/

const express = require('express');
const router = express.Router();
const User = require('../models/user-model');
const sgMail = require('@sendgrid/mail');
const dev_config = require('../config/dev-params')
//const m_api_token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlF6UTFPVVpGTTBRNFFUVTFRa1UyTmpJM05qQXpRMEpFUWpSR1JqZEJSRGhDTVRjeE5UZ3pSQSJ9.eyJpc3MiOiJodHRwczovL2Rldi1zNjhjLXEteS5hdXRoMC5jb20vIiwic3ViIjoib3JGbFVZTkdSNmZjV1ZweWU5a2dIdElOa2s3VFpoOWJAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LXM2OGMtcS15LmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTgyOTExNDI3LCJleHAiOjE1ODI5OTc4MjcsImF6cCI6Im9yRmxVWU5HUjZmY1dWcHllOWtnSHRJTmtrN1RaaDliIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6aG9va3MgdXBkYXRlOmhvb2tzIGRlbGV0ZTpob29rcyBjcmVhdGU6aG9va3MgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIHJlYWQ6bG9nX3N0cmVhbXMgY3JlYXRlOmxvZ19zdHJlYW1zIGRlbGV0ZTpsb2dfc3RyZWFtcyB1cGRhdGU6bG9nX3N0cmVhbXMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.GMcWPtiMo5SLxzWp3v3M77K9xlVeFy-RNXMVc54tQo-nFcAuETe3a5A_8l6boXMEV9-ZBwti6jRz6GnQYZjFfZ6bcXwJNG7EwpkVo-IAclqAfmEwTMGypdp8T8VgBQfo_vhXEDANZDqahPUodxu1vMtpc0AWm8EmOJzfk30c7KPCzyJUG7enACHnpbKLTpOM4bi8PFPjn0V6mf3w3CVJrWM7r9dQG4LHxJRgsN9ExdDpf0cU4rPn1xb_xJfot_E_ZvkgEUA9lvEXZNlGCrFyyC7OZ4ipVxPicrydEA3OAIOXEtUbc8d-G8rYJsFAr-11bLiiAKX_eLtuOLRGEnHs8g';

const { BlobServiceClient, StorageSharedKeyCredential, newPipeline } = require('@azure/storage-blob');
const multer = require('multer');
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single('file');
const getStream = require('into-stream');
const uuidv1 = require('uuidv1');

const ONE_MEGABYTE = 1024 * 1024;
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };

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

const axios = require('axios');
const jsonWeb = require('jsonwebtoken');

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

//POST specific user
router.post('/auth', (req, res) => {
    const userinfo = req.body.data;

    User.findOne({auth0id: userinfo.sub}).then((user) => {
        if (!user) {
            const createdUser = new User({
                name: userinfo.name,
                email: userinfo.email,
                auth0id: userinfo.sub,
                eventAuthorizer: false,
                userAuthorizer: false
            });
            createdUser.save().then((user) => {
                res.send(user);
            }).catch((err) => {
                console.log(err);
            });
        }
        else {
            res.status(200).send(user);
        }
    });
});

//POST to get specific user using auth0id
router.post('/getuser', (req, res) => {
  const body = {};
  if (req.body.auth0id) {
      body.auth0id = req.body.auth0id;
  }
  else {
      return res.status(400).send("no auth0id given");
  }
  User.findOne(body, (err, user) => {
    if (!user) {
        return res.status(404).send("user not found");
    }
    return res.status(200).send(user);
  });
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
                auth0id: 'meh',
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
    if (!req.file || req.file.mimetype.indexOf("image/") === -1)  {
        res.status(400).send("Make sure you upload a file that is an image");
    }


    const blobName = getBlobName(req.file.originalname);
    const stream = getStream(req.file.buffer);
    const containerClient = blobServiceClient.getContainerClient('images');
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    User.findOne({auth0id: req.body.auth0id}).then((user) => {
        if (!user) {
            return res.status(404).send("User not found");
        }


        blockBlobClient.uploadStream(stream,
            uploadOptions.bufferSize, uploadOptions.maxBuffers,
            {
                blobHTTPHeaders: {
                    blobContentType: req.file.mimetype
                }
            }).then(() => {
                user.profilePic = {
                    is_azure: true,
                    thumbUrl: `https://ltmsstore.blob.core.windows.net/thumbnails/${blobName}`,
                    imgUrl: `https://ltmsstore.blob.core.windows.net/images/${blobName}`
                }
                //user.auth0id = req.auth0id
                user.save().then(() => {
                    return res.status(200).send("File upload success")
                }).catch((err) => {
                    return res.status(500).send(err);
                });

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

    User.findOne({auth0id: req.body.auth0id}).then((user) => {
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
    }).catch((err) => {
        console.log(err);
    });
});

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
        return res.status(200).send({email: user.email, name: user.name, _id: user._id});
    });
});

//POST creates json token for cookie
router.post('/login', (req, res) => {
    if(!req.body.data){
        return res.status(400).send("Body is empty")
    }
    var authId = req.body.data;
    User.findOne({auth0id: authId}).then(user => {
        if(!user) {
            return res.status(404).send("Not a user");
        }

        var payload = {
            name: user.name,
            email: user.email,
            auth0id: user.auth0id,
            eventAuthorizer: user.eventAuthorizer,
            userAuthorizer: user.userAuthorizer,
            _id: user._id,
            profilePic: {
                is_azure: user.profilePic.is_azure,
                imgUrl: user.profilePic.imgUrl,
                thumbUrl: user.profilePic.thumUrl
            },
        }

        var tok = jsonWeb.sign(
            payload,
            "123456",
        );
        
        return res.status(200).send(tok);
    })
})

/* PATCH */

//PATCH an existing user
//  -user id is supplied as URL param
//  -changes are supplied via body
//  -if no change to a field, don't send it
router.patch('/updateuser', (req, res) => {
    if(Object.keys(req.body).length == 0) {
        return res.status(400).send("body is empty");
    }

    const body = {};
    if (req.body.auth0id) {
        body.auth0id = req.body.auth0id;
    }
    else {
        return res.status(400).send("no auth0id given");
    }
    User.findOne(body, async (err, user) => {
        if (!user) {
            return res.status(404).send("user not found");
        }

        summaryOfChanges = '';

        if (req.body.name) {
            user.name = req.body.name;
            summaryOfChanges += `• Name has been updated to ${req.body.name}\n`
        }

        if (req.body.email) { //TODO add email validator

            // axios({
            //     method: 'PATCH',
            //     url: `https://dev-s68c-q-y.auth0.com/api/v2/users/${user.auth0id}`,
            //     headers: {
            //       'content-type': 'application/json',
            //       'authorization': 'Bearer ' + m_api_token
            //     },
            //     data: {
            //       email: req.body.email
            //     },
            //     json: true
            //   })
            //   .then( (result) => {
            //     console.log(result);
            //     user.email = req.body.email;
            //     summaryOfChanges += `•Email has been updated to ${req.body.email}\n` //TODO: maybe ask to confirm on old email if this is the case?
            //   })
            //   .catch( (error) => {
            //     console.log(error);
            //   });
            user.email = req.body.email;
            var tempAccessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlF6UTFPVVpGTTBRNFFUVTFRa1UyTmpJM05qQXpRMEpFUWpSR1JqZEJSRGhDTVRjeE5UZ3pSQSJ9.eyJpc3MiOiJodHRwczovL2Rldi1zNjhjLXEteS5hdXRoMC5jb20vIiwic3ViIjoib3JGbFVZTkdSNmZjV1ZweWU5a2dIdElOa2s3VFpoOWJAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LXM2OGMtcS15LmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTgzNjM1ODYyLCJleHAiOjE1ODQyNDA2NjAsImF6cCI6Im9yRmxVWU5HUjZmY1dWcHllOWtnSHRJTmtrN1RaaDliIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6aG9va3MgdXBkYXRlOmhvb2tzIGRlbGV0ZTpob29rcyBjcmVhdGU6aG9va3MgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIHJlYWQ6bG9nX3N0cmVhbXMgY3JlYXRlOmxvZ19zdHJlYW1zIGRlbGV0ZTpsb2dfc3RyZWFtcyB1cGRhdGU6bG9nX3N0cmVhbXMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.nCjALEIQumz-KFdeoSuh9DAE8fmQEFI5zSywUZYZOIi46w87wVsf2KjhAYBnK62FfbHEcn10wpnKpf0-fpWmmwOgO1ahqtI5qWXD79StLQp75vcTmdUp9wkgVG2qcEJAWoezTjY4_FVJ0ct2NVUmkfc4LJuPJ888yS59Nkcmdrvxs9AM9A2YQNlVAJKJ06hixX-aXV-GHBmO-uEvKGvUUQv8DnVSGfSZyJ06G_WKCHeJWgbf0F2vHWqBzCxD5JT7NZE_hYrncWjl3IimrhIRREZ_zgqIqtwIufmvx41nF-lIPlYw75FR0xfAERo-SwiwrsiM8u3J_j0ahmE0lRISEg";
            await axios({
              method: 'PATCH',
              url: `https://dev-s68c-q-y.auth0.com/api/v2/users/${req.body.auth0id}`,
              headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${tempAccessToken}`
              },
              data: {
                email: req.body.email
              },
              json: true
            })
            .then( (result) => {
              console.log("-----EMAIL PATCH AUTH0 RESULT------");
              console.log(result);
            })
            .catch( (error) => {
              console.log(error);
            });

            summaryOfChanges += `•Email has been updated to ${req.body.email}\n` //TODO: maybe ask to confirm on old email if this is the case?
        }

        if (req.body.eventAuthorizer) { //TODO: add authorization to this
            user.eventAuthorizer = req.body.eventAuthorizer;
            summaryOfChanges += "• You have been authorized to create official events.\n"
        }

        if (req.body.userAuthorizer) { //TODO: add authorization to this
            user.userAuthorizer = req.body.userAuthorizer;
            summaryOfChanges += "• You have been authorized to authorize other users to create official events.\n"
        }

        if (req.body.picture) {
            user.profilePic.imgUrl = req.body.picture;
            user.is_azure = false;
            summaryOfChanges += "• Your profile picture has set to an external source.\n"
        }

        if (req.body.thumb) {
            user.profilePic.thumbUrl = req.body.thumb;
        }

        const msg = {
            to: req.body.email,
            from: 'noreply@ltmsio.codes',
            subject: 'Changes have been made to your account',
            text: summaryOfChanges,
            html: summaryOfChanges,
        };


        sgMail.send(msg).then(() => {
            res.status(200).send("changes made successfully");
        }).catch(err => {
            console.log(err)
            res.status(500).send(err);
        });
    });
});

//PATCH request to give users authorizations
router.patch('/authorization', (req, res) => {
    if(Object.keys(req.body).length == 0) {
        return res.status(400).send("body is empty");
    }

    console.log(req.body);
    User.findOne({email: req.body.data.email}).then((user) => {
        if(!user) {
            return res.status(404).send("user not found");
        }
        summaryOfChanges = '';
        user.userAuthorizer = true;
        summaryOfChanges += "•You have been authorized to authorize other users to create official events.\n";
        user.save().then((user) => res.send("Changes made successfully")).catch((err) => console.log(err));

        
        // const msg = {
        //     to: req.body.email,
        //     from: 'noreply@ltmsio.codes',
        //     subject: 'Changes have been made to your account',
        //     text: summaryOfChanges,
        //     html: summaryOfChanges,
        // };

        // console.log(msg);

        // sgMail.send(msg).then(() => {
        //     res.status(200).send("changes made successfully");
        // }).catch(err => {
        //     console.log(err);
        //     res.status(500).send(err);
        // });
    });
});
/* DELETE */

//DELETE user

router.delete('/:id', (req, res) => {
    if (!req.params.id) {
        res.status(400).send("ID Required!!");
    }
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
