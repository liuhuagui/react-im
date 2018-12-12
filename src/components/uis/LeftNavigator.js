import React from 'react';
import '../../css/left-navigator.css';
import {NavLink} from 'react-router-dom';


export default (props) => (
    <div id="left_navigator">
      <NavLink to="/"><div id="left_navigator_message" className="active"></div></NavLink>
      <div id="left_navigator_gear"></div>
      <div id="left_navigator_chart"></div>
    </div>
);