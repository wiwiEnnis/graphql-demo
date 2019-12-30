import * as yup from 'yup';

export const postSchema = yup.object({
  userId: yup.number().integer(),
  id: yup.number().integer(),
  title: yup.string().default('-'),
  body: yup.string().default('-'),
});
export const postsSchema = yup.array().of(postSchema);

export type Post = yup.InferType<typeof postSchema>;
