import React, { Component } from 'react';
import * as SpotifyFunctions from '../spotify/spotifyFunctions.js';
import ConnectSpotify from '../components/ConnectSpotify';

import Playlist from '../components/Playlist';

class SpotifyContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loggedInToSpotify: false,
      accessToken: null
    }
  }

  componentDidMount() {
    //will check URL for accessToken hash. If it's not there, it will show the connect-spotify-button as a link
    //which will then redirect back to your site with the hash. If there is a hash, then we will jump right into the player
    const accessToken = SpotifyFunctions.checkUrlForSpotifyAccessToken();
    accessToken ? this.setState({ loggedInToSpotify: true, accessToken: accessToken }) : this.setState({ loggedInToSpotify: false, accessToken: null });
  }

  render() {

    return (

      <div>

        {console.log(this.state.loggedInToSpotify)}

        {
          !this.state.loggedInToSpotify ? <ConnectSpotify /> :

            <Playlist accessToken={this.state.accessToken} />

          /*<p>{`We're in! Access Token is ${this.state.accessToken}`}</p>*/



        }

      </div>
    );
  }
}

export default SpotifyContainer;