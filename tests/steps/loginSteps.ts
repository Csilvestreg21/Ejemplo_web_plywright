import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

Given('que estoy en la página de login', async function () {
  await this.page.goto('https://suredappqa.matrixtech.com.co/');
});

When('ingreso el usuario {string} y la contraseña {string}', async function (usuario: string, contraseña: string) {
    await this.page.locator('input[name="fechaNacimiento"]').first().fill(usuario);
    await this.page.locator('input[type="password"]').first().fill(contraseña);
  });

When('doy clic en el botón de login', async function () {
    await this.page.getByRole('button', { name: 'Ingresar' }).click();
});

Then('debo ver el mensaje {string}', async function (mensajeEsperado: string) {
    const popup = this.page.locator('.mbsc-align-center div', {
      hasText: 'Antes de ingresar validaremos tu número de celular'
    }).first();
  
    await popup.waitFor({ state: 'visible', timeout: 15000 });
  
    const textoReal = await popup.textContent();
    expect(textoReal?.replace(/\s+/g, ' ').trim()).toContain(mensajeEsperado.replace(/\s+/g, ' ').trim());
  });
  