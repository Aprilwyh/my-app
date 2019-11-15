import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Idea } from '../idea';
import { IdeaService } from '../idea.service';

@Component({
  selector: 'app-idea-search',
  templateUrl: './idea-search.component.html',
  styleUrls: ['./idea-search.component.css']
})
export class IdeaSearchComponent implements OnInit {
  // ideas$ 声明为一个 Observable
  // 组件类中并没有订阅 ideas$ 这个可观察对象，而是由模板中的 AsyncPipe 完成的。
  ideas$: Observable<Idea[]>;
  // searchTerms 属性声明成了 RxJS 的 Subject 类型
  // Subject 既是可观察对象的数据源，本身也是Observable。可以像订阅任何Observable一样订阅Subject。
  private searchTerms = new Subject<string>();
  constructor(private ideaService: IdeaService) { }

  // search() 是通过对文本框的 keystroke 事件的事件绑定来调用的。
  // 每当用户在文本框中输入时，这个事件绑定就会使用文本框的值（搜索词）调用 search() 函数。
  // searchTerms 变成了一个能发出搜索词的稳定的流。
  search(term: string): void {
    // 可以通过调用Subject的 next(value) 方法往 Observable 中推送一些值，就像 search() 方法中一样
    this.searchTerms.next(term);
  }

  // 每当用户击键后就直接调用 searchIdeas() 将导致创建海量的 HTTP 请求，浪费服务器资源并消耗大量网络流量
  // ngOnInit() 往 searchTerms 这个可观察对象的处理管道中加入了一系列 RxJS 操作符
  // 用以缩减对 searchHeroes() 的调用次数，并最终返回一个可及时给出英雄搜索结果的可观察对象（每次都是 Idea[] ）。
  ngOnInit(): void {
    this.ideas$ = this.searchTerms.pipe(
      // 在传出最终字符串之前，debounceTime(300)将会等待，直到新增字符串的事件暂停了300ms。 实际发起请求的间隔永远不会小于300ms
      debounceTime(300),
      // distinctUntilChanged() 会确保只在过滤条件变化时才发送请求
      distinctUntilChanged(),
      // switchMap()会为每个从debounce和distinctUntilChanged中通过的搜索词调用搜索服务。它会取消并丢弃以前的搜索可观察对象，只保留最近的。
      switchMap((term: string) => this.ideaService.searchIdeas(term)),
    );
  }

}
