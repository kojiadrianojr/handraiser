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

export const MainContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    margin: auto auto;
`;

export const BoxMain = styled.div`
    position: relative;
    margin: auto auto;
    width: 300px;
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
    cursor: pointer;
    color: #1f1e1c;
    height: auto;
    width: 300px;
    padarchBoxNavding: 5px;
    box-shadow: 0px 2px 5px rgba(0,0,0,0.3);
    background-color: #9cf196;
    border-radius: 4px;
    margin-bottom: 5px;
    @media ${device.mobileS} {
        width: 90%;
    }

    &:hover {
        background-color: #b0f7ab;
    }
`;

export const SearchBoxNav = styled.div`
    width: 100%;
    min-height: 100px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: auto auto;
`;

export const ResultNav = styled.div`
    position: relative;
    margin: auto auto;
    width: 300px;
    min-height: 50px;
    height: auto;
    color: #777;
    @media ${device.mobileS} {
        width: 100%;
    }
`;