import { GlobalStyle, projectTheme } from '@lib/project-styles-pkg';
import { Annotations } from '@storybook/addons';
import { Story } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { TCarPaymentCardPaymentSchedule } from '..';
import { CarPaymentCardPaymentSchedule } from '../CarCardPaymentSchedule';

export default {
  component: CarPaymentCardPaymentSchedule,
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
  title: 'Project/CarPaymentCard/components/CarPaymentCardPaymentSchedule',
} as Annotations<TCarPaymentCardPaymentSchedule.Props, React.ReactElement>;

export const $CarPaymentCardPaymentSchedule: Story<TCarPaymentCardPaymentSchedule.Props> = (props) => (
  <CarPaymentCardPaymentSchedule {...props} />
);

$CarPaymentCardPaymentSchedule.args = {} as TCarPaymentCardPaymentSchedule.Props;

$CarPaymentCardPaymentSchedule.argTypes = {};
