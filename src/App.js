import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import UserList from './UserList';
import Modal from './Modal';

import './App.css'; 

const App = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id:'',
    name: '',
    email: '',
  });



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/read-spreadsheet');

        const data = await response.json();
        setAllUsers(data.rows);
        setFilteredUsers(data.rows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 


 
  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = allUsers.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Form submitted:', formData);
  //   closeModal();
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/create-rows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('POST request successful:', responseData);
  
        const newUser = {
          id: responseData.id,
          name: formData.name,
          email: formData.email,
        };
  
        setAllUsers((prevUsers) => [...prevUsers, newUser]);
        setFilteredUsers((prevUsers) => [...prevUsers, newUser]);
  
        closeModal();
      } else {
        console.error('POST request failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during POST request:', error);
    }
  };
  ;
  
 // delete 
 const deleteUser = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/delete-user/${userId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const updatedUsers = allUsers.filter((user) => user.id !== userId);
      setAllUsers(updatedUsers);
      setFilteredUsers(updatedUsers);

      console.log('User deleted successfully');
    } else {
      console.error('DELETE request failed:', response.statusText);
    }
  } catch (error) {
    console.error('Error during DELETE request:', error);
  }
};


  return (
    <div className="app-container">
      <h1>User Search App</h1>
      <SearchBar onSearch={handleSearch} />
      <UserList users={filteredUsers} deleteUser={deleteUser}/>
      

      






















      <button onClick={openModal}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-plus"
    viewBox="0 0 16 16"
  >
    <path d="M8 1a.75.75 0 0 1 .75.75V7h5.25a.75.75 0 1 1 0 1.5H8V14.25a.75.75 0 1 1-1.5 0V8H1.75a.75.75 0 0 1 0-1.5H6V1.75A.75.75 0 0 1 7.75 1z" />
  </svg>
  </button>


   <Modal isOpen={isModalOpen} onClose={closeModal}>
  <h2>Modal Content</h2>
  <form onSubmit={handleFormSubmit}>
         <label htmlFor="id">Id:</label>
          <input type="number" id="id" name="id" value={formData.id} onChange={handleFormChange} />

          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleFormChange} />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleFormChange} />

          <button type="submit">Submit</button>

        </form>
  </Modal>
    </div>
  );
};

export default App;




