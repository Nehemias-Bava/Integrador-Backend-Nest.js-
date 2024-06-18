import React, { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm.jsx';
import StudentList from './components/StudentList.jsx';

function App() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const response = await fetch('/students');
    const data = await response.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async (student) => {
    const response = await fetch('/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });
    const newStudent = await response.json();
    setStudents([...students, newStudent]);
  };

  const updateStudent = async (id, updatedStudent) => {
    const response = await fetch(`/students/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedStudent),
    });
    const updated = await response.json();
    setStudents(students.map(student => (student.id === id ? updated : student)));
  };

  const deleteStudent = async (id) => {
    await fetch(`/students/${id}`, { method: 'DELETE' });
    setStudents(students.filter(student => student.id !== id));
  };

  const payFee = async (id) => {
    const response = await fetch(`/students/${id}/pay`, { method: 'PATCH' });
    const updated = await response.json();
    setStudents(students.map(student => (student.id === id ? updated : student)));
  };

  return (
    <div>
      <h1>Student Management</h1>
      <StudentForm onAddStudent={addStudent} />
      <StudentList students={students} onUpdateStudent={updateStudent} onDeleteStudent={deleteStudent} onPayFee={payFee} />
    </div>
  );
}

export default App;