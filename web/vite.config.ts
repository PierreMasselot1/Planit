import { resolve } from "node:path";
import { readFileSync, existsSync } from "node:fs";
import { defineConfig, loadEnv, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  setEnv(mode);
  return {
    plugins: [
      react(),
      svgr(),
      tsconfigPaths(),
      envPlugin(),
      devServerPlugin(),
      sourcemapPlugin(),
      buildPathPlugin(),
      basePlugin(),
      importPrefixPlugin(),
      htmlPlugin(mode),
    ],
  };
});

function setEnv(mode: string) {
  Object.assign(
    process.env,
    loadEnv(mode, ".", ["REACT_APP_", "NODE_ENV", "PUBLIC_URL"])
  );
  process.env.NODE_ENV ||= mode;
  const { homepage } = JSON.parse(readFileSync("package.json", "utf-8"));
  process.env.PUBLIC_URL ||= homepage
    ? `${
        homepage.startsWith("http") || homepage.startsWith("/")
          ? homepage
          : `/${homepage}`
      }`.replace(/\/$/, "")
    : "";
}

function envPlugin(): Plugin {
  return {
    name: "env-plugin",
    config(_, { mode }) {
      const env = loadEnv(mode, ".", ["REACT_APP_", "NODE_ENV", "PUBLIC_URL"]);
      return {
        define: Object.fromEntries(
          Object.entries(env).map(([key, value]) => [
            `process.env.${key}`,
            JSON.stringify(value),
          ])
        ),
      };
    },
  };
}
function devServerPlugin(): Plugin {
  return {
    name: "dev-server-plugin",
    config(_, { mode }) {
      const { HOST, PORT, HTTPS, SSL_CRT_FILE, SSL_KEY_FILE } = loadEnv(
        mode,
        ".",
        ["HOST", "PORT", "HTTPS", "SSL_CRT_FILE", "SSL_KEY_FILE"]
      );
      const https = HTTPS === "true";
      return {
        server: {
          host: HOST || "localhost",
          port: parseInt(PORT || "3000", 10),
          open: true,
          https:
            https && SSL_CRT_FILE && SSL_KEY_FILE
              ? {
                  cert: readFileSync(resolve(SSL_CRT_FILE)),
                  key: readFileSync(resolve(SSL_KEY_FILE)),
                }
              : https,
        },
      };
    },
  };
}

function sourcemapPlugin(): Plugin {
  return {
    name: "sourcemap-plugin",
    config(_, { mode }) {
      const { GENERATE_SOURCEMAP } = loadEnv(mode, ".", ["GENERATE_SOURCEMAP"]);
      return {
        build: {
          sourcemap: GENERATE_SOURCEMAP === "true",
        },
      };
    },
  };
}

function buildPathPlugin(): Plugin {
  return {
    name: "build-path-plugin",
    config(_, { mode }) {
      const { BUILD_PATH } = loadEnv(mode, ".", ["BUILD_PATH"]);
      return {
        build: {
          outDir: BUILD_PATH || "build",
        },
      };
    },
  };
}

function basePlugin(): Plugin {
  return {
    name: "base-plugin",
    config(_, { mode }) {
      const { PUBLIC_URL } = loadEnv(mode, ".", ["PUBLIC_URL"]);
      return {
        base: PUBLIC_URL || "",
      };
    },
  };
}

function importPrefixPlugin(): Plugin {
  return {
    name: "import-prefix-plugin",
    config() {
      return {
        resolve: {
          alias: [{ find: /^~([^/])/, replacement: "$1" }],
        },
      };
    },
  };
}

function htmlPlugin(mode: string): Plugin {
  const env = loadEnv(mode, ".", ["REACT_APP_", "NODE_ENV", "PUBLIC_URL"]);
  return {
    name: "html-plugin",
    transformIndexHtml: {
      enforce: "pre",
      transform(html) {
        return html.replace(/%(.*?)%/g, (match, p1) => env[p1] ?? match);
      },
    },
  };
}
