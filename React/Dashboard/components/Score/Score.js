import { COLORS, FONTS, SIZE } from '@common/variables';
import { convertNumbers } from '@utils/convertNumbers';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrapperScores = styled.div`
  display: flex;
  flex-direction: column;
  ${(props) => props?.className || ''};
  @media (max-width: ${SIZE.phone}) {
    flex-direction: row;
    align-items: center;
  }
`;

const Title = styled.p`
  font: normal 15px/30px ${FONTS.SB};
  color: ${COLORS.white};
`;

const Numbers = styled.p`
  font: normal 34px/30px ${FONTS.SB};
  color: ${(props) => (!props.loadingData ? COLORS.white : 'transparent')};
  width: ${(props) => (props.loadingData ? '150px' : '')};
  height: ${(props) => (props.loadingData ? '19px' : '')};
  background: ${(props) => (props.loadingData ? COLORS.grey_11 : '')};
`;

const Upslore = styled.p`
  font: normal 15px/18px ${FONTS.SB};
  color: ${(props) => (!props.loadingData ? COLORS.grey_3 : 'transparent')};
  letter-spacing: 0.01em;
  width: ${(props) => (props.loadingData ? '90px' : '')};
  height: ${(props) => (props.loadingData ? '19px' : '')};
  margin: ${(props) => (props.loadingData ? '6px 10px 0 0' : '10px 10px 0 0')};
  background: ${(props) => (props.loadingData ? COLORS.grey_11 : '')};
  ${(props) => props?.classNameSlore || ''};

  span {
    color: ${(props) => (!props.loadingData ? COLORS.purple_2 : 'transparent')};
  }

  @media (max-width: ${SIZE.phone}) {
  margin: ${(props) => (props.loadingData ? '0px 10px 0 10px' : '10px 10px 0')};
  }

  @media (max-width: 330px) {
    margin-left: 10px;
  }
`;

export const Score = ({ title, numbers, upslope, className, classNameScores, classNameSlore,  loadData=true }) => {
  const textRest = useSelector((state) => state.app.data.textRest);

  return (
    <Wrapper className={`${className}`}>
      <Title>{title}</Title>
      <WrapperScores className={classNameScores}>
        <Numbers loadingData={loadData}>{convertNumbers(numbers)}</Numbers>
        {upslope ? (
          <Upslore classNameSlore={classNameSlore} loadingData={loadData}>
            <span>
              {upslope > 0 ? '+' : ''}
              {convertNumbers(upslope)}
            </span>{' '}
            {textRest?.dashboardScreen?.analyticPeriod}
          </Upslore>
        ) : (
          <Upslore classNameSlore={classNameSlore}  loadingData={loadData}>
            <span>0</span> {textRest?.dashboardScreen?.analyticPeriod}
          </Upslore>
        )}
      </WrapperScores>
    </Wrapper>
  );
};
