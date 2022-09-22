const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://jovi:jovi@cluster0.tncfitt.mongodb.net/?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
   title :String,
   author:String,
   genre: String,
   image: String,
   
});

var Bookdata = mongoose.model('bookdata',BookSchema);

module.exports = Bookdata;
