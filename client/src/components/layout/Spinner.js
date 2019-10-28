import React from 'react';
import spinner from "../../assets/spinner.gif";

const Spinner = () => {
  return (
    <>
      <img src={spinner} alt="loading spinner" style={{
        width: "200px", margin: "auto", display: "block"
      }}/>
    </>
  )
};

export default Spinner
