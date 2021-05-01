import { getDispatchedActions } from './lib/get-dispatched-actions';
import './lib/jasmine-matchers';
import { mockSelector } from './lib/mock-selector';
import { NgxsTestingModule } from './lib/ngxs-testing.module';

/*
 * Public API Surface of ngxs-testing
 */

export { getDispatchedActions, mockSelector, NgxsTestingModule };

export default {
  getDispatchedActions,
  mockSelector,
  NgxsTestingModule,
};
