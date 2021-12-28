import { createContext, useContext } from 'react';
import ActivityStore from './activityStore';
import CommonStore from './commonStore';

interface Store {
  // Classes (ActivityStore) can be used as types.
  activityStore: ActivityStore;
  // When new stores are created, just add em to this interface!
  commonStore: CommonStore;
}

// This will create a new instance of ActivityStore. Storing Activity Stores.
export const store: Store = {
  activityStore: new ActivityStore(),
  commonStore: new CommonStore()
};

// This will contain the "stores" above in our react context.
export const StoreContext = createContext(store);

// react hook to use stores in component(s).
export function useStore() {
  return useContext(StoreContext);
}
