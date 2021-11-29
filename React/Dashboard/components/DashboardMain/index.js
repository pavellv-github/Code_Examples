import { useQuery } from '@apollo/client';
import { COLORS, SIZE } from '@common/variables';
import { Dashboard } from '@components/Dashboard';
import { cutStrForYear } from '@components/Dashboard/utils';
import { Errors } from '@components/Errors';
import { LogoutBtnComponent } from '@components/Logout/Logout';
import { ReleaseColumn } from '@components/Release/components';
import { GET_CONTENTS_LISTEN_All, GET_CONTENT_LISTENS_PERIOD_DATA, GET_test_DATA_RELESEAS } from '@graphQL/Dashboard';
import { PortalErrors } from '@utils/portal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auditions, graphics } from 'src/data';
import { dayDifference, getWeekNumber, monthDifference, weekDifference } from 'src/utils/dateDifference';
import { settestDataReleases } from 'store/reducers/dashboard';
import { setError, setErrorMessage } from 'store/reducers/errors';
import styled from 'styled-components';

const Wrapper = styled.section`
  width: 100%;
  background: ${COLORS.grey_1};
  padding: 20px 25px 40px 25px;
  overflow-y: scroll;
  @media (max-width: ${SIZE.phone}) {
    padding: 40px 16px;
  }
`;
export const DashboardsList = styled.div`
  width: 100%;
  display: flex;

  max-width: 975px;
  flex-flow: row wrap;

  @media (max-width: 1264px) {
    .listens-dash {
      margin-top: 15px;
    }
  }

  & > div {
    width: ${(props) => props.widthDash ?? 'calc((100% / 2) - 8px)'};
    margin-right: 16px;

    &:last-child {
      margin-right: 0;
    }
    &:first-child {
      @media (max-width: ${SIZE.tablet_small}) {
        margin-top: 35px;
      }
      @media (max-width: ${SIZE.phone}) {
        margin-top: 15px;
      }
    }
  }
`;

export const PanelBtn = styled.div`
  margin-bottom: 10px;
  max-width: ${(props) => (props.width ? '' : '975px')};
  display: flex;
  justify-content: flex-end;
  @media (max-width: ${SIZE.tablet_small}) {
    display: none;
  }
`;

export function createChartData(arr, options) {
  const arrChart = arr.data.testDataContentsListens?.data.map(({ time, listens }) => ({
    name: new Date(time).toLocaleDateString('ru', options).substring(0, 2),
    pv: listens,
    amt: listens,
  }));

  return arrChart;
}

