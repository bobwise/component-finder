import { Directive, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[sprkButton]'
})
export class SprkButtonDirective implements OnInit {
  /**
   * @ignore
   */
  constructor(public ref: ElementRef) {}

  /**
   * Will show a spinner inside the
   * button if set to `true`.
   */
  @Input() isSpinning = false;

  /**
   * @ignore
   */
  getClasses(): string[] {
    const classArray: string[] = [];
    classArray.push('sprk-c-Button');
    return classArray;
  }

  ngOnInit(): void {
    this.getClasses().forEach(item => {
      this.ref.nativeElement.classList.add(item);
    });
    if (this.isSpinning) {
      this.setSpinning(this.ref.nativeElement);
    }
  }
  /**
   * @ignore
   */
  setSpinning = (element) => {
    const el = element;
    const width = element.offsetWidth;
    el.setAttribute('data-sprk-spinner-text', el.textContent);
    el.innerHTML = `<div class="sprk-c-Spinner sprk-c-Spinner--circle"></div>`;
    el.setAttribute('data-sprk-has-spinner', 'true');
    el.setAttribute('style', `width: ${width}px`);
  }
}
