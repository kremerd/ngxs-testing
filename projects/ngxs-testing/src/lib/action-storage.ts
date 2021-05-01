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

  static checkActions(
    amount: number,
    predicate: (action: any) => boolean
  ): void {
    ActionStorage.recordedActions
      .filter(({ action, checked }) => predicate(action) && !checked)
      .filter((_, i) => i < amount)
      .forEach((recordedAction) => (recordedAction.checked = true));
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
