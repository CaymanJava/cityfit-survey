import { Level } from '@ngx-toolkit/logger';

export const environment = {
  production: false,
  ENV: 'DEV',
  API_URL: 'http://localhost:8090',
  DATA_TABLE_DEFAULT_SIZE: 40,
  MAX_INT: 2147483647,
  CALENDAR_DATE_FORMAT: 'yyyy-MM-dd',
  CALENDAR_DATE_TIME_FORMAT: 'yyyy-MM-dd HH:MM',
  logger: {
    level: Level.DEBUG
  }
};
