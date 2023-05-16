import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loading',
  templateUrl: './skeleton-loading.component.html',
  styleUrls: ['./skeleton-loading.component.scss']
})
export class SkeletonLoadingComponent {
  @Input() public width: string = '100%';
  @Input() public height: string = '100px';
  @Input() public marginLeft: string;
  @Input() public marginTop: string;
  @Input() public marginRight: string;
  @Input() public borderRadius: string;
}
