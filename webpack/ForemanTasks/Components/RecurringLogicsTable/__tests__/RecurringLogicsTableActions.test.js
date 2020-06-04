import { RECURRING_LOGICS } from '../RecurringLogicsTableConstants';
import { getTableItems } from '../RecurringLogicsTableActions';

jest.mock('foremanReact/components/common/table', () => ({
  getTableItemsAction: jest.fn(controller => controller),
}));

describe('RecurringLogicsTable actions', () => {
  it('getTableItems should reuse common/table/getTableItemsAction', () => {
    expect(getTableItems('')).toEqual(RECURRING_LOGICS);
  });
});
