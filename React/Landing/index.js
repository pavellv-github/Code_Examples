import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './header';
import Channel from './channels';
import Footer from './footer';
import { COLORS } from '@ertelecom/ui-react/assets/js/constants';
import styled from 'styled-components';

const Content = styled.div`
    max-width: 100%;
    overflow-x: hidden;
    background: ${props => props.background ? props.background : COLORS.white};
`;

class Landing extends Component {
    render() {
        const { city, params } = this.props;

        return (
            <Content background={params.bodyBackground}>
                <Header {...params} />
                <Channel domain={city.domain} {...params} />
                <Footer {...params}  />
            </Content>
        );
    }
}

const mapStateToProps = (state) => ({
    city: state.city.currentCity,
});

export default connect(
    mapStateToProps,
)(Landing);
