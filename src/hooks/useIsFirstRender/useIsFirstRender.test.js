import { renderHook } from "@testing-library/react-hooks";

import useIsFirstRender from "./useIsFirstRender";

describe("useIsFirstRender", () => {
  it("should be true on first render and false after", () => {
    const { result, rerender } = renderHook(() => useIsFirstRender());
    expect(result.current).toEqual(true);
    rerender();
    expect(result.current).toEqual(false);
    rerender();
    expect(result.current).toEqual(false);
  });
});

// source: https://stackoverflow.com/questions/53179075/with-useeffect-how-can-i-skip-applying-an-effect-upon-the-initial-render
