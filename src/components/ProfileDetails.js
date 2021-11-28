import React from 'react'
import FormationProgress from './FormationProgess'

const ProfileDetails = (props) => {

    return (
        <div className='profile-element'>
            <div className='profileVerti'>
                <div className='profileVertiText'>Nom: {props.name}</div>
                <div className='profileVertiText'>Prénom: {props.lastname}</div>
                <div className='profileVertiText'>Email: {props.email}</div>
            </div>
            <div className='dash-container'>
                {props.videos && props.videos.map(video => <FormationProgress key={video.title} statue={props.profile.chapitres} title={video.title}/>)}
            </div>
        </div>
    ) 
}

export default ProfileDetails
