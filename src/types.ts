export interface IContentCreation {
  skylink: string; // skylink
  metadata: object; // should be valid JSON
}

export interface IContentInteraction {
  skylink: string; // skylink
  metadata: object; // should be valid JSON
}

export interface IDACResponse {
  submitted: boolean;
  error?: string;
}

export interface IContentRecordDAC {
  recordNewContent(...data: IContentCreation[]): Promise<IDACResponse>;
  recordInteraction(...data: IContentInteraction[]): Promise<IDACResponse>;
}
