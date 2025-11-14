import { test, expect } from '@playwright/test';

test('PWA carrega, consome API interna e busca CEP', async ({ page }) => {
  
  // 1. Vai para o local certo, sendo - http://localhost:8080
  await page.goto('/');

  // 2. Verifica se o título da página está correto
  await expect(page).toHaveTitle(/PWA Consulta CEP/);

  // 3. Verifica se a API interna (backend) respondeu
  const apiStatus = page.locator('#api-status');
  await expect(apiStatus).toContainText('API está funcionando!', { timeout: 10000 });

  // 4. Testa o fluxo principal: buscar um CEP (Via API Pública)
  
  await page.locator('#cep-input').fill('01001000');
  
  await page.locator('#search-btn').click();

  // 5. Verifica se o resultado correto apareceu na tela
  const resultDiv = page.locator('#result');
  await expect(resultDiv).toContainText('Praça da Sé', { timeout: 5000 });
});