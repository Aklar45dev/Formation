import React, { useState } from 'react'
import Question from './Question'
import { firestore, db} from '../firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const SectionFormation = (props) => {

    const [edit, setEdit] = useState(false)
    const [text, setText] = useState(props.title)

    //get questions
    const quizRef = firestore.collection('quiz')
    const query = quizRef.orderBy('createdAt', "asc")
    const [quizes] = useCollectionData(query, {idField: 'id'})
    const postRef = firestore.collection('quiz')

    const quizObject = {
        a1: 'Choix 1',
        a2: 'Choix 2',
        a3: 'Choix 3', 
        a4: 'Choix 4',
        title: 'Question',
        ansId: '0',
        ownerId: '' 
    }

    let filteredQuizes = []

    if(quizes !== undefined){
        for (const quiz of quizes) {
            if(props.id === quiz.ownerId){
                filteredQuizes.push(quiz)
            }
        }
    }

    const editTitleForm = () => {
        if(edit){
            props.editTitleForm(props.id, text)
            setEdit(false)
        }
        if(!edit){
            setEdit(true)
        } 
    }

    const handleChange = e => {
        setText(e.target.value)
    }

    const NewQuestion = async(data) => {
        await postRef.add({
            createdAt: Date.now(),
            1: data.a1,
            2: data.a2,
            3: data.a3,
            4: data.a4,
            title: data.title,
            ansId: data.ansId,
            ownerId: props.id
        })
    }

    const updateAnsId = async(id, ansId) => {
        let dbRef = db.collection('quiz').doc(id);
        await dbRef.update({
            ansId: ansId
        })
    }

    const editAns = async(id, field, text) => {
        let dbRef = db.collection('quiz').doc(id);
        await dbRef.update({
        [field]: text
        })
    }

    const handleDel = async(id) => {
        let dbRef = db.collection('quiz').doc(id);
        //await dbRef.delete()
    }

    return (
        <div className='sectionWrapper'>
            <div className='title-container'>
                <p className='sectionTitle'>{props.title}</p>
                <button onClick={() => editTitleForm()} title='Modifier' className='editBtn'><img alt='img' className="icon" src='./images/edit.png' /></button>
                <button onClick={() => props.handleDelForm(props.id)} title='Supprimer Formation' className='editBtn'><img alt='img' className="icon" src='./images/trash.png' /></button>
            </div>
            {edit ? <input type='text' className='inputBox' value={text} onChange={handleChange} autoFocus/> : <div/>}
            {props.type === 'video/mp4' ? <video alt='img' src={props.url} autoPlay muted loop/> : <img alt='img' src={props.url}/>}
            <div className='sectionQuestion'>Questions:</div>
            {filteredQuizes && filteredQuizes.map(quiz => <Question updateAnsId={updateAnsId} editAns={editAns} delSec={handleDel} key={quiz.title} data={quiz} res='false' ansId={quiz.ansId} title={quiz.id}/>)}
            <button className='addBtn' onClick={() => NewQuestion(quizObject)}>Nouvelle Question</button>
        </div>
    )
}

export default SectionFormation
