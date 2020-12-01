import React, { Component } from 'react';
import NoSSR from '~/src/helpers/noSSR';
import { PopupAuth } from './styled';
import AuthForm from '~/src/components/AuthForm';

class PopupNoAuth extends Component {

    render() {
        return (
            <NoSSR>
                <PopupAuth isOpen={this.props.open} onClose={this.props.close}>
                    <AuthForm getParams={`?referrer=${location.pathname}&forceRedirect=true`}/>
                </PopupAuth>
            </NoSSR>
        );
    }

}

export default PopupNoAuth;
