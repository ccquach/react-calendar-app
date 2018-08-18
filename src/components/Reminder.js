import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: ${props => props.color};
  color: #ecf0f1;
  margin-bottom: 1px;
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
  handleClick = () => {
    this.props.setActiveReminder(this.props.reminder);
    this.props.toggleModal();
  };

  render() {
    const { reminder } = this.props;
    const { color, time, text } = reminder;
    return (
      <Wrapper color={color} onClick={this.handleClick}>
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
  toggleModal: PropTypes.func.isRequired,
  setActiveReminder: PropTypes.func.isRequired
};

export default Reminder;
