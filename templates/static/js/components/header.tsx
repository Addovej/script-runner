import * as React from 'react';
import {Link} from 'react-router-dom';

interface Props {
    logo: string;
}

export default class Header extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div className="row col-12">
                <nav className="navbar navbar-expand-lg navbar-light bg-white" id="navbar">
                    <img className="navbar-icon" src={this.props.logo} alt="logo"/>
                    <a className="navbar-brand" href="#">Home</a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/about"> About</Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link" to="/files"> Files </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
