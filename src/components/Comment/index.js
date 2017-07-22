import { h } from 'preact';
import Markup from 'preact-markup';

import './style.css';

export default function Comment({data}) {
  return (
    <li>
      <p class="txt-grey">
        <b>{data.user}</b> {data.time_ago}
      </p>
      <Markup type="html" markup={data.content} class="content" />
      <ul class="list-unstyled child-padding">
        {
          data.comments.map(comment => <Comment data={comment} key={comment.id} />)
        }
      </ul>
    </li>
  )
}
