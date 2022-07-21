import { FlexGroup } from '@uikit/flex';
import React from 'react';
import styled from 'styled-components';
import { TStepNavigationItemView } from '../types/stepNavigationItemTypes';

declare module 'styled-components' {
  export interface DefaultTheme extends TMarketplace.Theme {}
}

const Icon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  transition: all 0.3s ease;
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DefaultIcon = styled(Icon)`
  background-color: #E1E6EB;
  color: #161A1F;
`

const SelectedIcon = styled(Icon)`
  background-color: #0080FF;
  color: #FFF;
`

const PassedIcon = styled(Icon)`
  background-color: #E5FFF3;
  
  svg {
    fill: #50CEA1;
  }
`

const NotFielldIcon = styled(Icon)`
  background-color: #FFF2CC;

  svg {
    fill: #FFBF00;
  }
`

const Label = styled.span``

const Main = styled.div`
  opacity: ${({selected}) => selected ? 1 : 0.5};
  transition: all 0.3 ease;
  cursor: pointer;

  svg {
    trasition: all 0.3s ease;
  }

  &:hover {
    opacity: 1;

    svg {
      fill: #FFF;
    }

    ${DefaultIcon} {
      background-color: #B7BFC7;
    }

    ${SelectedIcon} {
      background-color: #0073E5;
    }

    ${PassedIcon} {
      background-color: #50CEA1;
    }

    ${NotFielldIcon} {
      background-color: #FFBF00;
    }
  }
`

// поправить предупреждение с number, title, status, onClick
const StepNavigationItemView: TStepNavigationItemView.FC = ({propsNumber, propsTitle, propsActivity, propsStatus, propsOnClick}) => {

  const renderCondition = () => {
    if (propsActivity) {
      return <SelectedIcon>{propsNumber}</SelectedIcon>
    }

    if (!propsActivity && propsStatus === 1) {
      return <PassedIcon>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M6.00008 10.9999L0 4.99991L0.646442 4.35345C0.997913 4.00197 1.56777 4.00197 1.91924 4.35344L6.00008 8.43424L14.0808 0.353476C14.4322 0.00200149 15.0021 0.0020057 15.3536 0.353483L16 0.999939L6.00008 10.9999Z"/>
        </svg>
      </PassedIcon>
    }

    if (!propsActivity && propsStatus === 2) {
      return <NotFielldIcon>
        <svg width="14" height="2" viewBox="0 0 14 2" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 1.8499V0.149902H0V1.8499H14Z"/>
        </svg>
      </NotFielldIcon>
    }

    return <DefaultIcon>{propsNumber}</DefaultIcon>
  }

  return (
    // не понимаю что за ошибка с selected
    <Main selected={propsActivity || propsStatus !== 0} onClick={(e) => propsOnClick(e, propsNumber, propsTitle, propsStatus)}>
      <FlexGroup letAlignItems="center">
        {renderCondition()}
        <Label>{propsTitle}</Label>
      </FlexGroup>
    </Main>
  )

}

StepNavigationItemView.displayName = 'StepNavigationItemView'
Main.displayName = 'StepNavigationItemView.Main'
Icon.displayName = 'StepNavigationItemView.Icon'
DefaultIcon.displayName = 'StepNavigationItemView.DefaultIcon'
PassedIcon.displayName = 'StepNavigationItemView.PassedIcon'
NotFielldIcon.displayName = 'StepNavigationItemView.NotFielldIcon'
Label.displayName = 'StepNavigationItemView.Label'

export { StepNavigationItemView };

