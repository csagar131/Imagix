import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'



const Feed = () => {

    const [loading, setLoading] = useState(false)
    const [pins, setPins] = useState([])  // all the pins data
    const { categoryId } = useParams() // a react hook who provide the current url value
    

    // this useEffect will called when first time app loads and also every time when category changes
    useEffect(() => {
        setLoading(true)
        
        // fetch the data from sanity backend for specific category
        if(categoryId){
            const query = searchQuery(categoryId)    //sanity query
            client.fetch(query)
            .then((data)=>{
                setPins(data)
                setLoading(false)
            })
        }
        else{
            client.fetch(feedQuery) //for the feed irrespective of category
            .then((data)=>{
                setPins(data)
                setLoading(false)
            })
        }
    }, [categoryId])   // here useEffect act as componentDidMount and componentDidUpdate

    // if data is not yet to fetch from backend then show loading 
    // putting it here and not insise return because state state changes is asynchronous so previously loaded data may show whlile loading
    // from google "setState() is asynchronous. React does not guarantee that the state changes are applied immediately. setState() does not always immediately update the component."
    
    if(loading){
        return <Spinner message="we are adding new ideas to your feed" />
    }


    return (
        <div>
            <div>
                {pins && <MasonryLayout pins={pins}/>}
            </div>
        </div>
    )
}

export default Feed
