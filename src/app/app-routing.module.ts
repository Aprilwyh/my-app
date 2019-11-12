import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdeaComponent } from './idea/idea.component'

const routes: Routes = [
  {path: 'idea', component: IdeaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
