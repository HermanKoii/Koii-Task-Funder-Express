import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
<<<<<<< HEAD
    include: ['tests/**/*.test.ts'],
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
=======
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  }
>>>>>>> pr-7-HermanL0201-Koii-Task-Funder-Express
});