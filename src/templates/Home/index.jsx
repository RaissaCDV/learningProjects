import "./style.css";
import { Component } from "react";
import { PostCard } from "../../components/PostCard";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: "",
  };

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postResponse = fetch("https://jsonplaceholder.typicode.com/posts");
    const photoResponse = fetch("https://jsonplaceholder.typicode.com/photos");

    const [posts, photos] = await Promise.all([postResponse, photoResponse]);

    const postJson = await posts.json();
    const photosJson = await photos.json();

    const postsAndPhotos = postJson.map((posts, index) => {
      return { ...posts, cover: photosJson[index].url };
    });

    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  };

  handleChange = (e) => {
    console.log("oi", e.target);
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filteredPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;
    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && <h1>Valor procurado {searchValue}</h1>}
          {/* <TextInput
            onChange={searchValue}
            HandleChange={this.handleChange}
            myOnChangeon={searchValue}
            myHandleChange={this.handleChange}
          /> */}
          <input
            type="text"
            value={searchValue}
            onChange={this.handleChange}
          ></input>
        </div>

        {filteredPosts.length > 0 && (
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
        )}

        {filteredPosts.length === 0 && <p>Não foram encontrados posts</p>}

        <div className="button-container">
          {!searchValue && (
            <Button
              text="load more posts"
              onClick={this.loadMorePosts}
              disable={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

export default Home;
