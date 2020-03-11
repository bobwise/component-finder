import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { storyWrapper } from '../../../../../../.storybook/helpers/storyWrapper';
import { SprkPromoModule } from './sprk-promo.module';
import { SprkPromoComponent } from './sprk-promo.component';
import { markdownDocumentationLinkBuilder } from '../../../../../../../storybook-utilities/markdownDocumentationLinkBuilder';

export default {
  title: 'Components/Promo',
  component: SprkPromoComponent,
  decorators: [
    storyWrapper(
      storyContent => (
        `<div class="sprk-o-Box">${storyContent}<div>`
      )
    )
  ],
  parameters: {
    info: `${markdownDocumentationLinkBuilder('promo')}`,
    docs: { iframeHeight: 430 },
  },
};

const modules = {
  imports: [
    SprkPromoModule,
    RouterModule.forRoot([{
      path: 'iframe.html',
      component: SprkPromoComponent,
    }]),
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
};

export const defaultStory = () => ({
  moduleMetadata: modules,
  template: `
    <sprk-promo
      title="Title"
      subtitle="Subtitle"
      cta="button"
      ctaLinkHref="foo"
      ctaText="Learn More"
      hasBorder="true"
      idString="promo-1"
    >
      Lorem ipsum dolor. Sit amet pede. Tempus donec et. Suspendisse id
      inventore integer eum non enim diam habitant. Maecenas nunc per lacus
      neque egestas. Diam quod curabitur.
    </sprk-promo>
  `,
});

defaultStory.story = {
  name: 'Default',
  parameters: {
    jest: [
      'sprk-promo.component',
    ],
  },
};

export const flag = () => ({
  moduleMetadata: modules,
  template: `
    <sprk-promo
      isFlag="true"
      imgSrc="https://spark-assets.netlify.com/spark-logo-updated.svg"
      imgAlt="Spark Design System Logo"
      idString="promo-2"
    >
      Lorem ipsum dolor. Sit amet pede. Tempus donec et. Suspendisse id
      inventore integer eum non enim diam habitant. Maecenas nunc per lacus
      neque egestas. Diam quod curabitur.
    </sprk-promo>
  `,
});

flag.story = {
  parameters: {
    docs: { iframeHeight: 300 },
    jest: [
      'sprk-promo.component',
    ],
  },
};

export const withImage = () => ({
  moduleMetadata: modules,
  template: `
    <sprk-promo
      title="Title"
      subtitle="Subtitle"
      media="img"
      imgAlt="placeholder"
      imgSrc="https://spark-assets.netlify.com/house.jpg"
      cta="button"
      ctaText="Learn More"
      idString="promo-3"
    >
      Lorem ipsum dolor. Sit amet pede. Tempus donec et. Suspendisse id
      inventore integer eum non enim diam habitant. Maecenas nunc per lacus
      neque egestas. Diam quod curabitur.
    </sprk-promo>
  `,
});

withImage.story = {
  parameters: {
    jest: [
      'sprk-promo.component',
    ],
  },
};

export const withReversedImage = () => ({
  moduleMetadata: modules,
  template: `
    <sprk-promo
      title="Title"
      subtitle="Subtitle"
      mediaRev="true"
      imgAlt="placeholder"
      imgSrc="https://spark-assets.netlify.com/house.jpg"
      imgHref="https://sparkdesignsystem.com"
      cta="button"
      ctaText="Learn More"
      idString="promo-4"
    >
      Lorem ipsum dolor. Sit amet pede. Tempus donec et. Suspendisse id
      inventore integer eum non enim diam habitant. Maecenas nunc per lacus
      neque egestas. Diam quod curabitur.
    </sprk-promo>
  `,
});

withReversedImage.story = {
  parameters: {
    jest: [
      'sprk-promo.component',
    ],
  },
};

