import React, { useState, useEffect } from 'react'
import './Player.scss'
import ReactPlayer from 'react-player'; 

import { Grid, Progress, Icon, Input, Image } from 'semantic-ui-react';


export default function Player({ songData }) {

    const [playedSeconds, setPlayedSeconds] = useState(0)
    const [totalSecondsSong, setTotalSecondsSong] = useState(120)
    const [playing, setPlaying] = useState(false)
    const [volume, setVolume] = useState(0.3)



    useEffect(() => {
        if( songData?.url ){
            onStart();
        }
    }, [ songData ])


    const onStart = () => {
        setPlaying( true );
    }


    const onPause = () => {
        setPlaying( false );
    }


    const onProgress = (data) => {
        setTotalSecondsSong( data.loadedSeconds )
        setPlayedSeconds( data.playedSeconds )
    }

    return (
        <div className="player">
            <Grid>
                <Grid.Column
                    width={ 4 }
                    className="left"
                >
                    <Image src={ songData?.image }/>
                    { songData?.name }
                </Grid.Column>


                <Grid.Column 
                    className="center"
                    width={ 8 }
                >
                    <div className="controls">
                        {playing 
                            ? ( <Icon name="pause circle outline" onClick={ onPause } /> )
                            : ( <Icon name="play circle outline" onClick={ onStart } />)
                        }
                    </div>
                    <Progress 
                        progress="value"
                        value={ playedSeconds }
                        total={ totalSecondsSong }
                        size="tiny"
                    />
                </Grid.Column>



                <Grid.Column
                    className="rigth"
                    width={ 4 }
                >
                    <Input 
                        name="volume"
                        type="range"
                        label={ <Icon name="volume up"/>}
                        min={ 0 }
                        max={ 1 }
                        step={0.01}
                        onChange={ (e, data) => setVolume(Number(data.value))}
                        value={ volume }
                    />
                </Grid.Column>
            </Grid>



            <ReactPlayer 
                className="react-player"
                url={ songData?.url }
                playing={  playing }
                height="0"
                width="0"
                volume={ volume }
                onProgress={ e => onProgress(e) }
            />
        </div>
    )
}
