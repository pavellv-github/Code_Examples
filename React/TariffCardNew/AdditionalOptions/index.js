import React, { PureComponent } from 'react';
import { Wrapper, Title, Desc } from './styled';
import PropTypes from 'prop-types';

class AdditionalOptions extends PureComponent {

    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
        className: PropTypes.string,
        children: PropTypes.node,
    };

    render() {
        const { title, description, children, className, margin } = this.props;

        return (
            <Wrapper className={className} margin={margin}>
                <Title>{title}</Title>
                {description && <Desc>{description}</Desc>}
                <div>
                    {children}
                </div>
            </Wrapper>
        );
    }
}

export default AdditionalOptions;
