import React from 'react';
import Layout from '~/pages/_layout';
import OnlineServices from '~/src/components/Internet/onlineServices/onlineServices';
import { connect } from 'react-redux';
import { initialProps } from '~/src/helpers/basePageFunc';


class SpeedUp extends React.Component {

    static async getInitialProps(options) {
        let { hostname } = await initialProps(options);
        let path = options.pathname;
        return ({
            hostname,
            path
        });
    }

    render() {
        let cityText = this.props.city.cityIn;
        const title = `текст ${cityText}`;
        const description = `текст ${cityText}`;
        return (
            <>
            <Layout
                title={title}
                description={description}
                hostname={this.props.hostname}
                withMenu={true}
                withHeader={true}
                withChat={true}
                withFooter={true}
            >
                <OnlineServices activeTab={'Скоростные бонусы'}/>
            </Layout>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    city: state.city.currentCity,
});

export default connect(mapStateToProps)(SpeedUp);
