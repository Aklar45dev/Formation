import React, {useEffect, useState} from 'react'
import Thumbnail from './components/Thumbnail'
import $ from 'jquery'
import { firestore, db } from './firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebase from './firebase'

const Modules = () => {

    const showThumbnails = () => {}

    const [profile, setProfile] = useState(null)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            db.collection("profiles").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if(user !== null){
                        if(user.email === doc.data().email){
                          setProfile(doc.data())
                        }
                    }
                });
            });
          })
        $('html').css({'overflow-y':'scroll'})
        $('html').css({'background-color':'rgb(24, 24, 24)'})
        $('.modules-page-container').fadeOut(0).delay(250).fadeIn(1000)

        return () => {
            $('html').css({'overflow-y':'hidden'})
        }
    }, [])

    //get videos
    const videoRef = firestore.collection('video')
    const query = videoRef.orderBy('createdAt', "asc")
    const [videos] = useCollectionData(query, {idField: 'id'})

    if(profile !== null){
        let index = 0
        let arr = profile.chapitres
        arr.forEach(element => {
            index++
            if(element === 'Échoué'){
                $(`#chapitre${index}`).addClass( "Échoué" );
            }
            if(element === 'Réussi'){
                $(`#chapitre${index}`).addClass( "Réussi" );
            }
        });

    }


    return (
        <div id='modules-page'>
            <div className='font-home'>Chapitres</div>
            <div className='modules-page-container'>
                <div className='modules-page-grid'>
                    {videos && videos.map(video => <Thumbnail key={video.title} src={video.url} title={video.title} hideThumbnails={showThumbnails} />)}
                </div>
            </div>
        </div>
    )
}

export default Modules
