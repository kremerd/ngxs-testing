import { SelectorStorage } from './selector-storage';

export const mockSelector = (selector: any) => ({
  toReturn: (value: any) => SelectorStorage.setSelectorValue(selector, value),
  toError: (value: any) => SelectorStorage.setSelectorError(selector, value),
});
