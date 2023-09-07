import typescript from "@rollup/plugin-typescript";
import alias from "@rollup/plugin-alias";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import pkg from "./package.json" assert { type: "json" };

export default [
  {
    input: "tmp/index.js",
    external: Object.keys(pkg.dependencies),
    output: {
      dir: "dist/esm",
      format: "esm",
      exports: "named",
      sourcemap: true,
      // preserveModules: true,
    },
    plugins: [
      alias({
        entries: [
          { find: "@/", replacement: "./src/" },
        ]
      }),
      nodeResolve(),
      commonjs(),
      json(),
      typescript({
        // INFO: outDirを合わせないとエラーが出るので強制的に上書きする
        outDir: "dist/esm",
      }),
    ],
  },
  {
    input: "tmp/index.js",
    external: Object.keys(pkg.dependencies),
    output: {
      dir: "dist/cjs",
      format: "cjs",
      exports: "named",
      sourcemap: true,
      // preserveModules: true,
    },
    plugins: [
      alias({
        entries: [
          {find: "@/", replacement: "./src/"},
        ]
      }),
      nodeResolve(),
      commonjs(),
      json(),
      typescript({
        // INFO: outDirを合わせないとエラーが出るので強制的に上書きする
        outDir: "dist/cjs",
      }),
    ],
  }
]

