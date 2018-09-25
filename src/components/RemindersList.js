import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'react-moment';
import Modal from './Modal';
import Reminder from './Reminder';
import styles from '../styles/modal';

const Heading = styled.h2`
  ${styles.heading};
`;

const List = styled.ul`
  ${styles.container};
  list-style: none;
  width: auto;
`;

const Item = styled.li`
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const CloseButton = styled.a`
  ${styles.closeButton};
`;

const RemindersList = ({ reminders, toggleForm, toggleList, activeDate }) => {
  return (
    <Modal z={100} onClick={toggleList}>
      <List onClick={e => e.stopPropagation()}>
        <Heading>
          <Moment format="MMM. D, YYYY">{activeDate}</Moment>
        </Heading>
        <CloseButton onClick={toggleList}>&times;</CloseButton>
        {reminders.map(r => (
          <Item key={`listitem-${r.id}`}>
            <Reminder
              {...r}
              toggleForm={toggleForm.bind(this, activeDate, r)}
              padding={1.25}
              fontSize={1.3}
            />
          </Item>
        ))}
      </List>
    </Modal>
  );
};

RemindersList.propTypes = {
  reminders: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  toggleForm: PropTypes.func.isRequired,
  toggleList: PropTypes.func.isRequired,
  activeDate: PropTypes.string.isRequired,
};

export default RemindersList;
