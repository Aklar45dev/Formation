import React from 'react'

const ProfileRow = (props) => {

    return (
        <div className='profileRow'>
            <div className='profileRowText'>{props.name}</div>
            <div className='profileRowText'>{props.lastname}</div>
            <button className='progressRowBtn'>Détails</button>
            <button className='progressRowBtn'>Contacter</button>
        </div>
    )
}

export default ProfileRow
