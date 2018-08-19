import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'react-moment';
import Reminder from './Reminder';
import styles from '../styles/modal';

const Wrapper = styled.div`
  ${styles.wrapper};
  z-index: 100;
`;

const Heading = styled.h2`
  ${styles.heading};
`;

const List = styled.ul`
  ${styles.container};
  list-style: none;
`;

const Item = styled.li`
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const CloseButton = styled.a`
  ${styles.closeButton};
`;

const RemindersList = ({
  isOpen,
  reminders,
  toggleForm,
  toggleList,
  activeDate
}) => {
  return (
    <Wrapper isOpen={isOpen} onClick={toggleList}>
      <List onClick={e => e.stopPropagation()}>
        <Heading>
          <Moment format="MMM. D, YYYY">{activeDate}</Moment>
        </Heading>
        <CloseButton onClick={toggleList}>&times;</CloseButton>
        {reminders.map(r => (
          <Item key={`listitem-${r.id}`}>
            <Reminder
              reminder={r}
              toggleForm={toggleForm.bind(this, activeDate, r)}
              padding={1}
            />
          </Item>
        ))}
      </List>
    </Wrapper>
  );
};

RemindersList.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  reminders: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  toggleForm: PropTypes.func.isRequired,
  toggleList: PropTypes.func.isRequired,
  activeDate: PropTypes.string.isRequired
};

export default RemindersList;
