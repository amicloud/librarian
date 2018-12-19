import React, {Component} from 'react';
import './App.css';
import Librarian from "./components/Librarian";
import Header from "./components/Header";

class App extends Component {

    render() {
        return (
            <div className="App">
                <Header/>

                <Librarian/>

            </div>
        );
    }
}

export default App;
