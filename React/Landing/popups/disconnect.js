import React, { Component } from 'react';
import {
    PopupButtonStyled,
    Container,
    PopupTitle,
    PopupText
} from '../forms/formStyle';
import NoSSR from '~/src/helpers/noSSR';
import DefaultPopup from '@ertelecom/ui-react/components/popups/defaultPopup';

class PopupDisconnect extends Component {

    render() {
        const { openDisconnect, info, close, connect } = this.props;
        let unsetDate;
        if (info.state) {
            unsetDate = new Date(info.state.unset_from * 1000).toLocaleDateString();
        }
        return (
            <NoSSR>
                <DefaultPopup isOpen={openDisconnect} backgroundColor='#fff' closeColor='#000' width='577px' onClose={close}>
                    <Container>
                        <PopupTitle>Отключение</PopupTitle>
                        <PopupText> Отключить пакет с {unsetDate}?</PopupText>
                        <PopupButtonStyled type='primary' text='Отключить' onClick={connect()} />
                        <PopupButtonStyled type='secondary' text='Отмена' onClick={close} />
                    </Container>
                </DefaultPopup>
            </NoSSR>
        );
    }


}

export default PopupDisconnect;
