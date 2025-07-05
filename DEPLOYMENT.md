# 🚀 Guía Completa de Despliegue

## 📱 Para usar en tu celular

### Opción 1: PWA (Recomendada)
1. **Despliega en Vercel/Netlify** (gratis)
2. **Abre la URL en tu móvil**
3. **Instala como app**:
   - **Android**: Toca "Agregar a pantalla de inicio"
   - **iOS**: Toca "Compartir" → "Agregar a pantalla de inicio"

### Opción 2: Desarrollo local
\`\`\`bash
# En tu PC
npm install
npm run dev

# En tu móvil (misma red WiFi)
# Abre: http://[IP-DE-TU-PC]:3000
\`\`\`

## 💻 Para usar en tu PC

### Como aplicación web
1. Abre en tu navegador favorito
2. Presiona `Ctrl+Shift+A` (Chrome) para instalar
3. Se creará un acceso directo en tu escritorio

### Como aplicación de escritorio
\`\`\`bash
# Instalar Electron (opcional)
npm install -g electron
npm run build
electron .
\`\`\`

## 🌐 Despliegue en Producción

### 1. Vercel (Más fácil)
\`\`\`bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Tu app estará en: https://tu-app.vercel.app
\`\`\`

### 2. Netlify
\`\`\`bash
# Construir
npm run build

# Subir carpeta 'out' a Netlify
# O conectar tu repositorio GitHub
\`\`\`

### 3. GitHub Pages
\`\`\`bash
# En package.json, agregar:
"homepage": "https://tu-usuario.github.io/tu-repo"

# Construir y desplegar
npm run build
npm run export

# Subir carpeta 'out' a rama gh-pages
\`\`\`

### 4. Tu propio servidor
\`\`\`bash
# Construir
npm run build

# Subir carpeta 'out' a tu servidor web
# Configurar servidor para servir archivos estáticos
\`\`\`

## 📲 Configuración PWA

### Iconos necesarios (crear en /public/)
- `icon-72x72.png`
- `icon-96x96.png`
- `icon-128x128.png`
- `icon-144x144.png`
- `icon-152x152.png`
- `icon-192x192.png`
- `icon-384x384.png`
- `icon-512x512.png`

### Generar iconos automáticamente
\`\`\`bash
# Usar herramienta online:
# https://realfavicongenerator.net/
# O https://www.pwabuilder.com/imageGenerator
\`\`\`

## 🔧 Variables de Entorno

Crear archivo `.env.local`:
\`\`\`env
NEXT_PUBLIC_APP_NAME="CEO de Mi Vida"
NEXT_PUBLIC_APP_VERSION="1.0.0"
NEXT_PUBLIC_APP_URL="https://tu-dominio.com"
\`\`\`

## 📊 Analytics (Opcional)

### Google Analytics
\`\`\`tsx
// En app/layout.tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
\`\`\`

### Vercel Analytics
\`\`\`bash
npm install @vercel/analytics
\`\`\`

## 🚀 Optimizaciones de Rendimiento

### 1. Compresión de imágenes
\`\`\`bash
npm install next-optimized-images
\`\`\`

### 2. Bundle analyzer
\`\`\`bash
npm install @next/bundle-analyzer
\`\`\`

### 3. Lighthouse CI
\`\`\`bash
npm install -g @lhci/cli
lhci autorun
\`\`\`

## 🔒 HTTPS y Dominio Personalizado

### Vercel
1. Compra dominio en cualquier registrar
2. En Vercel → Settings → Domains
3. Agrega tu dominio
4. Configura DNS según instrucciones

### Netlify
1. En Netlify → Domain Settings
2. Agrega dominio personalizado
3. Configura DNS

## 📱 Pruebas en Dispositivos

### Android
\`\`\`bash
# Chrome DevTools
# Más herramientas → Remote devices
# Conecta tu Android por USB
\`\`\`

### iOS
\`\`\`bash
# Safari → Develop → [Tu iPhone]
# Requiere Mac y cable Lightning
\`\`\`

### Simuladores
- **Android Studio**: Emulador Android
- **Xcode**: Simulador iOS (solo Mac)

## 🎯 Checklist de Despliegue

- [ ] ✅ App funciona en desarrollo
- [ ] ✅ Build sin errores (`npm run build`)
- [ ] ✅ PWA configurada (manifest.json, SW)
- [ ] ✅ Iconos generados (todos los tamaños)
- [ ] ✅ Responsive en móvil y desktop
- [ ] ✅ Funciona offline
- [ ] ✅ Lighthouse score > 90
- [ ] ✅ Probado en Chrome, Firefox, Safari
- [ ] ✅ Instalable como PWA
- [ ] ✅ Dominio configurado (opcional)
- [ ] ✅ Analytics configurado (opcional)

## 🆘 Solución de Problemas

### Error: "Module not found"
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

### PWA no se instala
1. Verifica que tengas HTTPS
2. Revisa manifest.json
3. Confirma que service worker funcione

### App lenta en móvil
1. Optimiza imágenes
2. Reduce bundle size
3. Implementa lazy loading

### No funciona offline
1. Verifica service worker
2. Revisa cache strategy
3. Prueba en modo incógnito

---

## 🎉 ¡Listo!

Tu app **CEO de Mi Vida** estará disponible 24/7 en cualquier dispositivo. Los usuarios podrán:

- 📱 **Instalarla como app nativa**
- 💻 **Usarla en cualquier navegador**
- 🔄 **Sincronizar datos localmente**
- 📊 **Acceder sin internet**
- 🎯 **Disfrutar de todas las funcionalidades**

**¡Conviértete en el CEO de tu vida desde cualquier lugar! 🚀**
