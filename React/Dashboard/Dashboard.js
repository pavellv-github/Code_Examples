/* eslint-disable react-hooks/exhaustive-deps */
import { COLORS, FONTS, SIZE } from '@common/variables';
import { convertNumbers } from '@utils/convertNumbers';
import React, { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { graphics as graphicData } from 'src/data';
import styled from 'styled-components';
import { Score } from './components';

const Wrapper = styled.div`
  display: block;
  width: 100%;
  max-width: ${(props) => (props.width ? '990px' : '518px')};
  min-width: 472px;
  background: ${COLORS.grey_2};
  border-radius: 15px;
  padding: 25px 20px;

  @media (max-width: ${SIZE.tablet_small}) {
    background: transparent;
    padding: 25px 0px;
  }
  @media (max-width: ${SIZE.phone}) {
    min-width: 335px;
  }
  @media (max-width: 366px) {
    min-width: 300px;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  @media (max-width: ${SIZE.phone}) {
    flex-direction: column;
    justify-content: center;
  }
`;

const ScoreWrapper = styled.div`
  margin-right: 60px;
  @media (max-width: ${SIZE.phone}) {
    margin-top: ${(props) => (props.second_last_child ? '20px' : '')};
    margin-right: 0px;
  }
  &:last-child {
    margin-right: 0;
  }
`;

const TabsWrapper = styled(Tabs)`
  width: 100%;
  margin-top: 34px;
`;

const Controls = styled(TabList)`
  li {
    font: normal 15px/22px ${FONTS.SB};
    color: ${COLORS.grey_3};
    background-color: transparent;
    border: none;
    transition: color 0.3s ease;
    padding: 0;
    margin-right: 30px;

    &:last-child {
      margin-right: 0;
    }

    &.react-tabs__tab--selected {
      color: ${COLORS.white};
    }

    &:hover {
      color: ${COLORS.white};
    }
  }
`;

export const Content = styled(TabPanel)`
  display: none;
  padding-top: 58px;
  margin-left: -28px;

  &.react-tabs__tab-panel--selected {
    display: block;

    line {
      stroke: ${COLORS.grey_6};
    }

    text {
      font: normal 14px/13px ${FONTS.SB};
      letter-spacing: 0.01em;
      color: ${COLORS.grey_3};
      @media (max-width: ${SIZE.phone}) {
        font: normal 12px/11px ${FONTS.SB};
      }
    }
  }
`;

export const Dashboard = ({
  scores,
  className,
  graphics,
  width100,
  itemScoreClassName,
  noMaxWidth,
  noControls,
  loadData,
  collapseChart,
  classNameSlore,
}) => {
  const graphicTmp = [
    { label: '10 дней', graphic: graphicData?.auditions?.week },
    { label: 'Квартал', graphic: graphicData?.auditions?.quarter },
    { label: 'Год', graphic: graphicData?.auditions?.year },
  ];
  const [dataChart, setDataChart] = useState(graphicTmp);
  const [width, setWidth] = useState('');

  useEffect(() => {
    if (loadData) {
      setDataChart(graphicTmp);
    } else setDataChart(graphics);
  }, [graphics, loadData]);

  useEffect(() => {
    const widthChart = () => {
      let newWidth = 472;
      if (window.innerWidth <= 768) {
        newWidth = window.innerWidth - 20;

        return newWidth;
      }
      if (window.innerWidth <= 1024 && collapseChart) {
        newWidth = window.innerWidth - 320;

        return newWidth;
      }
      if (width100) {
        newWidth = window.innerWidth - 399;
        newWidth = newWidth > 950 ? 950 : newWidth;

        return newWidth;
      }

      return newWidth;
    };

    const res = widthChart();
    setWidth(res);
  }, []);

  const secondScore = (score, i) => score.length - 1 === i;

  return (
    <Wrapper width={width100 || noMaxWidth ? 'width100' : ''} className={`dashboard ${className}`}>
      <>
        <Header>
          {scores &&
            scores.map((item, index) => {
              return (
                <ScoreWrapper key={index} second_last_child={() => secondScore(scores.length, index)}>
                  <Score
                    loadData={loadData}
                    title={item.label}
                    numbers={item.count}
                    upslope={item.new}
                    classNameScores={itemScoreClassName}
                    classNameSlore={classNameSlore}
                  />
                </ScoreWrapper>
              );
            })}
        </Header>

        <TabsWrapper>
          <Controls>
            {graphics &&
              !noControls &&
              graphics.map((item, index) => {
                return <Tab  key={index}>{item?.label}</Tab>;
              })}
          </Controls>

          {dataChart &&
            dataChart.map((item, index) => {
              // генерация отдельного <Bar /> с отдельным градиентом
              // градиент отключен
              return (
                <Content key={index}>
                  <BarChart width={width} height={300} data={item.graphic}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="100%" spreadMethod="reflect">
                        <stop offset="0" stopColor={COLORS.blue} />
                        <stop offset="40%" stopColor={COLORS.blue40} />
                        <stop offset="70%" stopColor={COLORS.blue70} />
                        <stop offset="100%" stopColor={COLORS.blue100} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="1 0" vertical={false} />
                    <XAxis dataKey="name" tickCount={13} interval={0} />
                    <YAxis tickFormatter={(tick) => convertNumbers(tick, 1e4, 'en')} />
                    <Bar dataKey="pv" fill={COLORS.purple_2} barSize={35} />
                  </BarChart>
                </Content>
              );
            })}
        </TabsWrapper>
      </>
    </Wrapper>
  );
};
