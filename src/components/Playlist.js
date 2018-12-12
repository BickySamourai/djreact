import React, { Component } from 'react';

import { List, Avatar } from 'antd';

import * as SpotifyFunctions from '../spotify/spotifyFunctions.js';

import * as spotifyPlayer from '../spotify/spotifyPlayer';
import { Select } from 'antd';

import Iframe from 'react-iframe'
import { Table, Divider, Tag } from 'antd';

const Option = Select.Option;





// titre, artiste(s) album, player

const columns = [{
    title: 'Titre',
    dataIndex: 'trackName',
    key: 'trackName',

}, {
    title: 'Artiste(s)',
    dataIndex: 'artistName',
    key: 'artistName',
}, {
    title: 'Album',
    dataIndex: 'albumName',
    key: 'albumName',
}, {
    title: 'Player Tag',
    key: 'playerTag',
    dataIndex: 'playerTag',
    render: tags => (
        <span>
            {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)} {/* onClick={handleClick} */}
        </span>
    ),
}];


let data = [{
    key: '0',
    trackName: 'John Brown',
    artistName: 32,
    albumName: 'New York No. 1 Lake Park',
    playerTag: ['Ecouter'],
}, {
    key: '1',
    trackName: 'Jim Green',
    artistName: 42,
    albumName: 'London No. 1 Lake Park',
    playerTag: ['Ecouter'],
}, {
    key: '2',
    trackName: 'Joe Black',
    artistName: 32,
    albumName: 'Sidney No. 1 Lake Park',
    playerTag: ['Ecouter'],
}];



class Playlist extends Component {


    componentWillReceiveProps(newProps) {
        console.log(newProps)
    }

    constructor(props) {
        super(props)

        this.classes = props;
        this.state = {
            addRelatedDiscography: "false",
            playlists: [],
            chosenPlaylistIndex: 0,
            chosenPlaylistName: 'Choose a playlist',
            chosenPlaylistId: null,
            anchorElement: null
        }

        this.state = {
            token: "BQDjZHJjPEVAVQMwC3OU33GdGTTaaeFjZPVBkMlcE265k3v5GA4zmhElNVkKv71TUUa0ipI-Q4HsoAQ63klwRenwya4XbhFSJ0JB7tUJ7Kt_Th2QdhEv-grJFb7505aJbX8YtsseL-HaXSMnU_Nas3us64nL34vYczrAoyzF",
            deviceId: "",
            loggedIn: false,
            error: "",
            trackName: "Track Name",
            artistName: "Artist Name",
            albumName: "Album Name",
            playing: false,
            position: 0,
            duration: 0,
        };


    }

    async componentDidMount() {

        // pour les playlists
        await SpotifyFunctions.setAccessToken(this.props.accessToken);

        const playlists = await SpotifyFunctions.getUserPlaylists();


        const children = [];

        playlists.map((tab, index) => {

            children.push(<Option key={index} value={tab.id}>{tab.playlistName}</Option>);

        });

        this.setState({ playlists: playlists, options: children, data: data });

        this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 10000);


    }



    createEventHandlers() {
        this.player.on('initialization_error', e => { console.error(e); });
        this.player.on('authentication_error', e => {
            console.error(e);
            this.setState({ loggedIn: false });
        });
        this.player.on('account_error', e => { console.error(e); });
        this.player.on('playback_error', e => { console.error(e); });

        // Playback status updates
        // quand on met sur pause par ex
        this.player.on('player_state_changed', state => { console.log(state); });

        // Ready
        this.player.on('ready', data => {
            let { device_id } = data;
            console.log("Let the music play on!");
            this.setState({ deviceId: device_id });
        });
    }


    checkForPlayer() {
        const { token } = this.state;

        if (window.Spotify !== null) {
            this.player = new window.Spotify.Player({
                name: "Matt's Spotify Player",
                getOAuthToken: cb => { cb(token); },
            });

            clearInterval(this.playerCheckInterval);
            this.createEventHandlers();

            // finally, connect!
            this.player.connect();
        }
    }

    handleChange = async (playlistId) => {
        const tracks = await SpotifyFunctions.getSimplePlaylistTracks(playlistId);



        this.setState({ data: tracks })
    }



    onChange(pagination, filters, sorter) {
        console.log('params', pagination, filters, sorter);
    }




    render() {

        //this.parcourir(this.state.playlists);
        //{ this.state.playlists &&  }

        const {
            token,
            loggedIn,
            artistName,
            trackName,
            albumName,
            error,
            position,
            duration,
            playing,
        } = this.state;




        const {
            data
        } = this.state;




        return (



            <React.Fragment>



                <p>Mes playlists Spotify</p>


                <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="Tags Mode"
                    onChange={this.handleChange}
                >
                    {this.state.options}
                </Select>

                {this.state.data &&
                    <Table columns={columns} dataSource={data} onChange={this.onChange} />
                }

                <div>


                    <iframe src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3" width="300" height="380" allowtransparency="true" allow="encrypted-media"></iframe>
                </div>

            </React.Fragment>
        )



    }
}

export default Playlist;