export const DashboardsMain = ({ artistId }) => {
  const [graphicsData, setGraphicsData] = useState(graphics);
  const [listenScores, setListenScores] = useState(auditions);
  const [logOutModalShow, setLogOutModalShow] = useState(false);

  const textRest = useSelector((state) => state.app.data.textRest);
  const state = useSelector((state) => state.profile);
  const errors = useSelector((state) => state.errors);

  const dispatch = useDispatch();

  const scoreListening = [listenScores];
  const graphicListening = [
    {
      label: textRest?.dashboardScreen?.intervalDayTitle,
      graphic: graphicsData?.auditions?.week,
    },
    {
      label: textRest?.dashboardScreen?.intervalWeekTitle,
      graphic: graphicsData?.auditions?.quarter,
    },
    {
      label: textRest?.dashboardScreen?.intervalMonthTitle,
      graphic: graphicsData?.auditions?.year,
    },
  ];

  const id = artistId || state.testId;

  const getSongsList = useQuery(GET_test_DATA_RELESEAS, {
    variables: {
      artistId: id,
    },
  });

  const getDataContentsListensAll = useQuery(GET_CONTENTS_LISTEN_All, {
    variables: {
      listensAuthorId: id,
    },
  });

  const getWeekListens = useQuery(GET_CONTENT_LISTENS_PERIOD_DATA, {
    variables: {
      listensAuthorId: id,
      listensInterval: 'day',
      listensFrom: weekDifference(new Date()).toLocaleDateString('fr-CA'),
      listensTo: dayDifference(new Date()).toLocaleDateString('fr-CA'),
    },
  });

  const getMonthListens = useQuery(GET_CONTENT_LISTENS_PERIOD_DATA, {
    variables: {
      listensAuthorId: id,
      listensInterval: 'week',
      listensFrom: monthDifference(new Date(), 3).toLocaleDateString('fr-CA'),
      listensTo: new Date().toLocaleDateString('fr-CA'),
    },
  });

  const getYearListens = useQuery(GET_CONTENT_LISTENS_PERIOD_DATA, {
    variables: {
      listensAuthorId: id,
      listensInterval: 'month',
      listensFrom: monthDifference(new Date(), 12).toLocaleDateString('fr-CA'),
      listensTo: new Date().toLocaleDateString('fr-CA'),
    },
  });

  const listenLabel = textRest?.dashboardScreen?.testzvukItems?.testzvukListensBarChart;

  useEffect(() => {
    if (getSongsList?.data?.testDataReleases?.length) {
      const newArr = getSongsList.data.testDataReleases.map((el) => ({
        ...el,
        date: new Date(el.date).toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
      }));
      dispatch(settestDataReleases(newArr));
    }
    if (getDataContentsListensAll?.data) {
      setListenScores({
        label: listenLabel,
        count: getDataContentsListensAll?.data.testDataContentsListensAll.count,
        new: getDataContentsListensAll?.data.testDataContentsListensAll.previous,
      });
    }

    if (getDataContentsListensAll.error || getSongsList.error) {
      console.log('dash.error');
      dispatch(setError(true));
      dispatch(setErrorMessage(getDataContentsListensAll.error || getSongsList.error));
    } else {
      dispatch(setError(false));
      dispatch(setErrorMessage(''));
    }
  }, [dispatch, listenLabel, getDataContentsListensAll, getSongsList]);

  // оставляем периоды, потом на рефетчи
  useEffect(() => {
    if (getWeekListens?.data) {
      const options = { weekday: 'short' };
      setGraphicsData((state) => ({
        ...state,
        auditions: {
          ...state.auditions,
          week: createChartData(getWeekListens, options),
        },
      }));
    }

    if (getMonthListens?.data) {
      const arrChart = getMonthListens.data.testDataContentsListens?.data.map(({ time, listens }) => ({
        name: getWeekNumber(new Date(time)),
        pv: listens,
        amt: listens,
      }));
      setGraphicsData((state) => ({
        ...state,
        auditions: { ...state.auditions, quarter: arrChart },
      }));
    }

    if (getYearListens?.data) {
      const arrChart = getYearListens.data.testDataContentsListens?.data.map(({ time, listens }) => ({
        name: cutStrForYear(time),
        pv: listens,
        amt: listens,
      }));
      setGraphicsData((state) => ({
        ...state,
        auditions: { ...state.auditions, year: arrChart },
      }));
    }
  }, [getWeekListens, getYearListens, getMonthListens]);

  return (
    <>
      <Wrapper>
        <LogoutBtnComponent logOutModalShow={logOutModalShow} setLogOutModalShow={setLogOutModalShow} />
        <DashboardsList widthDash={'100%'}>
          {/* TODO: chart for listeners hide until we get an API for it */}
          {/* <DashboardsLikesChart id={id} /> */}
          <Dashboard
            key={graphicListening.label}
            scores={scoreListening}
            className="profile__dashboard listens-dash"
            graphics={graphicListening}
            loadData={getDataContentsListensAll.loading}
            width100={true}
          />
        </DashboardsList>
        <ReleaseColumn />
      </Wrapper>

      <PortalErrors>{errors.show && <Errors msg={errors.message?.message} />}</PortalErrors>
    </>
  );
};
