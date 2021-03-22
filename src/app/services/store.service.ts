import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import * as merge from 'lodash/fp/merge';

export abstract class StoreService<T> {

  protected bs: BehaviorSubject<T>;
  state$: Observable<T>;
  state: T;
  previous: T;

  protected abstract store: string;

  constructor(initialValue: Partial<T>) {
    this.bs = new BehaviorSubject<T>(initialValue as T);
    this.state$ = this.bs.asObservable();

    this.state = initialValue as T;
    this.state$.subscribe(s => {
      this.state = s;
    });
  }

  /**
   *
   *
   * @param {Partial<T>} newValue
   * @param {string} [event='Not specified']
   * @memberof StoreService
   */
  patch(newValue: Partial<T>, event: string = 'Not specified') {
    this.previous = this.state;
    const newState = merge(this.state, newValue);
    if (!environment.production) {
      console.groupCollapsed(`[${this.store} store] [patch] [event: ${event}]`);
      console.log('change', newValue);
      console.log('prev', this.previous);
      console.log('next', newState);
      console.groupEnd();
    }
    this.bs.next(newState);
  }

  /**
   *
   *
   * @param {Partial<T>} newValue
   * @param {string} [event='Not specified']
   * @memberof StoreService
   */
  set(newValue: Partial<T>, event: string = 'Not specified') {
    this.previous = this.state;
    const newState = Object.assign({}, newValue) as T;
    if (!environment.production) {
      console.groupCollapsed(`[${this.store} store] [set] [event: ${event}]`);
      console.log('change', newValue);
      console.log('prev', this.previous);
      console.log('next', newState);
      console.groupEnd();
    }
    this.bs.next(newState);
  }
}
