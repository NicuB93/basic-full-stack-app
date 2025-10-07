import { createClient } from "@hey-api/openapi-ts";
import dotenv from "dotenv";

dotenv.config();

const OPEN_API_JSON_URL = process.env.OPEN_API_JSON_URL;
if (!OPEN_API_JSON_URL) throw new Error("OPEN_API_JSON_URL env var is missing");

createClient({
  input: OPEN_API_JSON_URL,
  output: { path: "./src/generated", format: "prettier", lint: "eslint" },
  plugins: [
    { name: "@hey-api/typescript", enums: "javascript" },
    {
      name: "@hey-api/sdk",
    },
    {
      name: "@hey-api/client-fetch",
      throwOnError: true,
      runtimeConfigPath: "./src/lib/heyapi-runtime.ts",
    },
  ],
});
