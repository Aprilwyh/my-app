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
  constructor(
    // 注入
    private ideaService: IdeaService
  ) { }

  ngOnInit() {
    this.getIdea();
  }

  getIdea():void {
    // 订阅
    this.ideaService.getIdea()
    .subscribe(ideas => this.ideas = ideas);
  }
}
