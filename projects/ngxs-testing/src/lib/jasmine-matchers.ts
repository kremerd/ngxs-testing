import { ActionStorage } from './action-storage';

declare global {
  namespace jasmine {
    interface Matchers<T> {
      toHaveBeenDispatched(): boolean;
    }
  }
}

export const NgxsMatchers: jasmine.CustomMatcherFactories = {
  toHaveBeenDispatched: (
    util: jasmine.MatchersUtil,
    customEqualityTester: readonly jasmine.CustomEqualityTester[]
  ): jasmine.CustomMatcher => ({
    compare: (action: any): jasmine.CustomMatcherResult => {
      if (
        util.contains(
          ActionStorage.getAllActions(),
          action,
          customEqualityTester
        )
      ) {
        return {
          pass: true,
          message: 'Dispatched',
        };
      } else {
        return {
          pass: false,
          message: 'Not dispatched',
        };
      }
    },
  }),
};

beforeAll(() => {
  jasmine.addMatchers(NgxsMatchers);
});
