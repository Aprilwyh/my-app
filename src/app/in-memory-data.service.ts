import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Idea } from './idea';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }
  createDb() {
    const ideas = [
      { id: 1, name: '格子长裙' },
      { id: 2, name: '蕾丝打底' },
      { id: 3, name: '百褶短裙' },
      { id: 4, name: '毛呢大衣' },
      { id: 5, name: '灯芯绒长裤' },
      { id: 6, name: '羊毛围巾' },
      { id: 7, name: '保暖羽绒服' },
      { id: 8, name: '水貂绒外套' },
      { id: 9, name: '小香风斜挎包' },
      { id: 10, name: '加绒马丁靴' }
    ];
    return {ideas};
  }
  genId(ideas: Idea[]): number {
    return ideas.length > 0 ? Math.max(...ideas.map(idea => idea.id)) + 1 : 11;
  }

}
