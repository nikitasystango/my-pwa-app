import React from "react";
import { Card } from "semantic-ui-react";
import { profileCardDetails } from "constants/globalConstants";
import PropTypes from "prop-types";
import { GreaterIconMyProfile } from "utils/svgs";

const CardNavigation = (props) => {
  const { updateReducerState } = props;
  const handleCardClick = (item) => {
    updateReducerState("dashboard", "activeProfileView", item.activeTab);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Card.Group>
      {profileCardDetails.map((item, key) => (
        <Card
          key={key}
          className="cursor-pointer"
          onClick={() => handleCardClick(item)}
        >
          <Card.Content className="card-content">
            <div className="card-iiner-content">
              <div className="icon-header-wrap">
                {item.icon}
                <Card.Header>{item.header} </Card.Header>
              </div>
              <span className="arrowIcon">
                {" "}
                <GreaterIconMyProfile />{" "}
              </span>
            </div>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};

CardNavigation.propTypes = {
  updateReducerState: PropTypes.func,
};

export default CardNavigation;
