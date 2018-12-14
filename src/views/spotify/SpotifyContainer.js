import React, { Component } from 'react';
import * as SpotifyFunctions from '../spotify/spotifyFunctions';
import ConnectSpotify from './ConnectSpotify';
import Playlist from './Playlist';

class SpotifyContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loggedInToSpotify: false,
            accessToken: null
        }
    }

    async componentDidMount() {
        //will check URL for accessToken hash. If it's not there, it will show the connect-spotify-button as a link
        //which will then redirect back to your site with the hash. If there is a hash, then we will jump right into the player
        const accessToken = SpotifyFunctions.checkUrlForSpotifyAccessToken();
        accessToken ? this.setState({ loggedInToSpotify: true, accessToken: accessToken }) : this.setState({ loggedInToSpotify: false, accessToken: null });

        // METTRE EN DB LES INFOS DE LUTILISATEUR !!!!!!!!!!!!!!!!!!!!!
        accessToken ? (async () => {
            await SpotifyFunctions.setAccessToken(this.props.accessToken);
            const user = await SpotifyFunctions.getSpotifyUserInfo();
            console.log(user);
        })() : console.log("")

    }

    render() {

        return (

            <div>

                {
                    !this.state.loggedInToSpotify ? <ConnectSpotify /> : <Playlist accessToken={this.state.accessToken} />
                }

            </div>
        );
    }
}

export default SpotifyContainer;