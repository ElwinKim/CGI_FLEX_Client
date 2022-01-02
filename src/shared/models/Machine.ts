/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
export interface IMachine {
  machineId: number;
  machineLabel: string;
  machineName: string;
  status: string;
  partNr: string;
  partMinCy: string;
  partMaxCy: string;
  partLoadTime: string;
  partMultiplier: string;
  partCount: string;
  partsRequired: string;
  operation: string;
  operator: string;
  feedrateOvr: number;
  spindleOvr: number;
  rapidOvr: number;
  eventDateTime: Date;
  shift: number;
  shiftStart: Date;
  cycleTime: number;
  cycleOnTime: number;
  cycleOffTime: number;
  othersTime: number;
  setupTime: number;
}


