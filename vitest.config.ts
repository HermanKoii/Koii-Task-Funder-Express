import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: [
      'src/**/*.test.{js,ts}',
      'tests/**/*.test.{js,ts}'
    ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**'
    ]
  }
});