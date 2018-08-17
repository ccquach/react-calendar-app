import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import Week from './Week';
import { getDaysInMonth } from '../helpers/getDaysInMonth';

const Wrapper = styled.div`
  min-height: 60rem;
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

const Month = ({ month, year, reminders, toggleModal }) => {
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
    if (!!daysOfWeek.length) {
      /*
      daysOfWeek: [{
        date: <string>,
        items: [{
          time: <string>,
          text: <string>,
          color: <string>
        }]
      }]
      */
      // map days of week to their reminders
      const data = daysOfWeek.map(day => {
        const dateOfMonth = moment(new Date(day)).date();
        const dateItems = reminders.filter(
          r => moment(r.date).date() === dateOfMonth
        );
        return !!dateItems.length
          ? dateItems[0]
          : { date: moment(day).format('YYYY-MM-DD'), items: [] };
      });

      // add to weeks array
      weeks.push(
        <Week
          key={`week-${i}`}
          index={firstWeek + i}
          days={data}
          toggleModal={toggleModal}
        />
      );
      // restart firstWeek at 1 if previous value is 52
      if (firstWeek === 52) firstWeek = 0;
    }
  }

  // render Week components
  return <Wrapper>{weeks}</Wrapper>;
};

Month.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  reminders: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          time: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
          color: PropTypes.string.isRequired
        })
      ).isRequired
    }).isRequired
  ).isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default Month;
