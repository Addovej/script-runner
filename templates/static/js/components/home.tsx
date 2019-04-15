import * as React from 'react';
import Header from './header';
import { filesystemAPI } from '../api';


interface State {
    message: any;
}

interface Props {
}

export default class Home extends React.Component <Props, State> {
    constructor(props) {
        super(props);
        this.state = {message: ''};
    }

    componentDidMount() {
        filesystemAPI.get_test()
            .then((message) => {
                this.setState({message: message.data.message})
            })
    }

    render() {
        return (
            <div className='container'>
                <h1>{this.state.message}</h1>
            </div>
        )
    }
}
