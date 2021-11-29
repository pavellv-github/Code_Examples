import { ClearLocalStorage } from '@utils/profile';
import { gql } from 'graphql-tag';
import router from 'next/router';
import { setError } from 'store/reducers/errors';
import { removeData, setAccountData, setDataProfile } from 'store/reducers/profile';
import { apolloClient } from './apolloClient';

// Проверка токена и последующая авторизация (можно было бы перенести в другой файл)
export const CheckAuth = (state, dispatch) => {
  if (state.token) {
    Promise.resolve(
      apolloClient.query({
        query: gql`
          query accounts($token: Token!) {
            accounts(tokenRequest: $token) {
              artists {
                testId
                phone
                id
                status {
                  __typename
                  title
                }
              }
            }
          }
        `,
        variables: { token: { token: state.token } },
      })
    )
      .then((result) => {
        if (result?.data?.accounts?.artists[0]?.id && result?.data?.accounts?.artists[0]?.testId && state.token) {
          dispatch(setAccountData(result?.data?.accounts?.artists[0]));

          if (result?.data?.accounts?.artists[0]?.status?.title === 'new') {
            if (window.location.pathname !== '/' && window.location.pathname !== '/partners') {
              router.push('/pending');
            }
          }
        } else if (!router.pathname.includes('authorization') && !router.pathname.includes('pending')) {
          ClearLocalStorage();
          dispatch(removeData());
        }
      })
      .catch(() => {
        dispatch(setError(true));
      });
  }

  if (!!state.testId) {
    Promise.resolve(
      apolloClient.query({
        query: gql`
          query testDataArtist($artistId: String!) {
            testDataArtist(artistId: $artistId) {
              __typename
              title
              description
              image {
                __typename
                src
              }
            }
          }
        `,
        variables: { artistId: state.testId },
      })
    )
      .then((result) => {
        dispatch(setDataProfile(result?.data?.testDataArtist));
      })
      .catch(() => {
        dispatch(setError(true));
      });
  }
};
