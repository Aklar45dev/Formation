import React, { useState, useEffect } from 'react'
import { storage, firestore, db } from './firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import $ from 'jquery'
import FormationProgress from './components/FormationProgess'
import Question from './components/Question'
import ProfileRow from './components/ProfileRow'
import ProfileDetails from './components/ProfileDetails'
import ProfileFormationRow from './components/ProfileFormationRow'
import GestionFormationRow from './components/GestionFormationRow'
import SectionFormation from './components/SectionFormation'

const Dashboard = () => {  

    $('html').css({'background-color':'rgb(0, 0, 0)'})
    $('html').css({'overflow-y':'scroll'})

    useEffect(() => {
        $('html').css({'overflow-y':'scroll'})
        $('.mainContainerPosts').fadeOut(0).delay(250).fadeIn(1000)
        return () => {
            $('html').css({'overflow-y':'hidden'})
        }
    }, []) 

    const [image, setImage] = useState(null)
    const [contentType, setContentType] = useState('')
    const [progress, setProgress] = useState(0)

    //get videos
    const sectionRef = firestore.collection('video')
    const query = sectionRef.orderBy('createdAt', "desc")
    const [sections] = useCollectionData(query, {idField: 'id'})

    const handleChange = e => {
        if (e.target.files[0]){
            setImage(e.target.files[0])
            $('#fileName').html(e.target.files[0].name);
            setContentType(e.target.files[0].type)
        }
    }

    const sendPost = async(url, title, type) => {
        await sectionRef.add({
            createdAt: Date.now(),
            url: url,
            type: type,
            title: title,
        })
    }

    const editTitleForm = async(id, text) => {
        let dbRef = db.collection('video').doc(id);
        await dbRef.update({
        title: text
        })
    }

    const handleDelForm = async(id) => {
        let dbRef = db.collection('video').doc(id);
        await dbRef.delete()
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
        <div id='dashboard'>
            <div className='center-page'>
                <div className='font-home-2'>
                    Administrateur Vidéos
                </div>
                <div className='importContainer'>
                    <input type='file' id="upload" onChange={handleChange} hidden/>
                    <label className='selectBtn' htmlFor="upload">Contenu Vidéo</label>
                    <button className='uploadBtn' onClick={handleUpload}>Importer</button>
                </div>
                <p id='fileName'></p>
                <progress id='progBar' value={progress} max="100" />
                <div className='SectionContainer'>
                    <div>
                        <div className='blog-page-grid'>
                            {sections && sections.map(section => <SectionFormation handleDelForm={handleDelForm} editTitleForm={editTitleForm} type={section.type} title={section.title} key={section.id} id={section.id} url={section.url}/>)}
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default Dashboard

/*<div className='RowTitle'>Formations</div>
            <div className='dash-container'>
                <FormationProgress value='80' title='Formation 1 - Titre de la formation'/>
                <FormationProgress value='30' title='Formation 2 - Titre de la formation'/>
                <FormationProgress value='50' title='Formation 3 - Titre de la formation'/>
            </div>
            <div className='RowTitle'>Questionnaire</div>
            <div>
                <Question res='false' title='Question 1 - Enonciation de la question'/>
                <Question res='false' title='Question 2 - Enonciation de la question'/>
            </div>
            <div className='centerContent'>
                <button className='validateQuestionBtn'>Validez vos réponses</button>
            </div>
            <div className='RowTitle'>Résultats de la formation</div>
            <div>
                <Question res='true' ansId='2' title='Question 1 - Enonciation de la question'/>
                <Question res='true' ansId='3' title='Question 2 - Enonciation de la question'/>
                <div className='total'>Total: 1/2</div>
            </div>
            <div className='RowTitle'>Gestion des profils</div>
            <ProfileRow name='Nom' lastname='Prénom' email='email@gmail.com'/>
            <ProfileRow name='Nom' lastname='Prénom' email='email@gmail.com'/>
            <ProfileRow name='Nom' lastname='Prénom' email='email@gmail.com'/>
            <div className='RowTitle'>Détails résultat formation</div>
            <ProfileDetails name='Nom' lastname='Prénom' post='Poste' adress='Adresse' email='email@gmail.com' formation='En cours'/>
            <ProfileFormationRow formationName='Formation 1' state='success' result='3/4'/>
            <ProfileFormationRow formationName='Formation 2' state='failed' result='2/4'/>
            <ProfileFormationRow formationName='Formation 3' state='notStarted' result='0/4'/>
            <ProfileFormationRow formationName='Formation 4' state='success' result='4/4'/>
            <ProfileFormationRow formationName='Formation 5' state='notStarted' result='0/4'/>
            <div className='wrapper'>
                <div className='RowTitle'>Contacter</div>
                <h2>Message:</h2>
                <textarea className='textArea'/>
                <button className='contactBtn'>Envoyer</button>
            </div>
            <div className='RowTitle'>Gestion des formations</div>
            <GestionFormationRow formationName='Formation1' nbrQues='4'/>
            <GestionFormationRow formationName='Formation2' nbrQues='3'/>
            <GestionFormationRow formationName='Formation3' nbrQues='5'/>
            <GestionFormationRow formationName='Formation4' nbrQues='6'/>*/