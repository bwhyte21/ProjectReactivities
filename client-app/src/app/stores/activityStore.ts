// Uncomment (below) to use makeObservable.
// import { action, makeAutoObservable, makeObservable, observable } from 'mobx';
import { makeAutoObservable } from 'mobx';
import agent from '../api/agent';
import { Activity } from '../models/activity';

export default class ActivityStore {
  // Activity properties ported from App.tsx
  activities: Activity[] = [];
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    // 'makeAutoObservable' essentially handles all the setting of properties so developers don't have to... THIS IS WAY TOO EASY! WTH?!
    makeAutoObservable(this);
  }

  // region# Actions
  // It uses 'async' because it is returning a promise from 'agent'.
  loadActivities = async () => {
    // Sync code is done outside of a trycatch block
    this.setLoadingInitial(true);

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
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);

      // Set loading initial to false.
      this.setLoadingInitial(false);
    }
  };

  // Create a loading action to remove the use of runInAction().
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  // Select Activity action.
  selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find((a) => a.id === id);
  };

  // Cancel Selected Activity action.
  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  // Open-a-form action. For activity creation or editing.
  openForm = (id?: string) => {
    // If user is editing an activity, select the activity, else cancel current selected activity if they decide to create a new one.
    id ? this.selectActivity(id) : this.cancelSelectedActivity();
    this.editMode = true;
  };

  // Close-a-form action.
  closeForm = () => {
    this.editMode = false;
  };

  // #endregion
}
