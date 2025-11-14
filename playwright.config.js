import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', 
  
  // Onde salvar os relatórios
  outputDir: 'playwright-report',

  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
  },

  // Configurações para rodar no CI (GitHub Actions)
  webServer: {
    // Comando para ligar o PWA e a API
    command: 'docker compose up --build', 
    url: 'http://localhost:8080',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});