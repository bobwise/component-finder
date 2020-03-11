import { storyWrapper } from '../../../../../../.storybook/helpers/storyWrapper';
import { SprkPaginationModule } from './sprk-pagination.module';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { SprkPaginationComponent } from './sprk-pagination.component';
import { markdownDocumentationLinkBuilder } from '../../../../../../../storybook-utilities/markdownDocumentationLinkBuilder';

export default {
  title: 'Components/Pagination',
  component: SprkPaginationComponent,
  decorators: [
    storyWrapper(
      storyContent => (
        `<div class="sprk-o-Box">${ storyContent }<div>`
      )
    )
  ],
  parameters: {
    info: `
${markdownDocumentationLinkBuilder('pagination')}
- The goToPage event includes the newly selected page
in a property called “page”, while the goBack and
goForward events include this value in a property called
“newPage”. This is further documented in
[Issue 1730](https://github.com/sparkdesignsystem/spark-design-system/issues/1730).
`,
    docs: { iframeHeight: 70 },
  },
};

const modules = {
  imports: [
    SprkPaginationModule,
    RouterModule.forRoot([{
      path: 'iframe.html',
      component: SprkPaginationComponent,
    }]),
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
};

export const defaultStory = () => ({
  moduleMetadata: modules,
  template: `
    <sprk-pagination
      [totalItems]="3"
      [itemsPerPage]="1"
      idString="pagination-1"
    >
    </sprk-pagination>
  `,
});

defaultStory.story = {
  name: 'Default',
  parameters: {
    jest: [
      'sprk-pagination.component',
    ],
  },
};

export const pager = () => ({
  moduleMetadata: modules,
  template: `
    <sprk-pagination
      paginationType="pager"
      [totalItems]="40"
      [itemsPerPage]="10"
      idString="pagination-3"
    >
    </sprk-pagination>
  `,
});

pager.story = {
  parameters: {
    jest: [
      'sprk-pagination.component',
    ],
  },
};
