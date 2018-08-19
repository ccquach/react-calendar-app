import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'react-moment';

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

const Time = styled(Moment)`
  margin-right: 4px;
`;

const Text = styled.span``;

class Reminder extends Component {
  render() {
    const { reminder, padding, toggleForm } = this.props;
    const { color, time, text } = reminder;
    return (
      <Wrapper color={color} onClick={toggleForm} padding={padding}>
        <Time parse="HH:mm" format="h:mma">
          {time}
        </Time>
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
