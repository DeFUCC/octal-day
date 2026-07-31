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
    viteBuildScript(),
    vue(),
  ],
})


function viteBuildScript() {
  return {
    name: 'vite-build-script',
    transformIndexHtml(html) {
      if (process.env.NODE_ENV === 'production') {
        return html.replace(/<!-- Stats production build insert -->/, `          
  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((registration) => {
            console.log('Service Worker registered with scope: ', registration.scope);
          })
          .catch((error) => {
            console.error('Service Worker registration failed: ', error);
          });
      });
    }
  </script>`);
      }
      return html;
    },
  };
}