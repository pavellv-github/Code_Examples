import React, { useCallback, useState } from 'react';
import { Wrapper, ActionText, BlockValue, CurrentValue, OldValue, Description } from './styled';


const Value = props => {

    const {
        value,
        valueAction,
        valueActionPeriod,
        type,
        valueText,
        onClick,
        labelBottom,
        className,
        description = '',
    } = props;

    const [isHover, setHover] = useState(false);

    const isHavePromoValue = !!(valueAction && Number(valueAction) > 0);
    const isHavePromoPeriod = !!(valueActionPeriod && Number(valueActionPeriod) > 0);
    let textAction;
    switch (type) {
        case 'speed':
            textAction = `бесплатное ускорение на ${valueActionPeriod} мес.`;
            break;
        case 'quantityChannels':
            textAction = `каналы в подарок на ${valueActionPeriod} мес`;
            break;
    }

    const mouseOverHandler = useCallback(() => setHover(true), []);
    const mouseOutHandler = useCallback(() => setHover(false), []);

    return (
        <Wrapper isHavePromoPeriod={isHavePromoPeriod} className={className}>
            {
                isHavePromoPeriod &&
                <ActionText>{textAction}</ActionText>
            }
            <BlockValue labelBottom={labelBottom}>
                <CurrentValue
                    type={type}
                    onClick={type === 'quantityChannels' ? onClick : null}
                    onMouseOver={mouseOverHandler}
                    onMouseOut={mouseOutHandler}
                >
                    {isHavePromoValue && <OldValue>{value}&nbsp;</OldValue>}
                    {isHavePromoValue ? valueAction : value} <span>{valueText}</span>
                    {
                        (type === 'equipment' && description) &&
                        <Description isHover={isHover} dangerouslySetInnerHTML={{ __html: description }} />
                    }
                </CurrentValue>
            </BlockValue>
        </Wrapper>
    );
};

export default Value;
