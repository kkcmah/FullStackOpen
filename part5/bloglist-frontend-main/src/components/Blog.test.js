import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders title but not other properties initiallty", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    url: "im a site",
    likes: 2,
    author: "im a author",
  };

  const { container } = render(<Blog blog={blog} />);

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
