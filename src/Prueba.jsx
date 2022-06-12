import React from 'react';
import { app } from './firebase/firebaseconfig';

const prueba = () => {
  return (

    <>
        <div>prueba</div>
        <button onClick={ () => app.auth().signOut()}> salir</button>
    </>
  )
}

export default prueba