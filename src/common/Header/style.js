import styled, { css } from 'styled-components'
import { Dropdown } from 'semantic-ui-react'

export const FixHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    background: var(--dark);
    width: 100%;
    padding: 1rem;
    top: 0;
    z-index:999;
    @media (max-width: 1025px) {
      flex-wrap: wrap;
    }
    p.email-verify-msg {
        position: absolute;
        left: 53%;
        transform: translateX(-50%);
        color: var(--medium-blue);
        background-color: rgba(3,178,216,.3);
        font-weight: 700;
        padding: 8px 15px;
        border-radius: 5px;
        cursor: pointer;
        @media (max-width: 1025px) {
          top: auto;
          left: 0px;
          right: 10px;
          transform: none;
          text-align: center;
          position: relative;
          flex-basis: 100%;
          margin-top: 15px;
        }
        @media (max-width: 767px) {
        left:0px;
        &.email-verify-msg-bottom{
          position: absolute;
          top: calc(100vh - 154px);
          background: #132c52;
          left: 10px;
        }
        }
    }
`
export const Logo = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;

    svg{
        display: block;
        height: auto;
    }
    img,
    svg {
        max-width: 220px;
        width: 100%;

        @media (max-width: 359px) {
            max-width: 200px;
        }
    }
`

export const HeaderAction = styled.div`
    display: flex;
    align-items: center;
    width: calc(100% - 220px);

    &.justify-content-end {
      justify-content: flex-end;
    }

    button{
        margin-left:1rem;
    }


    @media (max-width: 991px) {
      justify-content: flex-end;

      nav {
        display: none;
      }
    }

    

`

export const Button = styled.button`
    display: flex;
    align-items: center;
    font-weight: normal;
    border-radius: 6px;
    text-transform: capitalize;
    font-size: 14px;
    line-height: 1.35;
    border: 1px solid transparent;
    font-family: 'Open Sans', sans-serif;
    padding: 0.6rem 1rem;
    transition: all 0.2s ease-in;
    color: var(--white);
    background-color: transparent;
    white-space: nowrap;
    font-weight:600;
    &:hover,
    &:focus {
      color: var(--medium-blue);
      cursor: pointer;
    }
    &:focus {
      outline: none
    }
    &.is-active{
      color:var(--medium-blue);
    }
    ${props => props.darkBlue && css`
        background-color: var(--dark);

        :hover, :focus {
            background: var(--dark-hover);
            outline: none;
            color: var(--white)
        }
    `}

    ${props => props.mediumBlue && css`
        background-color: var(--medium-blue);

        :hover, :focus {
            background: var(--medium-blue-hover);
            outline: none;
            color: var(--white);
            font-weight:600;
        }
    `}

    ${props => props.upgradeBtn && css`
        border-color: var(--medium-blue);
        background-color: #03B2D8;
        color: white;
        margin-right: 20px;
        margin-left: 10px !important;

        :hover, :focus {
            border-color: var(--medium-blue-hover);
            outline: none;
            background-color: transparent;
            color: var(--medium-blue-hover)
        }
    `}
`
export const MenuToggleButton = styled.button`
    border: none;
    background: transparent;
    padding: 0;
    margin: 0 !important;
    position: relative;

    svg {
        --size: 34px;
        width: var(--size);
        height: var(--size);
        display: block;
        @media (max-width: 414px) {
            margin-right:25px;
        }
    }
    .profile-img-mobile{
       width: 35px;
       height:35px;
       border-radius: 50%;
    }
    &:hover,
    &:focus,
    &:active {
        cursor: pointer
    }
`


export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0 20px;
`
export const NavItem = styled.span`
  font-size: 14px;
  line-height: 1.35;
  font-weight: 600;
  color: var(--light);
  text-transform: capitalize;
  display: block;
  padding: 5px 10px;
  transition: all 0.2s ease-in;
  white-space: nowrap;

  &:hover {
    cursor: pointer;
    color: var(--medium-blue);
  }

  &.is-active {
    color: var(--medium-blue);
  }
`

export const ProfileImgDropdown = styled(Dropdown)`
  &.profile-img {
    --size: 34px;
    width: var(--size);
    height: var(--size);
    display: flex !important;
    align-items: center;
    justify-content: center;

    .profile-img__icon {
      width: var(--size);
      height: var(--size);
      display: block;
    }

    > .text {
      > img {
        margin: 0 !important;
        border-radius: 50%;
        --size: 34px;
        width: var(--size) !important;
        height: var(--size) !important;
        max-height: initial !important;
      }
    }

    &.dropdown {
      &.ui.active.visible {
        svg {
          path {
            fill: var(--medium-blue)
          }
        }
      }
      .icon {
        display: none;
      }

      .menu {
        width: 100px;
        right: 0;
        left: initial;
        top: 50px;

        .item {
          .description {
            margin: 0;
            float: none !important;
            color: var(--grey1);
          }

          &:hover {
            color: var(--dark);
            background: var(--light-blue);
          }
        }
      }
    }
  }
`

export const NavRight = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

  @media (max-width: 639px) {
    display: none
  }
`

export const DropdownAirline = styled(Dropdown)`
.text {
 font-size: 14px;
 font-weight: 600;
 color: var(--light);
}

&.dropdown {
 &.ui.active.visible {
   svg {
     path {
       fill: var(--medium-blue)
     }
   }
 }
 .menu {
   width: 100px;
   right: 0;
   left: initial;
   top: 50px;

   .item {
     .description {
       margin: 0;
       float: none !important;
       color: var(--grey1);
     }

     &:hover {
       color: var(--dark);
       background: var(--light-blue);
     }
   }
 }
}
`