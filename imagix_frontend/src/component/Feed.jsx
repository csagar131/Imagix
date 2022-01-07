import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'



const Feed = () => {

    const [loading, setLoading] = useState(true)

    // if data is not yet to fetch from backend then show loading spinner
    if(loading){
        return <Spinner message="we are adding new ideas to your feed" />
    }


    return (
        <div>
            Feed
        </div>
    )
}

export default Feed
