import { MarvinResponse } from '../api-client';
import axiosClient from '../axios-client';
import { Post } from './types';

export function posts(): Promise<MarvinResponse<Post[]>> {
  return axiosClient.get<Post[]>('posts').then(r => ({
    data: r.data.map(o => ({ userId: o.userId, id: o.id } as Post)),
  }));
}
