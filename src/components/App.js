import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import moment from 'moment';

import Header from './Header';
import Month from './Month';
import ReminderForm from './ReminderForm';
import RemindersList from './RemindersList';
import {
  getReminders,
  addReminder,
  updateReminder,
  deleteReminder
} from '../store/actions/reminders';
import { toggleForm, toggleList } from '../store/actions/modals';
import { getFilteredReminders } from '../utils/getFilteredReminders';
import { getRemindersList } from '../utils/getRemindersList';

const Container = styled.main`
  min-width: 80rem;
  max-width: 114rem;
  width: 80%;
  margin: 10vh auto;
  padding: 3rem;
`;

class App extends Component {
  state = {
    month: moment().month(),
    year: moment().year()
  };

  componentDidMount = () => {
    this.props.getReminders();
  };

  handleMonthChange = direction => {
    const { month, year } = this.state;

    // exit if not expected direction value
    if (direction !== 'left' && direction !== 'right') return;

    // get new month and year
    let newState;
    if (direction === 'left') {
      // if January and going back a month, update to previous year
      if (month === 0) newState = { month: 11, year: year - 1 };
      else newState = { month: month - 1 };
    } else if (direction === 'right') {
      // if December and going forward a month, update to next year
      if (month === 11) newState = { month: 0, year: year + 1 };
      else newState = { month: month + 1 };
    }

    // update state
    this.setState(newState, () => this.props.getReminders());
  };

  handleAdd = item => {
    this.props.addReminder({ id: Date.now(), ...item }, this.props.activeDate);
  };

  handleUpdate = item => {
    this.props.updateReminder(item, this.props.activeDate);
  };

  render() {
    const {
      reminders,
      deleteReminder,
      form,
      list,
      activeDate,
      toggleForm,
      toggleList
    } = this.props;
    const { month, year } = this.state;

    return (
      <Container>
        <Header
          month={month}
          year={year}
          onMonthChange={this.handleMonthChange}
        />
        <Month
          month={month}
          year={year}
          reminders={getFilteredReminders(reminders, month, year)}
          toggleForm={toggleForm}
          toggleList={toggleList}
        />
        {form.isOpen && (
          <ReminderForm
            toggleForm={toggleForm}
            addReminder={this.handleAdd}
            updateReminder={this.handleUpdate}
            reminder={form.reminder}
            deleteReminder={deleteReminder}
            activeDate={activeDate}
          />
        )}
        {list.isOpen && (
          <RemindersList
            reminders={getRemindersList(reminders, activeDate)}
            toggleForm={toggleForm}
            toggleList={() => toggleList(null)}
            activeDate={activeDate}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  reminders: state.reminders,
  form: state.modals.form,
  list: state.modals.list,
  activeDate: state.modals.activeDate
});

export default connect(
  mapStateToProps,
  {
    getReminders,
    addReminder,
    updateReminder,
    deleteReminder,
    toggleForm,
    toggleList
  }
)(App);
