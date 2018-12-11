import React, { Component } from 'react';

import ApiSpotify from '../utils/apiSpotify';


class SpotifyContainer extends Component {

  constructor(props) {
    super(props)


  }

  componentDidMount() {

    ApiSpotify.get()

      .then(response => {

        console.log(response)


      })
      .catch(error => {
        console.log(error);
      })

  }

  render() {

    return (

      <div className="SpotifyContainer">
        <p>duehduhehed</p>
      </div>
    );
  }
}

export default SpotifyContainer;

