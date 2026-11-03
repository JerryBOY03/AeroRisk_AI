# GUÍA PASO A PASO — AERORISK AI

Estas instrucciones están pensadas para alguien que empieza con Visual Studio Code. **No tienes que escribir ni pegar el código**, porque todos los archivos del proyecto ya están creados dentro del ZIP.

---

## PASO 1 — Descargar y descomprimir el proyecto

1. Descarga el archivo `AeroRisk_AI.zip` que te han compartido.
2. En Windows, entra en **Descargas**.
3. Haz clic derecho en el ZIP y selecciona **Extraer todo...**.
4. Elige una ubicación sencilla; por ejemplo, **Escritorio**.
5. Al terminar, deberías ver una carpeta llamada `AeroRisk_AI`.
6. Ábrela y verifica que `index.html`, `styles.css` y `app.js` aparezcan directamente dentro. También verás las carpetas `assets`, `data`, `scripts` y `tests`.

**Atención:** no tienes que abrir el ZIP directamente con VS Code. Trabaja siempre desde la carpeta extraída.

## PASO 2 — Abrir el trabajo en Visual Studio Code

1. Abre **Visual Studio Code**.
2. En la esquina superior izquierda, entra a **Archivo > Abrir carpeta...** (`File > Open Folder`).
3. Busca la carpeta **AeroRisk_AI** que acabas de extraer y selecciónala.
4. Pulsa **Seleccionar carpeta**.
5. Si VS Code pregunta si confías en los autores de esta carpeta, revisa que sea tu proyecto y selecciona la opción de confiar.
6. A la izquierda aparecerá el explorador con los archivos. ¡Eso es todo! El proyecto ya está abierto.

**¿Dónde está cada parte?**

- `index.html` → estructura de la página, textos y secciones.
- `styles.css` → diseño azul aeronáutico, tarjetas, botones y adaptación móvil.
- `app.js` → lógica de simulación, actualización de probabilidades y recomendaciones.
- `assets/model.js` → coeficientes del modelo entrenado (no debes editarlos a mano).
- `data/vuelos_historicos.csv` → 20 registros del ejercicio.
- `scripts/entrenar_modelo.py` → código de entrenamiento con Scikit-Learn.

## PASO 3 — Ejecutar la página (la forma más sencilla)

1. Minimiza VS Code, pero **no cierres la carpeta**.
2. En el Explorador de archivos de Windows, abre `AeroRisk_AI`.
3. Haz doble clic en **`index.html`**.
4. Se abrirá la página en tu navegador predeterminado (Chrome o Edge, por ejemplo).
5. Ya verás el panel de AeroRisk AI y podrás usarlo. **No necesitas XAMPP, MySQL, Node.js, PHP ni un servidor.**

**Alternativa dentro de VS Code (opcional):**

1. En VS Code, haz clic en el icono **Extensiones** de la barra izquierda.
2. Busca **Live Server** (extensión gratuita de Ritwick Dey) y pulsa **Install / Instalar**.
3. Regresa al Explorador de VS Code.
4. Haz clic derecho sobre `index.html` y selecciona **Open with Live Server**.
5. Se abrirá una pestaña del navegador con una dirección local parecida a `http://127.0.0.1:5500/`. El número del puerto puede variar.

## PASO 4 — Probar que el simulador funciona

1. En el menú de AeroRisk AI, entra a **Simulador de vuelo**.
2. Pulsa **Vuelo A**. Debes observar aproximadamente **1.46%** de probabilidad estimada.
3. Pulsa **Vuelo B**. Debes observar aproximadamente **90.42%** y riesgo elevado.
4. Sin cambiar el vuelo B, busca **Estado de mantenimiento** y selecciona **Al día (1)**.
5. La probabilidad debe cambiar a aproximadamente **37.24%**. Esto demuestra que el simulador responde a tus cambios.
6. Pulsa **Vuelo C**. Debes observar aproximadamente **14.77%**.
7. Prueba mover los controles de antigüedad y horas de vuelo: el porcentaje cambia al instante.
8. Desplázate hasta **Comparación de vuelos**, **Factores predictivos** y **Dataset histórico** para ver los gráficos y la tabla.

**Importante:** los datos son ficticios y no sirven para decisiones reales de aviación.

## PASO 5 — Crear una cuenta en GitHub (si aún no tienes)

1. En Chrome o Edge, entra a `https://github.com/`.
2. Pulsa **Sign up / Registrarse** y crea una cuenta gratuita.
3. Verifica tu correo electrónico si GitHub lo solicita.
4. Inicia sesión.

## PASO 6 — Crear el repositorio público del proyecto

1. Dentro de GitHub, busca el botón **+** (parte superior) y pulsa **New repository / Nuevo repositorio**.
2. En **Repository name**, escribe `AeroRisk_AI`.
3. En **Description** (opcional) escribe: `Simulador académico de riesgo aéreo con regresión logística y Scikit-Learn`.
4. Marca **Public** para que tu profesor pueda revisar el código sin iniciar sesión.
5. Si GitHub ofrece crear un README automáticamente, **déjalo sin marcar**: tu carpeta ya tiene `README.md`.
6. Haz clic en **Create repository**.
7. Se abrirá una página para subir el proyecto.

## PASO 7 — Subir los archivos a GitHub

