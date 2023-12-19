import {Component, Input} from '@angular/core';
import {TimelineService} from "../../../services/timeline.service";

@Component({
  selector: 'paper-item',
  templateUrl: './paper-item.component.html',
  styleUrls: ['./paper-item.component.scss']
})
export class PaperItemComponent {

  @Input() data: any;
  @Input() rootData: any;

  constructor(public timelineService: TimelineService) {
  }
}
