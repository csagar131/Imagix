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

    // if data is not yet to fetch from backend then show loading spinner
    if(loading){
        return <Spinner message="we are adding new ideas to your feed" />
    }


    return (
        <div>
            {pins && <MasonryLayout pins={pins}/>}
        </div>
    )
}

export default Feed
