/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
      id
      owner
      createdAt
      updatedAt
      stream {
        id
        owner
        username
        platform
        status
        urlToken
        verificationToken
        twitchStreamData
        twitchUserData
        createdAt
        updatedAt
      }
    }
  }
`;
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
          status
          urlToken
          verificationToken
          twitchStreamData
          twitchUserData
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getImpression = /* GraphQL */ `
  query GetImpression($id: ID!) {
    getImpression(id: $id) {
      id
      streamer
      streamId
      advertId
      impressions
      createdAt
      updatedAt
    }
  }
`;
export const listImpressions = /* GraphQL */ `
  query ListImpressions(
    $filter: ModelImpressionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImpressions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        streamer
        streamId
        advertId
        impressions
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStreamSettings = /* GraphQL */ `
  query GetStreamSettings($id: ID!) {
    getStreamSettings(id: $id) {
      id
      platforms
      twitchLanguages
      twitchTags
      createdAt
      updatedAt
    }
  }
`;
export const listStreamSettingss = /* GraphQL */ `
  query ListStreamSettingss(
    $filter: ModelStreamSettingsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStreamSettingss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        platforms
        twitchLanguages
        twitchTags
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
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
          status
          urlToken
          verificationToken
          twitchStreamData
          twitchUserData
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getImpressionByStreamer = /* GraphQL */ `
  query GetImpressionByStreamer(
    $streamer: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelImpressionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getImpressionByStreamer(
      streamer: $streamer
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        streamer
        streamId
        advertId
        impressions
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getImpressionByAdvert = /* GraphQL */ `
  query GetImpressionByAdvert(
    $advertId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelImpressionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getImpressionByAdvert(
      advertId: $advertId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        streamer
        streamId
        advertId
        impressions
        createdAt
        updatedAt
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
        status
        urlToken
        verificationToken
        twitchStreamData
        twitchUserData
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
      status
      urlToken
      verificationToken
      twitchStreamData
      twitchUserData
      createdAt
      updatedAt
    }
  }
`;
export const getStreamByOwner = /* GraphQL */ `
  query GetStreamByOwner(
    $owner: String
    $sortDirection: ModelSortDirection
    $filter: ModelStreamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getStreamByOwner(
      owner: $owner
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
        status
        urlToken
        verificationToken
        twitchStreamData
        twitchUserData
        createdAt
        updatedAt
      }
      nextToken
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
        status
        urlToken
        verificationToken
        twitchStreamData
        twitchUserData
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStreamByStatus = /* GraphQL */ `
  query GetStreamByStatus(
    $status: StreamStatus
    $sortDirection: ModelSortDirection
    $filter: ModelStreamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getStreamByStatus(
      status: $status
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
        status
        urlToken
        verificationToken
        twitchStreamData
        twitchUserData
        createdAt
        updatedAt
      }
      nextToken
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
          identity
        }
        status
        impressionsPerDay
        impressions {
          items {
            id
            streamer
            streamId
            advertId
            impressions
            createdAt
            updatedAt
          }
          nextToken
        }
        lastImpression
        duration
        languages
        categories
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
        identity
      }
      status
      impressionsPerDay
      impressions {
        items {
          id
          streamer
          streamId
          advertId
          impressions
          createdAt
          updatedAt
        }
        nextToken
      }
      lastImpression
      duration
      languages
      categories
      createdAt
      updatedAt
    }
  }
`;
export const getAdvertsByOwner = /* GraphQL */ `
  query GetAdvertsByOwner(
    $owner: String
    $sortDirection: ModelSortDirection
    $filter: ModelAdvertFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getAdvertsByOwner(
      owner: $owner
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        title
        type
        asset {
          key
          identity
        }
        status
        impressionsPerDay
        impressions {
          items {
            id
            streamer
            streamId
            advertId
            impressions
            createdAt
            updatedAt
          }
          nextToken
        }
        lastImpression
        duration
        languages
        categories
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAdvertByStatus = /* GraphQL */ `
  query GetAdvertByStatus(
    $status: AdvertStatus
    $lastImpression: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAdvertFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getAdvertByStatus(
      status: $status
      lastImpression: $lastImpression
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        title
        type
        asset {
          key
          identity
        }
        status
        impressionsPerDay
        impressions {
          items {
            id
            streamer
            streamId
            advertId
            impressions
            createdAt
            updatedAt
          }
          nextToken
        }
        lastImpression
        duration
        languages
        categories
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAdvertJob = /* GraphQL */ `
  query GetAdvertJob($id: ID!) {
    getAdvertJob(id: $id) {
      id
      streamer
      createdAt
      updatedAt
      stream {
        id
        owner
        username
        platform
        status
        urlToken
        verificationToken
        twitchStreamData
        twitchUserData
        createdAt
        updatedAt
      }
      advert {
        id
        owner
        title
        type
        asset {
          key
          identity
        }
        status
        impressionsPerDay
        impressions {
          items {
            id
            streamer
            streamId
            advertId
            impressions
            createdAt
            updatedAt
          }
          nextToken
        }
        lastImpression
        duration
        languages
        categories
        createdAt
        updatedAt
      }
    }
  }
`;
export const listAdvertJobs = /* GraphQL */ `
  query ListAdvertJobs(
    $filter: ModelAdvertJobFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAdvertJobs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        streamer
        createdAt
        updatedAt
        stream {
          id
          owner
          username
          platform
          status
          urlToken
          verificationToken
          twitchStreamData
          twitchUserData
          createdAt
          updatedAt
        }
        advert {
          id
          owner
          title
          type
          asset {
            key
            identity
          }
          status
          impressionsPerDay
          impressions {
            nextToken
          }
          lastImpression
          duration
          languages
          categories
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getAdvertJobByStreamer = /* GraphQL */ `
  query GetAdvertJobByStreamer(
    $streamer: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAdvertJobFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getAdvertJobByStreamer(
      streamer: $streamer
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        streamer
        createdAt
        updatedAt
        stream {
          id
          owner
          username
          platform
          status
          urlToken
          verificationToken
          twitchStreamData
          twitchUserData
          createdAt
          updatedAt
        }
        advert {
          id
          owner
          title
          type
          asset {
            key
            identity
          }
          status
          impressionsPerDay
          impressions {
            nextToken
          }
          lastImpression
          duration
          languages
          categories
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
