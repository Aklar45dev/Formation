import React, { useEffect } from 'react' 
import {useParams} from 'react-router-dom' 

const VideoToolBar = (props) => {
    useEffect(() => {
        const interval = setInterval(() => {
            let mins = Math.floor((document.getElementById("mainVideo").duration)/60)
            let secs = Math.floor((document.getElementById("mainVideo").duration)-(60*mins))
            let currentMins = Math.floor((document.getElementById("mainVideo").currentTime)/60)
            let currentSecs = Math.floor((document.getElementById("mainVideo").currentTime)-(60*currentMins))
            if(currentSecs < 10)
            {
                currentSecs = `0${currentSecs}`
            }
            if(secs < 10)
            {
                secs = `0${secs}`
            }
            document.getElementById("totalDuration").innerHTML = `${mins}:${secs}`
            document.getElementById("currentPlayTime").innerHTML = `${currentMins}:${currentSecs}`
            let timeRatio = ((document.getElementById("mainVideo").currentTime)/(document.getElementById("mainVideo").duration))*100
            document.getElementById("inside").style.width = `${timeRatio}%`
            
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])
    
    let { id } = useParams()
    var titles = ['Inspection de véhicule', 'Conduite de véhicule',
    'Signalisation', 'Sécurité', "Téléopération" ,'Maintenance de base']

    return (
        <div className='main-control-container' id='timeStampsContainer'>
            <div className='controls-bar'>
                <div id='currentPlayTime' className='timeStampText'>
                    0:00
                </div>
                <div id="outside">
                    <div id="inside"></div>
                </div>
                <div id='totalDuration' className='timeStampText'>
                    0:00
                </div>
            </div>
            <div className="lowerMenu">
                <div className="infoModule">
                    <div className="nomModuleText">{props.title}</div>
                </div>
            </div>
        </div>
    )
}

export default VideoToolBar
