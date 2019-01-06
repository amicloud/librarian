import React, {Component} from 'react';
import './App.css';
import Librarian from "./components/Librarian";
import Header from "./components/Header";
import HttpsRedirect from 'react-https-redirect';

class App extends Component {

    render() {
        return (
            <HttpsRedirect>
                <div className="App">
                    <Header/>

                    <Librarian/>



                </div>
            </HttpsRedirect>
        );
    }
}

export default App;
