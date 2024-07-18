import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[OpenEdit]'
})
export class OpenEditProductDirective {
  @Input() productId: number = 0;
  @HostListener('click') OpenEdit() {
    window.scrollTo(0, 0);
    this.router.navigate(['/Edit'], {
      queryParams: {
        id: this.productId,
      },
    });
  }
  constructor(private router: Router) { }

}
