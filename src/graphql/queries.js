/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSecret = /* GraphQL */ `
  query GetSecret($id: ID!) {
    getSecret(id: $id) {
      id
      name
      key
      createdAt
      updatedAt
    }
  }
`;
export const listSecrets = /* GraphQL */ `
  query ListSecrets(
    $filter: ModelSecretFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSecrets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        key
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProfileByOwner = /* GraphQL */ `
  query GetProfileByOwner(
    $owner: String
    $sortDirection: ModelSortDirection
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getProfileByOwner(
      owner: $owner
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        createdAt
        updatedAt
        stream {
          id
          owner
          username
          platform
          verified
          online
          urlToken
          verificationToken
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getSecretByName = /* GraphQL */ `
  query GetSecretByName(
    $name: String
    $sortDirection: ModelSortDirection
    $filter: ModelSecretFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getSecretByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        key
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      owner
      body
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        body
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listStreams = /* GraphQL */ `
  query ListStreams(
    $filter: ModelStreamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStreams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        username
        platform
        verified
        online
        urlToken
        verificationToken
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStream = /* GraphQL */ `
  query GetStream($id: ID!) {
    getStream(id: $id) {
      id
      owner
      username
      platform
      verified
      online
      urlToken
      verificationToken
      createdAt
      updatedAt
    }
  }
`;
export const getStreamByToken = /* GraphQL */ `
  query GetStreamByToken(
    $urlToken: String
    $sortDirection: ModelSortDirection
    $filter: ModelStreamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getStreamByToken(
      urlToken: $urlToken
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        username
        platform
        verified
        online
        urlToken
        verificationToken
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAdvert = /* GraphQL */ `
  query GetAdvert($id: ID!) {
    getAdvert(id: $id) {
      id
      owner
      title
      type
      asset {
        key
      }
      createdAt
      updatedAt
    }
  }
`;
export const listAdverts = /* GraphQL */ `
  query ListAdverts(
    $filter: ModelAdvertFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAdverts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        title
        type
        asset {
          key
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
