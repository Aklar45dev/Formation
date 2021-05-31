import React, { useEffect } from 'react'

const FormationProgress = (props) => {

    useEffect(() => {
    })
     
    return (
        <div className='progressRow'>
            <div className='progressRowTitle'>{props.title}</div>
            <progress className='progressRowBar' max="100" value={props.value}/>
            <div className='progressPercent'>{props.value}%</div> 
            <button className='progressRowBtn'>Accéder à la formation</button>
        </div>
    )
} 

export default FormationProgress
