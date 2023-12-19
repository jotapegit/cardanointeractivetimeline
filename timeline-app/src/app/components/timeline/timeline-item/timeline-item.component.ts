import { Component, Input } from '@angular/core';
import {TimelineService} from "../../../services/timeline.service";

@Component({
  selector: 'timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss']
})
export class TimelineItemComponent {

  @Input() data: any;
  @Input() rootData: any;

  constructor(public timelineService: TimelineService) {
  }

}
