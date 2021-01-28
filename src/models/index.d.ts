import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Authors {
  readonly id: string;
  readonly firstName?: string;
  readonly lastName?: string;
  constructor(init: ModelInit<Authors>);
  static copyOf(source: Authors, mutator: (draft: MutableModel<Authors>) => MutableModel<Authors> | void): Authors;
}