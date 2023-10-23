const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const uri = require("./config/dbDetails");
const path = require("path");
const userRouter = require("./routes/userRouter");

const app = express();
app.use(express.json());

const store = new MongoDBStore({
  uri: uri,
  databaseName: "chatAppdb",
  collection: "mySessions",
});

//===========Middlewares=============

app.use(
  session({
    secret: "This is a secret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: store,
    resave: false,
    saveUninitialized: true,
  })
);


app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "views")));

app.set("view engine", "ejs");

//==========Routes============
app.use("/api/v1/users", userRouter);

module.exports = app;
