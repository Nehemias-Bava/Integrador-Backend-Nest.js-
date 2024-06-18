import React, { useState } from 'react';
import './StudentForm.css';

function StudentForm({ onAddStudent }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [monthlyFee, setMonthlyFee] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddStudent({ name, age: Number(age), monthlyFee: Number(monthlyFee) });
    setName('');
    setAge('');
    setMonthlyFee('');
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
        required
      />
      <input
        type="number"
        value={monthlyFee}
        onChange={(e) => setMonthlyFee(e.target.value)}
        placeholder="Monthly Fee"
        required
      />
      <button type="submit">Add Student</button>
    </form>
  );
}

export default StudentForm;