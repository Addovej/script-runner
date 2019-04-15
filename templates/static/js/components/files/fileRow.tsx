import * as React from 'react';
import {Link} from 'react-router-dom';
import {FileEntity} from '../../model';

interface Props {
    file: FileEntity;
    handleFolderOnClick: any;
    handleFileOnClick: any;
}

export const FileRow: React.FunctionComponent<Props> = ({file, handleFolderOnClick, handleFileOnClick}) => {
    return (
        <tr>
            <td className='file-td'>
                <button
                    className='file-btn btn btn-secondary btn-lg btn-block btn-outline-secondary'
                    key={file.path}
                    onDoubleClick={e => file.isFolder ? handleFolderOnClick(file.path) : handleFileOnClick(file.path)}
                >
                    {file.name}
                </button>
            </td>
        </tr>
    );
};