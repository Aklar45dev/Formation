import React, { useEffect } from 'react'
import {Link} from 'react-router-dom' 


const Thumbnail = ({src, module, title, hideThumbnails}) => {

    useEffect(() => {
        
        }, [])

    return (

        <div className='thumbnail' onClick={() => hideThumbnails()}>
            <Link to={`/module/${module}`}>
                <img alt="img" className='imgThumb' src={src} />
            </Link>
            <img alt="img" className='playIcon' src="./images/play.png" />
            <div className='thumbnail-text-container'>
                <p className="moduleText">{`Module ${module}`}</p>
                <p className="nomModuleText">{title}</p>
            </div>
        </div>
    )
}

export default Thumbnail
