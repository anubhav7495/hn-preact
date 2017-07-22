import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import './style.css';

import Post from '../../components/Post';

export default class PostsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      hasMore: true,
    };
  }

  componentDidMount() {
    this.fetchData(this.props.page);
  }

  componentWillReceiveProps({ page }) {
    this.setState({ posts: [] });
    this.fetchData(page);
  }

  renderPostsList() {
    const { posts } = this.state;
    const start = ((this.props.page - 1) * 30) + 1;

    if(!posts.length) {
      return <div class="loader"></div>;
    } else {
      return (
        <ol start={start}>
          { posts.map(post => <Post data={post} key={post.id} />) }
        </ol>
      );
    }
  }

  render({ category, page }, { hasMore }) {
    return (
      <div class="main">
        <div class="pagination">
          {
            page > 1 ?
            <Link href={`/${category}/${parseInt(page) - 1}`} class="pagination-link">
              &lt; Prev
            </Link> :
            <a class="pagination-link disabled">&lt; Prev</a>
          }

          {
            hasMore ?
            <Link href={`/${category}/${parseInt(page) + 1}`} class="pagination-link">
              Next &gt;
            </Link> :
            <a class="pagination-link disabled">Next &gt;</a>
          }
        </div>
        {this.renderPostsList()}
      </div>
    );
  }

  fetchData(page) {
    const { category } = this.props;

    fetch(`https://hnpwa.com/api/v0/${category}.json?page=${page}`)
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error('Network response was not ok');
    })
    .then((res) => {
      this.setState({
        posts: res,
        hasMore: res.length === 30,
      });
    })
    .catch(e => console.error(e.message));
  }
}
