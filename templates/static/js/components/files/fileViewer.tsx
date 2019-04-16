import * as React from 'react';
import Highlight from 'react-highlight';

interface Props {
    text: string;
    currentFile: string;
    onCloseClick: any;
}

export const FileViewer: React.FunctionComponent<Props> = ({text, currentFile, onCloseClick}) => {
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
                <Highlight className={currentFile.split('.').pop()}>
                    {text}
                </Highlight>
            </div>
        </div>
    );
};
