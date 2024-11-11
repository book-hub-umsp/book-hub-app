module.exports = {
  '*.{ts,tsx}': (files) =>
    `nx affected --target=typecheck --files=${files.join(',')}`,
  '*.*': (files) => `biome check --write ${files.join(' ')}`,
}
