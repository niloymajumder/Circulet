
<<<<<<< HEAD
export type UploaderMode = 'upload' | 'camera';

=======
>>>>>>> d1a2f920a1c57cba3f47e19dae7a90a91fba6361
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
