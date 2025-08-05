
export type UploaderMode = 'upload' | 'camera';

export enum DisposalMethod {
  RECYCLE = 'RECYCLE',
  COMPOST = 'COMPOST',
  LANDFILL = 'LANDFILL',
  HAZARDOUS = 'HAZARDOUS',
  REUSE = 'REUSE',
  SPECIAL = 'SPECIAL',
  UNKNOWN = 'UNKNOWN',
}

export interface WasteAnalysis {
  itemName: string;
  materialType: string;
  disposalMethod: DisposalMethod;
  recyclable: boolean;
  instructions: string[];
  ecoSuggestion: string;
}
