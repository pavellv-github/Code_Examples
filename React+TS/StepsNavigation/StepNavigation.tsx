import { utilMemo } from '@lib/utils-pkg';
import React from 'react';
import { TStepNavigation, TStepNavigationView } from './types/stepNavigationTypes';
import { StepNavigationView } from './view/StepNavigationView';

/** ___StepNavigation___ component for ___Marketplace___ app */
const StepNavigation: TStepNavigation.FC = utilMemo<TStepNavigation.Props>((props) => {
  const viewCallbacks: TStepNavigationView.Callbacks = {};
  const viewRenderers: TStepNavigationView.Renderers = {};

  return <StepNavigationView {...viewCallbacks} {...viewRenderers} {...props} />;
});

StepNavigation.displayName = 'StepNavigation';

export { StepNavigation };
