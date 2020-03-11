import { SprkIconModule } from './sprk-icon.module';
import { storyWrapper } from '../../../../../../.storybook/helpers/storyWrapper';
import { SprkIconComponent } from './sprk-icon.component';
import { markdownDocumentationLinkBuilder } from '../../../../../../../storybook-utilities/markdownDocumentationLinkBuilder';
import { getIcons, attachIcons } from '../../../../../../../storybook-utilities/icon-utilities/icon-name-util.js';

export default {
  title: 'Components/Icons',
  component: SprkIconComponent,
  decorators: [
    storyWrapper(
      storyContent => (
        `<div class="sprk-o-Box">${ storyContent }<div>`
      )
    )
  ],
  parameters: {
    info: `
${markdownDocumentationLinkBuilder('icon')}

The icons in Spark are the property of Quicken
Loans and are not provided directly in our packages. You
will need to include the Icon yourself.

#### Accessibility

Icons can simply be decorative or intended to convey
meaning. Each use-case has separate accessibility
considerations.

Decorative Icons are purely visual or used to reinforce accompanying
text.

- The \`aria-hidden="true"\` attribute must be applied to any purely
decorative icon. This ensures that a screen reader will not communicate
unwanted meaning to the user.

Standalone Icons convey meaning or imply action and do not have accompanying
text.

- All Icons contain a title attribute that screen readers will use to
communicate the Icon’s meaning.
`,
    docs: { iframeHeight: 90 },
  },
};

const modules = {
  imports: [
    SprkIconModule,
  ],
};

export const defaultStory = () => ({
  moduleMetadata: modules,
  template: `
    <sprk-icon
      iconType="access"
      additionalClasses="sprk-c-Icon--xl"
    >
    </sprk-icon>
  `,
});

defaultStory.story = {
  name: 'Default',
  parameters: {
    jest: ['sprk-icon.component'],
  }
};

export const gallery = () => {
  if (typeof window !== 'undefined') {
    window.addEventListener('sprk-icons-loaded', () => {
      attachIcons(getIcons());
    });
  }

  setTimeout(() => { attachIcons(getIcons()); }, 100);

  return {
    moduleMetadata: modules,
    template: `
      <ul class="sbdocs-gallery-container sprk-o-Stack sprk-o-Stack--split@xs"></ul>
    `,
  };
};

gallery.story = {
  name: 'Gallery',
  parameters: {
    docs: {
      iframeHeight: 1000
    },
    jest: ['sprk-icon.component'],
  }
};
