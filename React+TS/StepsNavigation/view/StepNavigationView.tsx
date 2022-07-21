import { Flex, FlexGroup } from '@uikit/flex';
import React from 'react';
import styled from 'styled-components';
import { StepNavigationItem } from '../components/StepNavigationItem';
import { TStepNavigationView } from '../types/stepNavigationTypes';

declare module 'styled-components' {
  export interface DefaultTheme extends TMarketplace.Theme {}
}

const Main = styled.div`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d5dbe0;
  box-sizing: border-box;
  border-radius: 12px;
`

const StepWrapper = styled(Flex)`
  margin-right: 40px;
`

// поправить предупреждение с list, currentStep, handlerChange
const StepNavigationView: TStepNavigationView.FC = ({ propsList, propsCurrentStep, propsHandlerChange  }) => (
  <Main>
    <FlexGroup>
        {propsList && propsList.map((item: {id: Number, title: String, status: Number}, index: any, ) => {
          return (
            <StepWrapper key={index}>
              <StepNavigationItem propsNumber={item.id} propsTitle={item.title} propsActivity={propsCurrentStep === item.id} propsStatus={item.status} propsOnClick={propsHandlerChange} />
            </StepWrapper>
          )
        })}        
    </FlexGroup>
  </Main>
)

StepNavigationView.displayName = 'StepNavigationView'
Main.displayName = 'StepNavigationView.Main'
StepWrapper.displayName = 'StepNavigationView.StepWrapper'

export { StepNavigationView };

