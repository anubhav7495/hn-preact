import { h } from 'preact';
import { Link } from 'preact-router/match';

import './style.css';

export default function Header() {
  return (
    <div class="header">
      <div class="container-fixed">
        <Link href='/' class="header-link brand">HN</Link>
        <Link href='/news/1' class="header-link" activeClassName="header-link-active">
          Top
        </Link>
        <Link href='/newest/1' class="header-link" activeClassName="header-link-active">
          New
        </Link>
        <Link href='/show/1' class="header-link" activeClassName="header-link-active">
          Show
        </Link>
        <Link href='/ask/1' class="header-link" activeClassName="header-link-active">
          Ask
        </Link>
        <Link href='/jobs/1' class="header-link" activeClassName="header-link-active">
          Jobs
        </Link>
      </div>
    </div>
  );
}
