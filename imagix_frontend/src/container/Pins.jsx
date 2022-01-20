import React, {useState} from 'react'
import { Route, Routes } from 'react-router-dom'
import {Navbar, Feed,  CreatePin, Search } from '../component'


//rigth side page main component inside home component
const Pins = ({ user }) => {

    const [searchTerm, setSearchTerm] = useState('')

    console.log(searchTerm + " from pin.jsx")

    return (
        <div className='px-2 md:px-5'>
            <div className='bg-white'>
                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} />
            </div>

            {/* child of pin component uper navbar sticks as it is and below ones changes according to routes */}
            <div className='h-full'>
                <Routes>
                  <Route path="/"  element={<Feed/>} />
                  <Route path="/category/:categoryId"  element={<Feed/>} />
                  {/* <Route path="/pin-detail/:pinId"  element={<PinDetail user={user}/>} /> */}
                  <Route path="/create-pin"  element={<CreatePin user={user}/>} />
                  <Route path="/search"  element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>} />

                </Routes>
            </div>
        </div>
    )
}

export default Pins
