import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import PlayMusic from "playmusic";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gEmail: '',
            gPass: '',
            library: []
        };
        this.handleChangeGooglePass = this.handleChangeGooglePass.bind(this);
        this.handleChangeGoogleEmail = this.handleChangeGoogleEmail.bind(this);
        this.handleSubmitGoogle = this.handleSubmitGoogle.bind(this);
        this.getAllTracks = this.getAllTracks.bind(this);
    }

    handleChangeGoogleEmail(event){
        this.setState({gEmail: event.target.value})
    }

    handleChangeGooglePass(event){
        this.setState({gPass: event.target.value})
    }


    getAllTracks(username, password) {
        console.log("Getting tracks");
        let that = this;
        console.log(username);
        console.log(password);
        let pm = new PlayMusic();
        pm.login({email: username, password: password}, function (err, info) {
            if (err) console.error(err);
            console.log("Logged in...");
            pm.init({androidId: info.androidId, masterToken: info.masterToken}, function (err) {
                if (err) console.error(err);
                console.log("Initialized music service");
                pm.getAllTracks({limit: 100000}, function (err, library) {
                    console.log("Got all tracks");
                    that.setState({library: library.data.items})
                });
            });
        });
    }


    handleSubmitGoogle(event) {
        event.preventDefault();
        this.getAllTracks(this.state.gEmail, this.state.gPass);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>

                </header>
                <div className="container">
                    <div className="row">
                        <h1 className="center">Librarian</h1>
                    </div>
                    <div className="row">
                        <p>In the fields below, input the login information for the Google Account you wish to retrieve
                            the library
                            information for. The Google account also needs to have the "Allow less secure apps" setting
                            set to "ON".
                        </p>
                        <form onSubmit={this.handleSubmitGoogle}>
                            Email
                            <input type="text" id="googleEmail" value={this.state.gEmail} onChange={this.handleChangeGoogleEmail}/>
                            Password
                            <input type="password" id="googlePassword" value={this.state.gPass} onChange={this.handleChangeGooglePass}/>
                            <input type='submit' value='Get Library Data'/>
                        </form>
                    </div>
                    <div className="row">
                        <p>{this.state.library}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
