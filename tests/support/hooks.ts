import { Before, After } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';

Before(async function () {
  // Crea un contexto persistente con permisos y geolocalización
  this.context = await chromium.launchPersistentContext('', {
    headless: false, // Cambia a true si no quieres ver el navegador
    permissions: ['geolocation'],
    geolocation: { latitude: 4.6097, longitude: -74.0817 }, // Bogotá
    locale: 'es-CO',
  });

  // Usa la primera pestaña que se abre automáticamente
  this.page = this.context.pages()[0];

  // Si la página aún no está cargada, espera
  if (!this.page) {
    this.page = await this.context.newPage();
  }
});

After(async function () {
  // Cierra la página actual si está abierta
  if (this.page && !this.page.isClosed()) {
    await this.page.close();
  }

  // Cierra el contexto del navegador
  await this.context.close();
});
