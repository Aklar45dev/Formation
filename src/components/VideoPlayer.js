import React from 'react'
import $ from 'jquery'
import VideoToolBar from './VideoToolBar'

const VideoPlayer = ({src, title}) => {

    let videoPlaying = true

    const HandlePlay = () => {
        mouseMove()
        if(videoPlaying){
            $('#mainVideo').trigger('pause')
            $("#playButtonImage").attr("src", '/images/play.png')
            videoPlaying = false
            return
        }
            $('#mainVideo').trigger('play')
            $("#playButtonImage").attr("src", '/images/pause.png')
            videoPlaying = true
    }

    const HandleJump = (forward) => {
        mouseMove()
        if(forward)
        {
            document.getElementById("mainVideo").currentTime = (document.getElementById("mainVideo").currentTime)+10
            return
        }
        document.getElementById("mainVideo").currentTime = (document.getElementById("mainVideo").currentTime)-10
    }

    const showTest = () => {
        $('#testWindow').css({'display': 'grid'})
    }

    let timer
    let timerRunning = false
    
    const mouseMove = () => {
        if(timerRunning)
        {
            $('#timeStampsContainer').slideDown(500)
            $('#playerControlsContainer').fadeIn(500)
            $('#mainVideo').css({'cursor': 'default'})
        }

        timerRunning = true
        clearInterval(timer)
        timer = setInterval(() => {
            timerRunning = false
            clearInterval(timer)
            $('#timeStampsContainer').slideUp(500)
            $('#playerControlsContainer').fadeOut(500)
            $('#mainVideo').css({'cursor': 'none'})
        }, 3500)
        
    }

    return (
        <div className="video-container" onMouseMove={()=> mouseMove()}>
            <video onEnded={() => showTest()} id="mainVideo" src={src} preload="auto"/>
            <div className='controls-container' id='playerControlsContainer'>
                <button onClick={() => HandleJump(false)}>
                    <img src="/images/previous.png" width="90" height="90" alt="play" />
                </button>
                <button onClick={HandlePlay} id="playButton">
                    <img id="playButtonImage" src="/images/pause.png" width="135" height="135" alt="play" />
                </button>
                <button onClick={() => HandleJump(true)}>
                    <img src="/images/next.png" width="90" height="90" alt="play" />
                </button>
            </div>
            <VideoToolBar title={title}/>
        </div>
    )

}

export default VideoPlayer
