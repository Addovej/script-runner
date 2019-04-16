import * as React from 'react';
import Highlight from 'react-highlight';
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
            fileContent: null
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
                <div style={{height: '550px', overflow: 'scroll', display: 'block'}} className='file-viewer'>
                    <Highlight className='txt'>
                        {fileContent}
                    </Highlight>
                </div>
            </div>
        );
    }
}
