import { environment } from '../../../environments/environment';

export class EnvConfig {
  API_URL?: string;
  DATA_TABLE_DEFAULT_SIZE?: number;
  PASS_DATA_TABLE_DEFAULT_SIZE?: number;
  MAX_INT?: number;
  CALENDAR_DATE_FORMAT?: string;
  CALENDAR_DATE_TIME_FORMAT?: string;
  ENV?: string;


  constructor(environment) {
    this.API_URL = environment.API_URL;
    this.DATA_TABLE_DEFAULT_SIZE = environment.DATA_TABLE_DEFAULT_SIZE;
    this.PASS_DATA_TABLE_DEFAULT_SIZE = environment.PASS_DATA_TABLE_DEFAULT_SIZE;
    this.MAX_INT = environment.MAX_INT;
    this.CALENDAR_DATE_FORMAT = environment.CALENDAR_DATE_FORMAT;
    this.CALENDAR_DATE_TIME_FORMAT = environment.CALENDAR_DATE_TIME_FORMAT;
  }
}

export const Config: EnvConfig = new EnvConfig(environment);
