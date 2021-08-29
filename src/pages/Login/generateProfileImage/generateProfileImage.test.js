import generateProfileImage from "./generateProfileImage";

describe("generateProfileImage", () => {
  it("converts two-word name to capital initials", () => {
    expect(generateProfileImage("Tom Clancy")).toBe("TC");
    expect(generateProfileImage("tom clancy")).toBe("TC");
  });
  it("throws error if recieves more than two word name", () => {
    expect(() => generateProfileImage("robert brown landgon")).toThrowError(
      "generateProfileImage recieved a fullName input that is not two words long"
    );
  });
});
