/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onStreamResolverByOwner = /* GraphQL */ `
  subscription OnStreamResolverByOwner($owner: String!) {
    onStreamResolverByOwner(owner: $owner) {
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
export const onStreamByOwner = /* GraphQL */ `
  subscription OnStreamByOwner($owner: String!) {
    onStreamByOwner(owner: $owner) {
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
export const onUpdateAdvertByOwner = /* GraphQL */ `
  subscription OnUpdateAdvertByOwner($owner: String!) {
    onUpdateAdvertByOwner(owner: $owner) {
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
export const onAdvertJobResolverByStreamer = /* GraphQL */ `
  subscription OnAdvertJobResolverByStreamer($streamer: String!) {
    onAdvertJobResolverByStreamer(streamer: $streamer) {
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
export const onCreateProfile = /* GraphQL */ `
  subscription OnCreateProfile {
    onCreateProfile {
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
export const onUpdateProfile = /* GraphQL */ `
  subscription OnUpdateProfile {
    onUpdateProfile {
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
export const onDeleteProfile = /* GraphQL */ `
  subscription OnDeleteProfile {
    onDeleteProfile {
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
export const onCreateImpression = /* GraphQL */ `
  subscription OnCreateImpression {
    onCreateImpression {
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
export const onUpdateImpression = /* GraphQL */ `
  subscription OnUpdateImpression {
    onUpdateImpression {
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
export const onDeleteImpression = /* GraphQL */ `
  subscription OnDeleteImpression {
    onDeleteImpression {
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
export const onCreateStreamSettings = /* GraphQL */ `
  subscription OnCreateStreamSettings {
    onCreateStreamSettings {
      id
      platforms
      twitchLanguages
      twitchTags
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateStreamSettings = /* GraphQL */ `
  subscription OnUpdateStreamSettings {
    onUpdateStreamSettings {
      id
      platforms
      twitchLanguages
      twitchTags
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteStreamSettings = /* GraphQL */ `
  subscription OnDeleteStreamSettings {
    onDeleteStreamSettings {
      id
      platforms
      twitchLanguages
      twitchTags
      createdAt
      updatedAt
    }
  }
`;
export const onCreateInquiry = /* GraphQL */ `
  subscription OnCreateInquiry {
    onCreateInquiry {
      id
      email
      type
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateInquiry = /* GraphQL */ `
  subscription OnUpdateInquiry {
    onUpdateInquiry {
      id
      email
      type
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteInquiry = /* GraphQL */ `
  subscription OnDeleteInquiry {
    onDeleteInquiry {
      id
      email
      type
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSecret = /* GraphQL */ `
  subscription OnCreateSecret {
    onCreateSecret {
      id
      name
      key
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSecret = /* GraphQL */ `
  subscription OnUpdateSecret {
    onUpdateSecret {
      id
      name
      key
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSecret = /* GraphQL */ `
  subscription OnDeleteSecret {
    onDeleteSecret {
      id
      name
      key
      createdAt
      updatedAt
    }
  }
`;
export const onCreateStream = /* GraphQL */ `
  subscription OnCreateStream {
    onCreateStream {
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
export const onUpdateStream = /* GraphQL */ `
  subscription OnUpdateStream {
    onUpdateStream {
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
export const onDeleteStream = /* GraphQL */ `
  subscription OnDeleteStream {
    onDeleteStream {
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
export const onCreateAdvert = /* GraphQL */ `
  subscription OnCreateAdvert {
    onCreateAdvert {
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
export const onUpdateAdvert = /* GraphQL */ `
  subscription OnUpdateAdvert {
    onUpdateAdvert {
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
export const onDeleteAdvert = /* GraphQL */ `
  subscription OnDeleteAdvert {
    onDeleteAdvert {
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
export const onCreateAdvertJob = /* GraphQL */ `
  subscription OnCreateAdvertJob {
    onCreateAdvertJob {
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
export const onUpdateAdvertJob = /* GraphQL */ `
  subscription OnUpdateAdvertJob {
    onUpdateAdvertJob {
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
export const onDeleteAdvertJob = /* GraphQL */ `
  subscription OnDeleteAdvertJob {
    onDeleteAdvertJob {
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
