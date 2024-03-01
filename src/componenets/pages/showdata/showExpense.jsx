import React, { useEffect, useRef, useState } from 'react'
import './showexp.css'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen,faTrash } from '@fortawesome/free-solid-svg-icons'
import loaderImg from '../../../loader/loader.gif'
import bg from '../../../bg img/expense-management-4268366-3561009.webp'
import { auth, onAuthStateChanged, db, getDocs, collection,deleteDoc,doc,updateDoc } from '../../../firebaseConfig/firebase'
export default function ShowExpense() {
    const [userData, setUserData] = useState([]);
    const [loader,setLoader] = useState(true);
    const [userId, setUserId] = useState()
    const itemRef = useRef(null)
    const amountRef = useRef(null)
    const dateRef = useRef(null)
    const [display,setDisplay] = useState({
        display : 'none'
    })
    const [active,setIsActive] = useState(false)
    const [itemName,setItemName] = useState('')
    const [itemAmount,setItemAmount] = useState('')
    const [itemDate,setItemDate] = useState('')
    const [expId,setExpId] = useState()
    useEffect(() => {
        setLoader(true)
        const fetchData = async () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const uid = user.uid;
                    setUserId(uid)
                    const querySnapshot = await getDocs(collection(db, uid));
                    const userDataArray = [];
                    querySnapshot.forEach((doc) => {
                        const data = doc.data()
                        userDataArray.push({id : doc.id, ...data})
                    });
                    setUserData(userDataArray)
                    setLoader(false)
                } else {
                    // Swal.fire("No such document!");
                    setLoader(false)
                }
            });
        }
        fetchData();
    }, [])
//delete Expense
    async function del(id){
        setLoader(true)
        try {
            await deleteDoc(doc(db,`${userId}/${id}`));
            setLoader(false)
            window.location.reload()
        } catch (error) {
            Swal.fire("Error removing document!");
            setLoader(false)
        }
    }
    function handleItem(e){
        setItemName(e.target.value)
    }
    function handleAmount(e){
        setItemAmount(e.target.value)
    }
    function handleDate(e){
        setItemDate(e.target.value)
    }
//Edit Expense
    function edit(items){
        setItemName(items.itemName)
        setItemAmount(items.Amount)
        setItemDate(items.Date)
        setExpId(items.id)
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
//update
      async function update(){  
        setLoader(true)
        if(itemName == '' || itemAmount == '' || itemDate == ''){
            Swal.fire("Please fill out these fields");
            setLoader(false)
        }else{
            const updateItem = itemRef.current.value
            const updateAmount = parseFloat(amountRef.current.value)
            const updateDate = dateRef.current.value
            try {
                const washingtonRef = doc(db, `${userId}/${expId}`);
                await updateDoc(washingtonRef, {
                    itemName : updateItem,
                    Amount : updateAmount.toFixed(2),
                    Date : updateDate
                  });
                  setLoader(false);
                  setDisplay({ display: 'none' });
                  setIsActive(false);
                  window.location.reload()
            } catch (error) {
                Swal.fire('Error updating document!');
                setLoader(false);  
            }
        }
      }
    return (
        <div className='showExp-container'>
            {
                loader ? (<div className='show-loader'><img src={loaderImg} alt="" /></div>) :
                (
                    <div className='showexp'>
                        {
                            userData.length === 0 ? (
                                <div className='ems'><img src={bg} alt="" /></div>
                            ) :
                            (
                                <table>
                                <thead>
                                    <tr>
                                        <th>Item Id</th>
                                        <th>Item Name</th>
                                        <th>Amount</th>
                                        <th>Expense Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userData.map((item, index) => {
                                            return <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td className='item-name'>{item.itemName}</td>
                                                <td>{item.Amount}</td>
                                                <td>{item.Date}</td>
                                                <td className='action'>
                                                    <div className='action-btn'>
                                                        <button onClick={()=>edit(item)}  className='edit'><abbr title="Edit"><FontAwesomeIcon icon={faPen} /></abbr></button><button onClick={()=>del(item.id)} className='del'><abbr title="Delete"><FontAwesomeIcon icon={faTrash} /></abbr></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>  
                            )
                        }
                    
                </div>
                )
            }
            
            {
            loader ?  <div className={`add-exp-container ${active ? 'display' : ''}`} ><div className='loader'><img src='' alt="" /></div></div>:
            <div className={`add-exp-container ${active ? 'display' : ''}`} >
            <div className='add-exp' style={display}>
                <h1>Update Expense</h1>
            <div className='item'>
                <input className='exp-item' onChange={handleItem} type="text" placeholder='Enter Item' value={itemName} ref={itemRef}/>
                <input type="text" onChange={handleAmount} placeholder='Enter Amount' value={itemAmount} ref={amountRef} />
                <input type="date" onChange={handleDate} ref={dateRef} value={itemDate}/>
            </div>
            <div className='add-exp-btn'>
                <button onClick={update} className='add'>Update</button>
                <button onClick={cancel} className='cancel'>Cancel</button>
            </div>
            </div>
        </div>
        }

        </div>
    )
}
