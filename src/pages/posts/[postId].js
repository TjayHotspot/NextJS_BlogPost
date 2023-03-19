import PostContent from "@/components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "@/helper/posts-util";
import React, { Fragment } from "react";
import Head from "next/head";

function SinglePostPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.summary} />
      </Head>
      <PostContent post={props.post} />;
    </Fragment>
  );
}

export default SinglePostPage;

export function getStaticProps(context) {
  const postId = context.params.postId;
  const postData = getPostData(postId);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFileNames = getPostsFiles();
  const postIds = postFileNames.map((fileName) =>
    fileName.replace(/\.md$/, "")
  );
  return {
    paths: postIds.map((postId) => ({ params: { postId: postId } })),
    fallback: false,
  };
}
