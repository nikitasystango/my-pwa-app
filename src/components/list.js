import React from "react";
import history from "../utils/history";

const List = (props) => {


  return (
    <>
      <div className="container">
        <span
          onClick={() => {
            history.push("/");
          }}
          className="d-flex cursor-pointer"
        >
          <img
            src="https://img.icons8.com/fluency/48/000000/circled-left-2.png"
            alt="Products"
          />{" "}
          <h1>Back</h1>
        </span>
        <div >
          <div className="overlay" />
          <div className="container-fluid">
            <div className="desc">
              <h1>I am Product page</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>
              <br/>
              <br/>
              <br/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
