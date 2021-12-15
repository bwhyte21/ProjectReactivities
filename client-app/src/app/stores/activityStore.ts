// Uncomment (below) to use makeObservable.
// import { action, makeAutoObservable, makeObservable, observable } from 'mobx';
import { makeAutoObservable } from 'mobx';
import agent from '../api/agent';
import { Activity } from '../models/activity';

export default class ActivityStore {
  //title = 'Hello from MobX!';

  // Activity properties ported from App.tsx
  activities: Activity[] = [];
  selectedActivity: Activity | null = null; // Can be activity or it can be null.
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    //makeObservable(this, {
    //  title: observable,
    // action.bound binds the 'setTitle' to the ActivityStore class. The alternative is to use the arrow function ( () => ) so '.bound' isn't needed.
    //  setTitle: action.bound,
    //  setTitle: action,
    //});
    // 'makeAutoObservable' essentially handles all the setting of properties so developers don't have to... THIS IS WAY TOO EASY! WTH?!
    makeAutoObservable(this);
  }

  // region# Actions
  // A temp function to showcase binding to ActivityStore.
  // setTitle = () => {
  //   this.title = this.title + '!';
  // };

  // It uses 'async' because it is returning a promise from 'agent'.
  loadActivities = async () => {
    // Sync code is done outside of a trycatch block
    this.loadingInitial = true;

    // Async code is done inside a trycatch block.
    try {
      // Activities from API.
      // This will not execute until this list is populated.
      const activities = await agent.Activities.list();
      // Populate the observable directly.
      activities.forEach((activity) => {
        // Temp fix for date formatting.
        activity.date = activity.date.split('T')[0];
        // Mutate state via MobX. MobX does not use immutable structures, whereas, Redux does.
        this.activities.push(activity);
      });
      // Set loading initial flag.
      this.loadingInitial = false;
    } catch (error) {
      console.log(error);
      this.loadingInitial = false;
    }
  };

  // #endregion
}
