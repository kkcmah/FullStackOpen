import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("<BlogForm/>", () => {
  let container;
  let mockHandlerCreateBlog = jest.fn();

  beforeEach(() => {
    container = render(
      <BlogForm handleCreateBlog={mockHandlerCreateBlog} />
    ).container;
  });

  test("clicking like button twice calls event handler in props twice", async () => {
    const newBlog = {
      title: "new title",
      author: "new author",
      url: "new url",
    };

    const titleInput = screen.getByPlaceholderText('type title here')
    await userEvent.type(titleInput, newBlog.title )

    const authorInput = screen.getByPlaceholderText('type author here')
    await userEvent.type(authorInput, newBlog.author )

    const urlInput = screen.getByPlaceholderText('type url here')
    await userEvent.type(urlInput, newBlog.url )

    const button = container.querySelector(".create-btn");
    await userEvent.click(button);

    expect(mockHandlerCreateBlog.mock.calls).toHaveLength(1);
    expect(mockHandlerCreateBlog.mock.calls[0][0]).toEqual(newBlog);
  });
});
