import { actionCellFormatter } from '../actionCellFormatter';

describe('actionCellFormatter', () => {
  it('render disabled', () => {
    const data = [true, { rowData: { id: 1, state: 'disabled' } }];
    expect(actionCellFormatter({})(...data)).toMatchSnapshot();
  });
  it('render active', () => {
    const data = [true, { rowData: { id: 1, state: 'active' } }];
    expect(actionCellFormatter({})(...data)).toMatchSnapshot();
  });
  it('render finished', () => {
    const data = [true, { rowData: { id: 1, state: 'finished' } }];
    expect(actionCellFormatter({})(...data)).toMatchSnapshot();
  });
  it('render cancelled', () => {
    const data = [true, { rowData: { id: 1, state: 'cancelled' } }];
    expect(actionCellFormatter({})(...data)).toMatchSnapshot();
  });
  it('render no edit', () => {
    const data = [false, { rowData: {} }];
    expect(actionCellFormatter({})(...data)).toMatchSnapshot();
  });
});
