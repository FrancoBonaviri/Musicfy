import React from 'react'
import { Grid } from 'semantic-ui-react';
// import { toast } from 'react-toastify';

import './LoggedLayout.scss'

// Components ->
import MenuLeft from '../../components/MenuLeft'
import TopBar from '../../components/topBar';
// Routes ->
import Routes from '../../routes/Routes';
import { BrowserRouter as Router } from 'react-router-dom';

export default function LoggedLayout({ user, setReloadApp }) {





    return (
        <Router>
            <Grid className="logged-layout">
                <Grid.Row>

                    <Grid.Column width={3}>
                        <MenuLeft user={ user }/>
                    </Grid.Column>



                    <Grid.Column className="content" width={13}>
                        <TopBar user={ user }/>
                        < Routes user={ user } setReloadApp={setReloadApp}/>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={16}>
                        <h2>Player</h2>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Router>
    )
}
