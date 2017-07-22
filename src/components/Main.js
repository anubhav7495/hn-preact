import { h } from 'preact';
import Router from 'preact-router';

import Redirect from './Redirect';
import Header from './Header';

import PostsList from '../routes/PostsList';
import CommentsList from '../routes/CommentsList';

export default function Main() {
  return (
    <div>
      <Header />
      <div class="container-fixed">
        <Router>
          <PostsList path="/news/:page" key="news" category="news" />
          <PostsList path="/newest/:page" key="newest" category="newest" />
          <PostsList path="/show/:page" key="show" category="show" />
          <PostsList path="/ask/:page" key="ask" category="ask" />
          <PostsList path="/jobs/:page" key="jobs" category="jobs" />
          <CommentsList path="/item/:id" category="item" />
          <Redirect path="/" to="/news/1" />
        </Router>
      </div>
    </div>
  )
}
