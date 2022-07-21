import { utilMemo } from '@lib/utils-pkg';
import React from 'react';
import { TStepNavigationItem, TStepNavigationItemView } from './types/stepNavigationItemTypes';
import { StepNavigationItemView } from './view/StepNavigationItemView';

/** ___StepNavigationItem___ component for ___StepNavigation___ component */
const StepNavigationItem: TStepNavigationItem.FC = utilMemo<TStepNavigationItem.Props>((props) => {
  const viewCallbacks: TStepNavigationItemView.Callbacks = {};
  const viewRenderers: TStepNavigationItemView.Renderers = {};
  return <StepNavigationItemView {...viewCallbacks} {...viewRenderers} {...props} />;
});

StepNavigationItem.displayName = 'StepNavigationItem';

export { StepNavigationItem };
