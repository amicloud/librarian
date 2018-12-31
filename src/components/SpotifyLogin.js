import React, {Component} from 'react';

class SpotifyLogin extends Component {
    constructor(props) {
        super(props);
        this.spotifyLogin = this.spotifyLogin.bind(this);
    }

    componentDidMount() {
        this.token = window.location.hash.substr(1).split('&')[0].split("=")[1];
        if (this.token) {
            // window.opener.spotifyCallback(this.token);
            this.props.onLogin(this.token);
        }

    }

    spotifyLogin() {
        let localRedirect = "&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2F";
        let prodRedirect = "&redirect_uri=http%3A%2F%2Fwww.gpmlibrarian.com%2F";
        let redirect = window.location.href.match("localhost") ? localRedirect : prodRedirect;
        let authorizationUrl = "https://accounts.spotify.com/authorize?" +
            "client_id=6b16fe550ec0481db8e438eea7342c04" +
            redirect +
            "&scope=user-library-modify" +
            "&response_type=token" +
            "&show_dialog=true";
        window.location.replace(authorizationUrl);
    }

    render() {
        if (this.props.loggedIn) {
            return (
                <div className="row">
                    <p>Great, we are logged in to Spotify!</p>
                </div>
            );
        } else {
            return (
                <div className="row">
                    <p>This tool will enable you to transfer your Google Play Music All Access library to your Spotify
                        Library.</p>
                    <p>This will only work if you have logged in to Google Play Music on your Android phone at least
                        once.</p>
                    <p>First, grant Librarian access to your Spotify Library.</p>
                    <button id='spotifyLogin' className='button-spotify-login' onClick={this.spotifyLogin}>Login to
                        Spotify
                    </button>
                </div>
            );
        }
    }
}

export default SpotifyLogin;