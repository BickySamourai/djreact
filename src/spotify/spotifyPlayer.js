




export async function waitForSpotifyWebPlaybackSDKToLoad() {

    return new Promise(resolve => {

        if (window.Spotify)
            resolve(window.Spotify);
        else
            window.onSpotifyWebPlaybackSDKReady = () => { resolve(window.Spotify); }
    });
};

