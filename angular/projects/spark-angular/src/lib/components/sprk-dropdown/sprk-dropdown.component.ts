import {
  Component,
  Input,
  Output,
  ElementRef,
  HostListener,
  EventEmitter
} from '@angular/core';
import { ISprkDropdownChoice } from './sprk-dropdown.interfaces';

@Component({
  selector: 'sprk-dropdown',
  template: `
    <div
      [ngClass]="{
        'sprk-c-MastheadMask': isOpen && dropdownType === 'mastheadSelector'
      }"
    >
      <div [ngClass]="{ 'sprk-o-Box': dropdownType === 'mastheadSelector' }">
        <sprk-link
          [additionalClasses]="getTriggerClasses()"
          (click)="toggle($event)"
          [idString]="idString"
          [analyticsString]="analyticsString"
          aria-haspopup="listbox"
          [attr.aria-label]="triggerText ? triggerText : (screenReaderText || 'Choose One')"
        >
          <span [ngClass]="getTriggerTextClasses()">{{ triggerText }}</span>
          <span class="sprk-u-ScreenReaderText">{{ screenReaderText }}</span>
          <sprk-icon
            [iconType]="triggerIconType"
            additionalClasses="sprk-u-mls sprk-c-Icon--stroke-current-color {{
              additionalIconClasses
            }}"
          ></sprk-icon>
        </sprk-link>
      </div>

      <div [ngClass]="getClasses()" *ngIf="isOpen">
        <div
          class="sprk-c-Dropdown__header"
          *ngIf="dropdownType === 'mastheadSelector' || title || selector"
        >
          <h2 class="sprk-c-Dropdown__title sprk-b-TypeBodyTwo" *ngIf="title">
            {{ title }}
          </h2>

          <sprk-link
            *ngIf="selector && !title"
            linkType="plain"
            additionalClasses="sprk-o-Stack sprk-o-Stack--split@xxs sprk-o-Stack--center-column sprk-u-Width-100"
            (click)="toggle($event)"
            [attr.aria-label]="title"
          >
            <span
              class="sprk-c-Dropdown__title sprk-b-TypeBodyTwo sprk-o-Stack__item sprk-o-Stack__item--flex@xxs"
              >{{ selector }}</span
            >
            <sprk-icon
              [iconType]="triggerIconType"
              additionalClasses="sprk-c-Icon--stroke-current-color sprk-u-mls sprk-c-Icon--toggle sprk-Stack__item {{
                additionalIconClasses
              }}"
            ></sprk-icon>
          </sprk-link>
        </div>

        <ul
          class="sprk-c-Dropdown__links"
          role="listbox"
          [attr.aria-label]="title ? title : (screenReaderText || 'My Choices')"
        >
          <li
            class="sprk-c-Dropdown__item"
            *ngFor="let choice of choices; let i = index"
            [attr.data-sprk-dropdown-choice-index]="i"
            (click)="choiceClick($event)"
            [attr.aria-selected]="choice.active"
            role="option"
          >
            <div *ngIf="choice.content; then content; else link"></div>
            <ng-template #link>
              <sprk-link
                linkType="unstyled"
                [href]="choice.href"
                [analyticsString]="choice.analyticsString"
                additionalClasses="sprk-c-Dropdown__link {{
                  choice.active && 'sprk-c-Dropdown__link--active'
                }}"
                [attr.aria-label]="choice.text"
                >{{ choice.text }}
              </sprk-link>
            </ng-template>
            <ng-template #content>
              <sprk-link
                linkType="unstyled"
                [href]="choice.href"
                [analyticsString]="choice.analyticsString"
                additionalClasses="sprk-c-Dropdown__link {{
                  choice.active && 'sprk-c-Dropdown__link--active'
                }}"
                [attr.aria-label]="choice.content.title"
              >
                <p class="sprk-b-TypeBodyOne">{{ choice.content.title }}</p>
                <p>{{ choice.content.infoLine1 }}</p>
                <p>{{ choice.content.infoLine2 }}</p>
              </sprk-link>
            </ng-template>
          </li>
        </ul>
        <ng-content select="[sprkDropdownFooter]"></ng-content>
      </div>
    </div>
  `
})
export class SprkDropdownComponent {
  /**
   * The variant of the Dropdown to render.
   */
  @Input()
  dropdownType = 'base';
  /**
   * Expects a space separated string
   * of classes to be added to the
   * component.
   */
  @Input()
  additionalClasses: string;
  /**
   * Expects a space separated string
   * of classes to be added to the
   * icon.
   */
  @Input()
  additionalIconClasses: string;
  /**
   * Expects a space separated string of
   * classes to be added to the trigger link element.
   */
  @Input()
  additionalTriggerClasses: string;
  /**
   * Expects a space separated string of
   * classes to be added to the trigger text.
   */
  @Input()
  additionalTriggerTextClasses: string;
  /**
   * The value supplied will be assigned
   * to the `data-id` attribute on the
   * component. This is intended to be
   * used as a selector for automated
   * tools. This value should be unique
   * per page.
   */
  @Input()
  idString: string;
  /**
   * The value supplied will be assigned to the
   * `data-analytics` attribute on the component.
   * Intended for an outside
   * library to capture data.
   */
  @Input()
  analyticsString: string;
  /**
   * If `true`, the Dropdown will be open when rendered.
   */
  @Input()
  isOpen = false;
  /**
   * The value supplied will be displayed
   * in a box above the choices.
   */
  @Input()
  title: string;
  /**
   * The value supplied will be assigned to
   * the title text.
   */
  @Input()
  selector: string;
  /**
   * Expects an array of
   * [ISprkDropdownChoice](https://github.com/sparkdesignsystem/spark-design-system/tree/master/src/angular/projects/spark-angular/src/lib/components/sprk-dropdown/sprk-dropdown.interfaces.ts)
   *  objects.
   */
  @Input()
  choices: ISprkDropdownChoice[];
  /**
   * If supplied, will render the icon
   * to the right of the trigger text.
   */
  @Input()
  triggerIconType: string;
  /**
   * The text that is initially rendered to the trigger.
   * If `dropdownType` is `informational`,
   * clicking on a choice will change the trigger text.
   */
  @Input()
  triggerText: string;
  /**
   * The value supplied will be visually hidden
   * inside the trigger. Userful
   * for when title is empty,
   * and only `triggerIconType` is supplied.
   */
  @Input()
  screenReaderText: string;
  /**
   * The event that is
   * emitted from the Dropdown when a choice
   * is clicked. The event contains the value
   * of the choice that was clicked.
   */
  @Output()
  choiceMade: EventEmitter<string> = new EventEmitter();
  /**
   * @ignore
   */
  constructor(public ref: ElementRef) {}
  /**
   * @ignore
   */
  toggle(event): void {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event): void {
    if (
      !this.ref.nativeElement.contains(event.target) ||
      event.target.classList.contains('sprk-c-MastheadMask')
    ) {
      this.hideDropdown();
    }
  }

