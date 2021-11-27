import React from 'react'
import { Link } from 'react-router-dom'


const FormationProgress = (props) => {
     
    const path = `/module/${props.title}`
    
    return (
        <div className='progressRow'>
            <div className='progressRowTitle'>{props.title}</div>
            <Link to={path} className='progressRowBtn'>Accéder à la formation</Link>
            <div className={`progressPercent ${props.value}`}>{props.value === 0 ? 'Pas commencé' : props.value}</div> 
        </div>
    )
} 

export default FormationProgress
