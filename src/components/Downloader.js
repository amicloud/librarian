import React, {Component} from "react";

class Downloader extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='download'>
                <p><strong>Download</strong> and run this program to download a .csv of your Google Play Music All Access library.
                    You <strong>MUST</strong> enable "<a href='https://myaccount.google.com/lesssecureapps'>Allow less
                        secure apps</a>" in your google account.</p>
                <button><a id='downloadWindows' href="https://storage.googleapis.com/librarian-executables/gpm-librarian-win.exe">Windows</a></button>
                <button><a id='downloadMac' href="https://storage.googleapis.com/librarian-executables/gpm-librarian-macos">Mac</a></button>
                <button><a id='downloadLinux' href="https://storage.googleapis.com/librarian-executables/gpm-librarian-linux">Linux</a></button>

            </div>

        );
    }

}

export default Downloader;