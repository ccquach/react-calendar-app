import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'react-moment';
import Reminder from './Reminder';
import { sortReminders } from '../helpers/sortReminders';

const Wrapper = styled.div`
  flex: 1;
  background-color: ${props =>
    props.nodate ? 'rgba(27, 20, 100, .2)' : '#fff'};
  margin: 2px;
  position: relative;

  &:hover > button {
    opacity: 0.3;
  }
`;

const Display = styled(Moment)`
  position: absolute;
  top: 0.7rem;
  left: 0.7rem;
  font-size: 1.2rem;
  position: relative;
`;

const Reminders = styled.div`
  position: absolute;
  top: 30%;
  left: 0;
  padding: 2px;
  width: 100%;
`;

const AddButton = styled.button`
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  background-color: #1b1464;
  border: none;
  border-radius: 50%;
  padding: 3px 7px;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
  z-index: 100;
  opacity: 0;
  transition: opacity 0.3s ease-out;
`;

const Day = ({ date, reminders, toggleModal }) => {
  const sortedReminders =
    reminders && !!reminders.length ? sortReminders(reminders) : null;

  return (
    <Wrapper nodate={date ? false : true}>
      {date && <AddButton onClick={toggleModal}>&#43;</AddButton>}
      {date ? <Display format="D">{date}</Display> : <span>&nbsp;</span>}
      <Reminders>
        {sortedReminders ? (
          sortedReminders.map((r, i) => (
            <Reminder key={`${r}-${i}`} reminder={r} />
          ))
        ) : (
          <span>&nbsp;</span>
        )}
      </Reminders>
    </Wrapper>
  );
};

Day.propTypes = {
  date: PropTypes.string,
  reminders: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    })
  ),
  toggleModal: PropTypes.func.isRequired
};

export default Day;
