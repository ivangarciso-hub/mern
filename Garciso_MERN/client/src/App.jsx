import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { useEffect, useState} from 'react';
import axios from "axios";

function App() {


  const [students, setStudents] = useState([]);
  const [name, setName] = useState([]);
  const [course, setCourse] = useState([]);
  const [age, setAge] = useState([]);
  const [updateId, setUpdateId] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch(error =>
        console.error('Error fetching student:', error));

  },[]);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const newStudent = {
      name: name,
      course: course,
      age: Number(age)
    };

    
    try {
      if(updateId){
      const response = await axios.put(`http://localhost:5000/students/${updateId}`, newStudent);
    
    setStudents(currentStudents => currentStudents.map(student => student._id === updateId ? response.data.student : student));

    setMessage(response.data.message);
    }else{
      const response = await axios.post("http://localhost:5000/students", newStudent);
    
      setStudents((currentStudents)=> [...currentStudents, response.data.student]);
      setMessage(response.data.message);
    }
  }
  catch (error) {
    console.error('Error adding student:', error);
    
    if(updateId){
      setMessage("Error updating student");
    }
    else{
      setMessage("Error adding student");
    }
  }

  }
 

  
  return (
    <div>

      <h1>Student Management System</h1>

      <h2>Students</h2>
      
      {students.map((student) => (
        <div key={student._id}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>

        <button onClick={() => handleEdit(student)}>Edit</button>
          </div>
      ))}
      <form onSubmit={(event) => event.defaultPrevented}>
        <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(event) => setName(event.target.value)}>
          
          </input>

          <input
        type="text"
        placeholder="course"
        value={course}
        onChange={(event) => setCourse(event.target.value)}>
          
          </input>

          <input
        type="text"
        placeholder="age"
        value={age}
        onChange={(event) => setAge(event.target.value)}>
          
          </input>
          
        </form>
        <div>
              <button type='submit'>{updateId ? "UPDATE STUDENT" : "ADD STUDENT"}</button>
              <button onClick={() => handleEdit(student)}>Edit</button>
              <button onClick={() => handleDelete(student._id)}>Delete</button>
            </div>

        

    </div>

    
  );
}
export default App;
