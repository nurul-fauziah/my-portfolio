import * as migration_20260728_231836 from './20260728_231836';
import * as migration_20260822_080500 from './20260822_080500';

export const migrations = [
  {
    up: migration_20260728_231836.up,
    down: migration_20260728_231836.down,
    name: '20260728_231836'
  },
  {
    up: migration_20260822_080500.up,
    down: migration_20260822_080500.down,
    name: '20260822_080500'
  },
];
