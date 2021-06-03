import React, { useEffect, useState } from 'react'
import VideoPlayer from './components/VideoPlayer'
import Thumbnail from './components/Thumbnail'
import $ from 'jquery'
import firebase, { firestore, db } from './firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useLocation } from 'react-router-dom'
import Question from './components/Question'

const Module = () => {


    const [valid, setValid] = useState(false)

    let thumbnailVisible = false
    let filteredQuizes = []
    let validatedQuizeStates = []
    let good = 0

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
    let videoTitle = ''

    //get questions
    const quizRef = firestore.collection('quiz')
    const queryQuiz = quizRef.orderBy('createdAt', "asc")
    const [quizes] = useCollectionData(queryQuiz, {idField: 'id'})

    const profileRef = firestore.collection('profiles')
    const queryProfile = profileRef.orderBy('createdAt', "asc")
    const [profiles] = useCollectionData(queryProfile, {idField: 'id'})


    if(videos !== undefined){
        videos.forEach(video => {
            if(pathId === video.title)
            {
                videoTitle = video.title
                mainUrl =  video.url
                videoId = video.id
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

    const preValidate = (id, state) => {
        validatedQuizeStates.forEach(quiz => {
            if(Object.entries(quiz)[0][0] === id)
            {
                quiz[id] = state
            }
        })
    }

    const valider = async() => {
        if(valid)
        {
            window.location.href = '/module'
        }
        let isCompleted = true
        validatedQuizeStates.forEach(state => {
            if (Object.values(state)[0] === '') {
                isCompleted = false
                return
            }
        })
        if(isCompleted){
            if(profiles !== undefined){
                firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                        profiles.forEach(profile => {
                            if(profile.email === user.email)
                            {
                                setValid(true)
                                validatedQuizeStates.forEach(state => {
                                    if(Object.values(state)[0] === true){
                                        good++ 
                                    }            
                                })
                                $('#score').css({'display':'block'})
                                $('#score').html('Total: ' + good + '/' + validatedQuizeStates.length)
                                $('#validBtn').html("Continuer")
                                updateTest(profile.id, videoTitle, ((good/validatedQuizeStates.length)*100))
                                
                            }
                        })
                    }
                })
            }
        }
    }

    const updateTest = async(id, field, data) => {
        let dbRef = db.collection('profiles').doc(id);
        await dbRef.update({
            [field]: data
        })
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
                <VideoPlayer title={pathId} src={mainUrl} id={'MainPlayer'} />
            </div>
            <div className="moduleBtn">
                <button id='moduleBtn' onClick={() => showThumbnails()}>▼</button>
            </div>
            <div className='thumbnail-container' id="thumbnails">
                {videos && videos.map(video => <Thumbnail key={video.title} src={video.url} module='1' title={video.title} hideThumbnails={showThumbnails} />)}
            </div>
            <div className='sectionWrapper'>
                <div className='sectionQuestion2'>Questions:</div>
                {filteredQuizes && filteredQuizes.map(quiz => <Question edit='false' preValidate={preValidate} valid={valid} key={quiz.title} data={quiz} res='false' ansId={quiz.ansId} title={quiz.id}/>)}
                <div className='validRow'>
                    <div className='total' id='score'>Total: 1/2</div>
                    <button className='addBtn' id='validBtn' onClick={() => valider()}>Valider</button>
                </div>
            </div>
        </div>
    )
}

export default Module
