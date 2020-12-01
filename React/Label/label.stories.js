import React from 'react';
import { storiesOf } from '@storybook/react';
import Label from './index';
import styled from 'styled-components';

let LabelContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

let LabelItem = styled(Label)`
    margin-bottom: 10px;
`;

storiesOf('Метка', module).add('Метка', () => <LabelContainer>
    <LabelItem>самый мощный</LabelItem>
    <LabelItem radius='2px'>самый мощный</LabelItem>
    <LabelItem colorBackground='#27AE60'>самый мощный</LabelItem>
    <LabelItem colorBackground='#FFC618' colorFont='#000000'>самый мощный</LabelItem>
    <LabelItem colorBackground='#FFC618' colorFont='#000000' border='1px solid red'>самый мощный</LabelItem>
</LabelContainer>);
