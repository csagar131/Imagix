import React from 'react'
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { client } from '../client';

const Login = () => {

    const navigate = useNavigate();   //react-router-dom for navigation to diff url

    const responseGoogle = (response) => {
        console.log(response)

        localStorage.setItem('user', JSON.stringify(response.profileObj))   //store the google response data to localstorage
        const {name, googleId, imageUrl} = response.profileObj

        const doc = {
            _id : googleId,   // ->  object id for particular object
            _type : 'user',  // -> _type used for sanity to know which document we are creating
            username : name,
            image : imageUrl
        }

        client.createIfNotExists(doc)   //create a sanity document(user) at sanity backend if not exist
        .then(() => {
                navigate('/' , {replace : true})   // navigate to localhost if sucess
        })
    }

    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                <video
                    src={shareVideo}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className = 'w-full h-full object-cover'
                />
                <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                    <div className='p-5'>
                        <img src={logo} width="130px" alt="logo"/> 
                    </div>
                    <div>
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                            render={(renderProps) => (
                                <button
                                    type='button'
                                    className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                                    onClick={renderProps.onClick}    // onClick provided by google-login dependency
                                    disabled={renderProps.disabled}  // disabled provided by google-login dependency
                                >
                                <FcGoogle className='mr-4' /> Sign in with google
                                </button>
                            )}
                            onFailure={responseGoogle}
                            onSuccess={responseGoogle}    /// upon successfull authentication response sent from google
                            cookiePolicy='single_host_origin'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
