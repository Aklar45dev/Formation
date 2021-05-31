import React from 'react'
import Question from './Question'

const ProfileRow = (props) => {

    return (
        <div>
            <div className='profileRow'>
                <div className='profileRowText'>{props.formationName}</div>
                {props.state !== 'notStarted' ? 
                <div className={props.state === 'success' ? 'profileRowText green-font' : 'profileRowText red-font'}>{props.state === 'success' ? 'Réussit' : 'Échoué'}</div> :
                <div className='profileRowText'>Pas commencé</div>
                }
                <div className='profileRowText'>Resultat : {props.result}</div>
            </div>
            {props.state === 'failed' ? 
            <div>
                <Question res='true' ansId='2' playerAnswer='2' title='Question 1 - Enonciation de la question'/>
                <Question res='true' ansId='3' playerAnswer='1' title='Question 2 - Enonciation de la question'/>
                <Question res='true' ansId='1' playerAnswer='3' title='Question 3 - Enonciation de la question'/>
                <Question res='true' ansId='3' playerAnswer='2' title='Question 4 - Enonciation de la question'/>
            </div> : 
            <p></p>}
        </div>
    )
}

export default ProfileRow
