import { GlobalStyle, projectTheme } from '@lib/project-styles-pkg';
import { Annotations } from '@storybook/addons';
import { Story } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { CarPaymentCardForPayment, TCarPaymentCardForPayment } from '..';

export default {
  component: CarPaymentCardForPayment,
  decorators: [
    (StoryComponent) => (
      <>
        <ThemeProvider theme={projectTheme}>
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
  title: 'Project/CarPaymentCard/components/CarPaymentCardForPayment',
} as Annotations<TCarPaymentCardForPayment.Props, React.ReactElement>;

export const $CarPaymentCardForPayment: Story<TCarPaymentCardForPayment.Props> = (props) => (
  <CarPaymentCardForPayment {...props} />
);

$CarPaymentCardForPayment.args = {} as TCarPaymentCardForPayment.Props;

$CarPaymentCardForPayment.argTypes = {};
