import { Level } from '@ngx-toolkit/logger';

export const environment = {
  production: false,
  ENV: 'PROD',
  API_URL: 'https://cf-staging.nvt.pl/api',
  DATA_TABLE_DEFAULT_SIZE: 40,
  PASS_DATA_TABLE_DEFAULT_SIZE: 50,
  MAX_INT: 2147483647,
  CALENDAR_DATE_FORMAT: 'yyyy-MM-dd',
  CALENDAR_DATE_TIME_FORMAT: 'yyyy-MM-dd HH:MM',
  logger: {
    level: Level.DEBUG
  }
};
