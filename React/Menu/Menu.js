/* eslint-disable jsx-a11y/anchor-is-valid */
import { COLORS, FONTS, SIZE } from '@common/variables';
import { BaseIcon } from '@components/BaseIcon';
import { Modal } from '@components/Modal';
import { LogOutModal } from '@components/Modals/LogOut';
import { BurgerIcon } from '@images/icons/Burger';
import { CloseIcon } from '@images/icons/Close';
import { DashboardIcon } from '@images/icons/Dashboard';
import { FeedIcon } from '@images/icons/Feed';
import { GraphIcon } from '@images/icons/Graph';
import { LogoIcon } from '@images/icons/Logo';
import { LogOutIcon } from '@images/icons/Logout';
import { ManIcon } from '@images/icons/Man';
import { NewsIcon } from '@images/icons/News';
import { StoreIcon } from '@images/icons/Store';
import { Portal } from '@utils/portal';
import { ClearLocalStorage } from '@utils/profile';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeData } from 'store/reducers/profile';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: ${COLORS.grey_2};
  display: flex;
  flex-direction: column;
  @media (max-width: ${SIZE.tablet_small}) {
    height: initial;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 26px;

  @media (max-width: ${SIZE.tablet_small}) {
    width: 100%;
    height: 60px;
    justify-content: space-between;
    align-items: center;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoText = styled.span`
  a {
    font: normal 15px/25px ${FONTS.SB};
    color: ${COLORS.white};
    text-decoration: none;
    text-transform: uppercase;
    margin-left: 6px;

    span {
      color: ${COLORS.blue};
    }

    @media (max-width: ${SIZE.phone}) {
      font-size: 21px;
      line-height: 21px;
    }
  }
`;

const Logo = styled((props) => <BaseIcon {...props} />)``;

const Burger = styled.div`
  width: 16px;
  height: 16px;
  fill: ${COLORS.white};
  cursor: pointer;
  display: none;

  @media (max-width: ${SIZE.tablet_small}) {
    display: block;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

const List = styled.nav`
  margin-top: 51px;
  display: flex;
  flex-direction: column;
  padding: 0 12px;
  flex: 1 0 auto;

  @media (max-width: ${SIZE.tablet_small}) {
    position: absolute;
    right: 0;
    width: 100%;
    top: 60px;
    max-width: 375px;
    display: ${(props) => (props.show ? 'flex' : 'none')};
    height: ${(props) => (props.show ? '340px' : '0')};
    min-height: ${(props) => (props.show ? '290px' : '0')};
    background-color: ${COLORS.grey_2};
    margin-top: 0;
    padding: 27px 16px;
  }
`;

const Label = styled.span`
  font: normal 15px/22px ${FONTS.SB};
  color: ${COLORS.grey_3};
  transition: color 0.3s ease;
`;

const IconWrapper = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 16px;
  fill: ${({fillstroke}) => fillstroke ? 'transparent' : COLORS.grey_3};
  stroke: ${({fillstroke}) => fillstroke ? COLORS.grey_3 : ''};

  &:hover {
      fill: ${COLORS.purple_2};
    stroke: ${(props)=> props.fill ? COLORS.purple_2 : ''};

  }

  transition: fill 0.3s ease;
`;

const ListItem = styled.div`
  &.logout {
    margin-top: 40px;
    display: flex;

    @media (min-width: ${SIZE.tablet_small}) {
      display: none;
    }
  }
  border-radius: 8px;

  a {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px 20px 10px 10px;
    background-color: transparent;
    border-radius: 8px;
    transition: background-color 0.3s ease;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      background-color: ${COLORS.grey_1};
      color: ${COLORS.white};

      ${Label} {
        color: ${COLORS.purple_2};
      }

      ${IconWrapper} {
        fill: ${COLORS.purple_2};
      stroke: ${(props)=> props.fillstroke ? COLORS.purple_2 : ''};
      }
    }

    svg {
      width: 100%;
      height: 100%;

    }
  }

  &.selected {
    background-color: ${COLORS.grey_1};
    color: ${COLORS.white};

    ${Label} {
      color: ${COLORS.purple_2};
    }

    ${IconWrapper} {
      fill: ${COLORS.purple_2};
      stroke: ${(props)=> props.fillstroke ? COLORS.purple_2 : ''};
    }
  }
`;

export const Menu = ({ list }) => {
  const profile = useSelector((state) => state.profile);

  const [openMenu, setOpenMenu] = useState(false);
  const [logOutModalShow, setLogOutModalShow] = useState(false);
  const { currentRelease } = useSelector((state) => state.dashboard);
  const textRest = useSelector((state) => state.app.data.textRest);

  const router = useRouter();

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setOpenMenu(false);
    }
  }, []);

  const dispatch = useDispatch();

  const logOut = () => {
    ClearLocalStorage();
    setLogOutModalShow(false);
    dispatch(removeData());
    router.push('/');
  };


  return (
    <Wrapper>
      <Header>
        <LogoWrapper>
          <Logo viewBox="0 0 134 134" fill={COLORS.white} width={20} height={20}>
            <LogoIcon />
          </Logo>
          <LogoText>
            <Link href="/">
              <a href="/" style={{ textDecoration: 'none' }}>
                СБЕР ЗВУК <span>СТУДИО</span>
              </a>
            </Link>
          </LogoText>
        </LogoWrapper>

        <Burger onClick={toggleMenu}>
          {openMenu ? (
            <BaseIcon viewBox="0 0 490 490" fill={COLORS.white}>
              <CloseIcon />
            </BaseIcon>
          ) : (
            <BaseIcon>
              <BurgerIcon />
            </BaseIcon>
          )}
        </Burger>
      </Header>

      <List show={openMenu}>
        {list &&
          list.map((item, index) => {
            let icon;

            if (item.route === 'profile') icon = <ManIcon />;
            if (item.route === 'dashboards') icon = <DashboardIcon />;
            if (item.route === 'dashboards/releases') icon = <DashboardIcon />;
            if (item.route === `dashboards/releases/${currentRelease}`) icon = <DashboardIcon />;
            if (item.route === 'feed') icon = <FeedIcon />;
            if (item.route === 'dvizh') icon = <GraphIcon />;
            if (item.route === 'market') icon = <StoreIcon />;
            if (item.route === 'news') icon = <NewsIcon />;

            return (
              <ListItem fillstroke={item?.route?.includes('dashboards') ? true : undefined}className={router.pathname.includes(item.route) ? 'selected' : ''} key={index}>
                <Link href={`/${item.route}`}>
                  <a href={`/${item.route}`}>
                    <>
                      <IconWrapper fillstroke={item?.route?.includes('dashboards') ? true : undefined}>
                        <BaseIcon  width={item.width || '23'} height={item.height || '23'} viewBox={item.viewBox || "0 0 23 23"}>{icon}</BaseIcon>
                      </IconWrapper>
                      <Label>{item.name}</Label>
                    </>
                  </a>
                </Link>
              </ListItem>
            );
          })}
        {!!profile.token && (
          <ListItem className="logout" onClick={() => setLogOutModalShow(true)}>
            <a href="#">
              <IconWrapper>
                <BaseIcon viewBox="0 0 22 20" width="20" height="20">
                  <LogOutIcon />
                </BaseIcon>
              </IconWrapper>
              <Label>{textRest?.dialogExit?.log_out_text}</Label>
            </a>
          </ListItem>
        )}

        <Portal>
          {logOutModalShow && (
            <Modal isOpen={logOutModalShow} close={() => setLogOutModalShow(false)}>
              <LogOutModal exit={logOut} close={() => setLogOutModalShow(false)} />
            </Modal>
          )}
        </Portal>
      </List>
    </Wrapper>
  );
};
