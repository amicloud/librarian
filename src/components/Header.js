import React, {Component} from "react";
import logo from "../logo.svg";

class Header extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <header className="App-header">
                <h1 className="center"><a href={"/"}>Librarian</a></h1>
            </header>
        );
    }

}

export default Header;