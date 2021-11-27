import React, { useState, useEffect } from 'react'
import './App.css'
import './spinner.css'
import './burger.css'
import './main.js'
import Home from './Home'
import About from './About'
import Module from './Module'
import Profil from './Profil'
import Modules from './Modules'
import Gestionnaire from './Gestionnaire'
import Presentation from './Presentation'
import Dashboard from './Dashboard'
import ProfilAdmin from './ProfilAdmin'
import Login from './Login'
import Register from './SignIn'
import $ from 'jquery'
import {Route, BrowserRouter as Router, Switch, Link} from 'react-router-dom'
import firebase from './firebase'

const App = () => {

  let menuOpen = false
  const [email, setEmail] = useState('')

  $(() => {  
    $('#menu').slideUp(0)
    $('#menu-full-page').fadeOut(0)
    $('#adressMenu').fadeOut(0)
    $("#burgerIcon").css({'display':'block'})
    if(email === ''){
      $("#burgerIcon").css({'display':'none'})
    }
  })

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setEmail(user.email)
      }
    })
  })

  const toggleMenu = () => {
    if(!menuOpen)
    {
      $('#menu').slideDown(350)
      $('#menu-full-page').css({'pointer-events':'all'})
      $('#menu-full-page').fadeIn(350)
      $('#burgerIcon').addClass("is-active")
      $('#adressMenu').fadeIn(350)
      menuOpen = true
      return
    }
    $('#menu').slideUp(350)
    $('#menu-full-page').css({'pointer-events':'none'})
    $('#menu-full-page').fadeOut(350)
    $('#burgerIcon').removeClass("is-active")
    $('#adressMenu').fadeOut(350)
    menuOpen = false
  }

  const logout = () => {
    firebase.auth().signOut().then(() => {
      setEmail('')
    }).catch((error) => {
      alert(error)
    })
  }

  return (
    <Router>
      <div id='burger-container'>
        <div className='emailText' id='adressMenu'>{email}</div>
        <button id="burgerIcon" onClick={() => toggleMenu()} className="hamburger hamburger--spin" type="button">
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>
      <div id='menu-full-page' onClick={()=>{toggleMenu()}}>
      </div>
      <div className='menu-container' id='menu' >
        <div id='sideBar-container'>
          <div className='item-container'>
            {email === 'admin@gmail.com' ? <div className='item-row' onClick={() => toggleMenu()}>
              <img alt="img" src='./images/admin.png' />
              <Link className="menu-text" to="/dashboard">Administrateur</Link>
            </div> : <div/>}
            <div className='item-row' onClick={() => toggleMenu()}>
              <img alt="img" src='./images/home.png' />
              <Link className="menu-text" to="/">Accueil</Link>
            </div>
            <div className='item-row' onClick={() => toggleMenu()}>
              <img alt="img" src='./images/profil.png' />
              <Link className="menu-text" to={{
                pathname: "/profile",
                email: email
                }}>Profile</Link>
            </div>
            <div className='item-row' onClick={() => toggleMenu()}>
              <img alt="img" src='./images/play.png' />
              <Link className="menu-text" to="/module">Chapitres</Link>
            </div>
            <div className='item-row' onClick={() => toggleMenu()}>
              <img alt="img" src='./images/login.png' />
              <Link to="./login" onClick={() => logout()} className="menu-text">Déconnecter</Link>
            </div>
          </div>
        </div>
      </div>
      {email === '' ? 
      <Switch>
        <Route exact path='/register' component={Register}/>
        <Route path='/' component={Login}/>
      </Switch> : 
      <Switch>
        <Route path='/profile' component={Profil} />
        <Route path='/module/:id' component={Module} />
        <Route path='/module' component={Modules} />
        <Route path='/about' component={About} />
        {email === 'admin@gmail.com' ?  <Route path='/dashboard/profiles' component={ProfilAdmin} /> : <Route path='/' component={Home} />}
        {email === 'admin@gmail.com' ?  <Route path='/dashboard' component={Dashboard} /> : <Route path='/' component={Home} />}
        <Route path='/gestionnaire' component={Gestionnaire} />
        <Route path='/presentation' component={Presentation} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/' component={Home} />
      </Switch>
      }


      
    </Router>
  )
}

export default App