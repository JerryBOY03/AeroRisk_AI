"""Entrena la regresion logistica y exporta el modelo a JavaScript.

Uso desde la carpeta principal:
    pip install -r scripts/requirements.txt
    python scripts/entrenar_modelo.py

El proyecto web no requiere Python para ejecutarse: el modelo ya viene entrenado.
"""
from pathlib import Path
import csv
import json
from datetime import date

import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix
from sklearn.model_selection import LeaveOneOut, cross_val_predict
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

BASE = Path(__file__).resolve().parent.parent
CSV_PATH = BASE / 'data' / 'vuelos_historicos.csv'
OUT_JS = BASE / 'assets' / 'model.js'
OUT_JSON = BASE / 'assets' / 'model.json'
CAMPOS = ['antiguedad_avion', 'clima', 'horas_vuelo', 'mantenimiento']

with CSV_PATH.open(encoding='utf-8-sig', newline='') as f:
    rows = list(csv.DictReader(f))

X = np.array([[float(row[key]) for key in CAMPOS] for row in rows], dtype=float)
y = np.array([int(row['accidente']) for row in rows], dtype=int)
assert len(X) == 20, 'El dataset debe tener 20 vuelos.'
assert set(y) == {0, 1}, 'El dataset requiere dos clases.'

pipeline = Pipeline([
    ('escalado', StandardScaler()),
    ('regresion', LogisticRegression(max_iter=1000, random_state=42)),
])

# Evaluacion ilustrativa: cada vuelo se predice con los otros 19 como entrenamiento.
prob_loo = cross_val_predict(pipeline, X, y, cv=LeaveOneOut(), method='predict_proba')[:, 1]
pred_loo = (prob_loo >= 0.5).astype(int)
accuracy_loo = accuracy_score(y, pred_loo)
matriz = confusion_matrix(y, pred_loo, labels=[0, 1]).tolist()

# Modelo final entrenado con TODOS los registros disponibles.
pipeline.fit(X, y)
scaler = pipeline.named_steps['escalado']
logistic = pipeline.named_steps['regresion']

scenarios = {
    'A': [3, 0, 2500, 1],
    'B': [18, 1, 20000, 0],
    'C': [12, 1, 12000, 1],
    'B_con_mantenimiento': [18, 1, 20000, 1],
}
preds = {name: float(pipeline.predict_proba(np.array([features]))[0, 1])
         for name, features in scenarios.items()}

payload = {
    'nombre': 'Regresion logistica / Riesgo aereo - DEMOSTRACION',
    'modelo': 'sklearn.linear_model.LogisticRegression',
    'n_registros': len(X),
    'n_accidentes': int(y.sum()),
    'n_sin_accidentes': int(len(y) - y.sum()),
    'columnas': CAMPOS,
    'mean': scaler.mean_.tolist(),
    'scale': scaler.scale_.tolist(),
    'coef': logistic.coef_[0].tolist(),
    'intercept': float(logistic.intercept_[0]),
    'metricas': {
        'metodo': 'Leave-One-Out (20 entrenamientos, solo para demostracion)',
        'accuracy_loo': float(accuracy_loo),
        'matriz_confusion': matriz,
        'advertencia': 'Muestra ficticia diminuta. Esta evaluacion no valida su uso en aviacion real.',
    },
    'escenarios': preds,
    'vuelos': [
        {field: int(row[field]) for field in CAMPOS + ['accidente']}
        for row in rows
    ],
    'limitacion': 'Solo ejercicio academico: los porcentajes NO son probabilidades reales ni validadas.',
}
json_text = json.dumps(payload, ensure_ascii=False, indent=2)
OUT_JSON.write_text(json_text + '\n', encoding='utf-8')
OUT_JS.write_text('/* Modelo entrenado con Scikit-Learn. Generado desde scripts/entrenar_modelo.py */\n'
                  + 'window.AERORISK_MODEL = ' + json_text + ';\n', encoding='utf-8')

print('Modelo generado correctamente en assets/model.js y assets/model.json')
print(f'Datos: {len(X)} registros, {sum(y)} accidentes.')
print(f'Validacion LOO: {accuracy_loo*100:.1f}% (solo dataset ficticio, no fiabilidad real)')
for name, p in preds.items():
    print(f'Vuelo {name}: {p*100:.2f}%')
