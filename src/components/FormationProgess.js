import React from 'react'
import { Link } from 'react-router-dom'


const FormationProgress = (props) => {
     
    const path = `/module/${props.title}`
    let classFont = ''
    if(props.statue[props.title-1] === 'Échoué'){
        classFont = 'red-font'
    }
    if(props.statue[props.title-1] === 'Réussi'){
        classFont = 'green-font'
    }
    
    return (
        <div className='progressRow'>
            <div className='progressRowTitle'>Chapitre {props.title}</div>
            <Link to={path} className='progressRowBtn'>Accéder</Link>
            <div className={`progressPercent ${classFont}`}>{props.statue[props.title-1] === '' ? 'Pas fait' : props.statue[props.title-1]}</div> 
        </div>
    )
} 

export default FormationProgress
