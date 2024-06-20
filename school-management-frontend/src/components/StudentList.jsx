import React from 'react';

function StudentList({ students, onUpdateStudent, onDeleteStudent, onPayFee }) {
  return (
    
    <ul>
      <h2>Listado de Estudiantes</h2>
      {students.map((student) => (
        <li key={student.id}>
          <span>{student.name} (Age: {student.age}) - Fee: {student.monthlyFee} - Paid: {student.paid ? 'Yes' : 'No'}</span>
          <div className='buttons'>
            <button class="button-onPayFree" onClick={() => onPayFee(student.id)}>{student.paid ? 'Unpay' : 'Pay'}</button>
            <button class="button-delete" onClick={() => onDeleteStudent(student.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default StudentList;