import React, {Component} from "react";
import PlayMusic from "playmusic";

class GoogleImporter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.getLibrary = this.getLibrary.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.getLibrary(this.state.email, this.state.password);
    }

    getLibrary(username, password) {
        console.log("Getting tracks");
        let that = this;
        let pm = new PlayMusic();
        console.log("Attempting to log in...");
        pm.login({email: username, password: password}, function (err, info) {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Logged in successfully!\n" +
                "Initializing client...");
            pm.init({androidId: info.androidId, masterToken: info.masterToken}, function (err) {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log("Client initialized!\n" +
                    "Attempting to fetch up to 25,000 tracks...");
                pm.getAllTracks({limit: 25000}, function (err, library) {
                    if (err) {
                        console.error(err);
                    }
                    if (library) {
                        console.log("Library retrieved! Found " + library.length + " songs.");
                        that.setState({library: library.data.items});
                        this.props.callback(library);
                    } else {
                        console.log("No songs found. Huh? ¯\\_(ツ)_/¯");
                    }
                });
            });
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