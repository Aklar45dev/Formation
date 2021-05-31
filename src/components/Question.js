import React, { useState, useEffect } from 'react'
import QuizElement from './QuizElement'

const Question = (props) => {

    let quiz = []
    let title = ''
    let ansId = ''
    let root = ''

    const [edit, setEdit] = useState(false)
    const [text, setText] = useState('Question')
    //console.log
    useEffect(() => {
      })
    
    const delsection = () => {
        props.delSec(root)
    }


    const editTitle = () => {
        if(edit){
            props.editAns(root, 'title', text)
            setEdit(false)
        }
        if(!edit){
            setEdit(true)
            setText(title)
        } 
    }

    const handleChange = e => {
        setText(e.target.value)
    }

    if(props.data !== undefined)
    {
        const quizdata = props.data
        for (const property in quizdata) {
            if(property === 'title')
            {
                title = quizdata[property]
            }
            if(property === 'ansId')
            {
                ansId = quizdata[property]
            }
            if(property === '1')
            {
                quiz.push({1 : quizdata[property]})
            }
            if(property === '2')
            {
                quiz.push({2 : quizdata[property]})
            }
            if(property === '3')
            {
                quiz.push({3 : quizdata[property]})
            }
            if(property === '4')
            {
                quiz.push({4 : quizdata[property]})
            }
            if(property === 'id')
            {
                root = quizdata[property]
            }
        }
    }

    return (
        <div className='question-container'>
            <div className='title-container'>
                <p className='question-font'>{title}</p>
                <button onClick={() => editTitle()} title='Modifier' className='editBtn'><img alt='img' className="icon" src='./images/edit.png' /></button>
                <button title='Supprimer Question' onClick={() => delsection()} className='editBtn'><img alt='img' className="icon" src='./images/trash.png' /></button>
            </div>
            {edit ? <input type='text' className='inputBox' value={text} onChange={handleChange} autoFocus/> : <div/>}
            {quiz && quiz.map(post => <QuizElement res='false' root={root} key={Object.entries(post)[0][0]} updateAnsId={props.updateAnsId} editAns={props.editAns} titre={Object.values(post)} ansId={ansId} SectionId={Object.entries(post)[0][0]}/>)}
        </div>
    )
}

export default Question
