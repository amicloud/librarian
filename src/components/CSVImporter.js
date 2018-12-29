import React, {Component} from "react";
import parse from "csv-parse/lib/sync";
import ReactFileReader from 'react-file-reader';
import { Base64 } from 'js-base64';

class CSVImporter extends Component {

    constructor(props) {
        super(props);

    }

    importCSV = (files) => {
        let data = files.base64;
        // Remove encoding info if present for some reason linux wtf
        if(data.substr(0, 21).indexOf("data:text/csv;base64") !== -1){
            data = data.substr(21)
        }
        const csv = Base64.decode(data);
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