import React, { Component } from 'react';
import * as SpotifyFunctions from '../spotify/spotifyFunctions.js';
import { Table, Tag } from 'antd';
import { Button, Icon } from 'antd';
import { Select } from 'antd';
import './Playlist.css';

const { Option, OptGroup } = Select;
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
    title: 'Player',
    key: 'playerTag',
    dataIndex: 'playerTag',
    render: (tags, track) => (
        <span>
            {tags.map(tag => <Tag color="blue" key={tag} onClick={
                async () => await SpotifyFunctions.playSongOnDevice(localStorage.getItem('deviceId'), track.trackUri)
            }>{tag}</Tag>)
            }
        </span >
    ),
}];


let data = [];

class Playlist extends Component {

    constructor(props) {
        super(props)

        this.classes = props;

        // mettre dans ENVVVVVVVVVVVVVVVV

        this.state = {
            token: process.env.REACT_APP_SPOTIFY_WEB_PLAYBACK_ACCESS_TOKEN,
            deviceId: "",
            loggedIn: false,
            playing: false
        };
    }

    async componentDidMount() {

        await SpotifyFunctions.setAccessToken(this.props.accessToken);

        const playlists = await SpotifyFunctions.getUserPlaylists();
        const devices = await SpotifyFunctions.getUserDevices();
        const playlistOptions = [];
        const smartphoneOptions = [];
        const computerOptions = [];

        playlists.map((tab, index) => {

            playlistOptions.push(<Option key={index} value={tab.id}>{tab.playlistName}</Option>);

        });

        Object.keys(devices).forEach((key) => {

            devices[key].map((tab, index) => {

                if (tab.type === 'Computer')
                    computerOptions.push(<Option key={index} value={tab.id}>{tab.name}</Option>)

                if (tab.type === 'Smartphone')
                    smartphoneOptions.push(<Option key={index} value={tab.id}>{tab.name}</Option>)

            })
        })

        this.setState({ playlists: playlists, options: playlistOptions, data: data, computerOptions: computerOptions, smartphoneOptions: smartphoneOptions });
        this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
    }

    handleChangePlaylist = async (playlistId) => {
        const tracks = await SpotifyFunctions.getSimplePlaylistTracks(playlistId);
        this.setState({ data: tracks })
    }

    handleChangeDevices = async (deviceId) => {
        localStorage.setItem('deviceId', deviceId); // obligé de stocker dans localstorage car pas accès au state en dehors du composant
    }


    checkForPlayer() {

        const { token } = this.state;

        if (window.Spotify !== null) {

            this.player = new window.Spotify.Player({
                name: "Spotify Player du Projet IPL",
                getOAuthToken: cb => { cb(token); },
            });

            clearInterval(this.playerCheckInterval);
            this.createEventHandlers();
            this.player.connect();
        }
    }

    createEventHandlers() {
        this.player.on('initialization_error', e => { console.error(e); });
        this.player.on('authentication_error', e => {
            console.error(e);
            this.setState({ loggedIn: false });
        });
        this.player.on('account_error', e => { console.error(e); });
        this.player.on('playback_error', e => { console.error(e); });

        // Quand on met sur pause par ex
        this.player.on('player_state_changed', state => {
            this.onStateChanged(state);
        });

        this.player.on('ready', data => {
            console.log("Let the music play on!");
        });
    }



    onStateChanged(state) {
        // Si on n'écoute plus la musique l'état vaut null
        if (state !== null) {
            const {
                current_track: currentTrack,
            } = state.track_window;

            const trackName = currentTrack.name;
            const albumName = currentTrack.album.name;
            const artistName = currentTrack.artists
                .map(artist => artist.name)
                .join(", ");
            const playing = !state.paused;
            this.setState({
                trackName,
                albumName,
                artistName,
                playing
            });
        }
    }

    onChange(pagination, filters, sorter) {
        console.log('params', pagination, filters, sorter);
    }

    onPrevClick() {
        this.player.previousTrack();
    }

    onPlayClick() {
        this.player.togglePlay();
    }

    onNextClick() {
        this.player.nextTrack();
    }

    render() {

        const {

            data,
            artistName,
            trackName,
            albumName,
            playing,
        } = this.state;

        return (

            <React.Fragment>

                <p>Mes playlists Spotify</p>
                <Select
                    defaultValue="Playlist(s)"
                    style={{ width: '25%' }}
                    onChange={this.handleChangePlaylist}
                >
                    {this.state.options}
                </Select>


                <p className="title_2">Veuillez sélectionner l'appareil sur lequel vous souhaitez écouter une musique</p>

                <Select
                    defaultValue="Appareil(s)"
                    style={{ width: '25%', marginTop: '0.5%' }}
                    onChange={this.handleChangeDevices}
                >
                    <OptGroup label="Ordinateur(s)">
                        {this.state.computerOptions}
                    </OptGroup>
                    <OptGroup label="Smartphone(s)">
                        {this.state.smartphoneOptions}
                    </OptGroup>
                </Select>

                {
                    this.state.data &&
                    <Table columns={columns} dataSource={data} onChange={this.onChange} style={{ marginTop: '2%' }} />
                }

                <p>Artist: {artistName}</p>
                <p>Track: {trackName}</p>
                <p>Album: {albumName}</p>


                <Button.Group>
                    <Button type="primary" onClick={() => this.onPrevClick()}>
                        <Icon type="left" />Précédent
                    </Button>
                    <Button onClick={() => this.onPlayClick()}>{playing ? "Pause" : "Play"}</Button>
                    <Button type="primary" onClick={() => this.onNextClick()}>
                        Suivant<Icon type="right" />
                    </Button>
                </Button.Group>

            </React.Fragment >
        )
    }
}

export default Playlist;