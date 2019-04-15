import * as React from 'react';
import {Link} from 'react-router-dom';
import {FileEntity} from '../../model';

interface Props {
    file: FileEntity;
}

export const FileRow: React.FunctionComponent<Props> = ({file}) => {
    return (
        <tr>
            <td className='file-td'>
                <button
                    className='file-btn btn btn-secondary btn-lg btn-block btn-outline-secondary'
                    key={file.path} >
                    {file.name}
                </button>
            </td>
        </tr>
    );
};