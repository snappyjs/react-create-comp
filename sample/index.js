'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class ReactCreateComp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <h4>Working</h4>;
    }
}

ReactDOM.render(<ReactCreateComp />, document.getElementById('app'));

export default ReactCreateComp;
