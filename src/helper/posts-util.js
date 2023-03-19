import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "posts");

export function getPostsFiles() {
  return fs.readdirSync(postsDir);
}

export function getPostData(postIdentifier) {
  const postId = postIdentifier.replace(/\.md$/, "");
  const filePath = path.join(postsDir, `${postId}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postData = {
    id: postId,
    ...data,
    content,
  };
  return postData;
}
export function getAllPost() {
  const postFiles = fs.readdirSync(postsDir);

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPost = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );
  return sortedPost;
}

export function getFeaturedPosts() {
  const allPosts = getAllPost();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}
export default getAllPost;
