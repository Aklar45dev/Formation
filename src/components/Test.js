import React, { useState } from 'react'
import $ from 'jquery'
import {Link} from 'react-router-dom' 


const Test = (props) => {

    $(() => {
        document.getElementById("validateBtn").addEventListener("click", function(event){
            event.preventDefault()
          })
    })

    const [validated, setValidated] = useState(false)


    let questions = [
        'Qui est resposable de la sécurité sur les chantiers?',
        'Qui est resposable de la sécurité sur les chantiers?',
        'Qui est resposable de la sécurité sur les chantiers?',
        'Qui est resposable de la sécurité sur les chantiers?',
        'Qui est resposable de la sécurité sur les chantiers?',
        'Qui est resposable de la sécurité sur les chantiers?'
        ]

    let choices = [
        ['Le superviseur',`L'opérateur`],
        ['Le superviseur',`L'opérateur`],
        ['Le superviseur',`L'opérateur`],
        ['Le superviseur',`L'opérateur`],
        ['Le superviseur',`L'opérateur`],
        ['Le superviseur',`L'opérateur`],
    ]
    
    let answers = [
        0,1,1,0,1,0
    ]

    const highlightBtn = (id) => {
        $('.test-container .selection').css({'border': '4.5px solid rgba(255, 255, 255, 255)'})
        $(`#${id}`).css({'border': '4.5px solid rgba(255, 70, 0, 1)'})
        $('.test-validate-btn').css({'pointer-events':'visible'})
    }

    const validate = () => {
        if(validated === false){
            $('.check').css({'display': 'block'})
            $('.cross').css({'display': 'block'})
            $('.selection').css({'pointer-events': 'none'})
            $('#validateBtn').html('Continuer')
            setValidated(true)
        }
        else {
            quit()
        }
    }
    
    const quit = () => {
        window.location.href = '../module';
        $('#testWindow').css({'display': 'none'})
    }

    return (
        <div className='test-full-screen' id='testWindow'>
            <div className='test-container'>
                <div className='test-font'>
                    {questions[props.moduleId-1]}
                </div>
                <div className='btn-container'>
                    <div className='answerRow'>
                        <div className={answers[props.moduleId-1] === 0 ? 'check' : 'cross'}>{answers[props.moduleId-1] === 0 ? '✔' : '✖'}</div>
                        <button className='selection'  onClick={() => highlightBtn('option1')} id='option1'>{choices[props.moduleId-1][0]}</button>
                    </div>
                    <div className='answerRow'>
                        <div className={answers[props.moduleId-1] === 1 ? 'check' : 'cross'}>{answers[props.moduleId-1] === 1 ? '✔' : '✖'}</div>
                        <button className='selection' onClick={() => highlightBtn('option2')} id='option2'>{choices[props.moduleId-1][1]}</button>
                    </div>
                    <div className="test-validate-btn">
                        <Link id='validateBtn' to='../module' onClick={() => validate()}>Valider</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Test
