import * as React from 'react';

interface Props {
    logo: string;
}

export default class Header extends React.Component <Props> {

    render() {
        return (
            <div className='header-page'>
                <img className='ui logo image' src={this.props.logo}/>
                <span className='header'>
              Medium Articles
          </span>
            </div>
        );
    }
}
