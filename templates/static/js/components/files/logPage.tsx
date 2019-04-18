import * as React from 'react';
import Editor from 'react-simple-code-editor';
import {highlight, languages} from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import {filesystemAPI} from '../../api';

interface State {
    fileContent: string;
}

interface Props {
}

export default class LogsPage extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            fileContent: ''
        };
    }

    public componentDidMount() {
        this.getLogs()
    }

    getLogs = async () => {
        const result = await filesystemAPI.get_logs();
        this.setState({
            fileContent: result.data.content
        });
    };

    public render() {
        const {fileContent} = this.state;
        return (
            <div>
                <div style={{height: '550px', overflow: 'scroll', display: 'block'}} className='file-viewer scrollbar'>
                    <Editor
                        value={fileContent}
                        onValueChange={() => {}}
                        highlight={fileContent => highlight(fileContent, languages.clike, 'clike')}
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
