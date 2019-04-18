import * as React from 'react';
import Editor from 'react-simple-code-editor';
import {highlight, languages} from 'prismjs/components/prism-core';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import {filesystemAPI} from "../../api";

interface Props {
    text: string;
    currentFile: string;
    onCloseClick: any;
    onRunClick: any;
}

interface State {
    text: string;
    prevText: string;
    saveMessage: string;
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
            prevText: props.text,
            saveMessage: null
        };
    }

    saveFile = async () => {
        const result = await filesystemAPI.save_file(this.props.currentFile, this.state.text);
        this.setState({
            saveMessage: result.data.message,
            prevText: this.state.text
        });
        console.log(this.state.saveMessage)
    };

    public render() {
        const {text, prevText} = this.state;
        const {currentFile, onRunClick, onCloseClick} = this.props;

        return (
            <div className="files-row-viewer">
                <h2 className='h2-file-header'>File is opened: {currentFile}</h2>
                <div>
                    <button
                        onClick={onCloseClick}
                        className='file-close-btn btn btn-primary'
                    >
                        X
                    </button>
                    <button
                        onClick={onRunClick}
                        className='file-run-btn btn btn-primary'
                    >
                        Run
                    </button>
                    <button
                        onClick={this.saveFile}
                        className='file-save-btn btn btn-primary'
                        disabled={prevText == text}
                    >
                        Save
                    </button>
                </div>
                <div style={{height: '550px', overflow: 'scroll', display: 'block'}} className='file-viewer scrollbar'>
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
