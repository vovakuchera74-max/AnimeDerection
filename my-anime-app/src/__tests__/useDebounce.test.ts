import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useDebounce } from '../hooks/useDebounce';

describe('useDebounce', () => {
  it('повертає початкове значення одразу', () => {
    const { result } = renderHook(() => useDebounce('hello', 500));
    expect(result.current).toBe('hello');
  });

  it('не оновлює значення до закінчення delay', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'hello' } }
    );

    rerender({ value: 'world' });
    expect(result.current).toBe('hello'); // ще не змінилось

    act(() => vi.advanceTimersByTime(500));
    expect(result.current).toBe('world'); // тепер змінилось

    vi.useRealTimers();
  });
});
