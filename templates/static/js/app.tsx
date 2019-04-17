import * as React from 'react';
import Header from './components/header';

export const App: React.FunctionComponent<{}> = (props) => {
  return (
    <div className="container-fluid">
      <Header logo={'../public/images/logos/logo.png'}/>
      {props.children}
    </div>
  );
};
