import React from 'react'
import styled from 'styled-components'
import { TCarPaymentCardHeaderView } from '../types/carPaymentCardHeaderTypes'


declare module 'styled-components' {
  export interface DefaultTheme extends TProject.Theme {}
}

const Main = styled.div`
  width: 100%;
  display: flex;
`

const Picture = styled.picture`
  max-width: 48px;
  width: 100%;
  margin-right: 9px;

  img {
    width: 100%;
  }
`

const Info = styled.div``

const Title = styled.h3`
  color: #161A1F;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  margin: 0;
`

const Notification  = styled.div`
  background: #E5FFF3;
  border-radius: 4px;
  padding: 2px 16px 6px 11px;
  margin-top: 6px;

  span {
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #161A1F;
  }

  p {
    margin: 0;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: #161A1F;
  }
`

const PriceWrapper = styled.div`
  margin-top: 10px;
  padding-left: 4px;
  display: flex;
  align-items: center;
`

const Price = styled.span`
  margin-left: 10px;
  font-size: 14px;
  line-height: 16px;
  color: #161A1F;
`

const CarPaymentCardHeaderView: TCarPaymentCardHeaderView.FC = ({picture, title, summa, location, date}) => (
  <Main>
    <Picture>
      <source srcSet={picture} media="(min-width: 600px)" />
      <img src={picture} alt="Auto" />
    </Picture>
    <Info>
      <Title>{title}</Title>
      <Notification>
        <span>Можно забрать с {date}</span>
        <p>{location}</p>
      </Notification>
      <PriceWrapper>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M16 7.52941L7.52941 16L0 8.47059L8.47059 0H16V7.52941ZM11.2941 6.58824C12.3337 6.58824 13.1765 5.74548 13.1765 4.70588C13.1765 3.66629 12.3337 2.82353 11.2941 2.82353C10.2545 2.82353 9.41177 3.66629 9.41177 4.70588C9.41177 5.74548 10.2545 6.58824 11.2941 6.58824Z" fill="#FFE599"/>
        </svg>
        <Price>{summa} ₽</Price>
      </PriceWrapper>
    </Info>
  </Main>
)

CarPaymentCardHeaderView.displayName = 'CarPaymentCardHeaderView'
Main.displayName = 'CarPaymentCardHeaderView.Main'
Picture.displayName = 'CarPaymentCardHeaderView.Picture'
Info.displayName = 'CarPaymentCardHeaderView.Info'
Title.displayName = 'CarPaymentCardHeaderView.Title'
Notification.displayName = 'CarPaymentCardHeaderView.Notification'
PriceWrapper.displayName = 'CarPaymentCardHeaderView.PriceWrapper'
Price.displayName = 'CarPaymentCardHeaderView.Price'

export { CarPaymentCardHeaderView }
