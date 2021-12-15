// import { action, makeAutoObservable, makeObservable, observable } from 'mobx'; // Uncomment to use makeObservable.
import { makeAutoObservable } from 'mobx';

export default class ActivityStore {
  title = 'Hello from MobX!';

  constructor() {
    //makeObservable(this, {
    //  title: observable,
    //  setTitle: action.bound, // action.bound binds the 'setTitle' to the ActivityStore class. The alternative is to use the arrow function ( () => ) so '.bound' isn't needed.
    //  setTitle: action,
    //});
    // 'makeAutoObservable' essentially handles all the setting of properties so developers don't have to... THIS IS WAY TOO EASY! WTH?!
    makeAutoObservable(this);
  }

  // A function to bind to ActivityStore.
  setTitle = () => {
    this.title = this.title + '!';
  };
}
