import React, { useEffect } from 'react'
import VideoPlayer from './components/VideoPlayer'
import Thumbnail from './components/Thumbnail'
import $ from 'jquery'
import { firestore } from './firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useLocation } from 'react-router-dom'

const Module = () => {

    let thumbnailVisible = false
    let filteredQuizes = []
    let validatedQuizeStates = []

    $('html').css({'background-color':'rgb(0, 0, 0)'})
    $('html').css({'overflow-y':'scroll'})

    useEffect(() => {
        $('#thumbnails').slideUp(0)
      }, [])

    //get videos
    const videoRef = firestore.collection('video')
    const query = videoRef.orderBy('createdAt', "asc")
    const [videos] = useCollectionData(query, {idField: 'id'})
    const location = useLocation()
    let pathId = location.pathname.replace('/module/','')
    let mainUrl = ''
    let videoId = ''
    let arbo1 = ''
    let arbo2 = ''

    //get questions
    const quizRef = firestore.collection('quiz')
    const queryQuiz = quizRef.orderBy('createdAt', "asc")
    const [quizes] = useCollectionData(queryQuiz, {idField: 'id'})

    if(videos !== undefined){
        videos.forEach(video => {
            if(pathId === video.title)
            {
                mainUrl =  video.url
                videoId = video.id
                arbo1 = video.arbo1
                arbo2 = video.arbo2
            } 
        })
        if(quizes !== undefined)
        {
            for (const quiz of quizes) 
            {
                if(videoId === quiz.ownerId)
                {
                    filteredQuizes.push(quiz)
                    validatedQuizeStates.push({[quiz.id]:''})
                }
            }
        }
    }

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
                <VideoPlayer title={pathId} src={mainUrl} arbo1={arbo1} arbo2={arbo2} id={'MainPlayer'} />
            </div>
            <div className="moduleBtn">
                <button id='moduleBtn' onClick={() => showThumbnails()}>▼</button>
            </div>
            <div className='thumbnail-container' id="thumbnails">
                {videos && videos.map(video => <Thumbnail key={video.title} src={video.url} module='1' title={video.title} hideThumbnails={showThumbnails} />)}
            </div>
            
        </div>
    )
}

export default Module