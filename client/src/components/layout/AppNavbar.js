import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const AppNavbar = ({ title, icon}) => {

    return (
      <div className="navbar bg-primary">
        <h1>
          <i className={icon} /> {title}
        </h1>

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/about"> About </Link>
          </li>

          <li>
            <a href="/product/upload"> Upload </a>
          </li>
          <li>
            <Link to="/register"> Register </Link>
          </li>

          <li>
            <Link to="/login"> Login </Link>
          </li>
        </ul>
      </div>
    );

}

AppNavbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
};

AppNavbar.defaultProps = {
    title: 'Travel App',
    icon: 'fas fa-plane-departure'
};

export default AppNavbar;