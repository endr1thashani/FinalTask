import {Routes, Route} from 'react-router-dom'
import AllCourses from './pages/AllCourses';
import CreateCategory from './components/Category/CreateCategory'
import 'bootstrap/dist/css/bootstrap.min.css'
import EditCategory from './components/Category/EditCategory';
import AllCategories from './components/Category/AllCategories';
import CreateCourse from './components/Course/CreateCourse';
import EditCourse from './components/Course/EditCourse';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<AllCourses/>} />
        <Route path='/all-categories' element={<AllCategories/>} />
        <Route path='/create-category' element={<CreateCategory/>} />
        <Route path='/edit-category/:id' element={<EditCategory/>} />
        <Route path='/create-course' element={<CreateCourse/>} />
        <Route path='/edit-course/:id' element={<EditCourse/>} /> 
      </Routes>
    </div>
  );
}

export default App;
