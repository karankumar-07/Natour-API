const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config({ path: "/home/karan/codes/complete-node-bootcamp-master/Natours Project/config.env" });
const fs = require("fs");
const Tour = require('/home/karan/codes/complete-node-bootcamp-master/Natours Project/models/tourModel.js');
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex : true,
  useFindAndModify: false
}).then(con => console.log("DB Connection Successful!"))

const tours = JSON.parse(fs.readFileSync('./tours-simple.json', 'utf-8'))

// IMPORT DATA INTO DB
const importData = async () => {
    try {
      await Tour.create(tours);
      console.log('Data successfully loaded!');
      process.exit();
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };
  
  // DELETE ALL DATA FROM DB
  const deleteData = async () => {
    try {
      await Tour.deleteMany();
      console.log('Data successfully deleted!');
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };
  
  if (process.argv[2] === '--import') {
    importData();
  } else if (process.argv[2] === '--delete') {
    deleteData();
  }