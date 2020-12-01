import React from 'react';
import { Wrapper, Text, SimpleLink } from './styled';

const TuningTariff = ({ tariff }) => {

    const tariffSettingsUrl = `${tariff.alias === 'constructor' ? '' : tariff.location}/${tariff.alias}`;

    return (
        <Wrapper>
            <Text>Добавьте к своему тарифу антивирус для защиты и роутер, чтобы интернет работал еще быстрее. <SimpleLink href={tariffSettingsUrl} data-test='tuningTariff'>Добавить</SimpleLink></Text>
        </Wrapper>
    );
};

export default TuningTariff;
