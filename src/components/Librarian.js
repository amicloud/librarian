import React, {Component} from 'react';
import SpotifyLogin from "./SpotifyLogin";
import CSVImporter from "./CSVImporter";
import SpotifyUploader from "./SpotifyUploader";
import Downloader from "./Downloader";

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

                <Downloader/>

                <SpotifyLogin onLogin={this.onSpotifyLogin}/>

                {/*<GoogleImporter callback={this.onLibraryImported}/>*/}

                <CSVImporter callback={this.onLibraryImported}/>

                <p>If the data below looks correct once the .csv is loaded, you can save either the entire albums to
                your Spotify library, or the individual songs. Uploading a few hundred albums is quick, but several
                thousands of songs will take a while...</p>

                <SpotifyUploader spotifyToken={this.state.spotifyToken} library={this.state.library}/>

            </div>
        );
    }
}

export default Librarian;