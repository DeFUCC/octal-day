import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import VueRouter from 'vue-router/vite'
import { viteSingleFile } from "vite-plugin-singlefile"

import {
  transformerDirectives,
  presetIcons,
  presetUno,
  extractorSplit,
  presetTypography
} from "unocss";
import extractorPug from "@unocss/extractor-pug";


export default defineConfig({
  base: './',
  server: {
    port: 3542,
    strictPort: false,
  },
  preview: {
    host: "0.0.0.0",
    port: '4222'
  },
  plugins: [
    VueRouter({
      routesFolder: [
        { src: "src/pages" }
      ]
    }),
    UnoCSS({
      transformers: [transformerDirectives()],
      presets: [
        presetIcons({
          scale: 1.2,
          extraProperties: {
            "vertical-align": "middle",
          },
        }),
        presetUno(),
        presetTypography(),
      ],
      extractors: [extractorSplit, extractorPug()],
    }),
    viteSingleFile(),
    vue(),
  ],
})


