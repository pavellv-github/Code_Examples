import React, { Component } from 'react';
import {
    Container,
    PopupTitle,
    PopupTextInfo
} from '../forms/formStyle';
import NoSSR from '~/src/helpers/noSSR';
import DefaultPopup from '@ertelecom/ui-react/components/popups/defaultPopup';

class PopupResult extends Component {

    togglePopup = (open) => {
        this.props.close(open);
    };

    render() {
        const { info, open, close } = this.props;

        return (
            <NoSSR>
                <DefaultPopup isOpen={open} backgroundColor='#fff' closeColor='#000' width='577px' onClose={close}>
                    <Container>
                        <PopupTitle>{info.title}</PopupTitle>
                        <PopupTextInfo>{info.desc}</PopupTextInfo>
                    </Container>
                </DefaultPopup>
            </NoSSR>
        );
    }
}

export default PopupResult;
