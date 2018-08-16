import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const Wrapper = styled.header`
  text-align: center;
  margin: 3rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled.h1`
  font-weight: 300;
  text-transform: uppercase;
`;

const Arrow = styled.a`
  font-size: 2rem;
  cursor: pointer;
`;

class Header extends Component {
  handleClick = e => {
    e.preventDefault();
    this.props.onMonthChange(e.target.id);
  };

  render() {
    const { month, year } = this.props;
    return (
      <Wrapper>
        <Arrow id="left" onClick={this.handleClick}>
          &lt;
        </Arrow>
        <Heading>
          {months[month]} {year}
        </Heading>
        <Arrow id="right" onClick={this.handleClick}>
          &gt;
        </Arrow>
      </Wrapper>
    );
  }
}

Header.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  onMonthChange: PropTypes.func.isRequired
};

export default Header;