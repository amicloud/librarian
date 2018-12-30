import React, {Component} from "react";
import PlayMusic from "playmusic-librarian";
import {Base64} from "js-base64";

class GoogleImporter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getLibraryFromServer = this.getLibraryFromServer.bind(this);
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.getLibraryFromServer(this.state.email, this.state.password);
    }

    getLibraryFromServer(email, password) {
        let uri = `https://librarian-api.herokuapp.com/library?username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
        fetch(uri)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((json) => {
                if(json){
                let decoded = Base64.decode(json["library"]);
                    let lib = JSON.parse(decoded);
                    this.props.callback(lib.data.items);
                } else {
                    alert("Error fetching library information. Please check your credentials. If your credentials are " +
                        "correct, Google may have blocked " +
                        "this login attempt, check your email for an alert from Google and approve the login. Or maybe " +
                        "you need to enable 'Allow Less Secure Apps'!")
                }
            });
    }

    render() {
        return (
            <div className="row">
                <p>In the fields below, input the login information for the Google Account you wish to retrieve
                    the library
                    information for. The Google account also needs to have the "Allow less secure apps" setting
                    set to "ON".
                </p>
                <form onSubmit={this.handleSubmit}>
                    Email
                    <input type="text" id="googleEmail" value={this.state.email}
                           onChange={this.handleEmailChange}/>
                    Password
                    <input type="password" id="googlePassword" value={this.state.password}
                           onChange={this.handlePasswordChange}/>
                    <input type='submit' value='Get Library Data'/>
                </form>
            </div>
        );
    }
}

export default GoogleImporter;