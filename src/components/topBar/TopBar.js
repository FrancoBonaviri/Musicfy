import React from 'react'
import { Icon, Image } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

// Firebase ->
import firebase from '../../utils/Firebase';
import 'firebase/auth';

// styles and images ->
import './TopBar.scss';
import UserImage from '../../assets/png/user.png';



function TopBar( props ) {

    const { user, history } = props



    const handlerLogout = () => {
        firebase.auth().signOut();
    }

    const handlerGoBack = () => {
        history.goBack();
    }

    return (
        <div className="top-bar">
            
            <div className="top-bar__left">
                <Icon name="angle left" onClick={handlerGoBack} />
            </div>

            <div className="top-bar__right">
                <Link to="/settings">
                    <Image src={user.photoURL ? user.photoURL : UserImage } />
                    { user.displayName  }
                </Link>
                <Icon name="power off" onClick={handlerLogout}/>
            </div>


        </div>
    )
}


export default withRouter(TopBar)
