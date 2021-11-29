import { GlobalStyle, projectTheme } from '@lib/project-styles-pkg';
import { Annotations } from '@storybook/addons';
import { Story } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { CarPaymentCard, TCarPaymentCard } from '..';
import { $CarPaymentCardForPayment } from '../components/CarPaymentCardForPayment/stories/carPaymentCardForPaymentStory';
import { $CarPaymentCardHeader } from '../components/CarPaymentCardHeader/stories/carPaymentCardHeaderStory';
import { $CarPaymentCardPaymentSchedule } from '../components/CarPaymentCardPaymentSchedule/stories/carPaymentCardPaymentScheduleStory';

export default {
  component: CarPaymentCard,
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
    layout: 'fullscreen',
    options: {
      showPanel: true,
    },
  },
  title: 'Project/CarPaymentCard',
} as Annotations<TCarPaymentCard.Props, React.ReactElement>;

const dataPaymentCar = {
  picture:
    'https://img1.freepng.ru/20180723/yjh/kisspng-car-door-car-seat-top-view-motor-vehicle-red-car-top-view-5b5593db860653.514404931532335067549.jpg',
  title: 'Kia Rio IV Рестайлинг',
  summa: '3 500 000',
  location: 'Москва, Авто-Гермес Lexus',
  date_of_issue: '15 января',
  payment: {
    descriptionPayment: [
      {
        title: 'Аванс',
        procent: '35',
        summa: '300 000',
      },
      {
        title: 'ОСАГО за 2021',
        summa: '10 000',
      },
      {
        title: 'КАСКО за 2021',
        summa: '40 000',
      },
    ],
    summary: '350 000',
  },
  shedule: [
    {
      title: 'Сумма остатка',
      description: '650 000 ₽',
    },
    {
      title: 'Срок лизинга',
      description: '24 месяца',
    },
    {
      title: 'В месяц',
      description: '25 000 ₽',
    },
    {
      title: 'Выкупной платеж',
      description: '1 000 ₽',
    },
  ],
  offer: '+ КАСКО 40 000 ₽ и ОСАГО ежегодно',
};

export const $CarPaymentCard: Story<TCarPaymentCard.Props> = (props) => (
  <CarPaymentCard {...props} propsData={dataPaymentCar} handlerClick={() => console.log('test')} />
);

$CarPaymentCard.args = {
  propsHeader: $CarPaymentCardForPayment.args,
  propsPayment: $CarPaymentCardHeader.args,
  propsShedule: $CarPaymentCardPaymentSchedule.args,
} as TCarPaymentCard.Props;

$CarPaymentCard.argTypes = {
  propsHeader: $CarPaymentCardForPayment.argTypes ?? {},
  propsPayment: $CarPaymentCardHeader.argTypes ?? {},
  propsShedule: $CarPaymentCardPaymentSchedule.argTypes ?? {},
};
