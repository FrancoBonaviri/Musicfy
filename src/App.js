import React, { useState } from 'react';

import firebase from './utils/Firebase';
import 'firebase/auth';
import Auth from './pages/auth';
import { ToastContainer } from 'react-toastify';
import LoggedLayout from './layouts/LoggedLayout'

function App() {

  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [reloadApp, setReloadApp] = useState(false);


  firebase.auth().onAuthStateChanged(currentUser => {
  
    if( !currentUser?.emailVerified ) {
      firebase.auth().signOut();
      setUser( null );
    } else {
      setUser( currentUser );
    }

    setIsLoading(false);
  });



  if( isLoading ){
    return null;
  } 

  
  // return (
  //   user ? <UserLogged /> : <Auth />
  // );


  return ( 
    <>
      {user ? <LoggedLayout user={ user } setReloadApp={setReloadApp} /> : <Auth />}
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover={true}
      />
    </>

  )

}


export default App;
