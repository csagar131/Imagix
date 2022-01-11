import React, { useState } from 'react'
import { urlFor } from '../client'

const Pin = ({pin}) => {

    const { postedBy, image, _id, destination } = pin;
    
    return (
        <div>
            {image && <img className="rounded-lg w-full " src={(urlFor(image).width(250).url())} alt="user-post" />}
        </div>
    )
}

export default Pin
