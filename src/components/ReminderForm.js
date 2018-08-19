import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import range from 'lodash.range';
import Moment from 'react-moment';
import styles from '../styles/modal';

// #region styles
const Background = styled.div`
  ${styles.wrapper};
  z-index: 200;
`;

const Heading = styled.h2`
  ${styles.heading};
`;

const CloseButton = styled.a`
  ${styles.closeButton};
`;

const Form = styled.form`
  ${styles.container};
`;

const InputGroup = styled.div`
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:not(:last-child) {
    margin-bottom: 3rem;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 1rem;
`;

const inputFieldStyles = css`
  font-family: inherit;
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: 3px;
  border: none;
  border-bottom: 2px solid transparent;
  transition: border-bottom 0.2s ease-out;

  &:focus {
    border-bottom: 2px solid #1b1464;
  }
`;

const Input = styled.input`
  ${inputFieldStyles};
`;

const Select = styled.select`
  ${inputFieldStyles};
  width: 80%;
  margin-right: 1.5rem;
`;

const Color = styled.div`
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${props => props.bg};
  transform: translateY(30%);
`;

const Time = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Hour = styled.select`
  ${inputFieldStyles};
  width 30%;
`;

const Minute = styled.select`
  ${inputFieldStyles};
  width 30%;
`;

const Meridiem = styled.select`
  ${inputFieldStyles};
  width 30%;
`;

const SaveButton = styled.button`
  font-size: inherit;
  border: none;
  border-bottom: 2px solid rgba(19, 14, 72, 0.5);
  border-radius: 3px;
  padding: 0.7rem 1.5rem;
  background-color: rgba(27, 20, 100, 0.5);
  color: #ecf0f1;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease-out;

  &:hover,
  &:focus {
    background-color: rgba(27, 20, 100, 0.8);
    border-bottom: 2px solid rgb(19, 14, 72);
  }

  &:active {
    border-bottom: 1px solid rgb(19, 14, 72);
  }
`;

const DeleteButton = styled.button.attrs({
  type: 'button'
})`
  float: right;
  display: inline-block;
  color: #ecf0f1;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  padding: 0.7rem 1.5rem;
  background-color: rgba(231, 76, 60, 0.5);
  border: none;
  border-bottom: 2px solid rgba(192, 57, 43, 0.5);
  border-radius: 3px;
  transition: all 0.3s ease-out;

  &:hover,
  &:focus {
    background-color: rgba(231, 76, 60, 0.8);
    border-bottom: 2px solid rgb(192, 57, 43);
  }

  &:active {
    border-bottom: 1px solid rgb(192, 57, 43);
  }
`;

// #endregion

const DEFAULT_STATE = {
  hour: 12,
  minute: '00',
  meridiem: 'am',
  text: '',
  color: 'blue'
};

class ReminderForm extends Component {
  state = DEFAULT_STATE;

  componentDidMount = () => {
    // on update, autocomplete form with selected reminder
    if (this.props.reminder) {
      const { text, time, color } = this.props.reminder;
      const timeParts = time.split(':');
      const hour = +timeParts[0];
      const minute = timeParts[1];
      this.setState({
        text,
        color,
        hour: hour > 12 ? hour - 12 : hour === 0 ? hour + 12 : hour,
        minute,
        meridiem: hour >= 12 ? 'pm' : 'am'
      });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClose = () => {
    // clear active reminder state so form not autocompleted on next mount
    this.props.toggleForm(null, {});
  };

  handleDelete = () => {
    this.props.deleteReminder(this.props.reminder.id);
    this.handleClose();
  };

  handleSubmit = e => {
    e.preventDefault();
    const { addReminder, reminder, updateReminder } = this.props;
    const { hour, minute, meridiem, text, color } = this.state;

    // save as military time for sorting
    const isMidnight = meridiem === 'am' && hour === 12;
    const isAfternoon = meridiem === 'pm' && hour < 12;
    const isSingleDigit = hour < 10;
    const time = `${
      isMidnight
        ? '00'
        : isAfternoon
          ? +hour + 12
          : isSingleDigit
            ? `0${hour}`
            : hour
    }:${minute}`;
    // console.log(`Saved as: ${time}`);

    // add or update new reminder
    reminder
      ? updateReminder({ id: reminder.id, time, text, color })
      : addReminder({ time, text, color });
    // reset and close form
    this.setState(DEFAULT_STATE);
    this.handleClose();
  };

  render() {
    const { hour, minute, meridiem, text, color } = this.state;
    const { isOpen, reminder, activeDate } = this.props;

    return (
      <Background isOpen={isOpen} onClick={this.handleClose}>
        <Form onSubmit={this.handleSubmit} onClick={e => e.stopPropagation()}>
          <Heading>
            <Moment format="MMM. D, YYYY">{activeDate}</Moment>
          </Heading>
          <CloseButton onClick={this.handleClose}>&times;</CloseButton>

          {/* Text */}
          <InputGroup>
            <Label htmlFor="text">Reminder</Label>
            <Input
              id="text"
              type="text"
              name="text"
              value={text}
              onChange={this.handleChange}
              placeholder="Something to do"
              maxLength={30}
            />
          </InputGroup>

          {/* Time */}
          <InputGroup>
            <Label>Time</Label>
            <Time>
              <Hour name="hour" onChange={this.handleChange} value={hour}>
                {range(1, 13).map(n => (
                  <option key={`hour-${n}`} value={n}>
                    {n}
                  </option>
                ))}
              </Hour>
              <Minute name="minute" onChange={this.handleChange} value={minute}>
                {range(0, 60).map(n => (
                  <option key={`minute-${n}`} value={n < 10 ? `0${n}` : `${n}`}>
                    {n < 10 ? `0${n}` : `${n}`}
                  </option>
                ))}
              </Minute>
              <Meridiem
                name="meridiem"
                onChange={this.handleChange}
                value={meridiem}
              >
                <option value="am">am</option>
                <option value="pm">pm</option>
              </Meridiem>
            </Time>
          </InputGroup>

          {/* Color */}
          <InputGroup>
            <Label htmlFor="color">Color</Label>
            <Select
              id="color"
              name="color"
              onChange={this.handleChange}
              value={color}
            >
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
              <option value="red">Red</option>
              <option value="orange">Orange</option>
              <option value="green">Green</option>
            </Select>
            <Color bg={color} />
          </InputGroup>

          <SaveButton type="submit">Save</SaveButton>
          {reminder && (
            <DeleteButton onClick={this.handleDelete}>Delete</DeleteButton>
          )}
        </Form>
      </Background>
    );
  }
}

ReminderForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleForm: PropTypes.func.isRequired,
  addReminder: PropTypes.func.isRequired,
  updateReminder: PropTypes.func.isRequired,
  reminder: PropTypes.shape({
    time: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }),
  deleteReminder: PropTypes.func.isRequired,
  activeDate: PropTypes.string.isRequired
};

export default ReminderForm;
