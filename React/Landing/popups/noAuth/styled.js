import styled from 'styled-components';
import DefaultPopup from '@ertelecom/ui-react/components/popups/defaultPopup';

export const PopupAuth = styled(DefaultPopup)`
    width: calc(100% - 20px) !important;
    max-width: 896px !important;
    @media (max-width: 1024px) {
        max-width: 690px !important;
    }
    @media (max-width: 800px) {
        max-width: 530px !important;
    }
`;
