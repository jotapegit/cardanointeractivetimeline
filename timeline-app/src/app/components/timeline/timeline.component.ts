import {Component, Directive, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {TimelineService} from "../../services/timeline.service";
import _ from "lodash";
declare var window: any;
declare var document: any;

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  windowHeight: any = window.innerHeight;
  timelineHeight: any = null;
  headerHeight: any = null;
  timelinePriceData: any = [];
  timelineAllData: any = [];

  @ViewChild('header') headerIdentifier?: ElementRef;

  constructor(public timelineService: TimelineService) {}

  ngAfterViewInit() {
  }

  onWheel(event: WheelEvent): void {
    if (event.deltaY > 0) document.getElementById('container')!.scrollLeft += 40;
    else document.getElementById('container')!.scrollLeft -= 40;
  }

  enableScrolling() {
    window.addEventListener("wheel", (e: any) => {
      if(e.deltaY != 0) {
        window.scrollBy(e.deltaY > 0 ? 100 : -100, 0);
        e.preventDefault();
      }
    }, { passive: false });

    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = (e: any) => {
      pos = {
        left: document.scrollingElement.scrollLeft,
        top: document.scrollingElement.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = (e: any) => {
      // How far the mouse has been moved
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      // Scroll the element
      document.scrollingElement.scrollTop = pos.top - dy;
      document.scrollingElement.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    // Attach the handler
    document.addEventListener('mousedown', mouseDownHandler);
  }

  public getStyleClass(data: any) {

    if(this.timelineService.hasProperty(data, 'markersData.style')) {
      return 'style-'+ data['markersData']['style'];
    }

    return null;
  }

  public isSelected(days: any) {
    if(_.has(days,'markersData.singleContain') && days['markersData']['singleContain'] == 'node-release') return false;
    return this.timelineService.hasProperty(days, 'markersData.markers') && days.markersData.markers.length > 0;
  }

  public getBoxClass(data: any) {

      if(this.timelineService.hasProperty(data, 'markersData.position')) {
        return 'position-'+ data['markersData']['position'];
      }
      return null;
  }

  ngOnInit() {

    setTimeout(() => {
      this.headerHeight = this.headerIdentifier?.nativeElement.offsetHeight;
      this.timelineHeight = this.windowHeight - this.headerHeight;
      console.log(this.headerHeight);
      console.log(this.windowHeight);
      console.log(this.timelineHeight);
    }, 100);

    this.timelinePriceData = this.timelineService.getHistoricalPriceData;
    this.timelineAllData = this.timelineService.prepareTimelineSegments(this.timelinePriceData);
    this.enableScrolling();
    //setTimeout(() => {
    //  this.timelineService.connectPoints();
    //}, 1000);
  }

}
