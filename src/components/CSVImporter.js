import React, {Component} from "react";
import parse from "csv-parse/lib/sync";
import ReactFileReader from 'react-file-reader';
import { Base64 } from 'js-base64';

class CSVImporter extends Component {

    constructor(props) {
        super(props);

    }

    importCSV = (files) => {
        const csv = Base64.decode(files.base64.substr(21)); // Remove encoding info
        const records = parse(csv, {
            columns: true,
            skip_empty_lines: true
        });
        this.props.callback(records);
    };

    render() {
        return (
            <div className="csv-importer">
                <p>Then load your .csv file.</p>
                <ReactFileReader handleFiles={this.importCSV} fileTypes={".csv"} base64={true}>
                    <button id='csvImport' className='btn'>Select .csv file</button>
                </ReactFileReader>
            </div>
        );
    }

}

export default CSVImporter;