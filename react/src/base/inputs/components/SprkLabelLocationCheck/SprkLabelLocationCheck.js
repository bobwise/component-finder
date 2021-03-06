import React from 'react';
import propTypes from 'prop-types';
import SprkInputLabel from '../SprkInputLabel/SprkInputLabel';

const SprkLabelLocationCheck = ({
  children,
  type,
  label,
  hiddenLabel,
  disabled,
  id,
}) => {
  if (type === 'hugeTextInput' || type === 'hugeSelect') {
    return (
      <>
        {children}
        <SprkInputLabel
          id={id}
          hiddenLabel={hiddenLabel}
          label={label}
          disabled={disabled}
        />
      </>
    );
  }
  return (
    <>
      <SprkInputLabel
        id={id}
        hiddenLabel={hiddenLabel}
        label={label}
        disabled={disabled}
      />
      {children}
    </>
  );
};
SprkLabelLocationCheck.defaultProps = {
  disabled: false,
  hiddenLabel: false,
};

SprkLabelLocationCheck.propTypes = {
  type: propTypes.string,
  label: propTypes.string,
  id: propTypes.string,
  disabled: propTypes.bool,
  hiddenLabel: propTypes.bool,
};

export default SprkLabelLocationCheck;
