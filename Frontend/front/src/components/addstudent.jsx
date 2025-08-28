import React, { useState } from 'react';

function AddStudentForm({ onSubmit, onCancel }) {
  const [student, setStudent] = useState({
    name: '',
    roll: '',
    subject: '',
    phone: '',
    fees: '',
    batch: ''
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation to avoid 422 error
    if (Object.values(student).some(value => value.trim() === '')) {
      alert('Please fill in all fields.');
      return;
    }

    onSubmit(student);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={student.name} onChange={handleChange} required />
        <input name="roll" placeholder="Roll" value={student.roll} onChange={handleChange} required />
        <input name="subject" placeholder="Subject" value={student.subject} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={student.phone} onChange={handleChange} required />
        <input name="fees" placeholder="Fees" value={student.fees} onChange={handleChange} required />
        <input name="batch" placeholder="Batch" value={student.batch} onChange={handleChange} required />
        <button type="submit">Submit</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default AddStudentForm;
