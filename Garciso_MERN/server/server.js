const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const Student = require("./models/Student");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

// let students = [
//   {
//       id: 1,
//       name: 'Juan Dela Cruz',
//       course: 'BSIT',
//       age: 20
//   }
// ];

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.get('/students', async (req, res) => {
  const students = await Student.find();

  res.json(students);
});

app.post("/students", async (req, res) =>{
  try{
    const { name, course, age } = req.body;
    const newStudent =  new Student({
      name,
      course,
      age
    });
    const savedStudent = await new Student.save();

    res.status(201).json(savedStudent);
  }catch(error){
    res.status(400).json({ message: "Error creating student" });
  
} });


app.delete("/students/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDeleted(req.params.id);

    if(!deletedStudent){
      return res.status(404).json({
        message: "Student unsuccessfully deleted"
      })
    } res.json ({
      message: "Student successfully deleted"
    })
  }catch(error){
    return res.status(404).json({
      message: "Error"
    })
  }});




app.put("/students/:id", (req, res) => {
  Student.findById(req.params.id)
  .then()
})


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});