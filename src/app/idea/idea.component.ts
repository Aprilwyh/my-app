import { Component, OnInit } from '@angular/core';
import { Idea } from '../idea';
import { IDEAS } from '../mock-ideas'

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
  ideas = IDEAS;
  selectedIdea: Idea;
  constructor() { }

  ngOnInit() {
  }
  onSelect(idea: Idea): void {
    this.selectedIdea = idea;
  }

}
