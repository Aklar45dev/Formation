import React from 'react'
import $ from 'jquery'

const About = () => {

    $('html').css({'background-color':'rgb(0, 0, 0)'})

    return (
        <div id='about-page'>
            <div className='about-container'>
                <div className='font-home'>
                    À Propos
                </div>
                <div className='title'>Systèmes souterrains de cheminées à minerai</div>
                <p className='paragraph'>Au cours des dix dernières années, des travailleurs œuvrant dans 
                des lieux de travail miniers ont été blessés dans le cadre d'incidents liés à des systèmes de 
                transfert du minerai. Les dangers les plus importants sont posés par deux systèmes particuliers de 
                transfert du minerai : les cheminées à minerai et les poches doseuses de puits de mines. En Ontario, plus 
                de 18 000 personnes travaillent dans le secteur minier, dans plus de 39 mines souterraines actives.</p>
            </div>

        </div>
    )
}

export default About
