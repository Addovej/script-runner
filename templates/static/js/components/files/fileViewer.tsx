import * as React from 'react';
import Editor from 'react-simple-code-editor';
import {highlight, languages} from 'prismjs/components/prism-core';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';

interface Props {
    text: string;
    currentFile: string;
    onCloseClick: any;
}

interface State {
    text: string;
    currentFile: string;
    onCloseClick: any;
}

const langs = {
    py: languages.python,
    sh: languages.python
};

export default class FileViewer extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text,
            currentFile: props.currentFile,
            onCloseClick: props.onCloseClick
        };
    }

    public componentDidMount() {
        // this.getRootFolder()
    }

    public render() {
        const {text, currentFile, onCloseClick} = this.state;
        return (
            <div className="files-row-viewer">
            <h2 className='h2-file-header'>File is opened: {currentFile}</h2>
            <div>
                <button
                    onClick={onCloseClick}
                    className='file-close-btn btn btn-secondary'
                >
                    X
                </button>
            </div>
            <div style={{height: '550px', overflow: 'scroll', display: 'block'}} className='file-viewer'>
                <Editor
                    value={text}
                    onValueChange={text => this.setState({text})}
                    highlight={text => highlight(text, langs[currentFile.split('.').pop()])}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                    }}
                />
            </div>
        </div>
        );
    }
}
