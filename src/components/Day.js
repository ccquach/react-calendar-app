import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'react-moment';
import Reminder from './Reminder';
import { sortReminders } from '../utils/sortReminders';

// #region styles
const Wrapper = styled.div`
  font-size: 1.1rem;
  flex: 1;
  border-radius: 3px;
  background-color: ${props =>
    props.nodate ? 'rgba(27, 20, 100, .2)' : '#ecf0f1'};
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
  font-size: 1.4rem;
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

const MoreReminders = styled.a`
  text-decoration: none;
  display: block;
  text-align: center;
  padding: 0.5rem 0.7rem;
  background-color: #ecf0f1;
  margin-top: 2px;
  cursor: pointer;
`;
// #endregion

const Day = ({ date, reminders, toggleForm, toggleList }) => {
  const sortedReminders =
    reminders && !!reminders.length ? sortReminders(reminders) : null;

  return (
    <Wrapper nodate={date ? false : true}>
      {date && (
        <AddButton onClick={toggleForm.bind(this, date, {})}>&#43;</AddButton>
      )}
      {date ? <Display format="D">{date}</Display> : <span>&nbsp;</span>}
      <Reminders>
        {sortedReminders
          ? sortedReminders
              .map(r => (
                <Reminder
                  key={r.id}
                  {...r}
                  toggleForm={toggleForm.bind(this, date, r)}
                />
              ))
              .slice(0, 2)
          : null}
        {sortedReminders &&
          sortedReminders.length > 2 && (
            <MoreReminders
              onClick={toggleList.bind(this, date)}
            >{`+${sortedReminders.length - 2} more`}</MoreReminders>
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
  toggleForm: PropTypes.func.isRequired,
  toggleList: PropTypes.func.isRequired
};

export default Day;
