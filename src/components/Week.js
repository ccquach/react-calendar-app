import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import Day from './Day';

const Wrapper = styled.div`
  flex: 1;
  min-height: 20vh;
  width: 100%;
  display: flex;
`;

const Week = ({ index, days, toggleModal, setActiveReminder }) => {
  let daysList = [];
  let daysIdx = 0;
  // render seven Day components, mapping date to correct day of week
  for (let i = 0; i < 7; i++) {
    const dayObj = days[daysIdx];
    let isMatching = dayObj ? +moment(dayObj.date).format('e') === i : false;
    daysList.push(
      <Day
        key={`week${index}-day${i}`}
        date={isMatching ? dayObj.date : null}
        reminders={isMatching ? dayObj.items : null}
        toggleModal={toggleModal}
        setActiveReminder={setActiveReminder}
      />
    );
    if (isMatching) daysIdx++;
  }

  return <Wrapper>{daysList}</Wrapper>;
};

Week.propTypes = {
  index: PropTypes.number.isRequired,
  days: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          time: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
          color: PropTypes.string.isRequired
        })
      ).isRequired
    })
  ).isRequired,
  toggleModal: PropTypes.func.isRequired,
  setActiveReminder: PropTypes.func.isRequired
};

export default Week;
