import styled from 'styled-components'

export const DatePickerWrapper = styled.div`
  .DateRangePicker {
    background: none;
    background-color: var(--white);
    padding-left: 6px;
    border-radius: 6px;
    border: 1px solid var(--white);

    &:focus {
      border-color: var(--medium-blue);
      outline: none;
    }

    &--focus {
      border-color: var(--medium-blue);
    }
  }

  .DateInput {
      width: 100%;
      background-color: transparent !important;
      width: calc(calc(100% - 20px) / 2);
  }
  .DateInput_input {
      padding: 0 5px;
      font-weight: 600;
      font-size: 14px;
      font-family: var(--primary-font) !important;
      background-color: transparent !important;
      margin: 0;
      min-height: 47px;
      line-height: 47px;
      border: none !important;
      color: var(--dark) !important;

      &:focus {
        outline: none;
      }

      &.DateInput_input__disabled{
        font-style: normal;
        opacity: 0.5;
    }
  }

  .DateRangePickerInput  {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: transparent !important;
      border: none !important;
  }
  .DateRangePickerInput_arrow {
      width: 20px;
      position: relative;

      &:before {
          content: '';
          display: flex;
          align-items: center;
          justify-content: center;
          height:2px;
          width: 6px;
          margin: 0 auto;
          position: absolute;
          left: 50%;
          background-color: var(--dark);
          font-weight:600;
          top: 50%;
          transform: translate(-50%, -50%);

      }
  }
  .DateRangePickerInput_arrow_svg,
  .DateInput_fang {
      display: none;
  }
  &__depart {
    .DateRangePicker_picker {
      left: -25px !important;
    }
  }
  &__return {
    .DateRangePicker_picker {
      left: -301px !important;
      @media  (max-device-width: 800px) and (orientation: landscape) {
        left: -301px !important;
      }
      @media (max-width: 767px) {
        left: -155px !important;
      }
    }
  }

  .DateRangePicker_picker {
    top: 69px !important;
    width: 300px;
    border: 1px solid rgba(var(--black-rgb), .1);
    overflow: hidden;

    .DayPicker {
      width: 100% !important;
      box-shadow: none;
      border-radius: 0;

      > div {
        > div {
          width: 100% !important;
        }
      }
      .DayPicker_transitionContainer {
        width: 100% !important;
      }
      .CalendarMonth {
        padding: 0 !important;
      }

      .CalendarMonthGrid_month__horizontal {
        width: 264px;
        padding: 0;

        &:not(:last-child) {
          margin-right: 24px;
        }
      }
    }
  }
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
    left: 0;
    margin: 0 !important;
    top: 46px;
    margin-left: 8px !important;
  }

  .DayPicker_weekHeader {
    padding: 0 !important;
    width: 264px;
    position: static;

    &:not(:last-child) {
      margin-right: 24px;
    }

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

        &:nth-child(1)::after {
          content: 'S'
        }
        &:nth-child(2)::after {
          content: 'M'
        }
        &:nth-child(3)::after {
          content: 'T'
        }
        &:nth-child(4)::after {
          content: 'W'
        }
        &:nth-child(5)::after {
          content: 'T'
        }
        &:nth-child(6)::after {
          content: 'F'
        }
        &:nth-child(7)::after {
          content: 'S'
        }
      }
    }
  }

  .CalendarMonthGrid__horizontal {
    left: 8px !important;
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
      outline: none !important;

      &:focus {
        outline: none !important;
      }

      &__Date {
        height: 100%;
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        outline: none !important;

        &:focus {
          outline: none !important;
        }
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
        background: rgba(var(--medium-blue-rgb), .15) !important;
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

      &.CalendarDay__selected_start {
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;

        .CalendarDay__Date {
          &::before {
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
            right: -12.5px;
            border-left-color: var(--dark);
          }
        }
      }

    }
  }

  @media (max-width: 575px) {
    max-width: 414px;
    width:100%;
    .DayPickerNavigation {
      max-width: 280px;
    }

    .DateRangePicker {
      padding-left: 0;
      &_picker {
        top: 55px !important;
        .DayPicker {
          .CalendarMonthGrid_month__horizontal {
            width: 260px;

            &:not(:last-child) {
              margin: 0 9px !important;
            }
          }
        }
      }
    }

    .DayPickerNavigation_button {
      &:last-child {
        left: calc(100% - (var(--size)));
      }
    }
    .DayPicker_weekHeader {
      width: 280px;
    }
    .DateInput_input {
      font-size: 12px;
      min-height: 35px;
      line-height: 35px;
    }
  }

  .DayPickerKeyboardShortcuts_buttonReset {
    display: none;
  }
`
