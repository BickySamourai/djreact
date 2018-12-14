
import Spotify from 'spotify-web-api-js';

const spotifyApi = new Spotify();

export function redirectUrlToSpotifyForLogin() {

    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const REDIRECT_URI =
        process.env.NODE_ENV === "production"
            ? process.env.REACT_APP_SPOTIFY_PRODUCTION_REDIRECT_URI
            : process.env.REACT_APP_SPOTIFY_DEVELOPMENT_REDIRECT_URI;

    const scopes = [
        "streaming",
        "user-read-birthdate",
        "user-read-email",
        "user-read-private",
        "user-read-recently-played",
        "user-modify-playback-state",
        "user-read-playback-state",
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-library-read",
        "user-library-modify",
        "playlist-read-private",
        "playlist-modify-public",
        "playlist-modify-private"];

    return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
        '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
        '&scope=' + encodeURIComponent(scopes.join(' ')) +
        '&response_type=token';
}

export function checkUrlForSpotifyAccessToken() {

    const params = getHashParams();

    const accessToken = params.access_token;

    if (!accessToken)
        return false
    else
        return accessToken

}

function getHashParams() {
    //helper function to parse the query string that spotify sends back when you log in
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    // eslint-disable-next-line
    while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}

export function setAccessToken(accessToken) {
    //since using spotifyApi as helper library you can set the access code once
    //you get it and then not have to include it in every request
    spotifyApi.setAccessToken(accessToken);
}

export async function getUserPlaylists() {
    //returns an array of objects with playlist name (like "Favorite Smashing Pumpkins jamz")
    //and the id of the playlist. Use this to feed the playlists selection list
    try {
        const playlistsResponse = await spotifyApi.getUserPlaylists();
        //playlistsResponse.items are the actual playlist objects
        const playlists = playlistsResponse.items.map((playlistObject) => {
            const { id, name } = playlistObject;
            return { id: id, playlistName: name }
        })
        return playlists
    }
    catch (err) {
        //return default array with note that can't download playlists
        console.error('Error: Attempting to get user playlists', err);
        console.error(err.stack);
        return [{ id: null, playlistName: "Can't Download your Playlists!" }]
    }
}

export async function getSpotifyUserInfo() {
    //track_number is what track number a song is on the album

    try {
        const userInfo = await spotifyApi.getMe();
        return userInfo;

    }
    catch (err) {
        console.error('Error: getSpotifyUserInfo in spotifyFunctions', err);
        console.error(err.stack);
    }
}

export async function getUserDevices() {
    //track_number is what track number a song is on the album

    try {
        const userDevices = await spotifyApi.getMyDevices();
        return userDevices;

    }
    catch (err) {
        console.error('Error:  getUserDevices() in spotifyFunctions', err);
        console.error(err.stack);
    }
}

export async function playSongOnDevice(deviceId, contextUri) {
    //track_number is what track number a song is on the album

    const tab = [];
    tab.push(contextUri)
    console.log(tab)

    try {
        const userDevices = await spotifyApi.play({
            device_id: deviceId,
            uris: tab
        });
        console.log(userDevices)
        return userDevices;

    }
    catch (err) {
        console.error('Error:  playSongOnDevice(deviceId, contextUri) in spotifyFunctions', err);
        console.error(err.stack);
    }
}

export async function getSimplePlaylistTracks(playlistId) {
    //track_number is what track number a song is on the album
    try {
        const tracks = await spotifyApi.getPlaylistTracks(playlistId);

        //getPlaylistTracks has a bunch of meta data about the playlist we don't need
        //once again items is the property we really want. It's an array of tracks
        const simpleTracks = tracks.items.map((trackObject, index) => {
            const track = trackObject.track;
            const album = trackObject.track.album;
            const artist = trackObject.track.artists[0]


            return {
                // trackId: track.id,
                key: index,
                trackName: track.name,

                artistName: artist.name,
                //trackNumber: track.track_number,
                //albumId: album.id,
                albumName: album.name,
                trackUri: track.uri,
                playerTag: ['Ecouter'],
                //albumUri: album.uri,
                //artistId: artist.id,

                //artistUri: artist.uri,
            }
        })
        return simpleTracks
    }
    catch (err) {
        console.error('Error: getSimplePlaylistTracks in spotifyFunctions', err);
        console.error(err.stack);
    }
}