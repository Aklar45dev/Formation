import React, { useEffect } from 'react'
import {Link} from 'react-router-dom' 


const Thumbnail = ({src, title, hideThumbnails}) => {

    useEffect(() => {
        
        }, [])

    return (
        <div>
            <div className="iconThumbnail" id={`chapitre${title}`} />
            <div className='thumbnail' onClick={() => hideThumbnails()}>
                <Link to={`/module/${title}`}>
                    <video autoPlay alt="img" className='imgThumb' src={src} muted loop/>
                </Link>
                <img alt="img" className='playIcon' src="./images/play.png" />
                <div className='thumbnail-text-container'>
                    <p className="nomModuleText">{`Chapitre ${title}`}</p>
                </div>
            </div>
        </div>

    )
}

export default Thumbnail
