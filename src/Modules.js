import React, {useEffect} from 'react'
import Thumbnail from './components/Thumbnail'
import $ from 'jquery'

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

    return (
        <div id='modules-page'>
            <div className='font-home'>Modules</div>
            <div className='modules-page-container'>
                <div className='modules-page-grid'>
                    <Thumbnail src='https://firebasestorage.googleapis.com/v0/b/cfpvd-8e8aa.appspot.com/o/Images%2Fthumbnail1.png?alt=media&token=03acd13c-39c8-40a4-a889-7a5f7b0190d5' module='1' title='Inspection de véhicule' hideThumbnails={showThumbnails} />
                    <Thumbnail src='https://firebasestorage.googleapis.com/v0/b/cfpvd-8e8aa.appspot.com/o/Images%2Fthumbnail2.png?alt=media&token=9535bcc7-1137-4d1c-bfac-81874ef5a319' module='2' title='Conduite de véhicule' hideThumbnails={showThumbnails} />
                    <Thumbnail src='https://firebasestorage.googleapis.com/v0/b/cfpvd-8e8aa.appspot.com/o/Images%2Fthumbnail3.png?alt=media&token=bb1eee53-37d0-4e20-b246-f38b2334e9f9' module='3' title='Signalisation' hideThumbnails={showThumbnails} />
                    <Thumbnail src='https://firebasestorage.googleapis.com/v0/b/cfpvd-8e8aa.appspot.com/o/Images%2Fthumbnail4.png?alt=media&token=eba7620c-c3aa-4b61-af54-ef1c537fad17' module='4' title='Sécurité' hideThumbnails={showThumbnails} />
                    <Thumbnail src='https://firebasestorage.googleapis.com/v0/b/cfpvd-8e8aa.appspot.com/o/Images%2Fthumbnail5.png?alt=media&token=62798c84-076d-45a7-93bc-0ac019eb61f2' module='5' title="Téléopération" hideThumbnails={showThumbnails} />
                    <Thumbnail src='https://firebasestorage.googleapis.com/v0/b/cfpvd-8e8aa.appspot.com/o/Images%2Fthumbnail6.png?alt=media&token=580988f9-1a5d-424e-bea6-31d54e5767f5' module='6' title='Maintenance de base' hideThumbnails={showThumbnails} />
                </div>
            </div>

        </div>
    )
}

export default Modules
