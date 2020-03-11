import React from 'react';
import SprkRevealInput from './SprkRevealInput/SprkRevealInput';
import { markdownDocumentationLinkBuilder } from '../../../../storybook-utilities/markdownDocumentationLinkBuilder';

export default {
  title: 'Components/Input/Password',
  decorators: [
    story => <div className="sprk-o-Box">{story()}</div>
  ],
  component: SprkRevealInput,
  parameters: {
    jest: [
      'SprkErrorContainer',
      'SprkInputIconCheck',
    ],
    info: `${markdownDocumentationLinkBuilder('input')}`,
  },
};

export const passwordInput = () => (
  <SprkRevealInput
    label="Password"
    toggleLabel="Show Password"
    name="password-1"
  />
);

passwordInput.story = {
  name: 'Default',
  parameters: {
    jest: [
      'SprkRevealInput',
    ]
  },
};

export const invalidPasswordInput = () => (
  <SprkRevealInput label="Password"
    toggleLabel="Show Password"
    name="password-1"
    valid={false}
    errorMessage="There is an error on this field."
  /> );

invalidPasswordInput.story = {
  name: 'Invalid',
  parameters: {
    jest: [
      'SprkRevealInput',
    ]
  },
};

export const disabledPasswordInput = () => (
  <SprkRevealInput label="Password"
     toggleLabel="Show Password"
     name="password-1"
     disabled
  />
);

disabledPasswordInput.story = {
  name: 'Disabled',
  parameters: {
    jest: [
      'SprkRevealInput',
    ]
  },
};

