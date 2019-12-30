declare module '*.gql' {
  import { DocumentNode } from 'graphql';
  const schema: any;
  export = schema;
}
