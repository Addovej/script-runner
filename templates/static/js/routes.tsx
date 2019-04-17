import * as React from 'react';
import {Route, Switch, HashRouter} from 'react-router-dom';
import {App} from './app';
import FilesPage from './components/files/page';
import LogsPage from './components/files/logPage';
// import Home from './components/home';
// import XTerminal from "./components/Terminal";

export const AppRouter: React.FunctionComponent<{}> = () => {
    return (
        <HashRouter>
            <div className="container-fluid">
                <Route path="/" component={App}/>
                <Switch>
                    {/*<Route path="/" component={Home}/>*/}
                    <Route path="/files" component={FilesPage}/>
                    <Route path="/logs" component={LogsPage}/>
                    {/*<Route path="/terminal" component={XTerminal} />*/}
                </Switch>
            </div>
        </HashRouter>
    );
};
