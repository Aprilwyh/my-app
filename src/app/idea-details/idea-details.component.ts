import { Component, OnInit, Input } from '@angular/core';
import { Idea } from '../idea'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IdeaService }  from '../idea.service';

@Component({
  selector: 'app-idea-details',
  templateUrl: './idea-details.component.html',
  styleUrls: ['./idea-details.component.css']
})
export class IdeaDetailsComponent implements OnInit {

  @Input() idea: Idea;
  constructor(
    private route: ActivatedRoute,
    private ideaService: IdeaService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getIdea();
  }

  getIdea() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ideaService.getIdea(id)
    .subscribe(idea => this.idea = idea);
  }
  goBack(): void {
    this.location.back();
  }
}
