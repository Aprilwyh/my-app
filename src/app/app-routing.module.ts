import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdeaComponent } from './idea/idea.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { IdeaDetailsComponent } from './idea-details/idea-details.component'

const routes: Routes = [
  { path: 'idea', component: IdeaComponent },
  // 添加仪表盘路由
  { path: 'dashboard', component: DashboardComponent },
  // 添加默认路由
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: IdeaDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
