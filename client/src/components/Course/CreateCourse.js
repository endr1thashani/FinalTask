import React , { useEffect , useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const CreateCourse = () => {
    const [categories, setCategories] = useState([]);
    const [values , setValues] = useState({
        name : '',
        description : '',
        category_id : '',
        status : '',
        teacher : '',
        video_link : ''
    })

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:5000/category/categories')
            .then(res => setCategories(res.data))
            .catch(error => console.log(error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/course/add-course' , values)
        .then(res => {
            console.log(res)
            navigate("/")
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <section className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Add Course</h2>
                <div>
                    <label htmlFor=''>Name</label>
                    <input type='text' placeholder='Enter your name' className='form-control' 
                    onChange={e => setValues({...values , name : e.target.value})}
                    />
                </div>
                <div>
                    <label htmlFor=''>Description</label>
                    <textarea placeholder='Enter your description' className='form-control' 
                    onChange={e => setValues({...values , description : e.target.value})}
                    />
                </div>
                <div>
                    <label htmlFor=''>Category_id</label>
                    <select
                            className='form-control'
                            onChange={e => setValues({ ...values, category_id: e.target.value })}
                        >
                            <option value=''>Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div>
                    <label htmlFor=''>Status</label>
                    <select
                        className='form-control'
                        onChange={e => setValues({ ...values, status: e.target.value })}
                        >
                        <option value=''>Select status</option>
                        <option value='Free'>Free</option>
                        <option value='Subscription'>Subscription</option>
                        <option value='Locked'>Locked</option>
                        <option value='Paid'>Paid</option>
                    </select>
                </div>
                <div>
                    <label htmlFor=''>Teacher</label>
                    <input type='text' placeholder='Enter your teachers full name' className='form-control' 
                    onChange={e => setValues({...values , teacher : e.target.value})}
                    />
                </div>
                <div>
                    <label htmlFor=''>Video_link</label>
                    <input type='text' placeholder='Enter your video_link' className='form-control' 
                    onChange={e => setValues({...values , video_link : e.target.value})}
                    />
                </div>
                <button className='btn btn-success'>Submit</button>
            </form>
        </section>
    </div>
  )
}

export default CreateCourse