import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log("mode:", mode, "env:", env);
  return {
    base: env.VITE_APP_BASE ? env.VITE_APP_BASE : "/",
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
        @use "@/styles/scss/_variable.scss";
        @use "@/styles/scss/_mixins.scss";
        `,
        },
      },
    },
    plugins: [vue()],
  };
});
