import { GlobalStyle, marketplaceTheme } from '@lib/marketplace-styles-pkg';
import { Annotations } from '@storybook/addons';
import { Story } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StepNavigation, TStepNavigation } from '..';

export default {
  component: StepNavigation,
  decorators: [
    (StoryComponent) => (
      <>
        <ThemeProvider theme={marketplaceTheme}>
          <GlobalStyle />
          <StoryComponent />
        </ThemeProvider>
      </>
    ),
  ],
  includeStories: /^\$/,
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: true,
    },
  },
  title: 'Marketplace/StepNavigation',
} as Annotations<TStepNavigation.Props, React.ReactElement>;

const items = [
  {
    id: 1,
    title: 'Коммерческие предложения',
    status: 1,
  },
  {
    id: 2,
    title: 'Документы',
    status: 1,
  },
  {
    id: 3,
    title: 'Анкета',
    status: 2,
  },
  {
    id: 4,
    title: 'Договоры',
    status: 3,
  },
  {
    id: 5,
    title: 'Оплата',
    status: 0,
  },
];

const handlerEvent = (event: any, number: Number, title: String, status: Number) => {
  console.log(event, number, title, status);
};

export const $StepNavigation: Story<TStepNavigation.Props> = (props) => (
  <StepNavigation {...props} propsList={items} propsCurrentStep={4} propsHandlerChange={handlerEvent} />
);

$StepNavigation.args = {};

$StepNavigation.argTypes = {};
