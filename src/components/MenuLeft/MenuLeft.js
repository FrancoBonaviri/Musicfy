import React, { useState, useEffect } from 'react'
import { Menu, Icon } from 'semantic-ui-react';
import { isUserAdmin } from '../../utils/api'

// Routes ->
import { Link, withRouter } from 'react-router-dom';

// Styles ->
import './MenuLeft.scss';

// Components ->
import BasicModal from '../modal/basicModal';
import AddArtistForm from '../artist/AddArtistForm';


function MenuLeft(props) {
    const { user, location } = props;

    //#region states
    const [activeMenu, setActiveMenu] = useState(location.pathname);
    const [userAdmin, setUserAdmin] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    //#endregion


    useEffect(() => {
        setActiveMenu( location.pathname )
    }, [location])



    useEffect(() => {
        isUserAdmin( user.uid ).then( response => {
            setUserAdmin(response);
        });
    }, [ user ])
    
    const handlerModal = ( modalType ) => {
        switch (modalType) {
            case "artists":
                setTitleModal("Nuevo artista");
                setContentModal(<AddArtistForm setShowModal={ setShowModal } />)
                setShowModal(true)    
            break;
        
            case "song":
                setTitleModal("Nueva Cancion");
                setContentModal(<h2>Formulario nueva cancion</h2>);
                setShowModal(true)
            break;

            default:
                setShowModal(false);
            break;
        }
    }

    
    return (
        <>
            <Menu className="menu-left" vertical>
            
            
                <div className="top">
                    <Menu.Item 
                        as={ Link } 
                        to="/"
                        name="home"
                        active={activeMenu == "/"}
                    >
                        <Icon name="home" />Inicio
                    </Menu.Item>
                    <Menu.Item
                        as={ Link } 
                        to="/artists"
                        name="artists" 
                        active={activeMenu == "/artists"}
                    >
                        <Icon name="music" />Artistas
                    </Menu.Item>
                </div>



                { userAdmin && (

                <div className="footer">
                    <Menu.Item onClick={ () => handlerModal("artists")}>
                        <Icon name="plus square outline" />Nuevo artista
                    </Menu.Item>
                    <Menu.Item onClick={ () => handlerModal("song")}>
                        <Icon name="plus square outline" />Nueva cancion
                    </Menu.Item>
                </div>

                )}

            </Menu>
            <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
                {contentModal}
            </BasicModal>
        </>
    )
}


export default withRouter(MenuLeft);