1. En el repositorio vacío, pulsa **uploading an existing file**. Si el repositorio no está vacío, usa **Add file > Upload files**.
2. En el Explorador de archivos de Windows, abre la carpeta descomprimida `AeroRisk_AI`.
3. **Selecciona el contenido de la carpeta**, NO únicamente el ZIP: `index.html`, `styles.css`, `app.js`, `README.md`, `GUIA_PASO_A_PASO.md`, `LEEME_PRIMERO.txt`, `.gitignore` (si aparece) y las carpetas `assets`, `data`, `scripts` y `tests`.
4. Arrástralos al área de carga de GitHub. Revisa que se conserve la estructura de carpetas. Si tu navegador no acepta alguna carpeta, abre la carpeta y agrégala mediante la interfaz de GitHub conservando su ruta, o usa GitHub Desktop gratis.
5. Desplázate hacia abajo; en **Commit changes**, escribe `Subir simulador AeroRisk AI`.
6. Pulsa **Commit changes** para guardar.
7. Verifica que en la página principal del repositorio aparezca **`index.html` al mismo nivel que `app.js` y `styles.css`**. Esto es fundamental para Vercel.
8. Copia la URL de tu repositorio para la entrega. Tendrá una estructura parecida a `https://github.com/TU_USUARIO/AeroRisk_AI` (reemplaza TU_USUARIO por el nombre real de tu cuenta).

## PASO 8 — Crear cuenta gratuita en Vercel

1. Abre `https://vercel.com/`.
2. Pulsa **Sign Up**.
3. Selecciona la opción de continuar con **GitHub**.
4. Autoriza la conexión con tu cuenta de GitHub cuando Vercel la solicite.
5. Selecciona el plan gratuito personal / Hobby si te presenta opciones.

## PASO 9 — Publicar el simulador en Vercel

1. Dentro de Vercel, busca **Add New > Project** o **New Project** (la etiqueta puede cambiar ligeramente).
2. En la sección **Import Git Repository**, encuentra `AeroRisk_AI` y selecciona **Import**.
3. En la configuración del proyecto, usa estos valores:
   - **Framework Preset:** `Other` (no es React ni Next.js).
   - **Root Directory:** la raíz del repositorio, es decir, `./`.
   - **Build Command:** ninguno / dejar en blanco si permite desactivarlo.
   - **Output Directory:** el predeterminado para un sitio estático sin compilación; no selecciones una subcarpeta.
4. Pulsa **Deploy**.
5. Al finalizar, Vercel te mostrará un botón para **Visit** y una dirección pública terminada en **`.vercel.app`**.
6. Pulsa la dirección y verifica que funciona la página.
7. Prueba los vuelos A, B y C otra vez; si aparecen sus porcentajes, tu web está correctamente publicada.
8. Copia ese enlace público para entregarlo al profesor.

**Importante:** no hay un enlace de Vercel listo antes de efectuar estos pasos en tu propia cuenta. El nombre exacto lo asigna Vercel al crear el despliegue.

## PASO 10 — Entregar el trabajo

Presenta **dos enlaces**:

- **Repositorio GitHub:** donde el profesor puede revisar el código fuente y el script de entrenamiento.
- **Sitio Vercel:** donde el profesor puede usar el simulador directamente en el navegador.

Puedes acompañarlos con esta explicación:

> AeroRisk AI es un prototipo web interactivo que reproduce un modelo de regresión logística entrenado con Scikit-Learn a partir de 20 vuelos ficticios. Permite modificar antigüedad del avión, clima, horas de vuelo y mantenimiento; calcula probabilidades estimadas, muestra indicadores visuales y ofrece recomendaciones empresariales orientativas. Se presenta únicamente como ejercicio académico.

## PASO 11 — Si el profesor pregunta cómo se entrenó el modelo

1. En VS Code, abre la carpeta `scripts`.
2. Haz clic en `entrenar_modelo.py`.
3. Explica que el archivo lee `data/vuelos_historicos.csv`.
4. Muestra `StandardScaler()` (normalización de variables) y `LogisticRegression()` (entrenamiento).
5. Muestra `pipeline.fit(X, y)` (entrena el modelo).
6. Explica que el script exporta coeficientes a `assets/model.js`, que usa `app.js` en el navegador para calcular resultados.
7. Muestra que la web funciona sin Python después de haber exportado los parámetros.

**Opcional: volver a entrenar en tu computadora.** Solo si el profesor exige ejecutar el script, instala Python gratuitamente desde `https://www.python.org/downloads/` y verifica en la terminal de VS Code con `py --version`. Luego pega uno por uno:

```powershell
py -m pip install -r scripts/requirements.txt
py scripts/entrenar_modelo.py
py tests/comprobar_modelo.py
```

Si esos comandos funcionan, volverás a generar `assets/model.js` y `assets/model.json`. Si el entrenamiento se ejecuta después de haber subido los archivos, tendrías que volver a subir los dos archivos generados para actualizar Vercel.

## Problemas frecuentes

**Me aparece una carpeta vacía en VS Code.** Cierra esa carpeta y abre exactamente la carpeta descomprimida `AeroRisk_AI`, no el ZIP.

**La página aparece sin estilos.** Revisa que `styles.css` esté al lado de `index.html`.

**Los porcentajes no aparecen.** Revisa que la carpeta `assets` y el archivo `assets/model.js` no se hayan borrado o movido.

**GitHub muestra código pero Vercel dice 404.** Revisa en GitHub que `index.html` esté en la raíz del repositorio, no dentro de otra carpeta `AeroRisk_AI`.

**Vercel no ve el repositorio.** En Vercel, revisa las opciones de acceso a repositorios de GitHub y autoriza `AeroRisk_AI` si se solicita.

**No tengo dinero para pagar programas.** VS Code, GitHub (para este uso), Python, Live Server y el plan personal Hobby de Vercel disponen de opciones gratuitas. Este proyecto no requiere una base de datos, suscripción de API ni servicio de inteligencia artificial de pago.
