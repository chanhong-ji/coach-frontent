import type { CodegenConfig } from "@graphql-codegen/cli";
import configuration from "./app/common/configuration";

const config: CodegenConfig = {
  overwrite: true,
  schema: configuration.server.endPoint,
  documents: "app/**/*.{gql,graphql,ts,tsx}",
  generates: {
    "./app/graphql/__generated__/": {
      plugins: ["typescript", "typescript-operations"],
      preset: "client",
      config: {
        avoidOptionals: {
          // field: true,
          inputValue: false,
        },
        defaultScalarType: "unknown",
        // nonOptionalTypename: true,
        // skipTypeNameForRoot: true,
        allowPartialOutputs: true,
      },
    },
  },
};

export default config;
