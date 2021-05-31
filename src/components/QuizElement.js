import React, { useState, useEffect } from 'react'

const QuizElement = (props) => {

    const [edit, setEdit] = useState(false)
    const [text, setText] = useState(props.titre)

    let textInit = props.titre[0]

    useEffect(() => {
    })

    const editToggle = () => {
        if(edit){
            props.editAns(props.root, props.SectionId, text)
            setEdit(false)
        }
        if(!edit){
            setEdit(true)
            setText(textInit)
        } 
    }
    
    const updateAnsId = () => {
        props.updateAnsId(props.root, props.SectionId)
    }

    const handleChange = e => {
        setText(e.target.value)
    }

    const onChange = e => {
    }

    return (
        <div>
        <div className='answerContainer'>
            <input onChange={onChange} checked={props.ansId === props.SectionId} className={props.res === 'false' ? 'radio-on' : 'radio-off'} 
            type="radio" value="Réponse 1" name={props.SectionId} /><span className='answerText'>{props.titre}</span>
            {props.res === 'true' ? <div className={props.ansId === '1' ? 'circle-green' : 'circle-red'}/> : <p/>}
            <button onClick={() => editToggle()} title='Modifier' className='editBtn'><img alt='img' className="icon" src='./images/edit.png' /></button>
            <button onClick={() => updateAnsId()} title='Modifier' className='delBtn'><img alt='img' className="icon" src={props.ansId === props.SectionId ? './images/checked.png' : './images/blank.png'} /></button>
        </div>
            {edit ? <input type='text' className='inputBox' value={text} onChange={handleChange} autoFocus/> : <div/>}
        </div>
    )
}

export default QuizElement