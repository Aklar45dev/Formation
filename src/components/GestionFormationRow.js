import React from 'react'

const GestionFormationRow = (props) => {

    return (
        <div>
            <div className='profileRow'>
                <div className='profileRowText'>{props.formationName}</div>
                <div className='profileRowText'>Nbre de questions: {props.nbrQues}</div>
                <button className='progressRowBtn'>Modifier</button>
            </div>
        </div>
    )
}
 
export default GestionFormationRow
