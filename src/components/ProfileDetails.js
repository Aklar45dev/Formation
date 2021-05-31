import React from 'react'

const ProfileDetails = (props) => {

    return (
        <div className='profileVerti'>
            <button className='contactBtn'>Contacter</button>
            <div className='profileVertiText'>Nom: {props.name}</div>
            <div className='profileVertiText'>Prénom: {props.lastname}</div>
            <div className='profileVertiText'>Poste: {props.post}</div>
            <div className='profileVertiText'>Adresse: {props.adress}</div>
            <div className='profileVertiText'>Email: {props.email}</div>
            <div className='profileVertiText'>Formation: {props.formation}</div>
        </div>
    )
}

export default ProfileDetails
