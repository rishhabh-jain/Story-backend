const mongoose = require('mongoose')
const mongokey = 'mongodb+srv://rishabh:rishabh@cluster0.k5rvu.mongodb.net/second-database?retryWrites=true&w=majority'
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongokey, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB