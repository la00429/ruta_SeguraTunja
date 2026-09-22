# Informe: configuración e instalación de Ruta Segura Tunja

## Parte A. Propiedades del `manifest.json`

La aplicación publicada en [Ruta Segura Tunja](https://la00429.github.io/ruta_SeguraTunja/) utiliza un Web App Manifest para describir su instalación como PWA.

| Propiedad | Aplicación en el proyecto | Qué demuestra |
| --- | --- | --- |
| `name` | `Ruta Segura Tunja` | Nombre completo mostrado durante la instalación. |
| `short_name` | `Ruta Segura` | Nombre corto para el acceso directo. |
| `description` | Consulta lugares de interés en Tunja, incluso sin conexión. | Descripción de la aplicación. |
| `lang` y `dir` | `es` y `ltr` | Idioma español y dirección de lectura izquierda a derecha. |
| `id` | `./` | Identidad estable de la aplicación instalada. |
| `start_url` | `./index.html` | Documento que se abre desde el acceso instalado. |
| `scope` | `./` | Rutas que pertenecen a la aplicación. |
| `display` | `standalone` | Abre la PWA como aplicación, sin la barra normal del navegador. |
| `orientation` | `portrait-primary` | Orientación inicial adecuada para un dispositivo móvil. |
| `background_color` | `#f7f4ed` | Color de fondo durante la carga. |
| `theme_color` | `#0f4c5c` | Color de la interfaz del navegador y de la aplicación. |
| `icons` | `./img/icon.svg` | Ícono utilizado por el navegador y el acceso directo. |
| `shortcuts` | `Abrir chat` | Acceso rápido desde el menú del ícono instalado. |
| `prefer_related_applications` | `false` | Indica que se prefiere instalar esta PWA y no una aplicación relacionada. |

Además, `index.html` incluye las etiquetas `apple-mobile-web-app-*` y `apple-touch-icon`. Estas son necesarias porque Safari en iOS no depende completamente del Web App Manifest para la instalación en la pantalla de inicio.

## Evidencia de la Parte A

La captura `Captura de pantalla 2026-09-21 173030.png` evidencia que:

1. La aplicación se sirve mediante HTTPS desde GitHub Pages.
2. Chrome reconoce la aplicación como instalable y muestra el botón **Instalar**.
3. La interfaz cargada corresponde a `Ruta Segura Tunja`.

Para completar la evidencia del manifiesto, abrir la aplicación en Chrome de escritorio y seguir estos pasos:

1. Abrir DevTools con `F12`.
2. Entrar a **Application > Manifest**.
3. Capturar la sección donde aparecen el nombre, el ícono, los colores, `display: standalone` y el botón **Add to home screen** o **Instalar**.
4. Entrar a **Application > Service Workers** y capturar el Service Worker activo.
5. Instalar la aplicación y capturar la ventana abierta sin la barra normal del navegador.

## Instalación en Android o Chrome de escritorio

1. Abrir la URL publicada usando HTTPS.
2. Esperar a que cargue la aplicación.
3. Seleccionar **Instalar** en la barra de direcciones o en el menú del navegador.
4. Confirmar la instalación.
5. Abrir `Ruta Segura` desde el menú de aplicaciones o desde el acceso directo.

La captura existente demuestra el paso 3. Para la entrega, se recomienda anexar también una captura del diálogo de confirmación y otra de la aplicación ya abierta como ventana independiente.

## Parte C. Instalación de una PWA en iOS

En iPhone y iPad el procedimiento se realiza desde **Safari**. Chrome para iOS no ofrece el mismo flujo de instalación de PWA que Safari.

1. Abrir la URL publicada en Safari.
2. Pulsar el botón **Compartir**.
3. Desplazarse por las opciones y elegir **Añadir a pantalla de inicio**.
4. Revisar el nombre `Ruta Segura` y pulsar **Añadir**.
5. Abrir el nuevo ícono desde la pantalla de inicio.
6. Verificar que la aplicación se abre con apariencia independiente y que conserva sus recursos disponibles sin conexión después de haberlos cargado.

### Evidencia solicitada para iOS

Como el equipo no dispone de un iPhone, no se debe presentar una captura simulada como si fuera evidencia real. El informe puede incluir el procedimiento anterior y dejar la evidencia marcada así:

> **Evidencia iOS pendiente:** requiere un iPhone o iPad físico. Capturar Safari con el menú Compartir abierto, la opción **Añadir a pantalla de inicio** y la aplicación abierta desde el nuevo ícono.

[Appetize.io](https://appetize.io/apps?platform=ios) permite probar aplicaciones nativas dentro de un simulador, pero no reproduce necesariamente Safari ni el flujo real de una PWA añadida a la pantalla de inicio. Por eso no se considera evidencia suficiente para este paso.

## Conclusión

El manifiesto configura la identidad, apariencia, alcance, orientación, íconos y accesos rápidos de la PWA. La evidencia disponible confirma que Chrome detecta la aplicación como instalable. La instalación en iOS debe documentarse desde Safari en un dispositivo Apple, porque ese flujo depende del sistema operativo y no puede demostrarse fielmente con Appetize.io.