import styled from 'styled-components'

export const SectionTitle = styled.h2`
    padding: 15px 0 0;
    font-size: 25px;
    color: var(--dark);
    text-align: center;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 991px) {
        font-size: 24px;
        padding: 24px 0;
    }

    @media (max-width: 479px) {
        font-size: 18px;
        padding: 18px 0 3px;
    }
`

export const RecentBlogsWrap = styled.div`
    padding: 20px 0 30px;
    margin-top: 35px;

    @media (min-width: 1200px) {
        .ui.container {
            width: 915px;
            margin-left: auto !important;
            margin-right: auto !important;
        }
    }

    @media (max-width: 767px) {
        padding: 15px 0;
    }

    @media (max-width: 767px) {
        padding: 15px 0;
    }
`

// <!-- Blog Components
export const BlogBox = styled.div`
    background: var(--white);
    position: relative;
    margin-bottom: 38px;
    transition: all .2s ease-in;
    border-radius: 8px;
    box-shadow: 0 2px 9px 0 rgba(0,0,0,.1);

    &:hover {
      cursor: pointer;
      transform: scale(1.025) translateY(-15px);
      &::after {
        visibility: visible;
        opacity: 1;
      }
    }

    @media (min-width: 768px) {
      height: 100%;
    }

    @media (max-width: 991px) {
      margin-bottom: 0;
    }
`

export const BlogBoxInner = styled.div`
  position: relative;
  z-index: 2;
  background: var(--white);
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`
export const BlogMedia = styled.div`
    /* height: 165px; */

    @media (max-width: 767px) {
      height: auto
    }
`

export const BlogImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: fill;
    border-radius: 0;
    display: block;
`
export const BlogDummyImage = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 0;
    background: #efefef;
    position: relative;

    svg {
      display: block;
      width: 100%;
      height: auto
    }

    &::after {
      content: 'No Image';
      display: block;
      color: rgba(0,0,0,.2);
      font-size: 18px;
      font-weight: bold;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
`

export const BlogTitle = styled.h3`
    color: var(--grey1);
    font-size: 14px;
    line-height: 1.5;
    font-weight: 700;
    margin: 0;
    padding: 17px 56px 27px 17px;
    height: 100%;
`
export const BlogAuthor = styled.div`
    position: relative;
    width: calc(100% - 30px);
    margin: -15px auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    &:before {
        content: '';
        display: block;
        position: absolute;
        width: calc(100% - 41px);
        height: 1px;
        background: var(--grey5);
        left: 0;
    }
`
export const BlogAuthorImg = styled.img`
    width: 33px;
    height: 33px;
    border-radius: 50%;
    background: #C4C4C4;
    object-fit: cover;
    display: block;
`
export const BlogDummyImg = styled.span`
    width: 33px;
    height: 33px;
    border-radius: 50%;
    /* background: #C4C4C4; */
    background: #03B2D8;
    display: inline-block;
    vertical-align: middle;
    background-size: 14px 16px;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAYAAAAmlE46AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACPSURBVHgBlZALDYAwDERvKMABlYAEcIAjcAJOsAAKwAE4KGv4ZFnoPi9pli29tXeABzOXtnpbB9/MtggxnkafTT4MiRrWGdzewtMSdKqQcIfOihABjxQTSqpTdqqpGG0q7qDkXIwxJyJrkuJR3jpNVDu+NPq/STHRS+cKR07n+MKRG/JoC/GGfOp3IiGP8wJctTMeN0hX7AAAAABJRU5ErkJggg==');
`
export const BlogAuthorName = styled.p`
    padding: 17px 17px 20px;
    color: var(--medium-blue);
    font-size: 14px;
    line-height: 2.5;

    &::first-letter {
        text-transform: uppercase;
    }
`
// Blog Components -->