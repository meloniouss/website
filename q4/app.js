var express = require('express');
const bodyParser = require('body-parser');
var app= express();
const session = require('cookie-session');
app.use(bodyParser.urlencoded({ extended: true }));
const indexRouter = require("./routes/index.js");
const accRoute = require("./routes/accountRoute.js");
const dogCareRoute = require("./routes/dogCare.js");
const findRoute = require("./routes/findPets.js");
const donateRoute = require("./routes/donatePets.js");
const catCareRoute = require("./routes/catCare.js");
const contactRoute = require("./routes/contact.js");
const privacyRoute = require("./routes/privacyRoute.js");
const loginRoute = require('./routes/login.js');
const submitPetRouter = require('./routes/');
const path = require('path');
const {join} = require('path');
const port = process.env.port || 3000;
app.use(express.json());
app.use(bodyParser.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
  }));

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/createacc',accRoute);
app.use('/dogcare', dogCareRoute);
app.use('/find', findRoute);
app.use('/donate',donateRoute);
app.use('/catcare', catCareRoute);
app.use('/contact' ,contactRoute);
app.use('/privacy', privacyRoute);
app.use('/login', loginRoute);
app.use('/', loginRoute);
app.use('/logout', loginRoute);



app.listen(port, "0.0.0.0", function () {
  // ...
});