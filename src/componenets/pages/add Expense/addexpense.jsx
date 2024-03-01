import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import './addexp.css'
import { auth, onAuthStateChanged ,db,collection,addDoc} from '../../../firebaseConfig/firebase'
import loaderImg from '../../../loader/loader.gif'
import Clearall from '../clear all/clearall'
export default function Addexpense() {
    const [loader,setLoader] = useState(false);
    const itemRef = useRef(null)
    const amountRef = useRef(null)
    const dateRef = useRef(null)
    const [userId, setUserId] = useState()
    const [display,setDisplay] = useState({
        display : 'none'
    })
    const [active,setIsActive] = useState(false)
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              setUserId(uid)
            } else {
                // Swal.fire("No such document!");
            }
          });
    },[])
   function add(){
    setDisplay({
        display : 'block',
    })
    setIsActive(true)
    }
    function cancel(){
        setDisplay({
            display : 'none'
        })
        setIsActive(false)
    }

   async function addExp(){
    setLoader(true)
    const amount = parseFloat(amountRef.current.value)
        if(itemRef.current.value == '' && amountRef.current.value == '' && dateRef.current.value == ''){
            Swal.fire("Please fill out these fields");
            setLoader(false)
        }else{
            const expData={
                itemName : itemRef.current.value,
                Amount : amount.toFixed(2),
                Date : dateRef.current.value,
            }
            try {   
                const docRef = await addDoc(collection(db, userId), {
                    ...expData
                });
                console.log(docRef);
                setLoader(false)
                setDisplay({
                    display : 'none'
                })
                setIsActive(false)
                window.location.reload();
              } catch (e) {
                Swal.fire("Error adding document!");
                setLoader(false)
              }
        }
    }
  return (
    <div className='addexp-container'>

        <div className='add-btn'>
        <button onClick={add}>Add Expense</button>
        <Clearall/>
        </div>
        
        {
            loader ?  <div className={`add-exp-container ${active ? 'display' : ''}`} ><div className='loader'><img src={loaderImg} alt="" /></div></div>:
            <div className={`add-exp-container ${active ? 'display' : ''}`} >
            <div className='add-exp' style={display}>
                <h1>Add Expense</h1>
            <div className='item'>
                <input className='exp-item'  type="text" placeholder='Enter Item' ref={itemRef}/>
                <input type="text" placeholder='Enter Amount' ref={amountRef} />
                <input type="date" ref={dateRef}/>
            </div>
            <div className='add-exp-btn'>
                <button onClick={addExp} className='add'>Add</button>
                <button onClick={cancel} className='cancel'>Cancel</button>
            </div>
            </div>
        </div>
        }

        {/* <div>
            <ShowExpense/>
        </div> */}
    </div>
  )
}
