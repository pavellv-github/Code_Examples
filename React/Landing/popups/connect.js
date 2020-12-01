import React, { Component } from 'react';
import {
    PopupButtonStyled,
    Container,
    PopupTitle,
    PopupText
} from '../forms/formStyle';
import NoSSR from '~/src/helpers/noSSR';
import { declOfNum } from '@ertelecom/ui-react/components/helpers';
import DefaultPopup from '@ertelecom/ui-react/components/popups/defaultPopup';

class PopupConnect extends Component {

    render() {
        const { openConnect, info, selectedValue, unset, close, connect } = this.props;
        const monthText = declOfNum(['', '-х', '-и']);

        return (
            <NoSSR>
                <DefaultPopup isOpen={openConnect} backgroundColor='#fff' closeColor='#000' width='577px' onClose={close}>
                    <Container>
                        <PopupTitle>Подключение пакета  &laquo;{info.name}&raquo;</PopupTitle>

                        <PopupText>Ваш выбор: {selectedValue && selectedValue.duration !== '0' ? `подписка на ${selectedValue.duration} мес. — ${selectedValue.__text} р/мес`
                            : `базовая цена ${info.base_cost} р/мес`}</PopupText>

                        {selectedValue && selectedValue.duration > 0 && !unset
                            ?  <PopupText>По окончании {selectedValue.duration}{monthText(selectedValue.duration)} месяцев пакет каналов продлится по базовой цене.</PopupText>
                            : selectedValue && selectedValue.duration > 0 && unset
                                ? <PopupText>По окончании {selectedValue.duration}{monthText(selectedValue.duration)} месяцев пакет отключится автоматически.</PopupText> : null}

                        <PopupButtonStyled type='primary' text='Подключить' onClick={connect()} />
                        <PopupButtonStyled type='secondary' text='Отмена' onClick={close} />
                    </Container>
                </DefaultPopup>
            </NoSSR>
        );
    }


}

export default PopupConnect;
