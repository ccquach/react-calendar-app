import React, { Component } from 'react';
import styled from 'styled-components';

import Header from './Header';
import Calendar from './Calendar';

const Container = styled.main`
  max-width: 114rem;
  width: 80%;
  margin: 0 auto;
`;

class App extends Component {
  state = {
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  };

  handleMonthChange = direction => {
    const { month, year } = this.state;

    // exit if not expected direction value
    if (direction !== 'left' && direction !== 'right') return;

    if (direction === 'left') {
      // if January and going back a month, update to previous year
      if (month === 1) this.setState({ month: 11, year: year - 1 });
      else this.setState({ month: month - 1 });
    } else if (direction === 'right') {
      // if December and going forward a month, update to next year
      if (month === 11) this.setState({ month: 0, year: year + 1 });
      else this.setState({ month: month + 1 });
    }
  };

  render() {
    const { month, year } = this.state;
    return (
      <Container>
        <Header
          month={month}
          year={year}
          onMonthChange={this.handleMonthChange}
        />
        <Calendar month={month} year={year} />
      </Container>
    );
  }
}

export default App;
