export interface IContentCreation {
  content: string;    // skylink
  metadata: object;   // should be valid JSON
}

export interface IContentInteraction {
  content: string;    // skylink
  metadata: object;   // should be valid JSON
}

export interface IContentRecordDAC {
  recordCreate(data: IContentCreation): Promise<string>;
  recordInteraction(data: IContentInteraction): Promise<string>;
}