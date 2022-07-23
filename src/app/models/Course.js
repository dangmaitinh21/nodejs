const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const Course = new Schema(
    {
        name: { type: String, maxLength: 255 },
        description: { type: String, maxLength: 600 },
        image: { type: String, maxLength: 255 },
        slug: { type: String, slug: 'name', unique: true },
        videoId: { type: String, maxLength: 255 },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Course', Course);
