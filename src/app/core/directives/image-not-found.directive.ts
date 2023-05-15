import { Directive, Input, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: 'img'
})
export class ImageNotFoundDirective {

  public defaultImageError = 'assets/images/image-not-found.png';

  @HostBinding('src')
  @Input() public src?: string;

  @HostListener('error') public onError(): void {
    this.src = this.defaultImageError;
  }
}
