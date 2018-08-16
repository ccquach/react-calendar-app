import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'react-moment';

const Wrapper = styled.div`
  flex: 1;
  background-color: #fff;
  margin: 2px;
  position: relative;
`;

const Display = styled(Moment)`
  position: absolute;
  top: 0.7rem;
  left: 0.7rem;
  font-size: 1.2rem;
`;

const Day = ({ data }) => {
  return (
    <Wrapper>
      {data ? <Display format="D">{data}</Display> : <span>&nbsp;</span>}
    </Wrapper>
  );
};

Day.propTypes = {
  data: PropTypes.instanceOf(Date)
};

export default Day;
