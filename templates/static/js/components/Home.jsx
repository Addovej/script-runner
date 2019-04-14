import React, {Component} from 'react';
import Header from './Header';

export default class Home extends Component {
    render() {
        return (
            <div className='container'>
                <Header logo={'public/images/image.png'}/>
                <h1>Some Test Message!</h1>
            </div>
        )
    }
}
