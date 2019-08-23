
import styled from 'styled-components';

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptopS: '945px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
};

const device = {
    mobileS: `(max-width: ${size.mobileS})`,
    mobileM: `(max-width: ${size.mobileM})`,
    mobileL: `(max-width: ${size.mobileL})`,
    tablet: `(max-width: ${size.tablet})`,
    laptopS: `(max-width: ${size.laptopS})`,
    laptop: `(max-width: ${size.laptop})`,
    laptopL: `(max-width: ${size.laptopL})`,
    desktop: `(max-width: ${size.desktop})`,
    desktopL: `(max-width: ${size.desktop})`
};


export const HeaderStyle = styled.div`
    width: 1024px;
    height: auto;
    display: flex;
    margin: auto auto;
    position: relative;
    justify-content: space-between;
    @media ${device.laptop} {
        width: 90%;
    }

`;

export const DividerHead= styled.div`
    height: auto;
    display: flex;
    align-items: center;
`;

