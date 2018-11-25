import { NoZerosPipe } from './no-zeros.pipe';

describe('NoZerosPipe', () => {
  it('create an instance', () => {
    const pipe = new NoZerosPipe();
    expect(pipe).toBeTruthy();
  });
});
