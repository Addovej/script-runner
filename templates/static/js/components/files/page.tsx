import * as React from 'react';
import {FileEntity} from '../../model';
import {filesystemAPI} from '../../api';
import { FileHeader } from './fileHeader';
import { FileRow } from './fileRow';

interface State {
    files: FileEntity[];
    currentDir: string;
}

interface Props {

}

export default class FilesPage extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {files: [], currentDir: ''};
        console.log('FilesPage construct')
    }

    public componentDidMount() {
        this.getRootFolder()
    }

    getRootFolder = async () => {
        const result = await filesystemAPI.get_root_folder();
        console.log('data: ', result.data);
        this.setState({
            files: result.data.folders.concat(result.data.files),
            currentDir: result.data.current
        });
        console.log('state: ', this.state);
    };

    public render() {
        return (
            <div className="files-row">
                <h2>Current directory: {this.state.currentDir}</h2>
                <table className="table file-table">
                    <thead>{FileHeader}</thead>
                    <tbody>
                    {
                        this.state.files.map(
                            (file) => <FileRow file={file} key={file.path}/>
                        )
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}
