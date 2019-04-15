import * as React from 'react';
import Header from './Header';


interface Props {
}

export default class Home extends React.Component <Props> {
    render() {
        return (
            <div className='container'>
                <Header logo={'public/images/image.png'}/>
                <h1>Some Test Message!</h1>
            </div>
        )
    }
}
