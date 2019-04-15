import * as React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import Home from './components/Home';
// import XTerminal from "./components/Terminal";

export const AppRouter: React.FunctionComponent<{}> = () => {
  return (
    <HashRouter>
      <div className="container-fluid">
        <Route path="/" component={Home} />
        <Switch>
          {/*<Route path="/terminal" component={XTerminal} />*/}
        </Switch>
      </div>
    </HashRouter>
  );
};
