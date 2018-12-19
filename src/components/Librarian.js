import React, {Component} from 'react';
import SpotifyLogin from "./SpotifyLogin";
import GoogleImporter from "./GoogleImporter";
import Library from "./Library";
import CSVImporter from "./CSVImporter";

class Librarian extends Component {

    constructor(props) {
        super(props);
        this.state = {
            library: []
        };
        this.onLibraryImported = this.onLibraryImported.bind(this);
    }

    onLibraryImported(library) {
        this.setState({library: library});
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h1 className="center">Librarian</h1>
                </div>

                <SpotifyLogin/>

                <CSVImporter callback={this.onLibraryImported}/>

                {/*<GoogleImporter callback={this.onLibraryImported}/>*/}

                <Library library={this.state.library}/>

            </div>
        );
    }
}

export default Librarian;