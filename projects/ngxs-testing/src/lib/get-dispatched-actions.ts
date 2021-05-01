import { ActionStorage } from './action-storage';

export const getDispatchedActions = (): any[] => ActionStorage.getAllActions();
