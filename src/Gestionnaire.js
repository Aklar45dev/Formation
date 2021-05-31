import React, { useState, useEffect } from 'react'
import { storage, firestore ,db } from './firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Post from './components/Post'
import $ from 'jquery'

const Gestionnaire = () => {

    useEffect(() => {
        $('html').css({'overflow-y':'scroll'})
        $('html').css({'background-color':'rgb(24, 24, 24)'})
        $('.mainContainerPosts').fadeOut(0).delay(250).fadeIn(1000)
        return () => {
            $('html').css({'overflow-y':'hidden'})
        }
    }, [])

    const [image, setImage] = useState(null)
    const [contentType, setContentType] = useState('')
    const [gender, setGender] = useState('Femme')
    const [progress, setProgress] = useState(0)
    const postRef = firestore.collection('urls')
    const query = postRef.orderBy('createdAt', "desc")
    const [posts] = useCollectionData(query, {idField: 'id'})

    const handleChange = e => { 
        if (e.target.files[0]){
            setImage(e.target.files[0])
            $('#fileName').html(e.target.files[0].name);
            setContentType(e.target.files[0].type)
        }
    }

    const sendPost = async(url, title, type) => {
        await postRef.add({
            createdAt: Date.now(),
            url: url,
            type: type,
            title: title,
            visible: 'true',
            gender: gender
        })
    }

    const handleDel = async(id) => {
        let dbRef = db.collection('urls').doc(id);
        await dbRef.delete()
    }

    const handleVisible = async(id, visible) => {
        let dbRef = db.collection('urls').doc(id);
        await dbRef.update({
            visible: visible
        })
    }

    let postsFiltered = []
    let postsRight = []
    let postsLeft = []

    if(posts != null){

        for (let i = 0; i < posts.length; i++) {
            if(posts[i].gender === gender){
                postsFiltered.push(posts[i])
            }
        }

        for (let i = 0; i < postsFiltered.length; i++) {
            if (i%2 === 0){
                postsRight.push(postsFiltered[i])
            }
            if (i%2 !== 0) {
                postsLeft.push(postsFiltered[i])
            }
        }
    }

    const handleEdit = async(id, text) => {
        let dbRef = db.collection('quiz').doc(id);
        await dbRef.update({
            title: text
        })
    }

    const genderToggle = () => {
        if(gender === 'Homme'){
            setGender('Femme')
        }
        if(gender === 'Femme') {
            setGender('Homme')
        }
    }

    const handleUpload = () => {
        if(image != null){
            $('#progBar').css({'display':'block'})
            const uploadTask = storage.ref(`uploads/${image.name}`).put(image)
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                    setProgress(progress)
                },
                error => {
                    console.log(error)
                },
                () => {
                    storage
                        .ref('uploads')
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            sendPost(url, image.name, contentType)
                            $('#progBar').css({'display':'none'})
                            $('#fileName').html('')
                            setImage(null)
                            setContentType('')
                        })
                }
            )
        }
    }

    return (
        <div id='blog-page'>
            <div className='about-container'>
                <div className='font-home-2'>
                    Gestionnaire de contenu
                </div>
                <div className='importContainer'>
                    <input type='file' id="upload" onChange={handleChange} hidden/>
                    <label className='selectBtn' htmlFor="upload">Selectionner</label>
                    <button className='uploadBtn' onClick={handleUpload}>Importer</button>
                    <button onClick={genderToggle} className='genderBtn'>{gender}</button>

                </div>
                <p id='fileName'></p>
                <progress id='progBar' value={progress} max="100" />
                <div className='mainContainerPosts'>
                    <div>
                        <div className='blog-page-grid'>
                            {postsRight && postsRight.map(post => <Post key={post.id} id={post.id} url={post.url} del={handleDel} edit={handleEdit} visibleToggle={handleVisible} visibility={post.visible} title={post.title} type={post.type}  controls={true}/>)}
                        </div>
                    </div>
                    <div>
                        <div className='blog-page-grid'>
                            {postsLeft && postsLeft.map(post => <Post key={post.id} id={post.id} url={post.url} del={handleDel} edit={handleEdit} visibleToggle={handleVisible} visibility={post.visible} title={post.title} type={post.type}  controls={true}/>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gestionnaire

                