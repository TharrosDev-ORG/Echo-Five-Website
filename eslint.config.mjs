import next from "eslint-config-next";

/** Flat config — eslint-config-next v16 ships native flat config arrays. */
const eslintConfig = [
  ...next,
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
