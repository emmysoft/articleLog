const express = require('express');  
const bodyParser = require('body-Parser');
const mongoose = require('mongoose');
const passport = require('passport');
require("dotenv").config();
const path = require('path');
const users = require("./routes/api/users");

const app = express();

// middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 

// Connect to mongodb via mongoose
const MONGO_URI = process.env.MONGO_URI;
mongoose
.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected Successfully!')) 
.catch(err => console.log(err));

mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;

//routes
app.use(passport.initialize());
require("./middleware/passport")(passport);
app.use("/api/users", users); 
app.use("api/posts/", require("./routes/api/posts"));

//Serve static assset if in production
if (process.env.NODE_ENV === "Production") {
    app.use(express.static("client/build")); //set static folder
    app.get("*", (_req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
};

//create server connection
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is Listening on port ${port}`)
})