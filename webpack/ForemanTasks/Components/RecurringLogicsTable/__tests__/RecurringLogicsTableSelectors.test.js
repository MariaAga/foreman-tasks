import { STATUS } from 'foremanReact/constants';
import { RECURRING_LOGICS } from '../RecurringLogicsTableConstants';
import { selectResults } from '../RecurringLogicsTableSelectors';

const recurringLogics = {
  max_iteration: 3,
  id: 63,
  cron_line: '51 17 * * *',
  end_time: null,
  iteration: 1,
  state: 'cancelled',
  can_edit: true,
  task_group_id: 123,
  tasks: [
    {
      start_at: '2020-02-24 17:51:00 +0200',

      action: 'Run hosts job: Run n',
      started_at: null,
    },
  ],
};
const logicsState = {
  API: {
    [RECURRING_LOGICS]: {
      response: { results: [recurringLogics] },
      status: STATUS.PENDING,
    },
  },
};

describe('RecurringLogicsTableSelectors', () => {
  it('selectResults', () => {
    expect(selectResults(logicsState)).toMatchSnapshot();
  });
});
