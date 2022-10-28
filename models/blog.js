const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creates new instance of schema object
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
   
    image: {
        type: String,
        required: true,
      },
},{timestamps: true})

//model 
//first argument name of the model
//automaticaly looks for blogs in atlas
//second argument is the schema we want to make this model based on
const Blog = mongoose.model('Blog',blogSchema);
module.exports = Blog;