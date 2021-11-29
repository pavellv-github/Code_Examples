/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@apollo/client';
import { Dashboard } from '@components/Dashboard';
import {
  GET_LOYALTY_ARTIST_LIKES_BY_PERIOD,
  GET_LOYALTY_ARTIST_SUBS_BY_PERIOD,
  GET_LOYALTY_LIKES_ALL,
  GET_LOYALTY_SUBS_ALL,
} from '@graphQL/Dashboard';
import { dayDifference, weekDifference } from '@utils/dateDifference';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { graphics, likes, subscribers } from 'src/data';
import { setLikesByPeriod, setSubsByPeriod } from 'store/reducers/dashboard';
import { setError, setErrorMessage } from 'store/reducers/errors';

export function createChartData(arr, options) {
  const arrChart = arr.data.testDataContentsListens?.data.map(({ time, listens }) => ({
    name: new Date(time).toLocaleDateString('ru', options).substring(0, 2),
    pv: listens,
    amt: listens,
  }));

  return arrChart;
}

// TODO перенесено в отдельный компонент и выключено, т.к. ожидается апи под него
export const DashboardsLikesChart = ({ id }) => {
  const [graphicsData, setGraphicsData] = useState(graphics);
  const [likesLoyaltyPeriod, setLikesLoyaltyPeriod] = useState(likes);
  const [subsLoyaltyPeriod, setSubsLoyaltyPeriod] = useState(subscribers);
  const textRest = useSelector((state) => state.app.data.textRest);
  const { loyaltyLikesByPeriod, loyaltySubsByPeriod } = useSelector((state) => state.dashboard);
  const scoreAuditions = [likesLoyaltyPeriod, subsLoyaltyPeriod];

  const datesFrom = weekDifference(new Date()).toLocaleDateString('fr-CA');
  const datesTo = dayDifference(new Date()).toLocaleDateString('fr-CA');

  const dispatch = useDispatch();

  const getLoyaltyLikes = useQuery(GET_LOYALTY_LIKES_ALL, {
    variables: {
      artistId: id,
    },
  });

  const getLoyaltySubs = useQuery(GET_LOYALTY_SUBS_ALL, {
    variables: {
      artistId: id,
    },
  });

  const getLoyaltyLikesByPeriod = useQuery(GET_LOYALTY_ARTIST_LIKES_BY_PERIOD, {
    variables: {
      artistId: id,
      interval: 'day',
      likesFrom: datesFrom,
      likesTo: datesTo,
    },
  });

  const getLoyaltySubsByPeriod = useQuery(GET_LOYALTY_ARTIST_SUBS_BY_PERIOD, {
    variables: {
      artistId: id,
      interval: 'day',
      subscribersFrom: datesFrom,
      subscribersTo: datesTo,
    },
  });

  const grahicAuditions = [
    {
      label: textRest?.dashboardScreen?.testzvukItems?.testzvukTrackLikesTotal,
      graphic: graphicsData.likes,
    },
    {
      label: textRest?.dashboardScreen?.testzvukItems?.testzvukSubscribersTotal,
      graphic: graphicsData.subscribers,
    },
  ];

  useEffect(() => {
    if (loyaltyLikesByPeriod?.length) {
      const options = { weekday: 'short' };
      const likesChart = loyaltyLikesByPeriod.map(({ time, likes }) => ({
        name: new Date(time).toLocaleString('ru', options),
        pv: likes,
        amt: likes,
      }));
      setGraphicsData((state) => ({ ...state, likes: likesChart }));
    }
  }, [loyaltyLikesByPeriod]);

  useEffect(() => {
    if (loyaltySubsByPeriod?.length) {
      const options = { weekday: 'short' };
      const subsChart = loyaltySubsByPeriod.map(({ time, subscribers }) => ({
        name: new Date(time).toLocaleString('ru', options),
        pv: subscribers,
        amt: subscribers,
      }));
      setGraphicsData((state) => ({ ...state, subscribers: subsChart }));
    }
  }, [loyaltySubsByPeriod]);

  useEffect(() => {
    if (getLoyaltyLikesByPeriod?.data) {
      dispatch(setLikesByPeriod(getLoyaltyLikesByPeriod.data.LoyaltyArtistLikesByPeriod?.data));
    }
    if (getLoyaltySubsByPeriod?.data) {
      dispatch(setSubsByPeriod(getLoyaltySubsByPeriod.data.LoyaltyArtistSubscribersByPeriod?.data));
    }
    if (getLoyaltyLikes?.data) {
      setLikesLoyaltyPeriod({
        label: textRest?.dashboardScreen?.testzvukItems?.testzvukTrackLikesTotal,
        count: getLoyaltyLikes.data.LoyaltyArtistLikesAll?.count,
        new: getLoyaltyLikes.data.LoyaltyArtistLikesAll?.previous,
      });
    }
    if (getLoyaltySubs?.data) {
      setSubsLoyaltyPeriod({
        label: textRest?.dashboardScreen?.testzvukItems?.testzvukSubscribersTotal,
        count: getLoyaltySubs.data.LoyaltyArtistSubscribersAll?.count,
        new: getLoyaltySubs.data.LoyaltyArtistSubscribersAll?.previous,
      });
    }

    if (
      getLoyaltyLikes.error ||
      getLoyaltyLikesByPeriod.error ||
      getLoyaltySubsByPeriod.error ||
      getLoyaltySubs.error
    ) {
      console.log('dash.error');

      dispatch(setError(true));
      dispatch(
        setErrorMessage(
          getLoyaltyLikes.error || getLoyaltyLikesByPeriod.error || getLoyaltySubsByPeriod.error || getLoyaltySubs.error
        )
      );
    } else {
      dispatch(setError(false));
      dispatch(setErrorMessage(''));
    }
  }, [dispatch, getLoyaltyLikes, getLoyaltyLikesByPeriod, getLoyaltySubsByPeriod, getLoyaltySubs]);

  return (
    <Dashboard
      key={grahicAuditions.label}
      scores={scoreAuditions}
      className="profile__dashboard"
      graphics={grahicAuditions}
      loadData={getLoyaltyLikesByPeriod.loading}
    />
  );
};
