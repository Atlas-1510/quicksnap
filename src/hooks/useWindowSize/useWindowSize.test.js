import { fireEvent } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";

import { useWindowSize } from "./useWindowSize";

describe("useWindowSize", () => {
  global.innerWidth = 500;
  global.innerHeight = 800;

  it("reads initial innerWidth and innerHeight values from window", () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current.width).toBe(500);
    expect(result.current.height).toBe(800);
  });

  it("updates innerWidth and innerHeight values when window resizes", () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current.width).toBe(500);
    expect(result.current.height).toBe(800);

    act(() => {
      global.innerWidth = 1000;
      global.innerHeight = 1000;

      fireEvent(global, new Event("resize"));
    });

    expect(result.current.width).toBe(1000);
    expect(result.current.height).toBe(1000);
  });
});

// source: https://alexboffey.co.uk/blog/jest-window-mock/
