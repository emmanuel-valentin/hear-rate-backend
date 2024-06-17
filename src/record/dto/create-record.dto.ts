import { IsInt, IsNumber, IsPositive, Min } from 'class-validator';

export class CreateRecordDto {
  @IsNumber()
  @IsPositive()
  @Min(0) // TODO: Si es que existe un mínimo
  bpmAvg: number;

  @IsInt()
  delta: number;
}
