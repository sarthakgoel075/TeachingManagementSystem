import React, { useState } from 'react';
import './student.css';
import addicon from '../assets/add2.jpg';
import update from '../assets/update.png';
import deleteicon from '../assets/download.jfif';
function StudentList({ students, onSave, onDelete, onAdd }) {
  const [editind, seteditend] = useState(-1);
  const [editdata, seteditdata] = useState({});

  const updatehere = (ind,student) => {
    seteditend(ind);
    seteditdata({ ...student });
  };

  const handleChange = (e) => {
    seteditdata({
      ...editdata,
      [e.target.name]: e.target.value,
    });
  };

  const saveChanges = () => {
    onSave(editdata);
    seteditend(-1);
  };
  const handlelogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <div>
      <button className='toggle' onClick={handlelogout}>logout</button>
      <h2 className="heading">Students</h2>
      <table>
        <thead>
          <tr>
            <th className="head">Student name</th>
            <th className="head">Roll no</th>
            <th className="head">Subject</th>
            <th className="head">Contact No</th>
            <th className="head">Fees</th>
            <th className="head">Batch Name</th>
            <th className="head">Update/Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map((stu, i) => (
            <tr className="row" key={i}>
              <td>
                {i === editind ? (
                  <input
                    type="text"
                    name="name"
                    value={editdata.name}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  stu.name
                )}
              </td>
              <td>{stu.roll}</td>
               <td>
                {i === editind ? (
                  <input
                    type="subject"
                    name="subject"
                    value={editdata.subject}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  stu.subject
                )}
              </td>
              <td>
                {i === editind ? (
                  <input
                    type="text"
                    name="phone"
                    value={editdata.phone}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  stu.phone
                )}
              </td>
              <td>
                {i === editind ? (
                  <input
                    type="text"
                    name="fees"
                    value={editdata.fees}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  stu.fees
                )}
              </td>
              <td>
                {i === editind ? (
                  <input
                    type="text"
                    name="batch"
                    value={editdata.batch}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  stu.batch
                )}
              </td>
              <td>
                {i === editind ? (
                  <>
                    <button onClick={saveChanges}>Save</button>
                    <button onClick={() => seteditend(-1)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <img title='update' className='icon' onClick={() => updatehere(i, stu)} src={update} alt="update" />
                    <img title='delete' className='icon'    onClick={() => {
                        if (
                          window.confirm(`Are you sure you want to delete ${stu.name}?`)
                        ) {
                          onDelete(stu);
                        }}} src={deleteicon} alt="delete" />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <img title='addstudents' onClick={onAdd} src={addicon} className='icon add' alt="notfound" />
    </div>
  );
}

export default StudentList;
