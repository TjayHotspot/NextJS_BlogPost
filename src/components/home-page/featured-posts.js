import React from "react";
import PostGrid from "../posts/post-grid";
import classes from "./featured-posts.module.css";

function FeaturedPosts(props) {
  return (
    <section className={classes.latest}>
      <PostGrid posts={props.posts} />
    </section>
  );
}

export default FeaturedPosts;
