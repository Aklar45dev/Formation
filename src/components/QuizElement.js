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
        props.checkAns(props.ansId === props.SectionId)
    }

    
    return (
        <div>
            <div className='answerContainer'>
                {props.edit === 'true' ? <input onChange={onChange} checked={props.ansId === props.SectionId} className={props.edit === 'false' ? 'radio-on' : 'radio-off'} type="radio" value="Réponse 1" name={props.SectionId} /> : 
                 <input onChange={onChange} className={props.edit === 'false' ? 'radio-on' : 'radio-off'} type="radio" value="Réponse 1" name={props.root} />}
                <span className='answerText'>{props.titre}</span>
                {props.valid === true ? <div className={props.ansId === props.SectionId ? 'circle-green' : 'circle-red'}/> : <div/>}
                {props.edit === 'true' ? <button onClick={() => editToggle()} title='Modifier' className='editBtn'><img alt='img' className="icon" src='./images/edit.png' /></button> : <div/>}
                {props.edit === 'true' ? <button onClick={() => updateAnsId()} title='Modifier' className='delBtn'><img alt='img' className="icon-checkbox" src={props.ansId === props.SectionId ? './images/checked.png' : './images/blank.png'} /></button> : <div/>}
            </div>
            {edit ? <input type='text' className='inputBox' value={text} onChange={handleChange} autoFocus/> : <div/>}
        </div>
    )
}

export default QuizElement