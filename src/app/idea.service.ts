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
  // 返回想法list列表
  getIdeas(): Observable<Idea[]> {
    this.messageService.add('服务提示: 查询购物清单');
    return of(IDEAS);
  }
  // 返回想法list列表中的一条
  getIdea(id: number): Observable<Idea> {
    // 在获取到数组时发送一条消息
    this.messageService.add(`服务提示: 查看了清单编号${id}`);
    return of(IDEAS.find(idea => idea.id === id));
  }
}
