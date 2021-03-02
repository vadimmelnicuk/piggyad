/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdateStreamById = /* GraphQL */ `
  subscription OnUpdateStreamById($id: ID!) {
    onUpdateStreamById(id: $id) {
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
        verified
        online
        urlToken
        verificationToken
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
        verified
        online
        urlToken
        verificationToken
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
        verified
        online
        urlToken
        verificationToken
        createdAt
        updatedAt
      }
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
      verified
      online
      urlToken
      verificationToken
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
      verified
      online
      urlToken
      verificationToken
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
      verified
      online
      urlToken
      verificationToken
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
export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote {
    onCreateNote {
      id
      owner
      body
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote {
    onUpdateNote {
      id
      owner
      body
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote {
    onDeleteNote {
      id
      owner
      body
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
      impressions
      lastImpression
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
      impressions
      lastImpression
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
      impressions
      lastImpression
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
      completed
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
        impressions
        lastImpression
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
      completed
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
        impressions
        lastImpression
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
      completed
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
        impressions
        lastImpression
        createdAt
        updatedAt
      }
    }
  }
`;
