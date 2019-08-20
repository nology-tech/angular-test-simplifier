import { TestBed } from '@angular/core/testing';
import { greet } from '../index';

describe('Initial Test', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should greet', () => {
    expect(greet('World')).toBe('Hello World');
  });
});
