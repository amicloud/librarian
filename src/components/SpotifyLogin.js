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
        let authorizationUrl = "https://accounts.spotify.com/authorize?" +
            "client_id=6b16fe550ec0481db8e438eea7342c04" +
            // "&redirect_uri=http%3A%2F%2Fwww.gpmlibrarian.com%2F" +
            "&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F" +
            "&scope=user-library-modify" +
            "&response_type=token" +
            "&show_dialog=true";
        window.location.replace(authorizationUrl);
    }

    render() {
        return (
            <div className="row">
                <p>Then log in to Spotify.</p>
                <button id='spotifyLogin' className='button-spotify-login' onClick={this.spotifyLogin}>Login to Spotify</button>
            </div>
        );
    }
}

export default SpotifyLogin;