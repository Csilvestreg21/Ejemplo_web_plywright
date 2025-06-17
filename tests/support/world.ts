import { setWorldConstructor, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';


export class CustomWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  constructor(options: IWorldOptions) {
    // puedes guardar opciones si las necesitas
  }

  async init() {
    try {
      this.browser = await chromium.launch({ headless: false });
      this.context = await this.browser.newContext();
      this.page = await this.context.newPage();
    } catch (err) {
      console.error("Error al iniciar navegador:", err);
      throw err; // así se captura correctamente en el hook
    }
  }
  

  async close() {
    if (this.page) {
      await this.page.close();
    }
  
    if (this.context) {
      await this.context.close();
    }
  
    if (this.browser) {
      await this.browser.close();
    }
  }
  
}

setWorldConstructor(CustomWorld);
