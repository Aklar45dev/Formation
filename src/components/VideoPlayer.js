import React, {useEffect, useState} from 'react'
import $ from 'jquery'
import VideoToolBar from './VideoToolBar'
import Button from './Button'
import {Link} from 'react-router-dom' 

const VideoPlayer = ({src, title, arbo1, arbo2, setScore, textNote}) => {

    const [newVideoSrc, setNewVideoSrc] = useState()
    const [arbo, setArbo] = useState()
    const [imgSrc, setImgSrc] = useState()
    const [textFinal, setTextFinal] = useState()
    let videoPlaying = true
    let videoEnded = false
    
    useEffect(() => {
        if(newVideoSrc === '' || newVideoSrc === undefined){
            setArbo(arbo1)
            setNewVideoSrc(src)
            mouseMove()
            $('#playerControlsContainer').fadeOut(0)

            if (arbo1[0] !== undefined){
                setImgSrc(arbo1[0].img)
            }
        }
    }, [arbo1])
      
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
        videoEnded = true
        $('#Choix-container').css({'display': 'flex'})
        $('#freeze').fadeOut(0).fadeIn(1000)
        $('#mainVideo').fadeOut(0)
    }

    const SetVideoResponseSRC = (newSrc, textFinal) => {
        showLoading()
        $('#mainVideo').fadeIn(0)
        setNewVideoSrc(newSrc)
        setArbo(arbo2)
        setTextFinal(textFinal)
        if(textFinal === 'Bonne réponse!'){
            setScore(title, 'Réussi')
        }
        if(textFinal === 'Mauvaise réponse!'){
            setScore(title, 'Échoué')
        }
        if(arbo2 !== undefined){
            setImgSrc(arbo2[0].img)
        }
        $('#Choix-container').css({'display': 'none'})
    }

    let timer
    let timerRunning = false
    
    const mouseMove = () => {
        if(!videoEnded){
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
            }, 1500)
        }
    }

    const showLoading = () =>{
        $('#loadingIcon').css({'display': 'block'})
    }

    const hideLoading = () =>{
        $('#loadingIcon').css({'display': 'none'})
        videoEnded = false

    }

    const reloadModule = () => {
        if(textFinal === "Mauvaise réponse!"){
            window.location.reload()
        }
    }

    return (
        <div className="video-container" onMouseMove={()=> mouseMove()}>
            <video onPlaying={() => hideLoading()} onEnded={() => showTest()} id="mainVideo" src={newVideoSrc} preload="auto" autoPlay='autoplay'/>
            <div className="loadingio-spinner-spinner-ofgnqrv5v2" id='loadingIcon'>
                <div className="ldio-q5csxh2c9l">
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                </div>
            </div>
            <div className='controls-container' id='playerControlsContainer'>
                <button onClick={() => HandleJump(false)} className="noselect">
                    <img src="/images/previous.png" width="90" height="90" alt="play" />
                </button>
                <button onClick={HandlePlay} className="noselect" id="playButton">
                    <img id="playButtonImage" src="/images/pause.png" width="135" height="135" alt="play" />
                </button>
                <button onClick={() => HandleJump(true)} className="noselect">
                    <img src="/images/next.png" width="90" height="90" alt="play" />
                </button>
            </div>
            <VideoToolBar title={`Chapitre ${title}`}/>
            <div id='Choix-container'>
                <h2 className='question-title'>{textFinal === undefined ? 'Que faire?' : ''}</h2>
                <p className='endText'>{textFinal === undefined ? '' : textFinal}</p>
                <p className='endTextNote'>{textFinal === undefined ? '' : textNote}</p>
                {textFinal === undefined ? <img alt='' className='imgBG' id='freeze' src={imgSrc} /> : <button className='continueBtn' onClick={() => reloadModule()}><Link to={textFinal === "Mauvaise réponse!" ? `/module/${title}` : '/module'}>{textFinal === "Mauvaise réponse!" ? "Réessayer" : "Continuer"}</Link></button>}
                {textFinal !== undefined ? <div/> : arbo && arbo.map(arbo => <Button text={arbo.text} key={arbo.text} src={arbo.src} fct={SetVideoResponseSRC} textFinal={arbo.textFinal} />)}
            </div>
        </div>
    )

}

export default VideoPlayer
