import * as React from 'react';

export const About: React.FunctionComponent<{}> = () => {
    return (
        <div className="row about-page col-12">
            <div className="col-2 top-buffer">
                <h3>Highlights</h3>
                <hr/>
                <h3>
                    <small>
                        The most interesting parts worth to take a look
                    </small>
                </h3>
            </div>
        </div>
    );
};
