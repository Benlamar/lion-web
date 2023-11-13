import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import About from './components/about/About'
import Records from './components/records/Records'
// import MyNavbar from './components/mynavbar/MyNavbar'
import Login from './components/login/Login'
import View from './components/view/View'
import Add from './components/add/Add'
import SideBar from './components/sidebar/SideBar'

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* <Route element={<MyNavbar />}> */}
          <Route element={<SideBar />} >
            <Route index element={<Dashboard />} />
            <Route path="/add" element={<Add />} />
            <Route path="/view" element={<View />} />
            <Route path="/records" element={<Records />} />
            <Route path="/about" element={<About />} />
          </Route>
        {/* </Route> */}

      </Routes>
    </>
  )
}

export default App
