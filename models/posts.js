const { Schema, model } = require('mongoose');

const postsSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    minlength: 3,
    maxlength: 280,
    required: true
  },
  picPath: {
    type: String,
    required: true
  },
  picName: {
    type: String
  }
});

module.exports = model('Posts', postsSchema);
