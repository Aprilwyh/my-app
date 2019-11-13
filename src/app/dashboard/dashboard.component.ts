import { Component, OnInit } from '@angular/core';
import { Idea } from '../idea';
import { IdeaService } from '../idea.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ideas: Idea[] = [];
  constructor(
    private ideaService: IdeaService,
  ) { }

  ngOnInit() {
    this.getIdeas();
  }
  getIdeas():void {
    this.ideaService.getIdea()
    .subscribe(ideas => this.ideas = ideas.slice(1, 5));
  }

}
