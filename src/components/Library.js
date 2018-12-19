import React, {Component} from "react";

class Library extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.library.length) {
            return (
                <div className="library">
                    <p>Found {this.props.library.length} tracks</p>
                </div>
            );

        } else {
            return null;
        }
    }

}

export default Library;