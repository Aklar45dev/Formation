import React from 'react'
import { firestore } from '../firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const SectionFormation = (props) => {

    //get questions
    const quizRef = firestore.collection('quiz')
    const query = quizRef.orderBy('createdAt', "asc")
    const [quizes] = useCollectionData(query, {idField: 'id'})

    let filteredQuizes = []

    if(quizes !== undefined){
        for (const quiz of quizes) {
            if(props.id === quiz.ownerId){
                filteredQuizes.push(quiz)
            }
        }
    }

    return (
        <div className='sectionWrapper'>
            <div className='title-container'>
                <p className='sectionTitle'>Chapitre {props.title}</p>
            </div>
            {props.type === 'video/mp4' ? <video alt='img' src={props.url} autoPlay muted loop/> : <img alt='img' src={props.url}/>}
            
        </div>
    )
}

export default SectionFormation