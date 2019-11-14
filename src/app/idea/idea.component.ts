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
    this.ideaService.getIdeas()
    .subscribe(ideas => this.ideas = ideas);
  }
  // 点击事件触发时，调用组件的点击处理器，然后清空这个输入框，以便用来输入另一个名字。
  add(name: string): void {
    name = name.trim();
    if (!name) { return; } // name如果为空，取反即true，直接return
    // name非空点击处理器会用这个名字创建一个类似Idea的对象，并把它传给服务器addIdea方法
    // 当保存成功时，subscribe的回调函数会收到这个idea，并把它追加到ideas列表展示
    this.ideaService.addIdea({ name } as Idea).subscribe(idea => {
      this.ideas.push(idea);
    })
  }

  // 添加delete()处理器
  delete(idea: Idea): void {
    // 过滤掉选中的这一项,更新列表展示
    // 在 IdeaService 对服务器的操作成功之前，先从列表中移除要删除的英雄。
    this.ideas = this.ideas.filter(i => i !== idea);
    // 如果忘记调用subscribe(),服务不会把这个删除请求发送给服务器
    // 必须订阅，组件与IdeaService.delete()返回的Observable才能关联
    this.ideaService.deleteIdea(idea).subscribe();
  }
}
