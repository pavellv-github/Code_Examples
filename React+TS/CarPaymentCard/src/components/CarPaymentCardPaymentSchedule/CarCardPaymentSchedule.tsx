import { utilMemo } from '@lib/utils-pkg';
import React from 'react';
import {
  TCarPaymentCardPaymentSchedule,
  TCarPaymentCardPaymentScheduleView,
} from './types/carPaymentCardPaymentScheduleTypes';
import { CarPaymentCardPaymentScheduleView } from './view/CarPaymentCardPaymentScheduleView';

/** Universal ___CarPaymentCardPaymentSchedule___ component */
const CarPaymentCardPaymentSchedule: TCarPaymentCardPaymentSchedule.FC = utilMemo<TCarPaymentCardPaymentSchedule.Props>(
  (props) => {
    const viewCallbacks: TCarPaymentCardPaymentScheduleView.Callbacks = {};
    const viewRenderers: TCarPaymentCardPaymentScheduleView.Renderers = {};
    return <CarPaymentCardPaymentScheduleView {...viewCallbacks} {...viewRenderers} {...props} />;
  }
);

CarPaymentCardPaymentSchedule.displayName = 'CarPaymentCardPaymentSchedule';

export { CarPaymentCardPaymentSchedule };
