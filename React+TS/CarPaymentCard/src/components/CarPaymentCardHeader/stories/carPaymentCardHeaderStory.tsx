import { GlobalStyle, projectTheme } from '@lib/project-styles-pkg';
import { Annotations } from '@storybook/addons';
import { Story } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { CarPaymentCardHeader, TCarPaymentCardHeader } from '..';

export default {
  component: CarPaymentCardHeader,
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
  title: 'Project/CarPaymentCard/components/CarPaymentCardHeader',
} as Annotations<TCarPaymentCardHeader.Props, React.ReactElement>;

export const $CarPaymentCardHeader: Story<TCarPaymentCardHeader.Props> = (props) => <CarPaymentCardHeader {...props} />;

$CarPaymentCardHeader.args = {} as TCarPaymentCardHeader.Props;

$CarPaymentCardHeader.argTypes = {};
