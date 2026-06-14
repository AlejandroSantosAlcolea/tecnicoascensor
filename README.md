# TécnicoAscensor 🔧

Blog de afiliados y guías técnicas sobre ascensores.

## Estructura del proyecto

```
tecnicoascensor/
├── index.html                              ← Página principal
├── css/
│   ├── styles.css                          ← Variables y reset global
│   ├── nav.css                             ← Navegación
│   └── blog.css                            ← Tarjetas de artículos
├── js/
│   ├── main.js                             ← Lógica general
│   ├── newsletter.js                       ← Formulario suscripción
│   └── affiliate.js                        ← ⚠️ Edita tu ID de Amazon aquí
├── blog/
│   ├── multimetros-tecnicos-ascensores.html
│   └── error-ecf-frenic-lift.html
├── pages/
│   ├── sobre-mi.html
│   ├── aviso-legal.html
│   └── privacidad.html
└── img/                                    ← Imágenes (vacío por ahora)
```

## Arrancar en local

1. Abre la carpeta en VS Code
2. Instala la extensión **Live Server** si no la tienes
3. Click derecho en `index.html` → **Open with Live Server**

## Antes de publicar

- [ ] Editar `js/affiliate.js` con tu ID real de Amazon
- [ ] Rellenar `pages/sobre-mi.html` con tu presentación
- [ ] Completar aviso legal y privacidad
- [ ] Redactar los artículos del blog
- [ ] Subir a GitHub y conectar con Netlify
- [ ] Apuntar dominio `tecnicoascensor.es`

## Deploy en Netlify

1. Sube la carpeta a un repositorio GitHub
2. netlify.com → **New site from Git**
3. Build command: (dejar vacío)
4. Publish directory: `/`
5. **Deploy site** ✓
