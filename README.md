Para automatizar el frontend (aplicativo visual/web) con Playwright, TypeScript y Cucumber, debes estructurar tu proyecto con lo siguiente:

✅ 1. Estructura básica del proyecto
pgsql
Copiar
Editar
📦 tu-proyecto/
├── 📁 tests/
│   ├── 📁 features/
│   │   └── login.feature
│   ├── 📁 steps/
│   │   └── loginSteps.ts
│   └── 📁 support/
│       ├── hooks.ts
│       └── world.ts
├── playwright.config.ts
├── cucumber.js
├── package.json
└── tsconfig.json
✅ 2. Instala dependencias necesarias
bash
Copiar
Editar
npm init -y
npm install -D typescript ts-node @playwright/test @cucumber/cucumber @cucumber/pretty-formatter
npm install -D playwright
Opcional (si necesitas generar HTML reportes o usar allure):

bash
Copiar
Editar
npm install -D cucumber-html-reporter
✅ 3. Configura cucumber.js
js
Copiar
Editar
// cucumber.js
module.exports = {
  default: {
    require: ["tests/steps/**/*.ts", "tests/support/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: ["pretty", "@cucumber/pretty-formatter"],
    paths: ["tests/features/**/*.feature"],
    publishQuiet: true
  }
};
✅ 4. login.feature de ejemplo
gherkin
Copiar
Editar
Feature: Login de usuario

  Scenario: Acceder con credenciales válidas
    Given que estoy en la página de login
    When ingreso el usuario "admin" y la contraseña "admin123"
    And doy clic en el botón de login
    Then debo ver el mensaje "Bienvenido, admin"
✅ 5. loginSteps.ts
ts
Copiar
Editar
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from '../support/world';

Given('que estoy en la página de login', async function () {
  await page.goto('https://tusitio.com/login');
});

When('ingreso el usuario {string} y la contraseña {string}', async function (usuario: string, contraseña: string) {
  await page.fill('input[name="username"]', usuario);
  await page.fill('input[name="password"]', contraseña);
});

When('doy clic en el botón de login', async function () {
  await page.click('button[type="submit"]');
});

Then('debo ver el mensaje {string}', async function (mensajeEsperado: string) {
  const mensaje = await page.textContent('.mensaje-bienvenida');
  expect(mensaje).toContain(mensajeEsperado);
});
✅ 6. world.ts para mantener el contexto de page
ts
Copiar
Editar
import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';

class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  constructor(options: any) {
    super(options);
  }

  async init() {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async close() {
    await this.page.close();
    await this.context.close();
    await this.browser.close();
  }
}

export let page: Page;

setWorldConstructor(CustomWorld);

// Hook para inicializar y cerrar navegador
import { Before, After } from '@cucumber/cucumber';

Before(async function (this: CustomWorld) {
  await this.init();
  page = this.page;
});

After(async function (this: CustomWorld) {
  await this.close();
});
✅ 7. Ejecutar pruebas
bash
Copiar
Editar
npx cucumber-js
🔁 Tip adicional: usar selectores confiables
Usa [data-testid="..."] en tu frontend para que tus tests sean más robustos y no dependan de clases CSS que cambian.