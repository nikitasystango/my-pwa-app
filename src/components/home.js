import React from 'react'
import history from '../utils/history'


const Home = (props) => {
  return (
      <>
   <div className="container">
        <span
          onClick={() => {
            history.push("/list");
          }}
          className='cursor-pointer'
        >
          <h1>Go To Product List</h1>
        </span>
        <div>
        <div
          style={{
            backgroundImage:
              "url(https://image.shutterstock.com/image-vector/gradient-background-simple-light-blue-260nw-710765602.jpg)",
          }}
        >
          <div className="overlay" />
          <div className="container-fluid">
            <div className="desc">
              <h1>I am Home page</h1>
              <h2>Associate Software Developer, Systango</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>
              <br/>
              <br/>
              <br/>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default Home
