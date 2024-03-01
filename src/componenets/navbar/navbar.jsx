import React from 'react'
import './navbar.css'
import logo from '../../bg img/expense-management-4268366-3561009.webp'
import { auth,signOut} from '../../firebaseConfig/firebase'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
export default function Navbar() {
  const navigate = useNavigate();
   function logout(){
     signOut(auth).then(() => {
      navigate('/login')
    }).catch((error) => {
      Swal.fire("Somthing wrong");
    });
  }
    return (
        <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <Link to={'/home'}><img src={logo} alt="" /></Link>
          <div className='nav-btn'>
            <ul>
                <li>Home</li>
                <li className='logout' onClick={logout}>Logout</li>
            </ul>
            </div>
        </div>
      </nav>
    )
}
