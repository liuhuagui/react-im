import React from 'react';
import caller from '../../img/caller.png';
import '../../css/caller.css';
import { Link } from 'react-router-dom';

const Dial = props => (
    <Link to="/visitor">
      <div id="caller">
        <img alt="客服" src={caller} />
        <p>在线客服</p>
      </div>
    </Link>
);

export default Dial;

