import styled, { css } from 'styled-components'
import { Header } from 'semantic-ui-react'

export const Title = styled(Header)`
  font-size: 26px !important;
  line-height: 1.5 !important;
  color: var(--dark) !important;
  margin: 0 0 24px !important;

  ${props => props.white && css`
    color: var(--white) !important;
  `}

  @media (max-width: 1199px) {
    font-size: 24px !important;
    margin: 0 0 20px !important;
  }
  @media (max-width: 991px) {
    font-size: 18px !important;
    margin: 0 0 16px !important;
  }
`

export const Para = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: var(--grey2);
  margin-bottom: 18px;

  ${props => props.white && css`
    color: var(--white) !important;
  `}

  ${props => props.bold && css`
    font-weight: 600;
  `}

  b {
    font-weight: 600;
  }

  @media (max-width: 1199px) {
    font-size: 16px !important;
    margin-bottom: 15px !important;
  }
  @media (max-width: 991px) {
    font-size: 14px !important;
    margin: 0 0 18px !important;
  }
`

export const PoniterSection = styled.div`
  padding: 0 30px;
  margin-bottom: 40px;

  @media (max-width: 1199px) {
    padding: 0 15px;
    margin-bottom: 25px;
  }

  @media (max-width: 767px) {
    padding: 0;
    margin-bottom: 15px;
  }
`
export const PoniterSectionCount = styled.span`
  font-weight: 800;
  font-size: 70px;
  line-height: 1;
  display: block;
  margin-bottom: 20px;
  color: var(--dark);

  ${props => props.opac65 && css`
  color: rgba(var(--dark-rgb), 0.65);
  `}

  ${props => props.opac40 && css`
  color: rgba(var(--dark-rgb), 0.40);
  `}

  @media (max-width: 1199px) {
    font-size: 50px !important;
  }

  @media (max-width: 991px) {
    font-size: 35px !important;
  }
`
export const PoniterSectionTitle = styled(Header)`
  font-size: 16px !important;
  line-height: 1.5 !important;
  color: var(--dark) !important;
  margin: 0 0 15px !important;
  font-weight: 600 !important;

  @media (max-width: 1199px) {
    font-size: 14px !important;
    margin: 0 0 10px !important;
  }
`
export const PoniterSectionText = styled.p`
  font-size: 13px;
  line-height: 1.5;
  color: var(--grey2);

  @media (max-width: 1199px) {
    font-size: 12px !important;
  }

`