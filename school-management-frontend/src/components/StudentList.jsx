import React from 'react';

function StudentList({ students, onUpdateStudent, onDeleteStudent, onPayFee }) {
  return (
    <ul>
      {students.map((student) => (
        <li key={student.id}>
          <span>{student.name} (Age: {student.age}) - Fee: {student.monthlyFee} - Paid: {student.paid ? 'Yes' : 'No'}</span>
          <button onClick={() => onPayFee(student.id)}>{student.paid ? 'Unpay' : 'Pay'}</button>
          <button onClick={() => onDeleteStudent(student.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default StudentList;