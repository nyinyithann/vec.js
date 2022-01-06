import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

export default [
  {
    input: "src/index.js",
    output: {
      file: "build/cjs/vec.js",
      format: "cjs",
    },
    plugins: [resolve(), commonjs(), babel({ babelHelpers: "bundled" })],
  },
  {
    input: "src/index.js",
    output: {
      file: "build/umd/vec.js",
      format: "umd",
      name: "vec",
    },
    plugins: [resolve(), commonjs(), babel({ babelHelpers: "bundled" })],
  },
  {
    input: "src/index.js",
    output: {
      file: "build/umd/vec.min.js",
      format: "umd",
      name: "vec",
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({ babelHelpers: "bundled" }),
      terser(),
    ],
  },
  {
    input: "src/index.js",
    output: {
      file: "build/esm/vec.js",
      format: "esm",
    },
    plugins: [resolve(), commonjs(), babel({ babelHelpers: "bundled" })],
  },
];
