import React from "react";
import classes from "./all-posts.module.css";
import PostGrid from "./post-grid";

function AllPosts(props) {
  return (
    <section className={classes.posts}>
      <h1>All Posts posts</h1>
      <PostGrid posts={props.posts} />
    </section>
  );
}

export default AllPosts;
