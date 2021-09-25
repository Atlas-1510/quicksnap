import updateFeed from "./updateFeed";
import { firestore } from "../../../firebase/firebase";

jest.mock("../../../firebase/firebase", () => ({
  __esModule: true,
  firestore: () => jest.fn(),
}));

describe("updateFeed", () => {
  it("returns array of feedItems when provided a uid", () => {
    firestore.mockReturnValue({
      get: function () {
        return [];
      },
    });
  });
});
