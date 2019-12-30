import gql from 'graphql-tag';
import { MarvinResponse } from '../api-client';
import apolloClient from '../apollo-client';
import { Post } from './types';

const POSTS = gql`
  query posts {
    posts @rest(type: "[Post]", path: "posts") {
      userId
      id
      title
      body
    }
  }
`;

export function posts(): Promise<MarvinResponse<Post[]>> {
  return apolloClient
    .query<{ posts: Post[] }>({
      query: POSTS,
    })
    .then(r => ({ data: r.data.posts }));
}
