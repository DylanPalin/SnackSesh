import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import type { DB } from "./kysely-types";
import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: String(process.env.DATABASE_URL),
    }),
  }),
  plugins: [new CamelCasePlugin()],
});