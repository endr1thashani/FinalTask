import React , { useEffect , useState} from 'react'
import axios from 'axios'
import { useParams , useNavigate } from 'react-router-dom'
const EditCategory = () => {
    const [values , setValues] = useState({
        name : ''
    })

    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:5000/category/category/${id}`)
        .then(res => {
            setValues({...values , name: res.data.name})
        })
        .catch(err => console.log(err))
    }, [])


    const handleEdit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/category/edit-category/${id}` , values)
        .then(res => {
            navigate("/all-categories")
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <section className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleEdit}>
                <h2>Edit Category</h2>
                <div>
                    <label htmlFor=''>Name</label>
                    <input type='text' placeholder='Enter your name' className='form-control' 
                    value={values.name}
                    onChange={e => setValues({...values , name : e.target.value})}
                    />
                </div>
                <button className='btn btn-success'>Submit</button>
            </form>
        </section>
    </div>
  )
}

export default EditCategory