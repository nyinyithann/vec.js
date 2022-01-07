import Vec from '../src/vec/vec.main';

describe('Vec.create', () => {
  test('should create a vec based on args passed', () => {
    const vec = Vec.create(10, 1);
    expect(vec.length).toBe(10);

    expect(Vec.create(0, 1).length).toBe(0);
  });

  test('should throw error if count is negative', () => {
    expect(() => Vec.create(-1, 1)).toThrow(TypeError);
  });
});
