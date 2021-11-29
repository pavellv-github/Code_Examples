import { utilMemo } from '@lib/utils-pkg';
import React from 'react';
import { TCarPaymentCard, TCarPaymentCardView } from './types/carPaymentCardTypes';
import { CarPaymentCardView } from './view/CarPaymentCardView';

/** Universal ___CarPaymentCard___ component */
const CarPaymentCard: TCarPaymentCard.FC = utilMemo<TCarPaymentCard.Props>((props) => {
  const viewCallbacks: TCarPaymentCardView.Callbacks = {};
  const viewRenderers: TCarPaymentCardView.Renderers = {};
  return <CarPaymentCardView {...viewCallbacks} {...viewRenderers} {...props} />;
});

CarPaymentCard.displayName = 'CarPaymentCard';

export { CarPaymentCard };
