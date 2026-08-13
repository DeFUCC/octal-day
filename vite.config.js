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
    vue(),
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
    viteBuildScript(),
  ],
})


function viteBuildScript() {
  return {
    name: 'vite-build-script',
    transformIndexHtml(html) {
      if (process.env.NODE_ENV === 'production') {
        return html.replace(`</head>`, `
  <script async defer src="https://stat.defucc.me/script.js" data-website-id="fb2b2b19-8560-436e-b301-81b06554ed38"></script>
          
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
  </script>
</head>`);
      }
      return html;
    },
  };
}