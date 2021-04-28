import { RunHelpers, TestScheduler } from 'rxjs/internal/testing/TestScheduler';

export const runWithTestScheduler = (
  callback: (runHelpers: RunHelpers) => void
): void => {
  const scheduler = new TestScheduler((actual, expected) =>
    expect(actual).toEqual(expected)
  );
  scheduler.run((runHelpers) => callback(runHelpers));
};
