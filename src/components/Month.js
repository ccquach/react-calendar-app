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

const Month = ({ month, year }) => {
  // get array of days for the month
  const days = getDaysInMonth(month, year);
  // get week index of first week of the month
  const firstWeek = moment(days[0])
    .startOf('week')
    .isoWeek();

  // combine days into arrays based on week index
  let weeks = [];
  // check for days data five weeks after first week of month
  // max possible number of weeks in a month is six
  for (let i = 0; i < 6; i++) {
    const daysOfWeek = days.filter(
      day =>
        moment(day)
          .startOf('week')
          .isoWeek() ===
        firstWeek + i
    );
    // if day data exists for week index, create Week component
    if (!!daysOfWeek.length)
      weeks.push(
        <Week key={`week-${i}`} index={firstWeek + i} days={daysOfWeek} />
      );
  }
  // render Week components
  return <Wrapper>{weeks}</Wrapper>;
};

Month.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired
};

export default Month;
