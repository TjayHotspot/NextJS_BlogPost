import AllPosts from "@/components/posts/all-posts";
import getAllPost from "@/helper/posts-util";
import Head from "next/head";
import React, { Fragment } from "react";

function AllPostsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>All Blog Posts</title>
        <meta
          name="description"
          content="A list of all programming related tutorials and blog posts"
        />
      </Head>
      <AllPosts posts={props.posts} />;
    </Fragment>
  );
}

export function getStaticProps() {
  const allPosts = getAllPost();

  return {
    props: {
      posts: allPosts,
    },
    revalidate: 1800,
  };
}

export default AllPostsPage;
