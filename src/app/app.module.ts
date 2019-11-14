import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IdeaComponent } from './idea/idea.component';
import { IdeaDetailsComponent } from './idea-details/idea-details.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { IdeaSearchComponent } from './idea-search/idea-search.component';

@NgModule({
  declarations: [
    // 声明每个组件
    AppComponent,
    IdeaComponent,
    IdeaDetailsComponent,
    MessagesComponent,
    DashboardComponent,
    IdeaSearchComponent
  ],
  imports: [
    // 该应用所需外部模块的列表
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
