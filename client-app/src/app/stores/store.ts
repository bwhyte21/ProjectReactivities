import { createContext, useContext } from 'react';
import ActivityStore from './activityStore';

interface Store {
  activityStore: ActivityStore; // Classes (ActivityStore) can be used as types.
}

// This will create a new instance of ActivityStore. Storing Activity Stores.
export const store: Store = {
  activityStore: new ActivityStore(),
};

// This will contain the "stores" above in our react context.
export const StoreContext = createContext(store);

// react hook to use stores in component(s).
export function useStore() {
  return useContext(StoreContext);
}
