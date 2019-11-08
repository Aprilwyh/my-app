import { Component, OnInit, Input } from '@angular/core';
import { Idea } from '../idea'

@Component({
  selector: 'app-idea-details',
  templateUrl: './idea-details.component.html',
  styleUrls: ['./idea-details.component.css']
})
export class IdeaDetailsComponent implements OnInit {

  @Input() idea: Idea;
  constructor() { }

  ngOnInit() {
  }

}
