import React, {Component} from "react";
import PlayMusic from "playmusic-librarian";
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
        let uri = `https://librarian-api.herokuapp.com/library?username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
        fetch(uri)
            .then((response) => {
                if (response.ok) {
                    return response.json();
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
                    alert("Error fetching library information.\n\nPlease check your credentials.\n\nIf your credentials are " +
                        "correct, Google may have blocked " +
                        "this login attempt, check your email for an alert from Google and approve the login. \n\nOr maybe " +
                        "you need to enable 'Allow Less Secure Apps'!");
                }
            });
    }

    render() {
        if (!this.props.render) {
            return null;
        }
        if(this.state.done){
            return(
                <div className='row'>
                    {this.state.status}
                </div>
            )
        }
        return (
            <div className="row">
                <p>Input your Google account information below. The Google account <strong>MUST</strong> have the "Allow less secure apps" setting
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
                <p>
                    {this.state.status}
                </p>
            </div>
        );
    }
}

export default GoogleImporter;