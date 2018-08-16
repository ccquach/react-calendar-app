import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import Day from './Day';

const Wrapper = styled.div`
  height: 15vh;
  width: 100%;
  display: flex;
`;

const Week = ({ index, days }) => {
  let daysList = [];
  let daysIdx = 0;
  for (let i = 0; i < 7; i++) {
    let isMatching = +moment(days[daysIdx]).format('e') === i;
    daysList.push(
      <Day
        key={`week${index}-day${i}`}
        data={isMatching ? days[daysIdx] : null}
      />
    );
    if (isMatching) daysIdx++;
  }

  return <Wrapper>{daysList}</Wrapper>;
};

Week.propTypes = {
  index: PropTypes.number.isRequired,
  days: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired
};

export default Week;
