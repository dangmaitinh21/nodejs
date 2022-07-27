const { engine } = require('express-handlebars');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const path = require('path');
const route = require('./routes');
const app = express();
const port = 3000;
const db = require('./config/db/index');
const SortMiddleware = require('./app/middlewares/SortMiddleware');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
); //Xử lý cho form gửi lên server
app.use(express.json()); //Xử lý cho JS gửi lên server

//Override lại các phương thức xử lý với model
app.use(methodOverride('_method'));

//Custom middlewares
app.use(SortMiddleware);

//HTTP logger middleware
app.use(morgan('combined'));

//Template engine handlebars
app.engine(
    '.hbs',
    engine({
        extname: '.hbs',
        layoutsDir: path.join(__dirname, 'resources', 'views', 'layouts'),
        partialsDir: [
            path.join(__dirname, 'resources', 'views', 'layouts', 'partials'),
        ],
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default: 'fa-solid fa-sort',
                    asc: 'fa-solid fa-arrow-down-a-z',
                    desc: 'fa-solid fa-arrow-down-z-a',
                };
                const types = {
                    default: 'asc',
                    asc: 'desc',
                    desc: 'asc',
                };
                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}"> <i class="${icon} ml-2"></i> </a>`;
            },
        },
    }),
);

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//app.set('partialsDir', path.join(__dirname, 'resources/views/layouts/partials'))

// Routes Init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
