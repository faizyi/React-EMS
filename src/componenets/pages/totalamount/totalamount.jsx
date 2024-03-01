import React, { useEffect, useState } from 'react'
import './totalamount.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons'
import { auth, onAuthStateChanged, db, getDocs, collection } from '../../../firebaseConfig/firebase'
export default function Totalamount() {
    const [totalAmount,setTotalAmount] = useState(0)
    useEffect(() => {
        const fetchData = async () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const uid = user.uid;
                    const querySnapshot = await getDocs(collection(db, uid));
                    let toatl = 0;
                    querySnapshot.forEach((doc) => {
                        const data = doc.data()
                        toatl += parseFloat(data.Amount)
                    });
                    setTotalAmount(toatl)
                } else {
                    // Swal.fire("No such document!");
                }
            });
        }
        fetchData();
    }, [])
  return (
    <div className='totalamount'>
        <div className='total'>
            <p className='icon'><FontAwesomeIcon icon={faFileInvoiceDollar} /></p>
            <span>Total Expenses</span>
            <p className='amount'>{totalAmount.toFixed(2)} PKR</p>
        </div>
    </div>
  )
}
