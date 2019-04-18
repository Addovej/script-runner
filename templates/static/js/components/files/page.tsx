import * as React from 'react';
import {MDBContainer, MDBRow, MDBCol, MDBScrollbar} from "mdbreact";
import {FileEntity} from '../../model';
import {filesystemAPI} from '../../api';
import {FileHeader} from './fileHeader';
import {FileRow} from './fileRow';
import FileViewer from './fileViewer';
import Terminal from '../terminal';

interface State {
    files: FileEntity[];
    rootDir: string;
    currentDir: string;
    previousDir: string;
    fileName: string;
    fileContent: string;
    runMessage: string;
    showTerminal: boolean;
}

interface Props {
}

export default class FilesPage extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            rootDir: '',
            currentDir: '',
            previousDir: '',
            fileName: '',
            fileContent: null,
            runMessage: '',
            showTerminal: false
        };
    }

    public componentDidMount() {
        this.getRootFolder()
    }

    getRootFolder = async () => {
        const result = await filesystemAPI.get_root_folder();
        this.setState({
            files: result.data.folders.concat(result.data.files),
            currentDir: result.data.current,
            rootDir: result.data.current
        });
    };

    getFolder = async (path) => {
        // TODO: need fix it
        const result = await filesystemAPI.get_folder(path.replace(/\//g, '-'));
        this.setState({
            files: result.data.folders.concat(result.data.files),
            previousDir: this.state.currentDir,
            currentDir: result.data.current
        });
    };

    getFileContent = async (path) => {
        // TODO: need fix it
        this.setState({fileContent: null, fileName: null});
        const result = await filesystemAPI.get_file_content(path.replace(/\//g, '-'));
        this.setState({
            fileName: path,
            fileContent: result.data.content
        });
    };

    runScript = async (path) => {
        // TODO: need fix it
        const result = await filesystemAPI.run_script(this.state.fileName.replace(/\//g, '-'));
        this.setState({
            runMessage: result.data.message
        });
    };


    public render() {
        const {currentDir, fileName, fileContent, rootDir, previousDir, files, showTerminal} = this.state;

        return (
            <MDBContainer fluid>
                <MDBRow className="main-content">
                    <MDBCol md="5">
                        <div className="files-row-explorer">
                            <h2 className='h2-file-header'>Current directory: {currentDir}</h2>
                            <div>
                                <button
                                    onClick={e => this.getFolder(previousDir)}
                                    className='file-back-btn btn btn-primary'
                                    disabled={!previousDir || currentDir == rootDir}
                                >
                                    Back
                                </button>
                            </div>
                            <table className="table file-table">
                                <thead>{FileHeader}</thead>
                                <tbody className="scrollbar">
                                {
                                    files.map(
                                        (file) => <FileRow
                                            file={file}
                                            key={file.path}
                                            handleFolderOnClick={this.getFolder}
                                            handleFileOnClick={this.getFileContent}
                                        />
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </MDBCol>
                    <MDBCol md="1"> </MDBCol>
                    <MDBCol md="6">
                        {fileContent != null && <FileViewer
                            text={fileContent}
                            currentFile={fileName}
                            onCloseClick={() => this.setState({fileContent: null, fileName: null})}
                            onRunClick={this.runScript}
                        />}
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <div>
                        <button
                            onClick={() => {this.setState({showTerminal: !showTerminal})}}
                            className='terminal-btn btn btn-primary'
                        >
                            Show/Hide Terminal
                        </button>
                        {showTerminal && <Terminal/>}
                    </div>
                </MDBRow>
            </MDBContainer>
        );
    }
}
