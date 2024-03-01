import React, { useRef, useState } from 'react'
import Swal from 'sweetalert2'
import './auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { auth, createUserWithEmailAndPassword,db,doc,setDoc} from '../../../firebaseConfig/firebase'
import loaderImg from '../../../loader/loader.gif'
export default function Signup() {
    const [loader,setLoader] = useState(false);
    const navigate = useNavigate()
    const inputRef = useRef(null)
    const passwordRef = useRef(null)
    const conPasswordRef = useRef(null)
    function signup(event) {
        event.preventDefault();
        setLoader(true)
        if (inputRef.current.value == '' && passwordRef.current.value == '' && conPasswordRef.current.value == '') {
            Swal.fire("Fields Required");
            setLoader(false)
        } else {
            if (conPasswordRef.current.value == passwordRef.current.value) {
                const userData = {
                    email: inputRef.current.value,
                    password: passwordRef.current.value
                }
                createUserWithEmailAndPassword(auth, userData.email, userData.password)
                    .then(async(userCredential) => {
                        const user = userCredential.user;
                        try {
                            const docRef = await setDoc(doc(db, "users" , user.uid), {
                                ...userData,
                                userid : user.uid
                            });
                            setLoader(false)
                            navigate('/login')
                          } catch (e) {
                            Swal.fire("Somthing wrong");
                            setLoader(false);
                            inputRef.current.value = ''
                            passwordRef.current.value = ''
                            conPasswordRef.current.value = ''
                          }
                    })
                    .catch((error) => {
                        Swal.fire("This Email has Already Registered");
                        setLoader(false)
                        inputRef.current.value = ''
                        passwordRef.current.value = ''
                        conPasswordRef.current.value = ''
                    });
            }else{
                Swal.fire("Password don't Match");
                setLoader(false)
                inputRef.current.value = ''
                passwordRef.current.value = ''
                conPasswordRef.current.value = ''
            }
        }
    }
    return (
        <div className='auth'>
            <div className='auth-heading'>
                <h1>Expense Management System</h1>
            </div>

            {
                loader ? <div className='loader'><img src={loaderImg} alt="" /></div> :
                <div className='auth-container'>
                <form onSubmit={signup}>
                    <div className='heading'>
                        <h1>Sign Up</h1>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input placeholder='Enter Your Email' required type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={inputRef} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label" >Create Password</label>
                        <input placeholder='Enter Password' required type="password" className="form-control" id="exampleInputPassword1" ref={passwordRef} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Confirm Password</label>
                        <input placeholder='Confirm Password' required type="password" className="form-control" id="exampleInputPassword1" ref={conPasswordRef} />
                    </div>
                    <div className='auth-btn'>
                        <button type="submit" className="btn btn-primary">Create Account</button>
                    </div>
                    <div className='auth-footer'>
                        <p>Already have an Account? <Link to={'/login'}>Login</Link></p>
                    </div>
                </form>
            </div>
            }
        </div>
    )
}
