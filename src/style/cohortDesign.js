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

export const BoxMain = styled.div`
    position: relative;
    margin: auto auto;
    max-width: 1024px;
    height: auto;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    text-align: center;

    @media ${device.laptopS} {
        flex-direction: column;
        align-items: center;
    }
`;

export const BoxCont = styled.div`
    color: #1f1e1c;
    height: auto;
    width: 300px;
    padding: 5px;
    box-shadow: 0px 2px 5px rgba(0,0,0,0.3);
    background-color: #9cf196;
    border-radius: 4px;
    margin-bottom: 5px;
    @media ${device.mobileS} {
        width: 90%;
    }
`;

export const SearchBoxNav = styled.div`
    max-width: 1024px;
    height: 100px; 
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: auto auto;
`;