  @HostListener('document:focusin', ['$event'])
  onFocusin(event): void {
    /* istanbul ignore else: angular focus event isnt setting e.target */
    if (
      !this.ref.nativeElement.contains(event.target) ||
      event.target.classList.contains('sprk-c-MastheadMask')
    ) {
      this.hideDropdown();
    }
  }
  /**
   * @ignore
   */
  choiceClick(event) {
    this.clearActiveChoices();
    const choiceIndex = event.currentTarget.getAttribute(
      'data-sprk-dropdown-choice-index'
    );
    const clickedChoice = this.choices[choiceIndex];
    if (
      this.dropdownType === 'informational' ||
      this.dropdownType === 'mastheadSelector'
    ) {
      this.setActiveChoice(event);
      this.updateTriggerText(event);
    }
    this.hideDropdown();
    this.choiceMade.emit(clickedChoice['value']);
  }
  /**
   * @ignore
   */
  setActiveChoice(event): void {
    const choiceIndex = event.currentTarget.getAttribute(
      'data-sprk-dropdown-choice-index'
    );
    this.choices[choiceIndex]['active'] = true;
  }
  /**
   * @ignore
   */
  updateTriggerText(event): void {
    const choiceIndex = event.currentTarget.getAttribute(
      'data-sprk-dropdown-choice-index'
    );
    this.triggerText = this.choices[choiceIndex]['value'];
  }

  /**
   * @ignore
   */
  clearActiveChoices(): void {
    this.choices.forEach((choice: ISprkDropdownChoice) => {
      choice['active'] = false;
    });
  }

  /**
   * @ignore
   */
  hideDropdown(): void {
    this.isOpen = false;
  }

  /**
   * @ignore
   */
  getClasses(): string {
    const classArray: string[] = ['sprk-c-Dropdown'];

    if (this.additionalClasses) {
      this.additionalClasses.split(' ').forEach(className => {
        classArray.push(className);
      });
    }

    return classArray.join(' ');
  }

  /**
   * @ignore
   */
  getTriggerClasses(): string {
    const classArray: string[] = [];

    if (this.additionalTriggerClasses) {
      this.additionalTriggerClasses.split(' ').forEach(className => {
        classArray.push(className);
      });
    }

    return classArray.join(' ');
  }

  /**
   * @ignore
   */
  getTriggerTextClasses(): string {
    const classArray: string[] = [''];

    if (this.additionalTriggerTextClasses) {
      this.additionalTriggerTextClasses.split(' ').forEach(className => {
        classArray.push(className);
      });
    }

    return classArray.join(' ');
  }
}
