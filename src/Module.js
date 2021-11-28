import React, { useEffect, useState } from 'react'
import VideoPlayer from './components/VideoPlayer'
import Thumbnail from './components/Thumbnail'
import $ from 'jquery'
import { firestore, db } from './firebase'
import firebase from './firebase'
import { useLocation } from 'react-router-dom'
import { useCollectionData } from 'react-firebase-hooks/firestore'


const Module = () => {

    let thumbnailVisible = false
    let filteredQuizes = []
    let validatedQuizeStates = []

    const [profile, setProfile] = useState({})

    $('html').css({'background-color':'rgb(0, 0, 0)'})
    $('html').css({'overflow-y':'scroll'})

    useEffect(() => {
        $('#thumbnails').slideUp(0)
        firebase.auth().onAuthStateChanged(user => {
            db.collection("profiles").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  if(user.email === doc.data().email){
                    setProfile(doc.data())
                  }
                });
            });
          })
        
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

    //get profiles
    const profileRef = firestore.collection('profiles')
    const queryProfile = profileRef.orderBy('createdAt', "asc")
    const [profiles] = useCollectionData(queryProfile, {idField: 'id'})

    const SetScore = (name, state) => {
        if(profiles !== undefined){
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    profiles.forEach(profile => {
                        if(profile.email === user.email)
                        {
                            PushScore(name, profile.id, state)
                        }
                    })
                }
            })
        }
    }


    const PushScore = async(name, id, state) => {
        let dbRef2 = db.collection('profiles').doc(id);
        let chapitres = profile.chapitres
        chapitres[name-1] = state
        dbRef2.update({
            'chapitres':chapitres
        })
    }

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
                <VideoPlayer setScore={SetScore} title={pathId} src={mainUrl} arbo1={arbo1} arbo2={arbo2} id={'MainPlayer'} />
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