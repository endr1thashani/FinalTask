
import React, {useState , useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const AllCategories = () => {
    const [data , setData] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:5000/category/categories')
        .then(res => setData(res.data))
        .catch(error => console.log(error))
    },[])

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/category/delete-category/${id}`)
        .then(res => {
            window.location.reload()
        })
        .catch(error => console.log(error))
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <section className='w-50 bg-white rounded p-3'>
            <h2>Categories</h2>
            <div className="d-flex justify-content-between">
                <Link to="/" className='btn btn-success'>Go back</Link>
                <Link to="/create-category" className='btn btn-success'>Create Category</Link>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((category , index) => (
                            <tr key={index}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>
                                    <Link to={`/edit-category/${category.id}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                                    <button onClick={() => handleDelete(category.id)} className='btn btn-sm btn-danger'>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </section>
    </div>
  )
}

export default AllCategories