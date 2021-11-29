import { utilMemo } from '@lib/utils-pkg';
import React from 'react';
import { TCarPaymentCardForPayment, TCarPaymentCardForPaymentView } from './types/carPaymentCardForPaymentTypes';
import { CarPaymentCardForPaymentView } from './view/carPaymentCardForPaymentView';

/** Universal ___CarPaymentCardForPayment___ component */
const CarPaymentCardForPayment: TCarPaymentCardForPayment.FC = utilMemo<TCarPaymentCardForPayment.Props>((props) => {
  const viewCallbacks: TCarPaymentCardForPaymentView.Callbacks = {};
  const viewRenderers: TCarPaymentCardForPaymentView.Renderers = {};
  return <CarPaymentCardForPaymentView {...viewCallbacks} {...viewRenderers} {...props} />;
});

CarPaymentCardForPayment.displayName = 'CarPaymentCardForPayment';

export { CarPaymentCardForPayment };
