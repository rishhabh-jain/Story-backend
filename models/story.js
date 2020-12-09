const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'public',
    enum: ['public', 'private'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  likes : [{type: mongoose.Schema.Types.ObjectId , ref:"User"}],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  category : {
      type : String,
      enum : ['Romance','Horror','Thriller','Funny','Creepy','Fantasy','Mystery','Love','PlotTwist','DailyUpdate']
  }
})

module.exports = mongoose.model('Story', StorySchema)