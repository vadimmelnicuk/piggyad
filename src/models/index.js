// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Authors } = initSchema(schema);

export {
  Authors
};