import { h } from 'preact';
import { Link } from 'preact-router/match';
import { pluralize, isShortUrl } from '../../utils';

import './style.css';

export default function Post({data}) {
  const {
    id,
    title,
    url,
    domain,
    points,
    user,
    time_ago,
    comments_count
  } = data;

  return (
    <li class="post">
      {
        !isShortUrl(url) ?
        <a href={url} target="_blank" rel="noopener" class="post-title">
          {title}
        </a> :
        <Link href={`/item/${id}`} class="post-title">
          {title}
        </Link>
      }

      { domain ? <span class="txt-grey">({domain})</span> : null }

      <div class="txt-grey">

        { points !== null ? <span>{pluralize(points, 'point')}</span> : null }

        { user ? <span>by <b>{user}</b></span> : null }

        <span>{time_ago} |</span>

        <Link href={`/item/${id}`} class="comment-link">
          {pluralize(comments_count, 'comment')}
        </Link>

      </div>
    </li>
  );
}
