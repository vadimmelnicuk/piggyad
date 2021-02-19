/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
      id
      owner
      body
      createdAt
      updatedAt
    }
  }
`;
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
      id
      owner
      body
      createdAt
      updatedAt
    }
  }
`;
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
      id
      owner
      body
      createdAt
      updatedAt
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
      verified
      online
      urlToken
      verificationToken
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
      verified
      online
      urlToken
      verificationToken
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
      verified
      online
      urlToken
      verificationToken
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
      }
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
      }
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
      }
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
