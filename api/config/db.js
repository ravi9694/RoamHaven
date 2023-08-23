const mongoose = require('mongoose');

const connectWithDB = () => {
  mongoose.set('strictQuery', false);
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log(`Database connected successfully`))
    .catch((err) => {
      console.log(`Database connection failed`);
      console.log(err);
      process.exit(1);
    });
};

module.exports = connectWithDB;
