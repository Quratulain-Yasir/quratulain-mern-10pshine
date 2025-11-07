// src/utils/env.js

// Check for Vite env (browser)
const viteEnv = typeof process !== "undefined" && process.env.VITE_BACKEND_URL;

// Check for Jest env (tests)
const jestEnv = typeof global !== "undefined" && global.VITE_BACKEND_URL;

// final
export const backendUrl = viteEnv || jestEnv || "http://localhost:5000";
