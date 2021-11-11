import styled from 'styled-components'

export const AirlineClassesDropdown = styled.div`
  position: relative;

  &.is--open {
    .acd {
      &__text {
        background-image: var(--caret-img--up);
      }
      &__menu {
        display: block;
      }
    }
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    margin-top: .21428571em;
    border-radius: .28571429rem;
    box-shadow: 0 2px 3px 0 rgba(34,36,38,.15);
    border: 1px solid rgba(34,36,38,.15);
    background: var(--white);
    padding-top: 5px;
  }
  li {
    padding: .78571429rem 1.14285714rem;
    display: flex;
    align-items: center;

    &:last-child {
      justify-content: flex-end;
      padding-top: 0 !important;
      /* border-top: 1px solid rgba(34,36,38,.15); */
    }
  }

  .acd {
    &__text {
      font-weight: 600;
      background-image: var(--caret-img--down);
      background-size: 7px 5px !important;
      background-repeat: no-repeat !important;
      background-position: right 8px;
      line-height: 19.999px;
      @media only screen and (max-width:360px)
      {
        background-size: 22px 5px !important;
      } 
      &:hover {
        cursor: pointer;
      }
    }
    &__menu {
      display: none;
      position: absolute;
      top: 100%;
      z-index: 11;
      min-width: 200px;
    }
    &__classes-btn {

      color: rgba(var(--black-rgb), .87);

          svg {
            --size: 16px;
            width: var(--size);
            height: var(--size);
            display: inline-block;
            vertical-align: middle;
            margin-right: 4px;

            & + span {
              display: inline-block;
              vertical-align: middle;
            }
          }

          &:hover {
            color: var(--dark);
            cursor: pointer;
          }
          &.active {
            color: rgba(var(--black-rgb), .95)
          }
          &.inactive-cabin-class{
            opacity: 0.3;
            svg {
              rect{
                fill: #656565;
                stroke: #656565;
              }
            }
           }
    }
    &__btn {
      border: 0 !important;
      border-radius: 0 !important;
      background: transparent !important;
      margin: 0 !important;
      padding: 2px 8px !important;
      transition: all 0.2s ease-in;

      &--cancel {
        color: var(--text-light) !important;
        &:hover,
        &:focus {
          color: var(--grey2) !important;
        }
      }
      &--ok {
        color: var(--medium-blue) !important;
        &:hover,
        &:focus {
          color: var(--medium-blue-hover) !important;
        }
      }
    }
  }
`


