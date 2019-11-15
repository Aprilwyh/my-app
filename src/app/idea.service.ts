import { Injectable } from '@angular/core';
import { Idea } from './idea'
import { IDEAS } from './mock-ideas'
import { Observable, of } from 'rxjs'
import { MessageService } from './message.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators';

// 在保存时请求中有一个特殊的头，这个头在httpOptions常量中定义
const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  private ideasUrl = 'api/ideas';
  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }

  //  Idea定义字段及类型， IDEAS模拟返回数据
  /* getIdeas(): Idea[] {
    return IDEAS;
  } */
  // 返回想法list列表
  getIdeas(): Observable<Idea[]> {
    return this.http.get<Idea[]>(this.ideasUrl)
    .pipe(
      // tap操作符会会查看Observable中的值，使用tap来记录各种操作
      tap(_ => this.log('查看清单列表')),
      // catchError()操作符会拦截失败的Observable，把错误对象传给错误处理器，错误处理器处理这个错误
      catchError(this.handleError<Idea[]>('getIdea', []))
    )
  }
  // 通用化handleError()
  // 每个服务方法都会返回不同类型的 Observable 结果，因此 handleError()需要一个类型参数
  // 窥探Observable的数据流，通过log()函数往页面底部发送一条消息
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      // 返回给catchError返回一个错误处理函数
      return of(result as T);
    }
  }
  // 返回想法list列表中的一条
  // 使用id构建了一个请求URL，服务器返回单个数据
  // 返回Observable<Idea>可观察的单个对象，而不是Observable<Idea[]>可观察的对象数组
  getIdea(id: number): Observable<Idea> {
    const url = `${this.ideasUrl}/${id}`; // 拼接路径
    return this.http.get<Idea>(url).pipe(
      tap(_ => this.log(`查看清单列表编号为${id}`)),
      catchError(this.handleError<Idea>(`getIdea id=${id}`))
    )
    // 在获取到数组时发送一条消息
    return of(IDEAS.find(idea => idea.id === id));
  }
  getIdeaNo404<Data>(id: number): Observable<Idea> {
    const url = `${this.ideasUrl}/?id=${id}`;
    return this.http.get<Idea[]>(url).pipe(
        map(ideas => ideas[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} idea id=${id}`);
        }),
        catchError(this.handleError<Idea>(`getIdea id=${id}`))
      );
  }

  // 调用messageService的私有方法
  private log(message: string) {
    this.messageService.add(`查看信息：${message}`)
  }
  
  // 详情页面修改点击保存
  updateIdea(idea: Idea): Observable<any> {
    // 使用http.put()把修改后的数据保存到服务器上。put接收三个参数：url；要修改的数据；选项httpOption
    return this.http.put(this.ideasUrl, idea, httpOptions).pipe(
      tap(_ => this.log(`保存了清单编号${idea.id}`)),
      catchError(this.handleError<any>('保存想法'))
    )
  }

  // 加购保存
  addIdea(idea: Idea): Observable<Idea> {
    // updateIdea调用HttpClient.put(),而addIdea调用post()
    return this.http.post<Idea>(this.ideasUrl, idea, httpOptions).pipe(
      // 服务器为这个新的name生成一个id，然后把它通过Observable<Idea>返回给调用者
      tap((newIdea: Idea) => this.log(`新加购清单编号${newIdea.id}`)),
      catchError(this.handleError<Idea>(`addIdea`))
    )
  }
  
  deleteIdea(idea: Idea | number): Observable<Idea> {
    const id = typeof idea === 'number' ? idea : idea.id;
    // URL就是数据的资源URL + 要删除的数据id
    const url = `${this.ideasUrl}/${id}`;
    // 不用像 put 和 post 中那样发送任何数据
    return this.http.delete<Idea>(url, httpOptions).pipe(
      tap(_ => this.log(`删除列表，编号为${id}`)),
      catchError(this.handleError<Idea>('deleteIdea'))
    );
  }

  searchIdeas(term: string): Observable<Idea[]> {
    if (!term.trim()) { // term为空取非为true
      return of([]); // 如果搜索为空，则返回空数组
    }
    // URL包含了一个由搜索词组成的查询字符串
    return this.http.get<Idea[]>(`${this.ideasUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`寻找到匹配项"${term}"`)),
      catchError(this.handleError<Idea[]>(`searchIdeas`, []))
    )
  }
}
