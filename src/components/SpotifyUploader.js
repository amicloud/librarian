import React, {Component} from "react";
import Spotify from "spotify-web-api-js";
import Bottleneck from "bottleneck";

class SpotifyUploader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadType: 'albums',
            albums: [],
            songs: [],
            list: [],
            statuses: {},
            found: 0,
            saved: 0,
            fail_search: 0,
            fail_save: 0
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onUploadTypeChanged = this.onUploadTypeChanged.bind(this);
        this.getDistinctAlbums = this.getDistinctAlbums.bind(this);
        this.uploadSongs = this.uploadSongs.bind(this);
        this.uploadAlbums = this.uploadAlbums.bind(this);
        this.getSongs = this.getSongs.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        switch (this.state.uploadType) {
            case('albums'):
                this.uploadAlbums();
                break;
            case('songs'):
                this.uploadSongs();
                break;
            default:
                break;
        }
    }

    getDistinctAlbums() {
        const records = this.props.library;
        let unique = {};
        let distinct = [];
        for (let i in records) {
            if (typeof (unique[records[i].albumId]) == "undefined") {
                distinct.push(records[i].albumId);
            }
            unique[records[i].albumId] = 0;
        }
        let albums = [];
        distinct.forEach((id) => {
            let record = records.filter(r => r.albumId === id)[0];
            albums.push({artist: record.artist, album: record.album, id: record.albumId});
        });
        this.setState({albums: albums, list: albums, max: albums.length});
    }

    getSongs() {
        const records = this.props.library;
        let songs = [];
        records.forEach((record) => {
            songs.push({artist: record.artist, album: record.album, id: record.id, title: record.title});
        });
        this.setState({songs: songs, list: songs, max: songs.length});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.library !== prevProps.library) {
            if (this.state.uploadType === "albums") this.getDistinctAlbums();
            if (this.state.uploadType === "songs") this.getSongs();
        }
    }

    uploadAlbums() {
        const limiter = new Bottleneck({
            maxConcurrent: 2,
            minTime: 175
        });

        const s = new Spotify();
        s.setAccessToken(this.props.spotifyToken);

        for (let album of this.state.albums) {
            limiter.schedule(() => s.searchAlbums("album:" + album.album + " artist:" + album.artist))
                   .then(data => {
                       console.log("search completed");
                       if (data.albums.items.length) {
                           let statuses = this.state.statuses;
                           statuses[album.id] = "ok_search";
                           let found = this.state.found + 1;
                           this.setState({statuses: statuses, found: found});
                           let spotifyId = data.albums.items[0].id;
                           console.log(`found ${spotifyId}`);
                           limiter.schedule(() => s.addToMySavedAlbums([spotifyId], null))
                                  .then(() => {
                                          let statuses = this.state.statuses;
                                          statuses[album.id] = "ok_save";
                                          let saved = this.state.saved + 1;
                                          this.setState({statuses: statuses, saved: saved});
                                          console.log(`saved an album`);
                                      }, error => {
                                          console.log(error);
                                          if (error.status === 429) console.error("Rate limited!");
                                          let statuses = this.state.statuses;
                                          statuses[album.id] = "fail_save";
                                          let failed = this.state.fail_save + 1;
                                          this.setState({statuses: statuses, fail_save: failed});

                                      }
                                  );
                       } else {
                           let statuses = this.state.statuses;
                           statuses[album.id] = "fail_search";
                           let failed = this.state.fail_search + 1;
                           this.setState({statuses: statuses, fail_search: failed});
                       }
                   }, error => {
                       console.log(error);
                       if (error.status === 429) console.error("Rate limited!");
                       let statuses = this.state.statuses;
                       statuses[album.id] = "fail_search";
                       let failed = this.state.fail_search + 1;
                       this.setState({statuses: statuses, fail_search: failed});
                   });

        }
    }

    uploadSongs() {
        const limiter = new Bottleneck({
            maxConcurrent: 2,
            minTime: 175
        });

        const s = new Spotify();
        s.setAccessToken(this.props.spotifyToken);

        for (let song of this.state.songs) {
            limiter.schedule(() => s.searchTracks(song.title + " album:" + song.album + " artist:" + song.artist))
                   .then(data => {
                       console.log("search completed");
                       if (data.tracks.items.length) {
                           let statuses = this.state.statuses;
                           statuses[song.id] = "ok_search";
                           let found = this.state.found + 1;
                           this.setState({statuses: statuses, found: found});
                           let spotifyId = data.id;
                           console.log(`found ${spotifyId}`);
                           limiter.schedule(() => s.addToMySavedTracks([spotifyId], null))
                                  .then(() => {
                                          let statuses = this.state.statuses;
                                          statuses[song.id] = "ok_save";
                                          let saved = this.state.saved + 1;
                                          this.setState({statuses: statuses, saved: saved});
                                          console.log(`saved a song`);
                                      }, error => {
                                          console.log(error);
                                          if (error.status === 429) console.error("Rate limited!");
                                          let statuses = this.state.statuses;
                                          statuses[song.id] = "fail_save";
                                          let failed = this.state.fail_save + 1;
                                          this.setState({statuses: statuses, fail_save: failed});
                                          console.log(`failed to save a song`);
                                      }
                                  );
                       } else {
                           let statuses = this.state.statuses;
                           statuses[song.id] = "fail_search";
                           let failed = this.state.fail_search + 1;
                           this.setState({statuses: statuses, fail_search: failed});
                       }
                   }, error => {
                       console.log(error);
                       if (error.status === 429) console.error("Rate limited!");
                       let statuses = this.state.statuses;
                       statuses[song.id] = "fail_search";
                       let failed = this.state.fail_search + 1;
                       this.setState({statuses: statuses, fail_search: failed});
                       console.log(`failed to find a song`);

                   });

        }
    }

    onUploadTypeChanged(event) {
        this.setState({uploadType: event.target.value});
        if (event.target.value === "albums") this.getDistinctAlbums();
        if (event.target.value === "songs") this.getSongs();
        this.setState({statuses: {}});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <p>Upload tracks by:</p>
                    <div className={'radio'}>
                        <label>Albums: Save entire albums to Spotify library
                            <input type='radio' onChange={this.onUploadTypeChanged} value='albums'
                                   checked={this.state.uploadType === "albums"}/>
                        </label>
                    </div>
                    <div className={'radio'}>
                        <label>Songs: Save individual songs to Spotify library
                            <input type='radio' onChange={this.onUploadTypeChanged} value='songs'
                                   checked={this.state.uploadType === "songs"}/>
                        </label>
                    </div>
                    <p></p>
                    <input id='spotifyUpload' className='btn' type='submit'
                           value={'Upload by ' + this.state.uploadType.slice(0, -1)}/>
                </form>
                <div className={'status'}>Unique {this.state.uploadType}: {this.state.list.length}</div>
                <div className={'status'}>Found: {this.state.found} -- Saved: {this.state.saved}</div>
                <div className={'errors'}>Search failures: {this.state.fail_search} -- Save failures: {this.state.fail_save}</div>
                <div className={'list'}>
                    {this.state.list.map(record => {
                        let status = this.state.statuses[record.id];
                        return (
                            <div id={record.id} key={record.id}
                                 className={'list-record' + (status ? " " + status : "")}>
                                {record.title ? record.title + " - " : ""}{record.album} - {record.artist}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

}

export default SpotifyUploader;