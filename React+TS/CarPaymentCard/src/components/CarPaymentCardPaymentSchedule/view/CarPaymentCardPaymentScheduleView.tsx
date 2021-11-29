import React from 'react'
import styled from 'styled-components'
import { TCarPaymentCardPaymentScheduleView } from '../types/carPaymentCardPaymentScheduleTypes'


declare module 'styled-components' {
  export interface DefaultTheme extends TProject.Theme {}
}

const Main = styled.div`
  margin-top: 11px;
`

const Title = styled.h4`
  margin: 0;
`
  
const Shedule = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`

const SheduleItem = styled.div`
  width: 48%;
  margin-top: 9px;
`

const SheduleItemTitle = styled.span`
  font-size: 12px;
  line-height: 16px;
  color: #9DA6B0;
`

const SheduleItemSumma = styled.p`
  font-size: 16px;
  line-height: 20px;
  color: #161A1F;
  margin: 2px 0 0;
`

const CarPaymentCardPaymentScheduleView: TCarPaymentCardPaymentScheduleView.FC = ({sheduleInfo}) => (
  <Main>
    <Title>Платежи по графику</Title>

    <Shedule>
      {sheduleInfo && sheduleInfo.map((item: any) => {
        return (
          <SheduleItem key={item.title}>
            <SheduleItemTitle>{item.title}</SheduleItemTitle>
            <SheduleItemSumma>{item.description} ₽</SheduleItemSumma>
          </SheduleItem>
        )
      })}
    </Shedule>
  </Main>
)

CarPaymentCardPaymentScheduleView.displayName = 'CarPaymentCardPaymentScheduleView'
Main.displayName = 'CarPaymentCardPaymentScheduleView.Main'
Shedule.displayName = 'CarPaymentCardPaymentScheduleView.Shedule'

export { CarPaymentCardPaymentScheduleView }
