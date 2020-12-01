import React from 'react';
import { Wrapper, Icon, Title, TitleBlock, ValueBlock } from './styled';
import Value from '../Value';
import { icons } from '../icons';

const Option = ({
    compact,
    headingColor,
    title,
    value,
    valueText,
    valueAction,
    valueActionPeriod,
    typeValue,
    onClickValue,
    typeOptions,
    image = null,
    horizontally = false,
    descriptionValue = ''
}) => {

    const isHavePromoPeriod = !!(valueActionPeriod && Number(valueActionPeriod) > 0);

    return (
        <Wrapper isHavePromoPeriod={isHavePromoPeriod}>
            <TitleBlock title={title} horizontally={horizontally}>
                {
                    !compact &&
                    <Icon headingColor={typeOptions !== 'equipment' ? headingColor : null}>
                        {typeOptions !== 'equipment'
                            ? icons[typeOptions]()
                            : image ? <img src={image} /> : null}
                    </Icon>
                }

                <Title compact={compact} value={valueText}>{title}</Title>
            </TitleBlock>
            <ValueBlock>
                <Value
                    headingColor={headingColor}
                    value={value}
                    valueText={valueText}
                    valueAction={valueAction}
                    valueActionPeriod={valueActionPeriod}
                    type={typeValue}
                    onClick={onClickValue}
                    description={descriptionValue}
                    labelBottom
                />
            </ValueBlock>
        </Wrapper>
    );
};

export default Option;
