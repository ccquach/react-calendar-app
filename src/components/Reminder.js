import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  cursor: pointer;
  font-size: 1.1rem;
  background-color: ${props => props.color};
  color: #ecf0f1;
  border-radius: 3px;
  padding: 4px;
  margin-bottom: 1px;
  ${props => (props.padding ? `padding: ${props.padding}rem` : null)};
`;

const Time = styled.span`
  margin-right: 4px;
`;

const Text = styled.span``;

const formatTime = time => {
  const timeParts = time.split(':');
  const hour = +timeParts[0];
  const minute = timeParts[1];

  // convert military to standard time
  const isMidnight = hour === 0;
  const isAfternoon = hour > 12;
  const isNoon = hour === 12;
  return `${isAfternoon ? +hour - 12 : isMidnight ? 12 : hour}:${minute}${
    isAfternoon || isNoon ? 'pm' : 'am'
  }`;
};

class Reminder extends Component {
  render() {
    const { reminder, padding, toggleForm } = this.props;
    const { color, time, text } = reminder;
    return (
      <Wrapper color={color} onClick={toggleForm} padding={padding}>
        <Time>{formatTime(time)}</Time>
        <Text>{text}</Text>
      </Wrapper>
    );
  }
}

Reminder.propTypes = {
  reminder: PropTypes.shape({
    time: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }).isRequired,
  toggleForm: PropTypes.func.isRequired,
  padding: PropTypes.number
};

export default Reminder;
