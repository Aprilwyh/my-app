import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IdeaComponent } from './idea/idea.component';
import { IdeaDetailsComponent } from './idea-details/idea-details.component';

@NgModule({
  declarations: [
    AppComponent,
    IdeaComponent,
    IdeaDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
