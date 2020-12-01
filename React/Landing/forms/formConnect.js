import React, { Component, Fragment } from 'react';
import {
    FormTitle,
    FormButtonStyled,
    FormButtonExt,
    RadioLabel,
    OldPrice,
} from './formStyle';
import { getCurrentTvPackageInfo, getCurrentTvTerminal, connectPackage, disconnectPackage } from '../../../api/landing';
import { connect } from 'react-redux';
import { dataLayerPush } from '@ertelecom/ui-react/components/helpers';
import RadioGroup from '@ertelecom/ui-react/components/controls/radioGroup';
import Checkbox from '@ertelecom/ui-react/components/controls/checkbox';
import PopupConnect from '../popups/connect';
import PopupDisconnect from '../popups/disconnect';
import PopupResult from '../popups/result';

class FormConnect extends Component {
    state = {
        packetsPrice: [],
        info: {},
        terminal: null,
        openConn: false,
        openDisconn: false,
        checkClose: false,
        showResult: false,
        connectResult: {},
        packetActive: false
    };

    initList = (terminal) => {
        const { city, bId, accessToken } = this.props;
        let terminalId = terminal ? terminal : this.state.terminal;
        getCurrentTvPackageInfo(city.billingHost, terminalId, bId, accessToken).then(response => {
            if (response) {

                this.setState({ info: response });

                let packetsPrice = [];

                if (response.active !== '0') {
                    this.setState({ packetActive: true });
                } else {
                    packetsPrice.push({
                        id: 0,
                        value: { duration: '0', ra_id: '0', __text: response.base_cost },
                        label: <RadioLabel>базовая цена {response.base_cost} р/мес</RadioLabel>
                    });
                }
                if (response.base_cost) {
                    if (response.cost_ra) {
                        response.cost_ra.cost.map(cost => {
                            packetsPrice.push({
                                id: cost.ra_id,
                                value: cost,
                                label: <RadioLabel>подписка
                                    на {cost.duration} мес. {cost.__text} р/мес <OldPrice>{response.base_cost} р/мес</OldPrice></RadioLabel>
                            });
                        });
                    }
                    this.setState({
                        packetsPrice: packetsPrice,
                        selectedValue: packetsPrice[0].value
                    });
                }

            }
        });
    };

    componentDidMount() {
        let { isAuth, clientProducts } = this.props;
        if (process.browser) {
            if (isAuth && clientProducts.services) {
                getCurrentTvTerminal(clientProducts.services).then((terminal) => {
                    this.setState({ terminal });
                    this.initList(terminal);
                });
            }
        }

    }

    componentDidUpdate(prevProps) {
        const { city, clientProducts, load } = this.props;

        if (!prevProps.clientProducts.services && clientProducts.services ||
            prevProps.city.domain !== city.domain ||
            prevProps.load !== load) {
            getCurrentTvTerminal(clientProducts.services).then((terminal) => {
                this.setState({ terminal });
                this.initList(terminal);
            });

        }
    }

    select = (val) => {
        this.setState({ selectedValue: val });
    };

    openConnect = (open) => {
        const { title } = this.props;
        open ? dataLayerPush({ 'event': 'UAevent', 'category': ' tv', 'action': 'Connect_click', 'label': title }) : null;
        this.setState({ openConn: open });
    };

    openDisconnect = (open) => {
        this.setState({ openDisconn: open });
    };

    openResult = (open) => {
        this.setState({ showResult: open });
    };

    checkChange = () => {
        this.setState({ checkClose: (!this.state.checkClose) });
    };

    connectPack = () => {
        const { city, title, accessToken } = this.props;
        const { terminal, info, checkClose, selectedValue = {} } = this.state;
        connectPackage(city.billingHost, terminal, info.id, selectedValue.ra_id, checkClose, accessToken).then(res => {
            this.setState({
                connectResult: res,
                openConn: false,
                showResult: true
            });
            if (res.status === '1') {

                let label = selectedValue && selectedValue.duration > 0 ? `${title} ${selectedValue.duration} month` : `${title} base`;
                dataLayerPush({ 'event': 'UAevent', 'category': ' tv', 'action': 'Connect', 'label': label });
                this.initList();
            }
        });
    };

    disconnectPack = () => {
        const { city, title, accessToken } = this.props;
        const { terminal, info } = this.state;
        disconnectPackage(city.billingHost, terminal, info.id, info.state.unset_from, accessToken).then(res => {
            this.setState({
                connectResult: res,
                openDisconn: false,
                showResult: true
            });
            if (res.status === '1') {
                dataLayerPush({ 'event': 'UAevent', 'category': ' tv', 'action': 'Disconnect', 'label': title });
                this.initList();
            }
        });
    };


    render() {

        const { selectedValue, info, checkClose, packetsPrice, openConn, showResult, connectResult, packetActive, openDisconn } = this.state;

        return (
            <Fragment>
                <FormTitle>Подключите пакет каналов со скидкой</FormTitle>
                <RadioGroup name='ra' options={packetsPrice}
                            selectedValue={selectedValue}
                            onChange={this.select}/>
                {selectedValue && selectedValue.duration !== '0' ? <Checkbox onChange={this.checkChange}
                                                                             id='checkClose'
                                                                             checked={checkClose}
                                                                             borderColor='#d7d7d7'
                                                                             borderWidth='1'
                                                                             mr='20'>Хочу отключить после окончания
                    подписки</Checkbox> : null}

                {packetActive
                    ? <div>
                        {info && !info.next_ra ? <FormButtonExt type='primary'
                                                                text='Продлить со скидкой'
                                                                onClick={() => this.openConnect(true)}/> : null}
                        {info && info.state.date_off === ''
                            ? <FormButtonStyled type='secondary'
                                              text='Отключить'
                                              onClick={() => this.openDisconnect(true)}/> : null}
                    </div>
                    :          info.id ? <FormButtonStyled type='primary'
                                                text='Оформить заявку'
                                                onClick={() => this.openConnect(true)}/> : null
                }
                <PopupConnect openConnect={openConn}
                              selectedValue={selectedValue}
                              unset={checkClose && selectedValue.duration !== '0' ? checkClose : null }
                              info={info}
                              close={() => this.openConnect(false)}
                              connect={() => this.connectPack}/>

                <PopupDisconnect openDisconnect={openDisconn}
                                 info={info}
                                 close={() => this.openDisconnect(false)}
                                 connect={() => this.disconnectPack}/>

                <PopupResult open={showResult}
                             close={() => this.openResult(false)}
                             info={connectResult}/>
            </Fragment>
        );
    }


}


const mapStateToProps = (state) => ({
    city: state.city.currentCity,
    isAuth: state.auth.isAuth,
    accessToken: state.auth.accessToken,
    clientProducts: state.auth.clientProducts
});

export default connect(
    mapStateToProps
)(FormConnect);

