import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const AllCourses = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [search, setSearch] = useState({
    name: '',
    status : '',
    category_id : ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/course/courses')
      .then(res => setData(res.data))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/course/delete-course/${id}`)
      .then(() => {
        axios.get('http://localhost:5000/course/courses')
          .then(res => setData(res.data))
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };

  const handleViewMore = (id) => {
    axios.get(`http://localhost:5000/course/course/${id}`)
      .then(res => {
        setSelectedCourse(res.data);
        setShowModal(true);
      })
      .catch(err => console.log(err));
  };

  useEffect(()=>{
    axios.get('http://localhost:5000/category/categories')
    .then(res => setCategories(res.data))
    .catch(error => console.log(error))
    },[])

  const handleSearch = (e) => {
    e.preventDefault();
    axios.get('http://localhost:5000/course/courses/filter', {
      params: {
        name: search.name,
        status : search.status
      },
    })
    .then(res => {
      setData(res.data);
    })
    .catch(error => console.log(error));
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
  
    const selectedCategoryId = e.target.value;
  
    axios.get('http://localhost:5000/course/categories', {
      params: {
        category_id: selectedCategoryId,
      },
    })
      .then(res => setData(res.data))
      .catch(error => console.log(error));
  };
  

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <section className='w-50 bg-white rounded p-3'>
        <h2>Courses</h2>
        <div className="d-flex justify-content-between">
          <Link to="/create-course" className='btn btn-success'>Create Course</Link>
          <Link to="/all-categories" className='btn btn-success'>Go to Categories</Link>
        </div>

        <form onSubmit={handleSearch} className="my-3">
            <input
            type="text"
            placeholder="Enter course name"
            value={search.name}
            onChange={(e) => setSearch({ ...search, name: e.target.value })}
            />
            <select
            value={search.status}
            onChange={(e) => setSearch({ ...search, status: e.target.value })}
            >
                <option value=''>Select status</option>
                <option value='Free'>Free</option>
                <option value='Subscription'>Subscription</option>
                <option value='Locked'>Locked</option>
                <option value='Paid'>Paid</option>
            </select>
          <button type="submit" className='btn btn-primary'>Search</button>
        </form>
        <select
          value={search.category_id}
          onChange={(e) => {
            setSearch({ ...search, category_id: e.target.value });
            handleCategoryChange(e);
          }}
        >
          <option value=''>Select category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((course, index) => (
              <tr key={index}>
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>{course.status}</td>
                <td>
                  <button onClick={() => handleViewMore(course.id)} className='btn btn-sm btn-info'>View More</button>
                  <Link to={`/edit-course/${course.id}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                  <button onClick={() => handleDelete(course.id)} className='btn btn-sm btn-danger'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
            <Modal.Title>Course Details</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                <h3>ID: {selectedCourse.id}</h3>
                <h3>Name: {selectedCourse.name}</h3>
                <h3>Description: {selectedCourse.description}</h3>
                <h3>Category_id: {selectedCourse.category_id}</h3>
                <h3>Status: {selectedCourse.status}</h3>
                <h3>Teacher: {selectedCourse.teacher}</h3>
                <h3>Video_link: {selectedCourse.video_link}</h3>
                </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
                Close
            </Button>
            </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllCourses;
