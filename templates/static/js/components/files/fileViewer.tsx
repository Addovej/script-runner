import * as React from 'react';
import Highlight from 'react-highlight';

interface Props {
    text: string;
    currentFile: string;
    onClick: any;
}

export const FileViewer: React.FunctionComponent<Props> = ({text, currentFile, onClick}) => {
    return (
        <div className="files-row-viewer">
            <h2 className='h2-file-header'>File is opened: {currentFile}</h2>
            <div>
                <button
                    onClick={onClick}
                    className='file-close-btn btn btn-secondary'
                >
                    X
                </button>
            </div>
            <div style={{height: '550px', overflow: 'scroll', display: 'block'}} className='file-viewer'>
                <Highlight className='python'>
                    {text}
                </Highlight>
            </div>
        </div>
    );
};
