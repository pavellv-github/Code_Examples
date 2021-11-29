import { utilMemo } from '@lib/utils-pkg';
import React from 'react';
import { TCarPaymentCardHeader, TCarPaymentCardHeaderView } from './types/carPaymentCardHeaderTypes';
import { CarPaymentCardHeaderView } from './view/CarPaymentCardHeaderView';

/** Universal ___CarPaymentCardHeader___ component */
const CarPaymentCardHeader: TCarPaymentCardHeader.FC = utilMemo<TCarPaymentCardHeader.Props>((props) => {
  const viewCallbacks: TCarPaymentCardHeaderView.Callbacks = {};
  const viewRenderers: TCarPaymentCardHeaderView.Renderers = {};
  return <CarPaymentCardHeaderView {...viewCallbacks} {...viewRenderers} {...props} />;
});

CarPaymentCardHeader.displayName = 'CarPaymentCardHeader';

export { CarPaymentCardHeader };
