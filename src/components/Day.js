import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'react-moment';

const Wrapper = styled.div`
  min-width: 8rem;
  min-height: 8rem;
  flex: 1;
  background-color: ${props =>
    props.nodate ? 'rgba(27, 20, 100, .2)' : '#fff'};
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
    <Wrapper nodate={data ? false : true}>
      {data ? <Display format="D">{data}</Display> : <span>&nbsp;</span>}
    </Wrapper>
  );
};

Day.propTypes = {
  data: PropTypes.instanceOf(Date)
};

export default Day;