export const SingleDatePickerWrapper = styled.div`
  /* Day Date Picker */
  .SingleDatePicker_picker {

    .DayPickerNavigation_button {
      --size: 23px;
      --offset: 15px;

      width: var(--size);
      height: var(--size);
      border-radius: 5px;
      background: rgba(var(--medium-blue-rgb), 0.06);
      border: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: var(--offset);
      transition: all 0.2s ease-in;

      &:hover {
        background: rgba(var(--medium-blue-rgb), 0.15);
      }

      &:first-child {
        left: var(--offset);
      }
      &:last-child {
        left: calc(100% - (var(--size) + var(--offset)));
      }
    }


    .CalendarMonth_caption {
      font-size: 14px;
      line-height: 23px;
      color: var(--medium-blue);
      padding: 15px 0 7px;
      border-bottom: 1px solid rgba(var(--dark-rgb), 0.08);
      margin: 0 8px 40px;

      strong {
        font-weight: 600;
      }
    }

    .DayPicker_weekHeaders {
      position: absolute;
      z-index: 1;
      display: flex;
      margin: 0 !important;
      top: 46px;
      left: 8px;
      right: 8px;
    }

    .DayPicker_weekHeader {
      padding: 0 !important;
      position: static;
      width: 264px;

      ul {
        margin: 0;
        li {
          width: calc(100% / 7) !important;
          height: 37px;
          line-height: 37px;
          position: relative;
          font-size: 13px;
          font-weight: 600;
          color: rgba(var(--dark-rgb), 0.4);
          small {
            color: transparent;
          }

          &::after {
            content: '';
            display: block;
            position: absolute;
            font-weight: inherit;
            font-size: inherit;
            line-height: inherit;
            color: inherit;
            text-align: center;
            background: var(--white);
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
          }

          $days: "S", "M", "T", "W" , "T", "F", "S";
          @for $i from 1 through length($days) {
            &:nth-child(#{$i})::after {
              content: nth($days, $i)
            }
          }
        }
      }
    }

    .CalendarMonth {
      padding: 0 !important;
    }
    .CalendarMonthGrid_month__horizontal {
      width: 264px;
      padding: 0;
    }
    .DayPicker__horizontal,
    .DayPicker_transitionContainer,
    .DayPicker_focusRegion,
    .DayPicker__horizontal {
      width: 282px !important;
    }
    .CalendarMonth_table {
      width: 100%;

      td {
        & ~ .CalendarDay__selected_span:first-child {
          border-radius: 50% 0 0 50%;
        }
        &:not([class]) {

          & + .CalendarDay__selected_span {
            border-radius: 50% 0 0 50%;
          }
        }
      }

      .CalendarDay {
        font-weight: 600;
        font-size: 13px;
        line-height: 19px;
        color: rgba(var(--dark-rgb), 1);
        height: 38px !important;
        position: relative;
        padding: 2px;

        &__Date {
          height: 100%;
          display: flex;
          justify-content: center;
          align-content: center;
          align-items: center;
        }

        &__hovered_span,
        &__hovered_span:hover,
        &__hovered_span:active {
          background: rgba(var(--medium-blue-rgb), .15) !important;
          color: var(--dark);
        }

        &.CalendarDay__blocked_out_of_range {
          color: rgba(var(--dark-rgb), .25);
        }

        &.CalendarDay__selected {
          /* background: rgba(var(--medium-blue-rgb), .15) !important; */
          background: var(--white) !important;
          color: var(--white);

          .CalendarDay__Date {
            background-color: var(--dark);
            border-radius: 50%;
            position: relative;
          }
        }

        &.CalendarDay__selected_span {
          background: rgba(var(--medium-blue-rgb), 0.15) !important;
          color: var(--dark) !important;

          &:first-child {
            border-radius: 50% 0 0 50%;
          }

          &:last-child {
            border-radius: 0 50% 50% 0;
          }

          & ~ .CalendarDay__selected_span:last-child {
            border-radius: 0 50% 50% 0;
          }
        }

        @mixin rangeArrows {
          content: '';
          display: block;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 2px;
          border-width: 5px 5.5px;
          border-style: solid;
          border-color: transparent;
          z-index: 1;
        }

        &.CalendarDay__selected_start {
          border-top-left-radius: 50%;
          border-bottom-left-radius: 50%;

          .CalendarDay__Date {
            &::before {
              @include rangeArrows;
              left: -12.5px;
              border-right-color: var(--dark);
            }
          }
        }

        &.CalendarDay__selected_end {
          border-top-right-radius: 50%;
          border-bottom-right-radius: 50%;

          .CalendarDay__Date {
            &::after {
              @include rangeArrows;
              right: -12.5px;
              border-left-color: var(--dark);
            }
          }
        }

      }
    }
  }
`

export const SendMeAlertCard = styled.div`
  background: var(--blue1);
  border-radius: 10px;
  font-size: 12px;
  line-height: 16px;
  /* padding: 0 5px; */
  margin-top: 6px;

  p {
    margin-bottom: 3px;
    color: var(--dark);
    font-size: 12px;
  }

  button {
    /* max-width: 150px; */
    /* width: 100%; */
    min-height: 40px !important;
    width: 100%;
    max-width: 100%;
    padding: 16.5px 25px !important;
    font-size: 16px !important;
  }

  svg {
    margin-left: 10px;
    width: 16px;
    height: auto;
    display: inline-block;
    vertical-align: bottom;
  }

  @media (min-width: 768px) {
    .ui.grid>.row>.column:last-child {
      text-align: right;
    }
    p {
      font-size: 14px;
    }
  }
`
