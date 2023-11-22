import React , { useEffect , useState} from 'react'
import axios from 'axios'
import { useParams , useNavigate } from 'react-router-dom'

const EditCourse = () => {
    const [categories , setCategories] = useState([])
    const [values , setValues] = useState({
        name : '',
        description : '',
        category_id : '',
        status : '',
        teacher : '',
        video_link : ''
    })

    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:5000/course/course/${id}`)
        .then(res => {
            console.log(res.data)
            setValues({...values , 
                name: res.data.name ,
                description: res.data.description , 
                category_id: res.data.category_id ,
                status: res.data.status, 
                teacher: res.data.teacher ,
                video_link: res.data.video_link 
            })
        })
        .catch(err => console.log(err))
    }, [])


    useEffect(() => {
        axios.get('http://localhost:5000/category/categories')
            .then(res => setCategories(res.data))
            .catch(error => console.log(error));
    }, []);                                                                                     


    const handleEdit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/course/edit-course/${id}` , values)
        .then(res => {
            console.log(res)
            navigate("/")
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <section className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleEdit}>
                <h2>Edit Course</h2>
                <div>
                    <label htmlFor=''>Name</label>
                    <input type='text' placeholder='Enter your name' className='form-control' 
                    value={values.name}
                    onChange={e => setValues({...values , name : e.target.value})}
                    />
                </div>
                <div>
                    <label htmlFor=''>Description</label>
                    <textarea type='text' placeholder='Enter your name' className='form-control' 
                    value={values.description}
                    onChange={e => setValues({...values , description : e.target.value})}
                    />
                </div>
                <div>
                <label htmlFor=''>Category_id</label>
                <select
                    className='form-control'
                    value={values.category_id}
                    onChange={e => setValues({...values, category_id: e.target.value})}
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
                    value={values.status}
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
                    value={values.teacher}
                    onChange={e => setValues({...values , teacher : e.target.value})}
                    />
                </div>
                <div>
                    <label htmlFor=''>Video_link</label>
                    <input type='text' placeholder='Enter your teachers full name' className='form-control' 
                    value={values.video_link}
                    onChange={e => setValues({...values , video_link : e.target.value})}
                    />
                </div>
                <button className='btn btn-success'>Submit</button>
            </form>
        </section>
    </div>
  )
}

export default EditCourse