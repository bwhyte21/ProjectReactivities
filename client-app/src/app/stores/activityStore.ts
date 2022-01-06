import { format } from 'date-fns';
import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Activity } from '../models/activity';

export default class ActivityStore {
  // Activity properties ported from App.tsx
  // New map object to contain Activities.
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    // 'makeAutoObservable' essentially handles all the setting of properties so developers don't have to... THIS IS WAY TOO EASY! WTH?!
    makeAutoObservable(this);
  }

  // Get and sort the activities by date using a computed property.
  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort((a, b) => a.date!.getTime() - b.date!.getTime());
  }

  // Get group of activities by date.
  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        // Cast the date to a string.
        const date = format(activity.date!, 'dd MMM yyyy');
        // Check for a match on the activity for THIS date.
        // If there is no match, create a new array.
        // For each date we're going to have an array of activities.
        activities[date] = activities[date] ? [...activities[date], activity] : [activity];
        return activities;
      }, {} as { [key: string]: Activity[] }),
    );
  }

  // #region Actions
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
        this.setActivity(activity);
      });
      // Set loading initial flag.
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);

      // Set loading initial to false.
      this.setLoadingInitial(false);
    }
  };

  // Load an Activity for Details.
  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    // If activity exists in memory, select it.
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    }
    // Else call api to load activity.
    else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        this.setActivity(activity);
        runInAction(() => {
          this.selectedActivity = activity;
        });
        this.setLoadingInitial(false);
        return activity;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  // #region Helpers

  // Get activity from registry.
  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  // Set(update) activity in registry.
  private setActivity = (activity: Activity) => {
    // Temp fix for date formatting.
    activity.date = new Date(activity.date!);
    // Mutate state via MobX. MobX does not use immutable structures, whereas, Redux does.
    // "map".set(key, value)
    this.activityRegistry.set(activity.id, activity);
  };

  // #endregion

  // Create a loading action to remove the use of runInAction().
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  // Create Activity action.
  createActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      // Create a user id using uuid for the activity.
      await agent.Activities.create(activity);
      // Update activity array inside our store then select newly created activity.
      runInAction(() => {
        // Set the id in the registry.
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  // Update Activity action.
  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      // Edit selected activity.
      await agent.Activities.update(activity);
      // Update activity array inside our store then select newly created activity.
      runInAction(() => {
        // Find the activity, then update it.
        // Set the id in the registry.
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  // Delete Activity action.
  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      // Delete selected activity.
      await agent.Activities.delete(id);
      // Remove the activity from the array.
      runInAction(() => {
        // Delete from registry.
        this.activityRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  // #endregion
}
