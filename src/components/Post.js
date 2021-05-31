import React, { useState, useEffect } from 'react'

const Post = (props) => {

    useEffect(() => {
    })
    
    const [edit, setEdit] = useState(false)
    const [text, setText] = useState(props.title)
    const [visible, setVisible] = useState(props.visibility)
    
    const editToggle = () => {
        if(edit){
            props.edit(props.id, text)
            setEdit(false)
        }
        if(!edit){
            setEdit(true)
        } 
    }
    
    const checkboxToggle = () => {
        if(visible === 'true'){
            props.visibleToggle(props.id, 'false')
            setVisible('false')
        }
        if(visible === 'false'){
            props.visibleToggle(props.id, 'true')
            setVisible('true')
        } 
    }

    const handleChange = e => {
        setText(e.target.value)
    }

    return (
        <div className='post'>
            <div className='contentBtn'>
                {props.controls ? <button title='Supprimer' onClick={() => props.del(props.id)} className='delBtn'><img alt='img' className="icon" src='./images/trash.png' /></button> : <p/>}
                {props.controls ? <button title='Visibilité' onClick={checkboxToggle} className='delBtn'><img alt='img' className="icon" src={visible === 'true' ? './images/checked.png' : './images/blank.png'} /></button> : <p/>}
            </div>
            <div className='post-container'>
                {props.type === 'video/mp4' ? <video alt='img' src={props.url} autoPlay muted loop/> : <img alt='img' src={props.url}/>}
                <div className='postCaption'>
                    <div className='titleContainer'>
                        {props.title}
                        {props.controls ? <button title='Modifier' onClick={editToggle} className='editBtn'><img alt='img' className="icon" src='./images/edit.png' /></button> : <p/>}
                    </div>
                        {edit ? <input type='text' className='inputBox' value={text} onChange={handleChange} autoFocus/> : <div/>}
                </div>
            </div>
        </div>
    )
}

export default Post
