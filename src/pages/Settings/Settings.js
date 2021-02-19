import React, { useState } from 'react'

// style ->
import './Settings.scss';

// Components ->
import UploadAvatar from '../../components/settings/UploadAvatar'
import UserName from '../../components/settings/UserName';
import BasicModal from '../../components/modal/basicModal';
import UserEmail  from '../../components/settings/UserEmail';
import UserPassword from '../../components/settings/UserPassword'
export default function Settings( props ) {
    
    const { user, setReloadApp } = props;

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [contentModal, setContentModal] = useState(null);



    
    return (
        <div className="settings">
            <h1>Configuración</h1>


            <div className="avatar-name">
                <UploadAvatar user={ user } setReloadApp={ setReloadApp } />
                <UserName 
                    user={ user }
                    setShowModal={ setShowModal }
                    setTitleModal={ setTitleModal }
                    setContentModal={ setContentModal }    
                    setReloadApp={ setReloadApp }
                />
            </div>

            <UserEmail 
                user={user} 
                setShowModal={ setShowModal } 
                setTitleModal={ setTitleModal } 
                setContentModal={ setContentModal } 
            />


            <UserPassword 
                user={user} 
                setShowModal={ setShowModal } 
                setTitleModal={ setTitleModal } 
                setContentModal={ setContentModal } 
            />
            
            <BasicModal show={showModal} setShow={setShowModal} title={titleModal} >
                {contentModal}
            </BasicModal>
        </div>
    )
}
 