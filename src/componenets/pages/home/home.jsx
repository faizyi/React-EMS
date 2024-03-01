import React from 'react'
import './home.css'
import Navbar from '../../navbar/navbar'
import Addexpense from '../add Expense/addexpense'
import Totalamount from '../totalamount/totalamount'
import ShowExpense from '../showdata/showExpense'

export default function Home() {
    return (
        <div className='home-container'>

            <div className='nav-fix'>
            <div className='home-navbar'>
                <Navbar />
            </div>

            <div className='main-container'>

                <div className='main-content'>
                    <div>
                    <div className='heading'>
                            <h1>Personal Expense Tracker</h1>
                        </div>
                    <div className='main-btn'>
                            <Addexpense />
                    </div>
                    </div>
                    <div>
                        <Totalamount/>
                    </div>

                </div>


            </div>
            </div>

            <div className='show-container'>
            <ShowExpense/>
        </div>

        </div>
    )
}
