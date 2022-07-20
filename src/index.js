const { engine } = require('express-handlebars');
const express = require('express');
const morgan = require('morgan');
const route = require('./routes');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
); //Xử lý cho form gửi lên server
app.use(express.json()); //Xử lý cho JS gửi lên server

//HTTP logger middleware
app.use(morgan('combined'));

//Template engine handlebars
app.engine(
    '.hbs',
    engine({
        extname: '.hbs',
        layoutsDir: path.join(__dirname, 'resources/views/layouts'),
        partialsDir: [path.join(__dirname, 'resources/views/layouts/partials')],
    }),
);

        app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//app.set('partialsDir', path.join(__dirname, 'resources/views/layouts/partials'))

// Routes Init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
