import {
  getLastOccurrence,
  getNextOccurrence,
} from '../RecurringLogicsTableHelper';

describe('RecurringLogicsTableHelper', () => {
  it('getLastOccurrence', () => {
    expect(
      getLastOccurrence([
        { started_at: 2 },
        { started_at: 3 },
        { started_at: 1 },
      ])
    ).toEqual(3);
  });

  it('getLastOccurrence no started_at', () => {
    expect(getLastOccurrence([{ started_at: null }])).toEqual('-');
  });
  it('getNextOccurrence', () => {
    expect(
      getNextOccurrence('active', [
        ({ start_at: 2 }, { start_at: 3 }, { start_at: 1 }),
      ])
    ).toEqual(1);
  });

  it('getNextOccurrence no started_at', () => {
    expect(getNextOccurrence('finished')).toEqual('-');
  });
});
