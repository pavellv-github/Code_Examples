import React, { Component } from 'react';
import styled from 'styled-components';
import NoSSR from '~/src/helpers/noSSR';
import DefaultPopup from '@ertelecom/ui-react/components/popups/defaultPopup';
import Tabs from '@ertelecom/ui-react/components/tabs/tabs';
import Tab from '@ertelecom/ui-react/components/tabs/tab';
import Accordion from '@ertelecom/ui-react/components/accordion';
import { PopupTitle } from '../forms/formStyle';
import { getProgram, formatDate } from '../../../api/landing';
import { EPG_API_ENDPOINT, EGP_IMG } from '../../../constants/index';

import arrow from '../../../assets/img/arrow.svg';

const TabsRedesigned = styled(Tabs)`
    display: flex;
`;

const LogoBlock = styled.div`
    width: 124px;
    height: 155px;
    border-radius: 0 0 62px 62px;
    background: #fff;
    margin-bottom: 40px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 0 10px;
    @media(max-width: 700px) {
        width: 80px;
        height: 92px;
        border-radius: 0 0 40px 40px;
    }
    & img {
        width: 100%;
        height: auto;
        display: inline-block;
    }
`;

const ContainerBlock = styled.div`
    display: block;
    height: 100%;
    width: 100%;
    overflow: auto;
`;

const ContainerInfo = styled.div`
    display: flex;
    margin: 0 376px 125px;
    box-sizing: border-box;
    color: ${props => props.textColor ? props.textColor : '#000'};
    line-height: 24px;
    font-size: 16px;
    @media(max-width: 1800px) {
        margin: 0 280px 125px;
    }
    @media(max-width: 1200px) {
        margin: 0 150px 150px;
    }
    @media(max-width: 1000px) {
        margin: 0;
    }
`;

const ContainerProgramm = styled.div`
    background: #fff;
    color: #000;
    margin-top: 65px;
    width: 100%;
    padding: 50px 90px;
    @media(max-width: 1000px) {
        padding: 50px 70px;
    }
    @media(max-width: 700px) {
        padding: 50px 20px;
    }
`;

const ContainerDesc = styled.div`
    margin: 0 90px;
    @media(max-width: 1000px) {
        margin: 0 70px;
    }
    @media(max-width: 700px) {
        margin: 0 30px;
    }
`;

const TabContent = styled.div`
    line-height: 18px;
    font-size: 14px;
    flex-direction: column;
    width: 100%;
    & p {
        line-height: 18px;
        font-size: 14px;
        display: flex;
    }
`;

const StyledAccordion = styled.div`
    margin-bottom: 20px;
    width: 100%;
    @media(max-width: 700px) {
        margin-bottom: 10px;
    }
`;

const ProgramImage = styled.img`
    width: 100%;
    border-radius: 6px;
    margin-top: 20px;
    width: 100%;
    height: auto;
`;

const ToTop = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: ${props => props.background ? props.background : '#fff'} url(${arrow}) no-repeat center center;
    background-size: 30%;
    margin: 20px;
    transform: rotate(270deg);
    transition: all 400ms ease-in;
    opacity: 0;
    &:hover {
        box-shadow: 0px 0px 20px rgba(11, 45, 86, 0.6)
    }
`;

const ToTopContainer = styled.div`
    width: 100px;
    height: 100px;
    left: 20px;
    bottom: 20px;
    position: fixed;
    @media(max-width: 1000px) {
        display: none;
    }
`;

const TimeText = styled.div`
    color: #CECECE;
    width: 90px;
`;

const AccordionTitle = (props) => <div><TimeText>{props.time}</TimeText>{props.title}</div>;

const POPUP_ID = 'popupChannelContent';
const POPUP_SELECTOR = `#${POPUP_ID}`;
const TOP_ID = 'toTop';
const TOP_SELECTOR = `#${TOP_ID}`;
const DAYS = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const DATE_MASK = '%y-%m-%d';

class ChannelInfo extends Component {
    state = {
        program: null,
        dateList: [],
        activeDate: null
    };

    componentDidMount() {
        this.init();
    }

    componentWillUnmount() {
        this.setState({ scroll: false });
        document.querySelector(POPUP_SELECTOR).removeEventListener('scroll', this.popupScroll);
    }

    init = () => {
        const { domain, info } = this.props;

        let dateFrom = formatDate(new Date(), -3, DATE_MASK);
        let dateTo = formatDate(new Date(), 3, DATE_MASK);

        getProgram(domain, info.xvid, dateFrom, dateTo).then((program) => {
            let data = program.data[info.xvid];
            this.setState({ program: data });
            let dateList = this.programPrepare(data, info.xvid);
            this.setState({ dateList: dateList });
        });
    };

