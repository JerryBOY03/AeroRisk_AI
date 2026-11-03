# AeroRisk AI — Simulador empresarial de riesgos aéreos

Prototipo web interactivo y **académico** que estima la probabilidad de la etiqueta `accidente` usando un modelo de regresión logística entrenado con los **20 vuelos ficticios** del enunciado. No sirve para tomar decisiones aeronáuticas reales.

## Inicio rápido (no necesitas instalar nada)

1. Descomprime el ZIP.
2. Abre la carpeta `AeroRisk_AI`.
3. Haz doble clic en **`index.html`**: se abrirá en Chrome, Edge u otro navegador.
4. Cambia edad, clima, horas de vuelo y mantenimiento. Las predicciones se actualizarán inmediatamente.

Puedes abrir toda la carpeta en **Visual Studio Code** usando `Archivo > Abrir carpeta` para ver y editar los archivos.

Para un servidor local opcional: instala la extensión gratuita **Live Server** en VS Code, haz clic derecho sobre `index.html` y elige **Open with Live Server**.

## Funcionalidades

- Formulario editable con rangos, números y botones de selección.
- Predicción probabilística en tiempo real con los parámetros **reales del modelo entrenado**.
- Panel de indicadores y anillo de probabilidad.
- Semáforo ilustrativo: bajo (<20%), moderado (20% a <50%) y elevado (≥50%).
- Recomendación empresarial contextual para fines demostrativos.
- Análisis contrafactual del estado de mantenimiento (cambio 0 ↔ 1).
- Tarjetas de comparación de vuelos A, B y C con carga directa al simulador.
- Gráfico de contribuciones de variables (escala de log-odds, no porcentajes).
- Tabla completa de los 20 registros, con descarga CSV.
- Diseño adaptable a escritorio, tablet y celular.

## Resultados con el modelo provisto

| Escenario | Antigüedad | Clima | Horas | Mantenimiento | Prob. accidente |
|---|---:|---:|---:|---:|---:|
| Vuelo A | 3 | 0 | 2,500 | 1 | **1.46%** |
| Vuelo B | 18 | 1 | 20,000 | 0 | **90.42%** |
| Vuelo C | 12 | 1 | 12,000 | 1 | **14.77%** |
| B con mantenimiento actualizado | 18 | 1 | 20,000 | 1 | **37.24%** |

**Efecto del mantenimiento en B:** el modelo reduce su estimación de 90.42% a 37.24%, equivalente a unos **53.17 puntos porcentuales**. Esto es una comparación de la simulación, **no una afirmación causal**.

## ¿Cómo se entrenó?

Se usó Python con Scikit-Learn:

```python
pipeline = Pipeline([
    ('escalado', StandardScaler()),
    ('regresion', LogisticRegression(max_iter=1000, random_state=42)),
])
pipeline.fit(X, y)
```

El script reproducible está en **`scripts/entrenar_modelo.py`** y lee **`data/vuelos_historicos.csv`**. Entrena el modelo usando los 20 registros disponibles y exporta los parámetros a `assets/model.js` y `assets/model.json`.

La web no usa una predicción inventada: realiza la misma operación matemática de `StandardScaler` y `LogisticRegression.predict_proba` en JavaScript:

1. Estandariza cada variable: `v_estandar = (v - promedio) / desviacion`.
2. Calcula `z = intercept + Σ(coef_i * v_estandar_i)`.
3. Calcula `p = 1 / (1 + exp(-z))`.

**No necesitas instalar Python para usar la web.** Si quieres volver a entrenar el modelo, de manera opcional, instala Python y ejecuta en la terminal de VS Code:

```bash
python -m pip install -r scripts/requirements.txt
python scripts/entrenar_modelo.py
python tests/comprobar_modelo.py
```

En Windows, si `python` no funciona, prueba `py` en los tres comandos.

## ¿Cómo se evaluó?

La validación ilustrativa **Leave-One-Out** obtuvo 20/20 aciertos sobre los 20 registros ficticios del ejercicio. **Este porcentaje no permite afirmar que el modelo sea preciso en la realidad**: es una muestra pequeña, sintética, con patrones muy marcados, sin calibración externa ni validación operacional. No se recomienda usarlo en seguridad crítica.

## Arquitectura del proyecto

```text
AeroRisk_AI/
├── index.html                   ← Página web y componentes
├── styles.css                   ← Diseño, colores y adaptación móvil
├── app.js                       ← Simulación, interacción y gráficos
├── assets/
│   ├── favicon.svg              ← Icono del navegador
│   ├── model.js                 ← Modelo preentrenado para el navegador
│   └── model.json               ← Parámetros y resultados del entrenamiento
├── data/
│   └── vuelos_historicos.csv    ← Los 20 registros de la captura
├── scripts/
│   ├── entrenar_modelo.py       ← Entrenamiento en Python/Scikit-Learn
│   └── requirements.txt         ← Dependencias opcionales para reentrenar
├── tests/
│   └── comprobar_modelo.py      ← Verificación de los resultados exportados
├── GUIA_PASO_A_PASO.md          ← Instrucciones completas para principiantes
└── LEEME_PRIMERO.txt            ← Resumen de uso
```

## Publicación gratuita

Está diseñado como sitio estático, sin backend ni base de datos, apto para **Vercel** y **GitHub Pages**. Debes crear el repositorio en tu cuenta de GitHub y conectarlo con Vercel; la guía detallada está en `GUIA_PASO_A_PASO.md`.

> Nota de seguridad: este ejercicio **no** estima el riesgo real de la aviación comercial. Los límites de riesgo son ilustrativos, no estándares aeronáuticos. Las recomendaciones no son autorizaciones de vuelo ni sustituyen a profesionales certificados.
