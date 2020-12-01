import React from 'react';
import { storiesOf } from '@storybook/react';
import readme from './README.md';
import styled from 'styled-components';
import Accordion from './index';
import { withReadme } from 'storybook-readme';

let AccordionTitle = styled.div`
    font-size: 32px;
    line-height: 40px;
`;

let Content = styled.div`
    width: 100%;
    padding: 100px 50px;
    background: #dd99aa;
    color: #fff;
`;

class Example extends React.Component {
    state = {
        open: false
    }

    toggle = () => this.setState(state => ({ open: !state.open }));

    render() {
        let title = <AccordionTitle>текст</AccordionTitle>;
        return (
            <Accordion title={title} open={this.state.open} onOpen={this.toggle}>
                <Content>
                    <h1>текст</h1>
                </Content>
            </Accordion >
        );
    }
}

const Wrapper = styled.div`
    padding: 40px;
`;
const MarginAccordion = styled(Accordion)`
    margin-bottom: 30px;
`;

storiesOf('Аккордион', module)
    .addDecorator(withReadme(readme))
    .add('Базовый', () =>
        <Wrapper>
            <h2>Theme = bordered</h2>
            <MarginAccordion title='Текст'>
                текст
            </MarginAccordion>
            <MarginAccordion title='Открытый поумолчанию' defaultOpen={true}>
                текст
            </MarginAccordion>
            <h2>Theme = simple</h2>
            <MarginAccordion theme='simple' title='текст'>
                текст
            </MarginAccordion>
        </Wrapper>)
    .add('Controlled', () => <Example />);
