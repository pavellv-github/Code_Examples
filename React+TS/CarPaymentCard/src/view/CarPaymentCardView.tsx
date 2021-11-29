import React from 'react'
import styled from 'styled-components'
import { CarPaymentCardForPayment } from '../components/CarPaymentCardForPayment'
import { CarPaymentCardHeader } from '../components/CarPaymentCardHeader'
import { CarPaymentCardPaymentSchedule } from '../components/CarPaymentCardPaymentSchedule'
import { TCarPaymentCardView } from '../types/carPaymentCardTypes'

declare module 'styled-components' {
  export interface DefaultTheme extends TProject.Theme {}
}

const Main = styled.div`
  width: 296px;
  background: #FFF;
  border: 1px solid #D5DBE0;
  box-sizing: border-box;
  border-radius: 12px;
  padding: 22px 24px 35px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
`

const Offer = styled.div`
  margin-top: 12px;
  background: #F0F2F5;
  border-radius: 12px;
  padding: 4px 6px 6px;
  color: #76818C;
  font-size: 12px;
  line-height: 16px;
`

const Button = styled.button`
  margin-top: 25px;
  color: #0073E5;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 6px;
  background-color: transparent;
  padding: 8px 12px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #E5F2FF;
  }
`

const CarPaymentCardView: TCarPaymentCardView.FC = ({ propsData, handlerClick }) => (
  <Main>
    <CarPaymentCardHeader picture={propsData.picture} title={propsData.title} summa={propsData.summa} location={propsData.location} date={propsData.date_of_issue}/>
    <CarPaymentCardForPayment paymentInfo={propsData.payment} />
    <CarPaymentCardPaymentSchedule sheduleInfo={propsData.shedule} />

    <Offer>{propsData.offer}</Offer>

    <Button onClick={() => handlerClick}>Скачать КП.pdf</Button>
  </Main>
)

CarPaymentCardView.displayName = 'CarPaymentCardView'
Main.displayName = 'CarPaymentCardView.Main'
Offer.displayName  = 'CarPaymentCardView.Offer'
Button.displayName  = 'CarPaymentCardView.Button'

export { CarPaymentCardView }
