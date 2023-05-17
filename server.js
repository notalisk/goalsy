// necessary imports
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// creating express app and setting PORT
const app = express();
const PORT = process.env.PORT || 3003;

// allows handlebars to use helper functions
const hbs = exphbs.create({ helpers });

// session details
const sess = {
    secret: process.env.SESSION,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

//this allows us to create a session to stay logged in
app.use(session(sess));

// these allow us to use helper functions and tell express to use handlebars template
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// this tells express to send information in .json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// if a file served is static, (i.e. js or css) we can omit the filepath after public (i.e. ../../public/js/index.js becomes /js/index.js)
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// starts the server with sequelize
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`\nServer running on port ${PORT}. Visit http://localhost:${PORT}`));
});