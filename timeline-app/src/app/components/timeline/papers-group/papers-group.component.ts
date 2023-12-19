import {Component, Input} from '@angular/core';
import {TimelineService} from "../../../services/timeline.service";

@Component({
  selector: 'papers-group',
  templateUrl: './papers-group.component.html',
  styleUrls: ['./papers-group.component.scss']
})
export class PapersGroupComponent {

  @Input() data: any;

  constructor(public timelineService: TimelineService) {
  }
}
