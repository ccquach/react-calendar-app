import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import Week from './Week';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function getDaysInMonth(month, year) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

const Calendar = ({ month, year }) => {
  const days = getDaysInMonth(month, year);
  const firstWeek = moment(days[0]).week();

  return (
    <Wrapper>
      <Week
        index={firstWeek}
        days={days.filter(day => moment(day).week() === firstWeek)}
      />
      <Week
        index={firstWeek + 1}
        days={days.filter(day => moment(day).week() === firstWeek + 1)}
      />
      <Week
        index={firstWeek + 2}
        days={days.filter(day => moment(day).week() === firstWeek + 2)}
      />
      <Week
        index={firstWeek + 3}
        days={days.filter(day => moment(day).week() === firstWeek + 3)}
      />
      <Week
        index={firstWeek + 4}
        days={days.filter(day => moment(day).week() === firstWeek + 4)}
      />
    </Wrapper>
  );
};

Calendar.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired
};

export default Calendar;
