import { ActionStorage } from './action-storage';

declare global {
  namespace jasmine {
    interface Matchers<T> {
      toHaveBeenDispatched(): boolean;
      toHaveBeenDispatchedTimes(times: number): boolean;
    }
  }
}

const toHaveBeenDispatched = (
  util: jasmine.MatchersUtil,
  customTesters: readonly jasmine.CustomEqualityTester[]
): jasmine.CustomMatcher => ({
  compare: (action: any): jasmine.CustomMatcherResult => {
    if (util.contains(ActionStorage.getAllActions(), action, customTesters)) {
      return {
        pass: true,
        message: util.buildFailureMessage(
          'to have been dispatched',
          true,
          action
        ),
      };
    } else {
      return {
        pass: false,
        message: util.buildFailureMessage(
          'to have been dispatched',
          false,
          action
        ),
      };
    }
  },
});

const toHaveBeenDispatchedTimes = (
  util: jasmine.MatchersUtil,
  customTesters: readonly jasmine.CustomEqualityTester[]
): jasmine.CustomMatcher => ({
  compare: (action: any, expected: number): jasmine.CustomMatcherResult => {
    const matchingActions = ActionStorage.getAllActions().filter((a) =>
      util.equals(a, action, customTesters)
    );
    if (matchingActions.length === expected) {
      return {
        pass: true,
        message: buildTimesFailureMessage(
          util.pp(action),
          true,
          matchingActions.length,
          expected
        ),
      };
    } else {
      return {
        pass: false,
        message: buildTimesFailureMessage(
          util.pp(action),
          false,
          matchingActions.length,
          expected
        ),
      };
    }
  },
});

const buildTimesFailureMessage = (
  ppAction: string,
  isNot: boolean,
  actualTimes: number,
  expectedTimes: number
): string =>
  `Expected ${ppAction}${
    isNot ? ' not' : ''
  } to have been dispatched ${expectedTimes} times. It was dispatched ${actualTimes} times.`;

beforeAll(() => {
  jasmine.addMatchers({ toHaveBeenDispatched, toHaveBeenDispatchedTimes });
});
