import React, {Component} from "react";

class Introduction extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.render) {
            return null;
        } else {
            return (
                <div className={'introduction'}>
                    <h3>Welcome to Librarian!</h3>
                    <p>This tool will enable you to transfer your Google Play Music All Access library to your Spotify
                        Library.</p>
                    <p>This will only work if you have logged in to Google Play Music on your Android phone at least
                        once.</p>
                </div>
            );

        }
    }
}

export default Introduction;