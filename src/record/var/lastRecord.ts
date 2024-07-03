import { CreateRecordDto } from "../dto";

interface Measurement {
  record: CreateRecordDto;
}

export let measurement: Measurement = {
  record: {
    bpmAvg: 0,
    delta: 0,
  }
}