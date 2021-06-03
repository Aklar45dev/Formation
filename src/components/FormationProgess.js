import React from 'react'
import { Link } from 'react-router-dom'


const FormationProgress = (props) => {
     
    const path = `/module/${props.title}`
    
    return (
        <div className='progressRow'>
            <div className='progressRowTitle'>{props.title}</div>
            <progress className='progressRowBar' max="100" value={props.value}/>
            <div className='progressPercent'>{props.value}%</div> 
            <Link to={path} className='progressRowBtn'>Accéder à la formation</Link>
        </div>
    )
} 

export default FormationProgress
