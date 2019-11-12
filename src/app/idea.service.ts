import { Injectable } from '@angular/core';
import { Idea } from './idea'
import { IDEAS } from './mock-ideas'

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  constructor() { }

  //  Idea定义字段及类型， IDEAS模拟返回数据
  getIdeas(): Idea[] {
    return IDEAS;
  }
}
