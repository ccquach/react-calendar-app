import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import Week from './Week';
import { getDaysInMonth } from '../helpers/getDaysInMonth';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const getDaysOfWeek = (days, firstWeek, i) =>
  days.filter(
    day =>
      moment(day)
        .startOf('week')
        .isoWeek() ===
      firstWeek + i
  );

const Month = ({ month, year }) => {
  // get array of days for the month
  const days = getDaysInMonth(month, year);
  // get week index of first week of the month
  let firstWeek = moment(days[0])
    .startOf('week')
    .isoWeek();

  // combine days into arrays based on week index
  let weeks = [];
  // check for days data five weeks after first week of month
  // max possible number of weeks in a month is six
  for (let i = 0; i < 6; i++) {
    const daysOfWeek = getDaysOfWeek(days, firstWeek, i);
    // if day data exists for week index, create Week component
    if (!!daysOfWeek.length)
      weeks.push(
        <Week key={`week-${i}`} index={firstWeek + i} days={daysOfWeek} />
      );
    // restart firstWeek at 1 if previous value is 52
    if (firstWeek === 52) firstWeek = 0;
  }
  // render Week components
  return <Wrapper>{weeks}</Wrapper>;
};

Month.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired
};

export default Month;
