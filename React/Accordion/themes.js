
import { COLORS } from '../../assets/js/constants';

const themes = {
    bordered: {
        background: COLORS.white,
        borderWidth: '1px',
        radius: '4px',
        padding: '20px',
        mobilePadding: '15px',
        color: COLORS.black
    },
    simple: {
        background: 'transparent',
        borderWidth: '1px 0',
        radius: '0px',
        padding: '20px 0',
        mobilePadding: '15px 0',
        color: COLORS.black
    }
};

export default themes;
