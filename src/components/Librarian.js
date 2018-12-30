import React, {Component} from 'react';
import SpotifyLogin from "./SpotifyLogin";
import CSVImporter from "./CSVImporter";
import SpotifyUploader from "./SpotifyUploader";
import Downloader from "./Downloader";
import GoogleImporter from "./GoogleImporter";

class Librarian extends Component {

    constructor(props) {
        super(props);
        this.state = {
            library: [],
            spotifyToken: ''
        };
        this.onLibraryImported = this.onLibraryImported.bind(this);
        this.onSpotifyLogin = this.onSpotifyLogin.bind(this);
    }

    onLibraryImported(library) {
        this.setState({library: library});
    }

    onSpotifyLogin(token) {
        this.setState({spotifyToken: token});
    }

    render() {
        return (
            <div className="container">

                <SpotifyLogin
                    onLogin={this.onSpotifyLogin} loggedIn={this.state.spotifyToken}/>


                <GoogleImporter
                    callback={this.onLibraryImported} render={this.state.spotifyToken}/>

                {/*<Downloader/>*/}
                {/*<CSVImporter callback={this.onLibraryImported}/>*/}

                <SpotifyUploader
                    spotifyToken={this.state.spotifyToken} library={this.state.library}/>

            </div>
        );
    }
}

export default Librarian;