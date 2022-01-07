// to connect to sanity backend from frontend

import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';


export const client = sanityClient({
    projectId : process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset : 'production',
    apiVersion : '2022-01-06',
    useCdn : true,    //for faster access to image
    token : process.env.REACT_APP_SANITY_TOKEN,
})


// from sanity documentation
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source)

