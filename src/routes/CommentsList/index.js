import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { pluralize, isShortUrl } from '../../utils';
import './style.css';

import Comment from '../../components/Comment';

export default class CommentsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null
    };
  }

  componentDidMount() {
    this.fetchItem();
  }

  render(props, { item }) {
    return (
      <div class="comments">
        {item ? this.renderComments() : this.renderLoader()}
      </div>
    );
  }

  renderLoader() {
    return <div class="loader loader-margin"></div>;
  }

  renderComments() {
    const { item } = this.state;
    return (
      <div>
        {this.renderPost()}
        <ul class="list-unstyled">
          {
            item.comments.map(comment => <Comment data={comment} key={comment.id} />)
          }
        </ul>
      </div>
    )
  }

  renderPost() {
    const { item } = this.state;
    return (
      <div class="item-details">
        <p>
          {
            !isShortUrl(item.url) ?
            <Link href={`/item/${item.id}`} class="title">
              {item.title}
            </Link> :
            <a href={item.url} target="_blank" rel="noopener" class="title">
              {item.title}
            </a>
          }

          { item.domain ? <small>({item.domain})</small> : null }
        </p>
        <div>
          { item.points !== null ? <span>{pluralize(item.points, 'point')}</span> : null }
          { item.user ? <span>by <b>{item.user}</b></span> : null }
          <span>{item.time_ago} |</span>
          <span>{pluralize(item.comments_count, 'comment')}</span>
        </div>
      </div>
    )
  }

  fetchItem() {
    const { id } = this.props;

    fetch(`https://hnpwa.com/api/v0/item/${id}.json`)
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error('Network response was not ok');
    })
    .then((res) => {
      this.setState({ item: res });
    })
    .catch(e => console.error(e.message));
  }
}
