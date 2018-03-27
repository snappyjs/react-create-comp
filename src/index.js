'use strict';

/**
 * This is where you develop your components.
 * You can use the tools from the sandbox to
 * change the props that you input to it.
 */

import React from 'react';

const ExampleComponent = ({address, name, isVisible }) => {
    if(!isVisible) return null;
    return (
        <div>
            <h1>I'm an example component from {name}</h1>
            <p>
                If you want a complete tutorial on how to use this package visit:
                {address}
            </p>
        </div>
    );
};

export default ExampleComponent;
