const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const usersRouter = require('./routes/users');
const tournamentsRouter = require('./routes/tournaments');
const teamsRouter = require('./routes/team');


const app = express();

//Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//CORS Middleware to enable api calls from same origin
app.use(cors());

//DB config
const db = (process.env.MONGO_URI || "mongodb+srv://FLTMS_App:pcXQ4HvRcyASuxeq@clusterfltms-yea2u.azure.mongodb.net/test?retryWrites=true&w=majority")
//const db = "mongodb://localhost:27017/test1"
//connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected\n"))
  .catch(err => console.log(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/user', usersRouter);
app.use('/api/tournaments', tournamentsRouter);
app.use('/api/tournament', tournamentsRouter);
app.use('/api/teams', teamsRouter);

if (process.env.NODE_ENV == "production") {
  const publicPath = path.join(__dirname, './frontend');
  app.use(express.static(publicPath));
  app.use('*', express.static(publicPath));
}

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
