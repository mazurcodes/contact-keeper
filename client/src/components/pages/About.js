import React from 'react'

const About = () => {
  return (
    <div>
      <h1>About page</h1>
      <p className="my-1">This is a fullstack, single page application for keeping your contacts in one place</p>
      <p>Contact Keeper is build with <strong>MERN</strong> stack:</p>
      <ul>
        <li>1. <strong>M</strong>ongoDB - non-relational database to keep stored users and their contacts</li>
        <li>2. <strong>E</strong>xpress - REST server to connect client with database</li>
        <li>3. <strong>R</strong>eact - client side library for Single Page Applications</li>
        <li>4. <strong>N</strong>ode.js - run-time environment to execute javascript code on server</li>
      </ul>
      <p className="my-1 bg-dark p">
        <strong>Version:</strong> 0.0.1</p>
    </div>
  )
}

export default About
