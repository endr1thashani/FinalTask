import React , { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const CreateCategory = () => {
    const [values , setValues] = useState({
        name : ''
    })

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/category/add-category' , values)
        .then(res => {
            console.log(res)
            navigate("/all-categories")
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <section className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Add Category</h2>
                <div>
                    <label htmlFor=''>Name</label>
                    <input type='text' placeholder='Enter your name' className='form-control' 
                    onChange={e => setValues({...values , name : e.target.value})}
                    />
                </div>
                <button className='btn btn-success'>Submit</button>
            </form>
        </section>
    </div>
  )
}

export default CreateCategory