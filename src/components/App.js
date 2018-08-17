import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import moment from 'moment';

import Header from './Header';
import Month from './Month';
import ReminderForm from './ReminderForm';
import { getReminders, addReminder } from '../store/actions';
import { getFilteredReminders } from '../utils/getFilteredReminders';

const Container = styled.main`
  min-width: 80rem;
  max-width: 114rem;
  width: 80%;
  margin: 0 auto;
  padding: 3rem;
`;

class App extends Component {
  state = {
    month: moment().month(),
    year: moment().year(),
    isOpen: false,
    activeDate: ''
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

  toggleModal = activeDate => {
    this.setState({
      isOpen: !this.state.isOpen,
      activeDate: !this.state.isOpen && activeDate ? activeDate : ''
    });
  };

  handleAdd = item => {
    this.props.addReminder(item, this.state.activeDate);
    this.props.getReminders();
  };

  render() {
    const { reminders } = this.props;
    const { month, year, isOpen } = this.state;
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
          toggleModal={this.toggleModal}
        />
        <ReminderForm
          isOpen={isOpen}
          toggleModal={this.toggleModal}
          addReminder={this.handleAdd}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  reminders: state
});

export default connect(
  mapStateToProps,
  { getReminders, addReminder }
)(App);
