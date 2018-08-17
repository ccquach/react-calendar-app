import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import range from 'lodash.range';

const Background = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  transform: ${props => (props.isOpen ? 'scale(1)' : 'scale(0)')};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  transition: all 0.4s ease-out;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: transparent;
  border: none;
  font-size: 1.6rem;
  line-height: 1;
  cursor: pointer;
`;

const Form = styled.form`
  font-size: 1.2rem;
  z-index: 200;
  width: 30rem;
  border-radius: 3px;
  padding: 4rem 5rem;
  background-color: #ecf0f1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

const inputField = `
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
  ${inputField};
`;

const Select = styled.select`
  ${inputField};
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
  ${inputField};
  width 30%;
`;

const Minute = styled.select`
  ${inputField};
  width 30%;
`;

const Meridiem = styled.select`
  ${inputField};
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

  &:hover {
    background-color: rgba(27, 20, 100, 0.8);
    border-bottom: 2px solid rgb(19, 14, 72);
  }

  &:active {
    border-bottom: 1px solid rgb(19, 14, 72);
  }
`;

class ReminderForm extends Component {
  state = {
    hour: 11,
    minute: '01',
    meridiem: 'pm',
    text: '',
    color: 'blue'
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { hour, minute, meridiem, text, color } = this.state;
    const { isOpen, toggleModal } = this.props;
    return (
      <Background isOpen={isOpen}>
        <Form onSubmit={this.handleSubmit}>
          <CloseButton onClick={toggleModal}>&times;</CloseButton>

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
              required
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
        </Form>
      </Background>
    );
  }
}

ReminderForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default ReminderForm;
