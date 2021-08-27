import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageUploader from "./ImageUploader";
import testImageFile from "../../images/test-images/testUserProfile2.jpg";
import postImage from "./postImage/postImage";
import { act } from "react-dom/test-utils";

const testImage = {
  image: testImageFile,
  type: "image/jpeg",
};

// Note: Some tests encapsulated in async/await blocks due to issue outlined here:
// https://github.com/facebook/react/issues/15379

const exit = jest.fn();
const currentPage = jest.fn();
const setCurrentPage = jest.fn();
jest.mock("./postImage/postImage", () => jest.fn());
global.URL.createObjectURL = jest.fn();
jest.spyOn(window, "alert").mockImplementation(() => {});

describe("ImageUploader", () => {
  let instance;

  let mockStorage = {};

  beforeEach(async () => {
    jest.clearAllMocks();

    await act(async () => {
      instance = render(
        <ImageUploader
          exit={exit}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      );
    });
  });

  it("renders", () => {
    const newPost = screen.getByText("New Post");
    expect(newPost).toBeTruthy();
  });

  it("registers click on file input when button is clicked", () => {
    const uploadInput = screen.getByTestId("test-file-input");
    const uploadSpy = jest.spyOn(uploadInput, "click");

    const button = screen.getByTestId("test-file-upload-button");
    fireEvent.click(button);
    expect(uploadSpy).toHaveBeenCalled();
  });

  it("shows preview of image to upload and share and change buttons when image uploaded by user", () => {
    const uploadPrompt = screen.getByText("Drag photos and videos here.");
    expect(uploadPrompt).toBeTruthy();

    const button = screen.getByTestId("test-file-upload-button");
    fireEvent.click(button);

    const input = screen.getByTestId("test-file-input");
    userEvent.upload(input, testImage);
    expect(input.files).toHaveLength(1);

    const preview = screen.getByTestId("test-image-preview");
    expect(preview).toBeTruthy();

    const changeImageButton = screen.getByText("Change Image");
    expect(changeImageButton).toBeTruthy();
    const shareButton = screen.getByText("Share");
    expect(shareButton).toBeTruthy();
  });

  it("changes chosen file when 'Change Image' button is clicked", () => {
    const uploadInput = screen.getByTestId("test-file-input");
    const uploadSpy = jest.spyOn(uploadInput, "click");

    const button = screen.getByTestId("test-file-upload-button");
    fireEvent.click(button);
    const input = screen.getByTestId("test-file-input");
    userEvent.upload(input, testImage);
    const changeImageButton = screen.getByText("Change Image");
    fireEvent.click(changeImageButton);

    expect(uploadSpy).toHaveBeenCalledTimes(2);
  });

  it("saves image to storage when share button is clicked", async () => {
    await act(async () => {
      const button = await screen.findByTestId("test-file-upload-button");
      fireEvent.click(button);
    });

    await act(async () => {
      const input = await screen.findByTestId("test-file-input");
      userEvent.upload(input, testImage);
    });

    await act(async () => {
      const shareButton = await screen.findByText("Share");
      fireEvent.click(shareButton);
    });

    expect(postImage).toHaveBeenCalledTimes(1);
  });

  it("unmounts after submission is completed", async () => {
    await act(async () => {
      const button = await screen.findByTestId("test-file-upload-button");
      fireEvent.click(button);
    });

    await act(async () => {
      const input = await screen.findByTestId("test-file-input");
      userEvent.upload(input, testImage);
    });

    await act(async () => {
      const shareButton = await screen.findByText("Share");
      fireEvent.click(shareButton);
    });

    expect(exit.mock.calls.length).toBe(1);
  });
});

// TODO: Remove comment below
// Link below used for prior tests based on local storage, not firestore
// https://bholmes.dev/blog/mocking-browser-apis-fetch-localstorage-dates-the-easy-way-with-jest/
