import React from 'react'
import styled from 'styled-components'
import { TCarPaymentCardForPaymentView } from '../types/carPaymentCardForPaymentTypes'

declare module 'styled-components' {
  export interface DefaultTheme extends TProject.Theme {}
}

const Main = styled.div`
  margin-top: 15px;
`

const Title = styled.h4`
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  margin: 0;
`

const PaymentInfoItem = styled.li`
  display: flex;
  justify-content: space-between;
`

const PaymentInfo = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 16px;
  margin-bottom: 0;

  ${PaymentInfoItem} {
    margin-top: 3px;

    &:first-child {
      margin-top: 0;
    }
  }
`

const PaymentName = styled.span`
  font-size: 14px;
  line-height: 16px;
  color: #161A1F;
`

const PaymentProcent = styled.span`
  margin-right: 10px;
  color: #9DA6B0;
  font-size: 14px;
  line-height: 16px;
`

const PaymentSumm = styled.span`
  font-size: 14px;
  line-height: 16px;
  color: #161A1F;
`

const GeneralSumma = styled.p`
  margin-top: 8px;
  margin-bottom: 0;
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  color: #161A1F;
  text-align: right;
`

const CarPaymentCardForPaymentView: TCarPaymentCardForPaymentView.FC = ({paymentInfo}) => (
  <Main>
    <Title>К оплате после подписания</Title>

    <PaymentInfo>
      {paymentInfo && paymentInfo.descriptionPayment.map((item: any, index: any) => {
        return(
          <React.Fragment key={index}>
            <PaymentInfoItem>
              <PaymentName>{item.title}</PaymentName>
              <div>
                {item.procent && <PaymentProcent>{item.procent}%</PaymentProcent>}
                <PaymentSumm>{item.summa} ₽</PaymentSumm>
              </div>
            </PaymentInfoItem>
          </React.Fragment>
        )
      })}
    </PaymentInfo>

    <GeneralSumma>{paymentInfo.summary} ₽</GeneralSumma>
  </Main>
)

CarPaymentCardForPaymentView.displayName = 'CarPaymentCardForPaymentView'
Main.displayName = 'CarPaymentCardForPaymentView.Main'

export { CarPaymentCardForPaymentView }
