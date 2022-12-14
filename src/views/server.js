const bodyParser = require('body-parser');
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const config = require("config");

const appController = require("./controllers/appController");
const isAuth = require("./middleware/is-auth");
const connectDB = require("./config/db");
const mongoURI = config.get("mongoURI");
const app = express();
connectDB();

const store = new MongoDBStore({
  uri: mongoURI,
  collection: "mySessions",
});

const nav = [
  {
      link:'/books',name:'Books'
  },
  {
      link:'/authors',name:'Authors'
  },
  {
      link:'/admin',name:'Add Book'
  },
  {
      link:'/admins',name:'Add Author'
  },
 
];//

app.set("view engine", "ejs");
app.set('views','./src/views');
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);




// Landing Page
app.get("/", appController.landing_page);

// Login Page
app.get("/login", appController.login_get);
app.post("/login", appController.login_post);

// Register Page
app.get("/register", appController.register_get);
app.post("/register", appController.register_post);

// Dashboard Page
app.get("/index", isAuth, appController.dashboard_get);//

app.post("/logout", appController.logout_post);



app.listen(5000, console.log("App started on http://localhost:5000"));