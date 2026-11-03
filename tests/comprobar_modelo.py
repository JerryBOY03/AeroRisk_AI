"""Comprueba los pronosticos exportados sin instalar bibliotecas adicionales.
Ejecutar desde la raiz: python tests/comprobar_modelo.py
"""
from pathlib import Path
import json
import math

root = Path(__file__).resolve().parent.parent
m = json.loads((root / 'assets' / 'model.json').read_text(encoding='utf-8'))

def predict(features):
    z = m['intercept'] + sum(
        coef * ((value - mean) / scale)
        for value, mean, scale, coef in zip(features, m['mean'], m['scale'], m['coef'])
    )
    return 1 / (1 + math.exp(-z))

escenarios = {
    'A': [3, 0, 2500, 1],
    'B': [18, 1, 20000, 0],
    'C': [12, 1, 12000, 1],
    'B_con_mantenimiento': [18, 1, 20000, 1],
}
for nombre, datos in escenarios.items():
    obtenido = predict(datos)
    esperado = m['escenarios'][nombre]
    assert math.isclose(obtenido, esperado, abs_tol=1e-12), nombre
    print(f'{nombre}: {obtenido * 100:.2f}% OK')
print('OK: modelo exportado verificado.')
