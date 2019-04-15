import * as React from 'react';
import Header from './components/header';
// import "react-table/react-table.css";

export const App: React.FunctionComponent<{}> = (props) => {
  return (
    <div className="container-fluid">
      <Header logo={'../public/images/image.png'}/>
      {props.children}
    </div>

  );
};
