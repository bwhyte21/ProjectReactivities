import { makeAutoObservable } from 'mobx';
import { ServerError } from '../models/serverError';

export default class CommonStore {
  error: ServerError | null = null;

  // Need a CTOR as it IS a store.
  constructor() {
    makeAutoObservable(this);
  }

  setServerError = (error: ServerError) => {
    this.error = error;
  };
}
