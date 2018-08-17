import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import moment from 'moment';

import Header from './Header';
import Month from './Month';
import { getReminders } from '../store/actions';

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
    year: moment().year()
  };

  componentDidMount = () => {
    const { month, year } = this.state;
    this.props.getReminders(month, year);
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
    this.setState(newState, () =>
      this.props.getReminders(this.state.month, this.state.year)
    );
  };

  render() {
    const { reminders } = this.props;
    const { month, year } = this.state;
    return (
      <Container>
        <Header
          month={month}
          year={year}
          onMonthChange={this.handleMonthChange}
        />
        <Month month={month} year={year} reminders={reminders} />
      </Container>
    );
  }
}

const mapStateToDispatch = state => ({
  reminders: state
});

export default connect(
  mapStateToDispatch,
  { getReminders }
)(App);
