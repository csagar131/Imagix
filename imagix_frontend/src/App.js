import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from './container/Home';
import Login from './component/Login';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='login' element={<Login/>}/>
                <Route exact path='/*' element={<Home/>}/>
            </Routes>
        </Router>
    )
}

export default App
    