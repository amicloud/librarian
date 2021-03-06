import React, {Component} from "react";
import {Base64} from "js-base64";

class GoogleImporter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            status: '',
            done: false
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
        this.setState({status: "Fetching library data..."});
        let uri = `https://librarian-api.herokuapp.com/library`;
        // uri = "localhost:3000/library";
        let body = {
            "email": email,
            "password": password
        };
        fetch(uri, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(`Response: ${response.status}`);
                    this.setState({status: "Error retrieving library."});
                }
            })
            .then((json) => {
                if (json) {
                    let decoded = Base64.decode(json["library"]);
                    this.setState({status: "Library retrieved!", done: true});
                    let lib = JSON.parse(decoded);
                    this.props.callback(lib.data.items);
                } else {
                    this.setState({status: "Error logging in or retrieving library."});
                    alert("Error fetching library information.\nPlease check your credentials.\n\nIf your credentials are " +
                        "correct, Google may have blocked " +
                        "this login attempt, check your email for an alert from Google and approve the login. \nOr maybe " +
                        "you need to enable 'Allow Less Secure Apps'!\nIf all that fails, you need to reset your password and use the new one. Sorry, but that's just how Google " +
                        "wants to do things.");
                }
            });
    }

    render() {
        if (!this.props.render) {
            return null;
        }
        if (this.state.done) {
            return (
                <div className='row'>
                    {this.state.status}
                </div>
            );
        }
        return (
            <div className="row">
                <p>Input your Google account information below. The Google account <strong>MUST</strong> have the <a
                    href='https://myaccount.google.com/lesssecureapps'>"Allow less secure apps"</a> setting
                    set to "ON". Also, go <a href={'https://accounts.google.com/b/0/DisplayUnlockCaptcha'}>here</a> and click continue just in case.
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
                <p>
                    {this.state.status}
                </p>
            </div>
        );
    }
}

export default GoogleImporter;