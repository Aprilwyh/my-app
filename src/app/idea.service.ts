import { Injectable } from '@angular/core';
import { Idea } from './idea'
import { IDEAS } from './mock-ideas'
import { Observable, of } from 'rxjs'
import { MessageService } from './message.service'

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  constructor(
    private messageService: MessageService
  ) { }

  //  Idea定义字段及类型， IDEAS模拟返回数据
  /* getIdeas(): Idea[] {
    return IDEAS;
  } */
  getIdea(): Observable<Idea[]> {
    // 在获取到数组时发送一条消息
    this.messageService.add('IdeaService: fetched ideas');
    return of(IDEAS);
  }
}
