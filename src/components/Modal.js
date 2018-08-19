import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Motion, spring, presets } from 'react-motion';

const Wrapper = styled.div`
  z-index: ${props => props.z};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
`;

const getDefaultStyles = () => ({
  opacity: 0,
  scale: 0
});

const getStyles = () => ({
  opacity: spring(1, presets.gentle),
  scale: spring(1, presets.gentle)
});

const ZoomIn = ({ children, ...props }) => {
  return (
    <Motion defaultStyle={getDefaultStyles()} style={getStyles()}>
      {style => (
        <Wrapper
          {...props}
          style={{
            opacity: style.opacity,
            transform: `scale(${style.scale})`
          }}
        >
          {children}
        </Wrapper>
      )}
    </Motion>
  );
};

ZoomIn.propTypes = {
  children: PropTypes.element.isRequired,
  z: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ZoomIn;
