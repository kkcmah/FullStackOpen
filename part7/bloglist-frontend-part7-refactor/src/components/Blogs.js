import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@material-ui/core";

const Blogs = () => {
  const [visible, setVisible] = useState(false);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleCreateBlog = async (blogToCreate) => {
    dispatch(createBlog(blogToCreate));
    dispatch(
      setNotification(
        `a new blog ${blogToCreate.title} by ${blogToCreate.author} added`,
        false,
        5
      )
    );
    setVisible(false);
  };

  return (
    <div>
      <Togglable
        toggleVisibility={toggleVisibility}
        visible={visible}
        buttonLabel="new blog"
      >
        <BlogForm handleCreateBlog={handleCreateBlog}></BlogForm>
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {sortedBlogs.map((blog) => (
              <TableRow className="blog" key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title} by {blog.author}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Blogs;
