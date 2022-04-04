import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog/>", () => {
  let container;
  let mockHandlerLike = jest.fn();

  beforeEach(() => {
    const blog = {
      title: "Component testing is done with react-testing-library",
      url: "im a site",
      likes: 2,
      author: "im a author",
    };
    container = render(
      <Blog blog={blog} handleLikeBlog={mockHandlerLike} />
    ).container;
  });

  test("renders title but not other properties initially", () => {
    const div = container.querySelector(".blog");
    expect(div).toHaveTextContent(
      "Component testing is done with react-testing-library"
    );

    const titleElement = screen.getByText(
      "Component testing is done with react-testing-library"
    );
    expect(titleElement).toBeDefined();

    const urlElement = screen.queryByText("im a site");
    const likesElement = screen.queryByText(2);
    const authorElement = screen.queryByText("im a author");

    expect(urlElement).toBeNull();
    expect(likesElement).toBeNull();
    expect(authorElement).toBeNull();
  });

  test("clicking view button show blog's url, likes, and author", async () => {
    // const button = container.querySelector("detail-btan");
    const button = screen.getByText("view");
    userEvent.click(button);
    await new Promise((r) => setTimeout(r, 50));

    const urlElement = screen.getByText("im a site");
    const likesElement = screen.getByText(2);
    const authorElement = screen.getByText("im a author");
    expect(urlElement).toBeDefined();
    expect(likesElement).toBeDefined();
    expect(authorElement).toBeDefined();
  });
});
