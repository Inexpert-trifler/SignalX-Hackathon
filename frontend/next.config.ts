import path from "node:path";
import type { NextConfig } from "next";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
const workspaceRoot = path.resolve(projectDir, "..");

loadEnvConfig(projectDir);
if (workspaceRoot !== projectDir) {
  loadEnvConfig(workspaceRoot);
}

const nextConfig: NextConfig = {
  images: {
    domains: ["*"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    externalDir: true,
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },
};

export default nextConfig;
