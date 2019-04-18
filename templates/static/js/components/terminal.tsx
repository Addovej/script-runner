import * as React from 'react';
import Iframe from 'react-iframe'
import {MDBContainer, MDBRow} from "mdbreact";

interface Props {
}

export default class Terminal extends React.Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MDBContainer fluid>
                <MDBRow className="main-content">
                    <Iframe
                        url="/wssh"
                        position="absolute"
                        id="terminal"
                    />
                </MDBRow>
            </MDBContainer>
        )
    }
}
