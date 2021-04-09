const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Jean:Welcome@123@cluster0.nvytx.mongodb.net/Products?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err) => {
    if (!err) {
        console.log("Mongodb connected");
    } else {
        console.log("Mongodb is not connected");
    }
});

require('./Products');