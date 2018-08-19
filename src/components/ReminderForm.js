import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import range from 'lodash.range';
import Moment from 'react-moment';
import moment from 'moment';
import styles from '../styles/modal';
import Modal from './Modal';

// #region styles
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
  padding: 0.8rem;
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
  width 29%;
`;

const Minute = styled.select`
  ${inputFieldStyles};
  width 29%;
`;

const Meridiem = styled.select`
  ${inputFieldStyles};
  width 32%;
`;

const SaveButton = styled.button`
  color: #34495e;
  font-family: inherit;
  background-color: #feca57;
  border: none;
  border-bottom: 2px solid #ff9f43;
  border-radius: 3px;
  padding: 0.7rem 1.5rem;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.3s ease-out;

  &:hover,
  &:focus {
    background-color: #ffc312;
    border-bottom: 2px solid #f79f1f;
  }

  &:active {
    border-bottom: 1px solid #f79f1f;
  }
`;

const DeleteButton = styled.button.attrs({
  type: 'button'
})`
  color: #34495e;
  font-family: inherit;
  float: right;
  display: inline-block;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
  padding: 0.7rem 1.5rem;
  background-color: #ff6b6b;
  border: none;
  border-bottom: 2px solid #ee5253;
  border-radius: 3px;
  transition: all 0.3s ease-out;

  &:hover,
  &:focus {
    background-color: #e74c3c;
    border-bottom: 2px solid #c0392b;
  }

  &:active {
    border-bottom: 1px solid #c0392b;
  }
`;

// #endregion

const DEFAULT_STATE = {
  hour: '12',
  minute: '00',
  meridiem: 'am',
  text: '',
  color: 'DodgerBlue'
};

class ReminderForm extends Component {
  state = DEFAULT_STATE;

  componentDidMount = () => {
    // on update, autocomplete form with selected reminder
    if (this.props.reminder) {
      const { text, time, color } = this.props.reminder;
      this.setState({
        text,
        color,
        hour: moment(time, 'HH:mm').format('h'),
        minute: moment(time, 'HH:mm').format('mm'),
        meridiem: moment(time, 'HH:mm').format('a')
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
    const time = `${hour}:${minute + meridiem}`;
    const militaryTime = moment(time, 'h:mma').format('HH:mm');
    // console.log(`Saved as: ${militaryTime}`);

    // add or update new reminder
    reminder
      ? updateReminder({ id: reminder.id, time: militaryTime, text, color })
      : addReminder({ time: militaryTime, text, color });
    // reset and close form
    this.setState(DEFAULT_STATE);
    this.handleClose();
  };

  render() {
    const { hour, minute, meridiem, text, color } = this.state;
    const { reminder, activeDate } = this.props;

    const colors = [
      'DodgerBlue',
      'BlueViolet',
      'Crimson',
      'DarkOrange',
      'ForestGreen'
    ];

    return (
      <Modal z={200} onClick={this.handleClose}>
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
              {colors.map(color => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </Select>
            <Color bg={color} />
          </InputGroup>

          <SaveButton type="submit">Save</SaveButton>
          {reminder && (
            <DeleteButton onClick={this.handleDelete}>Delete</DeleteButton>
          )}
        </Form>
      </Modal>
    );
  }
}

ReminderForm.propTypes = {
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
