import React, { useEffect, useState } from 'react'
import { firestore ,db } from './firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Post from './components/Post'
import $ from 'jquery'

const Presentation = () => {

    useEffect(() => {
        $('html').css({'overflow-y':'scroll'})
        $('html').css({'background-color':'rgb(24, 24, 24)'})
        $('.mainContainerPosts').fadeOut(0).delay(250).fadeIn(1000)
        return () => {
            $('html').css({'overflow-y':'hidden'})
        }
    }, [])
    
    const postRef = firestore.collection('urls')
    const query = postRef.orderBy('createdAt', "desc")
    const [posts] = useCollectionData(query, {idField: 'id'})
    const [gender, setGender] = useState('Femme')
    let postsVisible = []
    let postsRight = []
    let postsLeft = []

    if(posts != null){

        for (let i = 0; i < posts.length; i++) {
            if(posts[i].visible === 'true' && posts[i].gender === gender ){
                postsVisible.push(posts[i])
            }
        }

        for (let i = 0; i < postsVisible.length; i++) {
            if (i%2 === 0){
                postsRight.push(postsVisible[i])
            }
            if (i%2 !== 0) {
                postsLeft.push(postsVisible[i])
            }
        }
    }

    const genderToggle = () => {
        if(gender === 'Homme'){
            setGender('Femme')
        }
        if(gender === 'Femme') {
            setGender('Homme')
        }
    }

    const handleDel = async(id) => {
        let dbRef = db.collection('urls').doc(id);
        await dbRef.delete()
    }

    const handleEdit = async(id, text) => {
        let dbRef = db.collection('urls').doc(id);
        await dbRef.update({
            title: text
        })
    }

    return (
        <div id='blog-page'>
            <div className='about-container'>
                <div className='importContainer'>
                    <div className='font-home-2'>Coiffures</div>
                    <button onClick={genderToggle} className='genderBtn'>{gender}</button>
                </div>
                <p id='fileName'></p>
                <div className='mainContainerPosts'>
                    <div>
                        <div className='blog-page-grid'>
                            {postsRight && postsRight.map(post => <Post key={post.id} id={post.id} url={post.url} del={handleDel} edit={handleEdit} title={post.title} type={post.type}  controls={false}/>)}
                        </div>
                    </div>
                    <div>
                        <div className='blog-page-grid'>
                            {postsLeft && postsLeft.map(post => <Post key={post.id} id={post.id} url={post.url} del={handleDel} edit={handleEdit} title={post.title} type={post.type}  controls={false}/>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Presentation

                