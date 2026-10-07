import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    base: "/css-gradient-maker/",
    build: {
        sourcemap: false,
    },
    plugins: [react()],
});
