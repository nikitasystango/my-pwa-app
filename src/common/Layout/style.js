import styled from 'styled-components'

export const MainContentWrap = styled.div`
  &.rff_main_content{
    &.email-verify-pending{
      @media (max-width: 1025px) {
        padding-top: 50px;
      }
    }
  }
`

export const MainContent = styled.div`
  padding: var(--header-height) 6rem 0;
  min-height: calc(100vh - var(--footer-height));
  position: relative;
  min-height: calc(100vh - 236px);
  @media (max-width: 767px) {
    padding-left: 1rem;
    padding-right: 1rem;
    &.flight-availability-page-top{
      padding-top: 30px !important;
    }
  }
`
