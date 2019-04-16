import * as React from 'react';
import { XTerm } from 'react-xterm';
interface IState {
}
interface IProps {
}
interface IRefs {
    [k: string]: any;
    xterm: XTerm;
}
export default class XTerminal extends React.Component<IProps, IState> {
    constructor(props?: IProps, context?: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    refs: IRefs;
    throttleConsoleResize: any;
    render(): JSX.Element;
}
export {};
