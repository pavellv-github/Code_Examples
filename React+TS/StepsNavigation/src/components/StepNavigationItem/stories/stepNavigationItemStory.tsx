import { GlobalStyle, marketplaceTheme } from '@lib/marketplace-styles-pkg';
import { Annotations } from '@storybook/addons';
import { Story } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StepNavigationItem, TStepNavigationItem } from '..';

export default {
  component: StepNavigationItem,
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
    options: {
      showPanel: true,
    },
  },
  title: 'Marketplace/StepNavigation/components/StepNavigationItem',
} as Annotations<TStepNavigationItem.Props, React.ReactElement>;

export const $StepNavigationItem: Story<TStepNavigationItem.Props> = (props) => (
  <StepNavigationItem {...props} propsNumber={1} propsTitle="Test" propsStatus={0} />
);

export const $StepNavigationItemActive: Story<TStepNavigationItem.Props> = (props) => (
  <StepNavigationItem {...props} propsNumber={1} propsTitle="Test" propsStatus={3} propsActivity={true} />
);

export const $StepNavigationItemPassed: Story<TStepNavigationItem.Props> = (props) => (
  <StepNavigationItem {...props} propsNumber={1} propsTitle="Test" propsStatus={1} />
);

export const $StepNavigationItemNotFilled: Story<TStepNavigationItem.Props> = (props) => (
  <StepNavigationItem {...props} propsNumber={1} propsTitle="Test" propsStatus={2} />
);

$StepNavigationItem.args = {} as TStepNavigationItem.Props;

$StepNavigationItem.argTypes = {};
