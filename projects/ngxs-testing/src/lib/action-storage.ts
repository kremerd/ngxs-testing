interface RecordedAction {
  checked: boolean;
  action: any;
}

export class ActionStorage {
  private static recordedActions: RecordedAction[];

  static reset(): void {
    ActionStorage.recordedActions = [];
  }

  static recordAction(action: any): void {
    ActionStorage.recordedActions.push({
      action,
      checked: false,
    });
  }

  static getAllActions(): any[] {
    return ActionStorage.recordedActions.map(({ action }) => action);
  }

  static getUncheckedActions(): any[] {
    return ActionStorage.recordedActions
      .filter(({ checked }) => !checked)
      .map(({ action }) => action);
  }
}

beforeEach(() => ActionStorage.reset());
