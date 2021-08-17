import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageUploader from "./ImageUploader";
import testImage from "../../images/test-images/testUserProfile2.jpg";

const exit = jest.fn();
const currentPage = jest.fn();
const setCurrentPage = jest.fn();

describe("ImageUploader", () => {
  let instance;

  let setItemSpy, getItemSpy;

  let mockStorage = {};

  beforeAll(() => {
    setItemSpy = jest
      .spyOn(global.Storage.prototype, "setItem")
      .mockImplementation((key, value) => {
        mockStorage[key] = value;
      });

    getItemSpy = jest
      .spyOn(global.Storage.prototype, "getItem")
      .mockImplementation((key) => mockStorage[key]);
  });

  beforeEach(() => {
    global.URL.createObjectURL = jest.fn();
    instance = render(
      <ImageUploader
        exit={exit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    );
  });

  afterAll(() => {
    getItemSpy.mockRestore();
    setItemSpy.mockRestore();
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

  it("saves image to local storage when share button is clicked", () => {
    const button = screen.getByTestId("test-file-upload-button");
    fireEvent.click(button);

    const input = screen.getByTestId("test-file-input");
    userEvent.upload(input, testImage);

    const shareButton = screen.getByText("Share");
    fireEvent.click(shareButton);

    expect(global.Storage.prototype.setItem).toHaveBeenCalledTimes(1);
  });

  it("unmounts after submission is completed", () => {
    const button = screen.getByTestId("test-file-upload-button");
    fireEvent.click(button);

    const input = screen.getByTestId("test-file-input");
    userEvent.upload(input, testImage);

    const shareButton = screen.getByText("Share");
    fireEvent.click(shareButton);

    expect(exit.mock.calls.length).toBe(1);
  });
});

// https://bholmes.dev/blog/mocking-browser-apis-fetch-localstorage-dates-the-easy-way-with-jest/
