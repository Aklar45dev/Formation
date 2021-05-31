import React, { useEffect } from 'react'
import VideoPlayer from './components/VideoPlayer'
import Thumbnail from './components/Thumbnail'
import Test from './components/Test'
import $ from 'jquery'
import {useParams} from 'react-router-dom' 


const Module = () => {

    let thumbnailVisible = false
    let { id } = useParams()
    let videos = [
        'https://firebasestorage.googleapis.com/v0/b/cfpvd-8e8aa.appspot.com/o/videos%2Fmovie1.mp4?alt=media&token=7cf53e2a-2923-4bbe-b3a0-4266ffa6cba6',
        'https://firebasestorage.googleapis.com/v0/b/cfpvd-8e8aa.appspot.com/o/videos%2Fmovie2.mp4?alt=media&token=f94b484b-6183-4a0d-bccb-0433325690a7',
        'https://firebasestorage.googleapis.com/v0/b/cfpvd-8e8aa.appspot.com/o/videos%2Fmovie3.mp4?alt=media&token=403f02f7-c833-42d9-91bf-b2c34da15eca',
        'https://firebasestorage.googleapis.com/v0/b/cfpvd-8e8aa.appspot.com/o/videos%2Fmovie4.mp4?alt=media&token=0d39e8ec-2c26-447e-a085-c9cb53f5765e',
        'https://firebasestorage.googleapis.com/v0/b/cfpvd-8e8aa.appspot.com/o/videos%2Fmovie5.mp4?alt=media&token=37cc92ae-8633-45ad-82e9-fcdd168548bd',
        'https://firebasestorage.googleapis.com/v0/b/cfpvd-8e8aa.appspot.com/o/videos%2Fmovie6.mp4?alt=media&token=4d061d2c-6702-45d0-b93b-0f484b14c0dc'
        ]

    $('html').css({'background-color':'rgb(0, 0, 0)'})
    

    useEffect(() => {
        $('#thumbnails').slideUp(0)
      }, [])

    const showThumbnails = () => {
        if(thumbnailVisible)
        {
            $('#thumbnails').css({'display': '-webkit-inline-box'})
            $('#thumbnails').slideUp(250)
            $('#moduleBtn').html("▼")
            thumbnailVisible = false
            return
        }
        $('#thumbnails').css({'display': 'none'})
        $('#thumbnails').slideDown(250)
        $('#moduleBtn').html("▲")
        thumbnailVisible = true
    }

    return (
        <div>
            <div className="main-container">
                <VideoPlayer src={videos[id-1]} id={'MainPlayer'} />
                <Test moduleId={id}/>
            </div>
            <div className="moduleBtn">
                <button id='moduleBtn' onClick={() => showThumbnails()}>▼</button>
            </div>
            <div className='thumbnail-container' id="thumbnails">
                <Thumbnail src='https://firebasestorage.googleapis.com/v0/b/cfpvd-8e8aa.appspot.com/o/Images%2Fthumbnail1.png?alt=media&token=03acd13c-39c8-40a4-a889-7a5f7b0190d5' module='1' title='Inspection de véhicule' hideThumbnails={showThumbnails} />
                <Thumbnail src='https://firebasestorage.googleapis.com/v0/b/cfpvd-8e8aa.appspot.com/o/Images%2Fthumbnail2.png?alt=media&token=9535bcc7-1137-4d1c-bfac-81874ef5a319' module='2' title='Conduite de véhicule' hideThumbnails={showThumbnails} />
                <Thumbnail src='https://firebasestorage.googleapis.com/v0/b/cfpvd-8e8aa.appspot.com/o/Images%2Fthumbnail3.png?alt=media&token=bb1eee53-37d0-4e20-b246-f38b2334e9f9' module='3' title='Signalisation' hideThumbnails={showThumbnails} />
                <Thumbnail src='https://firebasestorage.googleapis.com/v0/b/cfpvd-8e8aa.appspot.com/o/Images%2Fthumbnail4.png?alt=media&token=eba7620c-c3aa-4b61-af54-ef1c537fad17' module='4' title='Sécurité' hideThumbnails={showThumbnails} />
                <Thumbnail src='https://firebasestorage.googleapis.com/v0/b/cfpvd-8e8aa.appspot.com/o/Images%2Fthumbnail5.png?alt=media&token=62798c84-076d-45a7-93bc-0ac019eb61f2' module='5' title="Téléopération" hideThumbnails={showThumbnails} />
                <Thumbnail src='https://firebasestorage.googleapis.com/v0/b/cfpvd-8e8aa.appspot.com/o/Images%2Fthumbnail6.png?alt=media&token=580988f9-1a5d-424e-bea6-31d54e5767f5' module='6' title='Maintenance de base' hideThumbnails={showThumbnails} />
            </div>
        </div>
    )
}

export default Module
