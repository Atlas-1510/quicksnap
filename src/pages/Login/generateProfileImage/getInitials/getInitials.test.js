import getInitials from "./getInitials";

describe("generateProfileImage", () => {
  it("converts two-word name to capital initials", () => {
    expect(getInitials("Tom Clancy")).toBe("TC");
    expect(getInitials("tom clancy")).toBe("TC");
  });
  it("throws error if recieves more than two word name", () => {
    expect(() => getInitials("robert brown landgon")).toThrowError(
      "generateProfileImage recieved a string input that is not two words long"
    );
  });
});