    componentDidUpdate(prevProps) {
        let { info } = this.props;
        if (info.xvid !== prevProps.info.xvid) {
            this.setState({ activeDate: null });
            this.init();
        }
    }

    popupScroll = () => {
        let containerBlock = document.querySelector(POPUP_SELECTOR);
        const topButton = document.querySelector(TOP_SELECTOR);
        if (containerBlock && window.outerHeight < containerBlock.scrollTop) {
            topButton.style.opacity = 1;
        } else {
            topButton.style.opacity = 0;
        }
    };

    topClick = (e) => {
        e.preventDefault();
        let containerBlock = document.querySelector(POPUP_SELECTOR);
        containerBlock.firstElementChild.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
    };

    programPrepare = (data, prefix) => {
        let dateList = [];

        let raplaceObj = {};
        let nowDate = new Date().toLocaleDateString();
        let dateNum = 1;
        let progDate,
            formatedDate,
            strDate,
            findDate,
            time;

        data.forEach((item) => {
            strDate = item.start.replace(' ', 'T');
            findDate = Date.parse(strDate);
            progDate = new Date(findDate);
            formatedDate = progDate.toLocaleDateString();

            if (!raplaceObj[formatedDate]) {
                let dd = ((progDate.getDate()) >= 10) ? (progDate.getDate()) : '0' + (progDate.getDate());
                let tabLabel = dd + ', ' + DAYS[progDate.getDay()];

                if (formatedDate === nowDate) {
                    tabLabel = 'Сегодня';
                    this.setState({ activeDate: tabLabel });
                }

                raplaceObj[formatedDate] = dateNum;
                dateList[dateNum] = {
                    key: prefix + tabLabel,
                    items: [],
                    label: tabLabel
                };

                dateNum++;
            }

            time = progDate.toLocaleTimeString();
            item.time = time.length > 8 ? time.length === 12 ? '0' + time.substr(0, 7) : time.substr(0, 9) : time.length === 7 ? '0' + time.substr(0, 4) : time.substr(0, 5);
            dateList[raplaceObj[formatedDate]].items.push(item);
        });
        return dateList;
    };

    render() {

        const { info, close, open, popupColor, popupTextColor } = this.props;
        const { dateList, activeDate, scroll } = this.state;

        if (!scroll) {
            let containerBlock = document.querySelector(POPUP_SELECTOR);
            if (containerBlock) {
                containerBlock.addEventListener('scroll', this.popupScroll);
                this.setState({ scroll: true });
            }
        }

        let dateListRen;
        if (dateList.length > 0) {
            dateListRen = dateList.map((day) =>
                <Tab label={day.label} key={day.key}>
                    {
                        day.items.map((item, ind) =>
                            <StyledAccordion key={item.tid + '_' + ind}>
                                <Accordion title={<AccordionTitle time={item.time} title={item.title} />} key={item.tid + '_' + ind}>
                                    <TabContent>
                                        <p>{item.desc}</p>
                                        {item.icon ? <ProgramImage src={EGP_IMG + item.icon} /> : null}
                                    </TabContent>
                                </Accordion>
                            </StyledAccordion>)
                    }
                </Tab >);
        }

        return (
            <NoSSR>
                <DefaultPopup isOpen={open}
                    backgroundColor={popupColor}
                    closeColor={popupTextColor}
                    width='100%'
                    height='100%'
                    fullWidth={true}
                    onClose={close}>
                    <ContainerBlock id={POPUP_ID}>
                        <ContainerInfo textColor={popupTextColor}>
                            <ContainerDesc>
                                <LogoBlock><img src={EPG_API_ENDPOINT + info.logo} /></LogoBlock>
                                <div dangerouslySetInnerHTML={{ __html: `${info.description}` }}></div>
                            </ContainerDesc>
                            <ContainerProgramm>
                                <PopupTitle>Телепрограмма</PopupTitle>
                                <TabsRedesigned justify={true} activeTab={activeDate}>
                                    {dateListRen}
                                </TabsRedesigned>
                            </ContainerProgramm>
                        </ContainerInfo>
                        <ToTopContainer>
                            <ToTop onClick={this.topClick} background={popupTextColor} id={TOP_ID} />
                        </ToTopContainer>
                    </ContainerBlock>
                </DefaultPopup>
            </NoSSR>
        );
    }
}

export default ChannelInfo;
