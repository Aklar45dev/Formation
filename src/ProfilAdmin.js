import React from 'react'
import $ from 'jquery'
import { firestore } from './firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import ProfileDetails from './components/ProfileDetails'

const ProfilAdmin = () => {

    $('html').css({'background-color':'rgb(0, 0, 0)'})
    $('html').css({'overflow-y':'scroll'})
    
    //get profiles
    const profileRef = firestore.collection('profiles')
    const queryProfile = profileRef.orderBy('createdAt', "asc")
    const [profiles] = useCollectionData(queryProfile, {idField: 'id'})

    const videoRef = firestore.collection('video')
    const queryVideo = videoRef.orderBy('createdAt', "asc")
    const [videos] = useCollectionData(queryVideo, {idField: 'id'})

    return (
        <div>
            <div className='font-home'>Gestionnaire Profiles</div>
            {profiles && profiles.map(pro => <ProfileDetails key={pro.lastname} videos={videos} profile={pro} name={pro.lastname} lastname={pro.name} email={pro.email} formation={pro.formation}/>)}
        </div>
    )
}

export default ProfilAdmin
