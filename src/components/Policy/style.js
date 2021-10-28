import styled from 'styled-components'

export const Title = styled.h1`
    color: var(--text-dark);
    text-align: center;
    letter-spacing: 0.5px;
    font-size: 42px;
    margin: 10px 0;
    padding: 10px 15px;
    text-transform: capitalize;
    width: 100vw !important;
    margin: 0 calc(-50vw + 50%) 25px !important;
    background: var(--light);
    /*width: 100%;
    margin: 0 0 25px !important;*/
    font-family: var(--primary-font);
`
export const Content = styled.div`
    padding: 15px;
    font-family: var(--primary-font);
    color: var(--text-light);

    h1,h2,h3,h4,h5,h6,p,ol,ul,li,span,div,a,strong,b {
        font-family: inherit;
    }

    h1,h2,h3 {
        font-size: 1.5rem;
    }
    h1,h2,h3,h4,a {
        color: var(--text-dark)
    }

`