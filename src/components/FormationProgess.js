import React from 'react'
import { Link } from 'react-router-dom'


const FormationProgress = (props) => {
     
    const path = `/module/${props.title}`
    
    return (
        <div className='progressRow'>
            <div className='progressRowTitle'>Chapitre {props.title}</div>
            <Link to={path} className='progressRowBtn'>Accéder à la formation</Link>
            <div className={`progressPercent ${props.statue}`}>{props.statue[props.title-1] === '' ? 'Pas commencé' : props.statue[props.title-1]}</div> 
        </div>
    )
} 

export default FormationProgress
