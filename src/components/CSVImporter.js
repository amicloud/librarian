import React, {Component} from "react";
import parse from "csv-parse/lib/sync";
import ReactFileReader from 'react-file-reader';
import { Base64 } from 'js-base64';

class CSVImporter extends Component {

    constructor(props) {
        super(props);

    }

    importCSV = (files) => {
        const csv = Base64.decode(files.base64.substr(21)); // Remove encoding info from start of string
        const records = parse(csv, {
            columns: true,
            skip_empty_lines: true
        });
        this.props.callback(records);
    };

    render() {
        return (
            <div className="csv-importer">
                <ReactFileReader handleFiles={this.importCSV} fileTypes={".csv"} base64={true}>
                    <button className='btn'>Upload</button>
                </ReactFileReader>
            </div>
        );
    }

}

export default CSVImporter;