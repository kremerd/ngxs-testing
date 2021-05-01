import { ActionStorage } from './action-storage';

declare global {
  namespace jasmine {
    interface Matchers<T> {
      toHaveBeenDispatched(): boolean;
      toHaveBeenDispatchedTimes(times: number): boolean;
    }

    interface NothingMatcher {
      allDispatchedActionsToHaveBeenExpected(): void;
      noActionsToHaveBeenDispatched(): void;
    }
  }
}

const toHaveBeenDispatched = (
  util: jasmine.MatchersUtil
): jasmine.CustomMatcher => ({
  compare: (action: any): jasmine.CustomMatcherResult => {
    // can also run in "not" case since either
    // - no matching action has been dispatched, or
    // - the test fails anyway
    ActionStorage.checkActions(1, (a) => util.equals(a, action));
    return {
      pass: util.contains(ActionStorage.getAllActions(), action),
    };
  },
});

const toHaveBeenDispatchedTimes = (
  util: jasmine.MatchersUtil
): jasmine.CustomMatcher => ({
  compare: (action: any, expected: number): jasmine.CustomMatcherResult => {
    ActionStorage.checkActions(expected, (a) => util.equals(a, action));
    return toHaveBeenDispatchedTimesCompare(util, action, expected, false);
  },
  negativeCompare: (
    action: any,
    expected: number
  ): jasmine.CustomMatcherResult =>
    toHaveBeenDispatchedTimesCompare(util, action, expected, true),
});

const toHaveBeenDispatchedTimesCompare = (
  util: jasmine.MatchersUtil,
  action: any,
  expected: number,
  isNot: boolean
): jasmine.CustomMatcherResult => {
  const matchingActionCount = ActionStorage.getAllActions().filter((a) =>
    util.equals(a, action)
  ).length;
  return {
    pass: isNot
      ? matchingActionCount !== expected
      : matchingActionCount === expected,
    message: `Expected ${util.pp(action)}${
      isNot ? ' not' : ''
    } to have been dispatched ${expected} times. It was dispatched ${matchingActionCount} times.`,
  };
};

const allDispatchedActionsToHaveBeenExpected = (
  util: jasmine.MatchersUtil
): jasmine.CustomMatcher => ({
  compare: (): jasmine.CustomMatcherResult => {
    const uncheckedActions = ActionStorage.getUncheckedActions();
    return {
      pass: uncheckedActions.length === 0,
      message:
        'Expected all dispatched actions to have been expected. The following actions have not been expected:\n' +
        uncheckedActions.map((action) => `- ${util.pp(action)}`).join('\n'),
    };
  },
});

const noActionsToHaveBeenDispatched = (): jasmine.CustomMatcher => ({
  compare: (): jasmine.CustomMatcherResult => ({
    pass: ActionStorage.getAllActions().length === 0,
    message: 'Expected no actions to have been dispatched.',
  }),
});

beforeAll(() => {
  jasmine.addMatchers({
    toHaveBeenDispatched,
    toHaveBeenDispatchedTimes,
    allDispatchedActionsToHaveBeenExpected,
    noActionsToHaveBeenDispatched,
  });
});
