import React, {Component} from 'react';
import SpotifyLogin from "./SpotifyLogin";
import SpotifyUploader from "./SpotifyUploader";
import GoogleImporter from "./GoogleImporter";
import Introduction from "./Introduction";

class Librarian extends Component {

    constructor(props) {
        super(props);
        this.state = {
            library: [],
            spotifyToken: '',
            renderIntro: true
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
                    onLogin={this.onSpotifyLogin} loggedIn={this.state.spotifyToken} render={!this.state.renderIntro}/>


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