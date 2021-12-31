/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
export class IMachine {
  MachineId: number;
  MachineLable: string;
  MachineName: string;
  Status: string;
  PartNumber: string;
  CycleOff: number;
  CycleOn: number;
  SetUp: number;
  Others: number;

  constructor( MachineId: number, MachineLable: string, MachineName: string, Status: string,
    PartNumber: string, CycleOff: number, CycleOn: number, SetUp: number, Others: number ){
  this.MachineId= MachineId;
  this.MachineLable= MachineLable;
  this.MachineName= MachineName;
  this.Status= Status;
  this.PartNumber= PartNumber;
  this.CycleOff= CycleOff;
  this.CycleOn= CycleOn;
  this.SetUp= SetUp;
  this.Others= Others;
  };

}


