import React from 'react';
import { Wrapper, CurrentValue, OldValue, ActionText } from './styled';
import { declOfNum } from '@ertelecom/ui-react/components/helpers';
import { NON_BREAKING_SPACE } from '~/src/constants/simbols';

const monthText = declOfNum(['месяц', 'месяца', 'месяцев']);

const TextValue = props => {

    const {
        value,
        valueAction,
        valueActionPeriod,
        valueText,
        saleAction,
        className,
    } = props;

    const isHavePromoValue = !!(valueAction && Number(valueAction) > 0);
    const isHavePromoPeriod = !!(valueActionPeriod && Number(valueActionPeriod) > 0);
    const mainText = 'абонентская плата';
    const promoText = `цена по акции на${NON_BREAKING_SPACE}${valueActionPeriod}${NON_BREAKING_SPACE}${monthText(valueActionPeriod)}`;

    return (
        <Wrapper isHavePromoPeriod={isHavePromoPeriod} className={className}>
            {isHavePromoValue && <OldValue>{value}&nbsp;</OldValue>}
            {saleAction && <ActionText>{saleAction}</ActionText>}
            <CurrentValue>{isHavePromoValue ? valueAction : value}</CurrentValue> <span>{valueText}</span>
            <span> - {isHavePromoValue ? promoText : mainText}</span>
        </Wrapper>
    );
};

export default TextValue;
