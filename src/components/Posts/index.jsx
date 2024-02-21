import "./styles.css";
import { PostCard } from "../PostCard";

export const Post = (filteredPosts, post) => {
  return (
    <div className="posts">
      {filteredPosts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          cover={post.cover}
          title={post.title}
          body={post.body}
        />
      ))}
    </div>
  );
};
