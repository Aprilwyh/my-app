import { Component, OnInit } from '@angular/core';
import { Idea } from '../idea';
import { IdeaService } from '../idea.service'

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit {
  // idea: Idea = {
  //   id: 1,
  //   name: '买衣服'
  // }
  ideas: Idea[];
  selectedIdea: Idea;
  constructor(
    // 注入
    private ideaService: IdeaService
  ) { }

  ngOnInit() {
    this.getIdea();
  }
  onSelect(idea: Idea): void {
    this.selectedIdea = idea;
  }

  getIdea():void {
    this.ideas = this.ideaService.getIdeas();
  }
}
