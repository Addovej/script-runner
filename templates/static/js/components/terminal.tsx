import * as React from 'react';
import Iframe from 'react-iframe'
import {MDBContainer, MDBRow} from "mdbreact";

interface Props {
}

export default class XTerminal extends React.Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MDBContainer fluid>
                <MDBRow className="main-content">
                    <Iframe
                        url="http://127.0.0.1:8888"
                        position="absolute"
                        id="terminal"
                    />
                </MDBRow>
            </MDBContainer>
        )
    }
}
