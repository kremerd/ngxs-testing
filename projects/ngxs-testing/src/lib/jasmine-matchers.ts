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
  util: jasmine.MatchersUtil
): jasmine.CustomMatcher => ({
  compare: (action: any): jasmine.CustomMatcherResult => ({
    pass: util.contains(ActionStorage.getAllActions(), action),
  }),
});

const toHaveBeenDispatchedTimes = (
  util: jasmine.MatchersUtil
): jasmine.CustomMatcher => ({
  compare: (action: any, expected: number): jasmine.CustomMatcherResult => {
    const matchingActions = ActionStorage.getAllActions().filter((a) =>
      util.equals(a, action)
    );
    const pass = matchingActions.length === expected;
    return {
      pass,
      message: buildTimesFailureMessage(
        util.pp(action),
        pass,
        matchingActions.length,
        expected
      ),
    };
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
