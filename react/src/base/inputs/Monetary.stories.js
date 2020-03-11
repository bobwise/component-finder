import React from 'react';
import SprkTextInput from './SprkTextInput/SprkTextInput';
import { markdownDocumentationLinkBuilder } from '../../../../storybook-utilities/markdownDocumentationLinkBuilder';

export default {
  title: 'Components/Input/Monetary',
  decorators: [
    story => <div className="sprk-o-Box">{story()}</div>
  ],
  component: SprkTextInput,
  parameters: {
    jest: [
      'SprkErrorContainer',
      'SprkInputIconCheck',
    ],
    info: `
${markdownDocumentationLinkBuilder('input')}
- The value of this field may contain special characters
(,) which you may need to remove before submitting the form.
- Requires Additional Engineering:
  - Validation - The \`valid\` prop controls this input’s
  validation state. This boolean is determined by your own
  validation logic. Validation happens before reformatting.
  - Reformatting to monetary pattern (##.##) - On blur, it
  should reformat to add commas and decimals to the hundredth
  place. Reformat user input with the \`formatter\` prop.
  This prop receives a function that takes the current value
  and returns the reformatted value.
`,
  },
};

export const monetaryInput = () => (
  <SprkTextInput label="Payment" textIcon name="monetary" placeholder="0.00" />
);

monetaryInput.story = {
  name: 'Default',
  parameters: {
    jest: [
      'SprkTextInput',
    ]
  },
};

export const invalidMonetaryInput = () => (
  <SprkTextInput
    label="Payment"
    textIcon name="monetary"
    placeholder="0.00"
    valid={false}
    errorMessage="There is an error on this field."
  />
);

invalidMonetaryInput.story = {
  name: 'Invalid',
  parameters: {
    jest: [
      'SprkTextInput',
    ]
  },
};

export const disabledMonetaryInput = () => (
  <SprkTextInput
    label="Payment"
    textIcon name="monetary"
    placeholder="0.00"
    disabled
  />
);

disabledMonetaryInput.story = {
  name: 'Disabled',
  parameters: {
    jest: [
      'SprkTextInput',
    ]
  },
};
