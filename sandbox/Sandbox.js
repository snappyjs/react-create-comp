'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { hot } from 'react-hot-loader';
import Component from '../src/index';

import styles from './styles.scss';

class ReactCreateComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            props: {},
            error: false,
            value: ''
        };
    }

    _onPropsChange(e) {
        try {
            const props = JSON.parse(e.target.value);
            this.setState({
                error: false,
                props,
                value: JSON.stringify(props, null, 4)
            });
        } catch (err) {
            this.setState({
                error: true,
                value: e.target.value
            });
        }
    }

    render() {
        const { error, props, value } = this.state;
        console.log(error);

        return (
            <div>
                <div className={styles.editorcontainer}>
                    <h4>React-Create-Component</h4>
                    <p>
                        Read more on <a href="https://www.snappyjs.com">https://www.snappyjs.com</a>
                    </p>
                    <textarea
                        placeholder="Use JSON format to update the props for your component."
                        className={`${styles.textarea} ${error ? styles.error : ''}`}
                        onChange={this._onPropsChange.bind(this)}
                        value={value}
                    />
                </div>
                <Component {...this.state.props} />
            </div>
        );
    }
}

export default hot(module)(ReactCreateComp); //eslint-disable-line
