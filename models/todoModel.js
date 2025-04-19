const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  status: {
    type: String,
    enum: ["PENDING", "COMPLETED", "IN-PROGRESS", "CANCELLED"],
    default: "PENDING",
    required: true,
  },
  userId: {
    type:mongoose.Schema.Types.ObjectId, //custom object( mongodb sends interface )
    required:true,
    ref:'Users'
  },

}, {
  timestamps: true,
  versionKey: false,
})


const todoModel = mongoose.model('todo', todoSchema);

module.exports = todoModel;