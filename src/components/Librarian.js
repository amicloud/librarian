import React, {Component} from 'react';
import SpotifyLogin from "./SpotifyLogin";
import GoogleImporter from "./GoogleImporter";
import Library from "./Library";
import CSVImporter from "./CSVImporter";
import SpotifyUploader from "./SpotifyUploader";

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
                <div className="row">
                    <h1 className="center">Librarian</h1>
                </div>

                <div>
                    <p>All you need is a .csv file containing your Google Play Music Library. We need the track title,
                        artist name, album name, track id, and album id.</p>
                    <p>
                        .csv headers (first row) need to be:
                        id, albumId, title, album, artist
                    </p>
                    <p>
                        The order doesn't matter, but you have to have the right data under the right header!
                        Once you have acquired your library data, log in to Spotify below, then select your .csv
                        file and choose your upload type. It might take a few seconds to load all of the data
                        if there are thousands of tracks.
                    </p>
                    <p>
                        It may not be possible to find all tracks or albums, but we'll get most of them!
                    </p>

                </div>

                <SpotifyLogin onLogin={this.onSpotifyLogin}/>


                {/*This is just not working yet...*/}
                {/*<GoogleImporter callback={this.onLibraryImported}/>*/}

                <p>Then load your .csv file in</p>

                <CSVImporter callback={this.onLibraryImported}/>

                <p>If the data below looks correct once the .csv is loaded, you can save either the entire albums to
                your Spotify library, or the individual songs.</p>
                <SpotifyUploader spotifyToken={this.state.spotifyToken} library={this.state.library}/>

            </div>
        );
    }
}

export default Librarian;