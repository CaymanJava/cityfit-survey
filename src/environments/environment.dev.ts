import { Level } from '@ngx-toolkit/logger';

export const environment = {
  production: false,
  DATA_TABLE_DEFAULT_SIZE: 50,
  PASS_DATA_TABLE_DEFAULT_SIZE: 50,
  MAX_INT: 2147483647,
  CALENDAR_DATE_FORMAT: 'yyyy-MM-dd',
  CALENDAR_DATE_TIME_FORMAT: 'yyyy-MM-dd HH:MM',
  API_URL: '/api',
  logger: {
    level: Level.DEBUG
  }
};
