'use strict';

/**
 * This file renders the Sandbox to the screen.
 * The Sandbox uses react-hot-loader to hot-load the
 * changes made to your components in the src dir.
 *
 * There's usually no reason
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Sandbox from './Sandbox';

ReactDOM.render(<Sandbox />, document.getElementById('app'));
