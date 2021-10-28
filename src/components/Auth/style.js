import styled from 'styled-components'

export const NoteText = styled.p`
    background: #E2F6FB;/*var(--light)*/
    color: var(--dark);/*var(--black)*/
    padding: .70rem;
    font-weight: 600;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 6px;
    max-width: 1140px;
    margin: 0 auto;
    text-align: center;
`
// <!-- Section Comonents
export const Section = styled.div`
    @media (min-width: 992px) {
        padding-top: 5%;
    }
`
export const SectionTitle = styled.h3`
    font-size: 30px;
    line-height: 1.33;
    color: var(--dark);
    font-weight: bold;
    font-family: inherit;
    max-width: 310px;
    margin-bottom: 18px;


    @media (max-width: 991px) {
        max-width: 100%;
    }

    @media (max-width: 767px) {
        font-size: 21px;
    }
`
export const SectionDescription = styled.div`
    font-size: 16px;
    line-height: 1.5;
    color: var(--black);
    max-width: 440px;

    p {
        font-size: inherit;
        line-height: inherit;
        color: inherit;
    }

    @media (max-width: 991px) {
        max-width: 100%;
    }

    @media (max-width: 767px) {
        font-size: 14px;
    }
`
// Section Components -->
