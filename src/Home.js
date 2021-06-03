import React from 'react'
import $ from 'jquery'
import {Link} from 'react-router-dom' 


const Home = () => {

    $(() => {
        let video = document.getElementById('homeVid')
        if(video !== null){
            video.currentTime = 5.5
        }
    })
    
    $('html').css({'background-color':'black'})

    return (
        <div>
            <div className='font-home'>CFPVD</div>
            <video id='homeVid' className="homeVideo" src='https://firebasestorage.googleapis.com/v0/b/cfpvd-8e8aa.appspot.com/o/videos%2Fmovie2.mp4?alt=media&token=f94b484b-6183-4a0d-bccb-0433325690a7' preload="auto" autoPlay='auto' muted loop/>
            <div className='home-container'>
                <Link to='/module' className='startBtn'>Commencer</Link>
            </div>
        </div>
    )
}

export default Home
