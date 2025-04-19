const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type:String,
        enum:["ADMIN", "USER"],
        default:"USER"
    }
}, { 
    timestamps: true
});

//userSchema.index({ username: 1 });

module.exports = mongoose.model('Users', userSchema);