import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { TimelineItemComponent } from './components/timeline/timeline-item/timeline-item.component';
import { PaperItemComponent } from './components/timeline/paper-item/paper-item.component';
import { PapersGroupComponent } from './components/timeline/papers-group/papers-group.component';

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    TimelineItemComponent,
    PaperItemComponent,
    PapersGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
