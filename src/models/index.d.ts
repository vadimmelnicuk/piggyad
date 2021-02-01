import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Notes {
  readonly id: string;
  readonly body: string;
  readonly owner?: string;
  constructor(init: ModelInit<Notes>);
  static copyOf(source: Notes, mutator: (draft: MutableModel<Notes>) => MutableModel<Notes> | void): Notes;
}