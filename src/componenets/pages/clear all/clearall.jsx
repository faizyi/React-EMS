import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import loaderImg from '../../../loader/loader.gif'
import { auth, onAuthStateChanged, db, getDocs, collection,deleteDoc,doc } from '../../../firebaseConfig/firebase'
export default function Clearall() {
    const [allIds,setAllIds] = useState([])
    const [userId, setUserId] = useState()
    const [loader,setLoader] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const uid = user.uid;
                    setUserId(uid)
                    const querySnapshot = await getDocs(collection(db, uid));
                    const userIdsArray = [];
                    querySnapshot.forEach((doc) => {
                        userIdsArray.push(doc.id)
                    });
                    setAllIds(userIdsArray)
                } else {
                    setLoader(false)
                }
            });
        }
        fetchData();
    }, [])

    function clearAll(){
        // setLoader(true)
        if(allIds == ''){
            Swal.fire("Data is Clear!");
        }else{
            setLoader(true)
            try {
                allIds.forEach(async(i)=>{
                    await deleteDoc(doc(db,`${userId}/${i}`));
                    window.location.reload()
                })
                setLoader(false)
            } catch (error) {
                Swal.fire("Error removing document!");
                setLoader(false) 
            }
        }
    }
  return (
    <>
    {
        loader ? <div className='loader'><img src={loaderImg} alt="" /></div> :
        <button onClick={clearAll} className='clear-all'>Clear All</button>
    }
    </>
  )
}
