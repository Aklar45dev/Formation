import React, { useEffect } from 'react'
import { firestore, db } from './firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import $ from 'jquery'
import SectionFormation from './components/SectionFormation'
import { Link } from 'react-router-dom'


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

    //get videos
    const sectionRef = firestore.collection('video')
    const query = sectionRef.orderBy('createdAt', "asc")
    const [sections] = useCollectionData(query, {idField: 'id'})

    

    const editTitleForm = async(id, text) => {
        let dbRef = db.collection('video').doc(id);
        await dbRef.update({
        title: text
        })
    }

    const handleDelForm = async(id) => {
        /*let dbRef = db.collection('video').doc(id);
        await dbRef.delete()*/
    }

    return (
        <div>
            <div className='font-home'>Gestionnaire Contenu</div>
                <div className='center-page'>
                    <div className='SectionContainer'>
                        <div>
                            <div className='blog-page-grid'>
                                <div className='importContainer'>
                                    <Link className='profileBtn' to='/dashboard/profiles'>Profiles</Link>
                                </div>
                                <p id='fileName'></p>
                            {sections && sections.map(section => <SectionFormation edit='true' handleDelForm={handleDelForm} editTitleForm={editTitleForm} type={section.type} title={section.title} key={section.id} id={section.id} url={section.url}/>)}
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default Dashboard