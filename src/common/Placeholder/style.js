import styled from 'styled-components'

export const RecentBlogPlaceholder = styled.div`

  border-radius: 6px;
  background: var(--white);
  overflow: hidden;
  margin-bottom: 40px;

  .recent-blogs-placeholder {
    &__image {
        &.placeholder {
            width: 100% !important;
            max-width: 100% !important;

            .image {
                height: 165px !important;

                &:after {
                    background: transparent !important;
                }
            }
        }
    }
    &__header {
        padding: 15px 15px 20px;
    }
    &__author-image {
        /* padding: 0 15px; */
        margin: -15px 15px;
        position: relative;

        &:before {
            content: '';
            display: block;
            position: absolute;
            width: calc(100% - 41px);
            height: 1px;
            background: var(--grey5);
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }

        .ui.placeholder {
            height: 33px !important;
            width: 33px !important;
            border-radius: 50%;
            margin-left: auto !important;
        }
    }
    &__paragraph {
        padding: 30px 15px 20px;

        .placeholder {
            max-width: 70% !important;
        }
    }

    .placeholder {
        .header,
        .paragraph {
            padding: 0;
        }
    }
  }
`

export const PageHeadPlaceHolder = styled.div`
  max-width: 600px !important;
  margin: 30px auto !important;

  .ui.placeholder {
      max-width: 100% !important;
      padding: 15px;

      &:last-child {
          max-width: 70% !important;
          margin-top: 20px !important;
          margin-left: auto !important;
          margin-right: auto !important;
      }

      @media (max-width: 479px) {
          padding: 10px;
          &:last-child {
              margin-top: 10px !important;
          }
      }
  }
`


export const TestimonialPlaceholderWrapper = styled.div`
  .testimonial-placeholder {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      &__image {
          height: 60px;
          width: 60px;
          margin-right: 40px !important;
          border-radius: 50%;
      }

      &__paragraph {
          width: calc(100% - 100px);
          margin-top: 0 !important;
      }

      &-wrapper {
          &.ui.stackable.grid {
              > .column:not(.row) {
                  @media (min-width: 641px) {
                      width: 50% !important;
                  }
                  @media (max-width: 640px) {
                      &:last-child {
                          display: none !important;
                      }
                  }
              }
          }
      }
  }
`


export const HowItWorksPlaceholderWrapper = styled.div`
  .how-it-work-placeholder {
      background-color: transparent !important;

      .image {
          height: 120px !important;
      }
      .header {
          .line {

              &:nth-child(2) {
                  margin-left: auto !important;
                  margin-right: auto !important;
              }
          }
      }
      .header,
      .paragraph {
          &:before {
              background-color: var(--light) !important;
          }
      }
      .line {
          background-color: var(--light) !important;
      }

      &-wrapper {
          &.ui.stackable.grid {
              > .column:not(.row) {
                  @media (min-width: 480px) and (max-width: 767px) {
                      width: 50% !important;

                      &:nth-child(3),
                      &:nth-child(4) {
                          display: none !important;
                      }
                  }
                  @media (max-width: 479px) {
                      &:not(:first-child) {
                          display: none !important;
                      }
                  }
              }
          }
      }
  }
`


export const SubscriptionPlaceholderWrapper = styled.div`
  .subscription-placeholder {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      max-width: 700px;
      width: 100%;
      margin: 0 auto;
      background: var(--light);
      border-radius: 10px;
      padding: 15px 0 !important;

      &__col {
          padding: 0 15px !important;

          &:nth-child(1) {
              width: 31.25% !important;

              .placeholder {
                  border-radius: 10px;

                  .image {
                      height: 135px !important;
                  }
              }
          }
          &:nth-child(2) {
              width: 68.75% !important;
              .placeholder {
                  height: 15px;
                  width: 100% !important;
                  max-width: 100% !important;

                  &:nth-child(1) {
                      max-width: 35% !important;
                  }
                  &:nth-child(2) {
                      max-width: 95% !important;
                  }
                  &:nth-child(3) {
                      max-width: 85% !important;
                  }
                  &:nth-child(4) {
                      max-width: 20% !important;
                  }
                  &:nth-child(5) {
                      max-width: 30% !important;
                  }

                  &:not(:first-child) {
                      margin-top: 15px !important;
                  }
              }
          }
      }

      @media (max-width: 479px) {
          flex-direction: column;

          &__col {
              &:nth-child(1) {
                  margin-bottom: 15px;
              }
              &:nth-child(1),
              &:nth-child(2) {
                  width: 100% !important;
              }
          }
      }
  }
`
