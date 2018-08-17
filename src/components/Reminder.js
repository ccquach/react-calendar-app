import React from 'react';
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
  const afternoon = hour > 12;
  // debugger;
  return `${afternoon ? hour - 12 : hour}:${minute}${afternoon ? 'pm' : 'am'}`;
};

const Reminder = ({ reminder: { color, time, text } }) => {
  return (
    <Wrapper color={color}>
      <Time>{formatTime(time)}</Time>
      <Text>{text}</Text>
    </Wrapper>
  );
};

Reminder.propTypes = {
  reminder: PropTypes.shape({
    time: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }).isRequired
};

export default Reminder;
