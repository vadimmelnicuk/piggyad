/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const streamResolver = /* GraphQL */ `
  mutation StreamResolver($owner: String!) {
    streamResolver(owner: $owner) {
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
export const advertJobResolver = /* GraphQL */ `
  mutation AdvertJobResolver($streamer: String!) {
    advertJobResolver(streamer: $streamer) {
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
export const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $input: CreateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    createProfile(input: $input, condition: $condition) {
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
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
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
export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile(
    $input: DeleteProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    deleteProfile(input: $input, condition: $condition) {
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
export const createStream = /* GraphQL */ `
  mutation CreateStream(
    $input: CreateStreamInput!
    $condition: ModelStreamConditionInput
  ) {
    createStream(input: $input, condition: $condition) {
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
export const updateStream = /* GraphQL */ `
  mutation UpdateStream(
    $input: UpdateStreamInput!
    $condition: ModelStreamConditionInput
  ) {
    updateStream(input: $input, condition: $condition) {
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
export const deleteStream = /* GraphQL */ `
  mutation DeleteStream(
    $input: DeleteStreamInput!
    $condition: ModelStreamConditionInput
  ) {
    deleteStream(input: $input, condition: $condition) {
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
export const createAdvert = /* GraphQL */ `
  mutation CreateAdvert(
    $input: CreateAdvertInput!
    $condition: ModelAdvertConditionInput
  ) {
    createAdvert(input: $input, condition: $condition) {
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
export const updateAdvert = /* GraphQL */ `
  mutation UpdateAdvert(
    $input: UpdateAdvertInput!
    $condition: ModelAdvertConditionInput
  ) {
    updateAdvert(input: $input, condition: $condition) {
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
export const deleteAdvert = /* GraphQL */ `
  mutation DeleteAdvert(
    $input: DeleteAdvertInput!
    $condition: ModelAdvertConditionInput
  ) {
    deleteAdvert(input: $input, condition: $condition) {
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
export const createAdvertJob = /* GraphQL */ `
  mutation CreateAdvertJob(
    $input: CreateAdvertJobInput!
    $condition: ModelAdvertJobConditionInput
  ) {
    createAdvertJob(input: $input, condition: $condition) {
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
export const updateAdvertJob = /* GraphQL */ `
  mutation UpdateAdvertJob(
    $input: UpdateAdvertJobInput!
    $condition: ModelAdvertJobConditionInput
  ) {
    updateAdvertJob(input: $input, condition: $condition) {
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
export const deleteAdvertJob = /* GraphQL */ `
  mutation DeleteAdvertJob(
    $input: DeleteAdvertJobInput!
    $condition: ModelAdvertJobConditionInput
  ) {
    deleteAdvertJob(input: $input, condition: $condition) {
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
export const createImpression = /* GraphQL */ `
  mutation CreateImpression(
    $input: CreateImpressionInput!
    $condition: ModelImpressionConditionInput
  ) {
    createImpression(input: $input, condition: $condition) {
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
export const updateImpression = /* GraphQL */ `
  mutation UpdateImpression(
    $input: UpdateImpressionInput!
    $condition: ModelImpressionConditionInput
  ) {
    updateImpression(input: $input, condition: $condition) {
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
export const deleteImpression = /* GraphQL */ `
  mutation DeleteImpression(
    $input: DeleteImpressionInput!
    $condition: ModelImpressionConditionInput
  ) {
    deleteImpression(input: $input, condition: $condition) {
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
export const createStreamSettings = /* GraphQL */ `
  mutation CreateStreamSettings(
    $input: CreateStreamSettingsInput!
    $condition: ModelStreamSettingsConditionInput
  ) {
    createStreamSettings(input: $input, condition: $condition) {
      id
      platforms
      twitchLanguages
      twitchTags
      createdAt
      updatedAt
    }
  }
`;
export const updateStreamSettings = /* GraphQL */ `
  mutation UpdateStreamSettings(
    $input: UpdateStreamSettingsInput!
    $condition: ModelStreamSettingsConditionInput
  ) {
    updateStreamSettings(input: $input, condition: $condition) {
      id
      platforms
      twitchLanguages
      twitchTags
      createdAt
      updatedAt
    }
  }
`;
export const deleteStreamSettings = /* GraphQL */ `
  mutation DeleteStreamSettings(
    $input: DeleteStreamSettingsInput!
    $condition: ModelStreamSettingsConditionInput
  ) {
    deleteStreamSettings(input: $input, condition: $condition) {
      id
      platforms
      twitchLanguages
      twitchTags
      createdAt
      updatedAt
    }
  }
`;
export const updateInquiry = /* GraphQL */ `
  mutation UpdateInquiry(
    $input: UpdateInquiryInput!
    $condition: ModelInquiryConditionInput
  ) {
    updateInquiry(input: $input, condition: $condition) {
      id
      email
      type
      createdAt
      updatedAt
    }
  }
`;
export const deleteInquiry = /* GraphQL */ `
  mutation DeleteInquiry(
    $input: DeleteInquiryInput!
    $condition: ModelInquiryConditionInput
  ) {
    deleteInquiry(input: $input, condition: $condition) {
      id
      email
      type
      createdAt
      updatedAt
    }
  }
`;
export const createSecret = /* GraphQL */ `
  mutation CreateSecret(
    $input: CreateSecretInput!
    $condition: ModelSecretConditionInput
  ) {
    createSecret(input: $input, condition: $condition) {
      id
      name
      key
      createdAt
      updatedAt
    }
  }
`;
export const updateSecret = /* GraphQL */ `
  mutation UpdateSecret(
    $input: UpdateSecretInput!
    $condition: ModelSecretConditionInput
  ) {
    updateSecret(input: $input, condition: $condition) {
      id
      name
      key
      createdAt
      updatedAt
    }
  }
`;
export const deleteSecret = /* GraphQL */ `
  mutation DeleteSecret(
    $input: DeleteSecretInput!
    $condition: ModelSecretConditionInput
  ) {
    deleteSecret(input: $input, condition: $condition) {
      id
      name
      key
      createdAt
      updatedAt
    }
  }
`;
export const createInquiry = /* GraphQL */ `
  mutation CreateInquiry(
    $input: CreateInquiryInput!
    $condition: ModelInquiryConditionInput
  ) {
    createInquiry(input: $input, condition: $condition) {
      id
      email
      type
      createdAt
      updatedAt
    }
  }
`;
