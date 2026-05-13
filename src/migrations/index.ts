import * as migration_20260313_225049 from './20260313_225049';
import * as migration_20260514_add_user_fields from './20260514_add_user_fields';

export const migrations = [
  {
    up: migration_20260313_225049.up,
    down: migration_20260313_225049.down,
    name: '20260313_225049'
  },
  {
    up: migration_20260514_add_user_fields.up,
    down: migration_20260514_add_user_fields.down,
    name: '20260514_add_user_fields'
  },
];
