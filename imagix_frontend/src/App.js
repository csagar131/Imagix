import React, {useEffect} from 'react'
import { BrowserRouter as Router,Routes, Route, useNavigate } from 'react-router-dom';
import Home from './container/Home';
import Login from './component/Login';


const App = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            navigate('/login')
        }
    }, [])  

    return (
        
            <Routes>
                <Route path='login' element={<Login/>}/>
                <Route exact path='/*' element={<Home/>}/>
            </Routes>
       
    )
}

export default App
    