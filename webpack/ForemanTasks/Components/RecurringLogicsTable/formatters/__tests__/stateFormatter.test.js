import { stateFormatter } from '../stateFormatter';

describe('stateFormatter', () => {
  it('render disabled', () => {
    expect(stateFormatter('disabled')).toMatchSnapshot();
  });
  it('render active', () => {
    expect(stateFormatter('active')).toMatchSnapshot();
  });
  it('render finished', () => {
    expect(stateFormatter('finished')).toMatchSnapshot();
  });
  it('render cancelled', () => {
    expect(stateFormatter('cancelled')).toMatchSnapshot();
  });
});
