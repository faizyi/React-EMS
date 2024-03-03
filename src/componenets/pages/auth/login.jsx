import React, { useRef, useState } from 'react'
import './auth.css'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import { auth, signInWithEmailAndPassword } from '../../../firebaseConfig/firebase'
import loaderImg from '../../../loader/loader.gif'
export default function Login() {
    const [loader,setLoader] = useState(false);
    const navigate = useNavigate()
    const inputRef = useRef(null)
    const passwordRef = useRef(null)
    function login(event) {
        setLoader(true)
        event.preventDefault();
        signInWithEmailAndPassword(auth, inputRef.current.value, passwordRef.current.value)
            .then((userCredential) => {
                setLoader(false)
                navigate('/React-EMS')
            })
            .catch((error) => {
                Swal.fire("User not Found!");
                setLoader(false)
            });
    }
    return (
        <div className='auth'>
            <div className='auth-heading'>
                <h1>Expense Management System</h1>
            </div>
            {
                loader ? <div className='loader'><img src={loaderImg} alt="" /></div> :
                <div className='auth-container'>
                <form onSubmit={login}>
                    <div className='heading'>
                        <h1>Login</h1>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input placeholder='Enter Email' required type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={inputRef} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input placeholder='Enter Password' required type="password" className="form-control" id="exampleInputPassword1" ref={passwordRef} />
                    </div>
                    <div className='auth-btn'>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                    <div className='auth-footer'>
                        <p>Don't have an Account? <Link to={'/signup'}>Signup here</Link></p>
                    </div>
                </form>
            </div>
            }
        </div>
    )
}
