import React, {useEffect} from 'react'
import Thumbnail from './components/Thumbnail'
import $ from 'jquery'
import { firestore } from './firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const Modules = () => {

    const showThumbnails = () => {}

    useEffect(() => {
        $('html').css({'overflow-y':'scroll'})
        $('html').css({'background-color':'rgb(24, 24, 24)'})
        $('.modules-page-container').fadeOut(0).delay(250).fadeIn(1000)
        return () => {
            $('html').css({'overflow-y':'hidden'})
        }
    }, [])

    //get videos
    const videoRef = firestore.collection('video')
    const query = videoRef.orderBy('createdAt', "asc")
    const [videos] = useCollectionData(query, {idField: 'id'})
        
    return (
        <div id='modules-page'>
            <div className='font-home'>Formations</div>
            <div className='modules-page-container'>
                <div className='modules-page-grid'>
                    {videos && videos.map(video => <Thumbnail key={video.title} src={video.url} module='1' title={video.title} hideThumbnails={showThumbnails} />)}
                </div>
            </div>
        </div>
    )
}

export default Modules
