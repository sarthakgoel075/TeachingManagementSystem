import React, { useEffect, useState } from 'react';
import StudentList from './studentlist';
import AddStudentForm from './addstudent';

function Student() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);

const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await response.json();
      setStudents(res.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

const handleAddStudent = async (newStudent) => {
  const formatted = {
    ...newStudent,
    roll: parseInt(newStudent.roll),
    name: newStudent.name,
    phone: newStudent.phone,
    fees: parseInt(newStudent.fees),
    subject: [newStudent.subject], 
    batch: [newStudent.batch],     
  };

  const res = await fetch("http://localhost:5000/api/v1/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formatted),
  });

  if (res.ok) {
    fetchData();
    setShowForm(false);
  } else {
    alert("Add failed");
  }
};

const handleSave = async (updatedStudent) => {
const formatted = {
  roll: parseInt(updatedStudent.roll),
  name: updatedStudent.name,
  phone: updatedStudent.phone,
  fees: parseInt(updatedStudent.fees),
  subject: Array.isArray(updatedStudent.subject)
    ? updatedStudent.subject
    : [updatedStudent.subject],
  batch: Array.isArray(updatedStudent.batch)
    ? updatedStudent.batch
    : [updatedStudent.batch],
};


  const res = await fetch("http://localhost:5000/api/v1/students", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formatted),
  });

  if (res.ok) {
    fetchData();
  } else {
    alert("Update failed");
  }
};

  const handleDelete = async (stu) => {
    const resp = await fetch(`https://teachingmanagementsystem-1.onrender.com/api/v1/students?rollno=${stu.roll}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    if (resp.ok) {
      fetchData();
    } else {
      alert("Delete failed");
    }
  };

  return (
    <div>
      <StudentList
        students={students}
        onSave={handleSave}
        onDelete={handleDelete}
        onAdd={() => setShowForm(true)}
      />
      {showForm && (
        <AddStudentForm
          onSubmit={handleAddStudent}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default Student;
