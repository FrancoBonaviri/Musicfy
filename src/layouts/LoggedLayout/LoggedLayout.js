import React, { useState } from 'react'
import { Grid } from 'semantic-ui-react';
// import { toast } from 'react-toastify';

import './LoggedLayout.scss'

// Components ->
import MenuLeft from '../../components/MenuLeft'
import TopBar from '../../components/topBar';
import Player from '../../components/player'

// Routes ->
import Routes from '../../routes/Routes';
import { BrowserRouter as Router } from 'react-router-dom';


export default function LoggedLayout({ user, setReloadApp }) {


    const [songData, setSongData] = useState(null)

    const playerSong = ( albumImage, songName, songUrl ) => {
        setSongData({
            image: albumImage,
            name: songName,
            url: songUrl
        });
    }

    const test = () => {
        playerSong( 'https://firebasestorage.googleapis.com/v0/b/musicfy-francodev.appspot.com/o/album%2F591c2d74-a5c3-4d0e-8120-536789f4ff6d?alt=media&token=5e4064fa-3883-4227-8472-577151807eb8',
        'Efecto vives' ,
        'https://firebasestorage.googleapis.com/v0/b/musicfy-francodev.appspot.com/o/song%2FDerek%20Clegg%20-%20Making%20It%20Right.mp3?alt=media&token=3aa89262-df0c-4a22-9d8d-2a821cb42a98' )
    }


    return (
        <Router>
            <Grid className="logged-layout">
                <Grid.Row>

                    <Grid.Column width={3}>
                        <button onClick={ test }>
                            Start TEST
                        </button>
                        <MenuLeft user={ user }/>
                    </Grid.Column>



                    <Grid.Column className="content" width={13}>
                        <TopBar user={ user }/>
                        < Routes user={ user } setReloadApp={setReloadApp}/>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={16}>
                        <Player songData={ songData }/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Router>
    )
}
