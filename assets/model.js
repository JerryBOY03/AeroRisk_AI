/* Modelo entrenado con Scikit-Learn. Generado desde scripts/entrenar_modelo.py */
window.AERORISK_MODEL = {
  "nombre": "Regresion logistica / Riesgo aereo - DEMOSTRACION",
  "modelo": "sklearn.linear_model.LogisticRegression",
  "n_registros": 20,
  "n_accidentes": 8,
  "n_sin_accidentes": 12,
  "columnas": [
    "antiguedad_avion",
    "clima",
    "horas_vuelo",
    "mantenimiento"
  ],
  "mean": [
    12.0,
    0.55,
    12475.0,
    0.6
  ],
  "scale": [
    7.355270219373317,
    0.49749371855331,
    8568.889951446454,
    0.48989794855663565
  ],
  "coef": [
    0.7011251369812492,
    0.408210416639991,
    0.7055901275947581,
    -1.3551459039205027
  ],
  "intercept": -0.9761971813779455,
  "metricas": {
    "metodo": "Leave-One-Out (20 entrenamientos, solo para demostracion)",
    "accuracy_loo": 1.0,
    "matriz_confusion": [
      [
        12,
        0
      ],
      [
        0,
        8
      ]
    ],
    "advertencia": "Muestra ficticia diminuta. Esta evaluacion no valida su uso en aviacion real."
  },
  "escenarios": {
    "A": 0.014582517958442948,
    "B": 0.904159534619593,
    "C": 0.1477268641895516,
    "B_con_mantenimiento": 0.37241760229448173
  },
  "vuelos": [
    {
      "antiguedad_avion": 2,
      "clima": 0,
      "horas_vuelo": 1500,
      "mantenimiento": 1,
      "accidente": 0
    },
    {
      "antiguedad_avion": 5,
      "clima": 0,
      "horas_vuelo": 4200,
      "mantenimiento": 1,
      "accidente": 0
    },
    {
      "antiguedad_avion": 12,
      "clima": 1,
      "horas_vuelo": 12000,
      "mantenimiento": 1,
      "accidente": 0
    },
    {
      "antiguedad_avion": 18,
      "clima": 1,
      "horas_vuelo": 18000,
      "mantenimiento": 0,
      "accidente": 1
    },
    {
      "antiguedad_avion": 3,
      "clima": 0,
      "horas_vuelo": 2500,
      "mantenimiento": 1,
      "accidente": 0
    },
    {
      "antiguedad_avion": 20,
      "clima": 1,
      "horas_vuelo": 22000,
      "mantenimiento": 0,
      "accidente": 1
    },
    {
      "antiguedad_avion": 8,
      "clima": 0,
      "horas_vuelo": 7500,
      "mantenimiento": 1,
      "accidente": 0
    },
    {
      "antiguedad_avion": 15,
      "clima": 1,
      "horas_vuelo": 16000,
      "mantenimiento": 0,
      "accidente": 1
    },
    {
      "antiguedad_avion": 1,
      "clima": 0,
      "horas_vuelo": 800,
      "mantenimiento": 1,
      "accidente": 0
    },
    {
      "antiguedad_avion": 22,
      "clima": 1,
      "horas_vuelo": 25000,
      "mantenimiento": 0,
      "accidente": 1
    },
    {
      "antiguedad_avion": 6,
      "clima": 0,
      "horas_vuelo": 5500,
      "mantenimiento": 1,
      "accidente": 0
    },
    {
      "antiguedad_avion": 10,
      "clima": 1,
      "horas_vuelo": 10000,
      "mantenimiento": 1,
      "accidente": 0
    },
    {
      "antiguedad_avion": 17,
      "clima": 1,
      "horas_vuelo": 17500,
      "mantenimiento": 0,
      "accidente": 1
    },
    {
      "antiguedad_avion": 4,
      "clima": 0,
      "horas_vuelo": 3000,
      "mantenimiento": 1,
      "accidente": 0
    },
    {
      "antiguedad_avion": 25,
      "clima": 1,
      "horas_vuelo": 28000,
      "mantenimiento": 0,
      "accidente": 1
    },
    {
      "antiguedad_avion": 9,
      "clima": 0,
      "horas_vuelo": 8500,
      "mantenimiento": 1,
      "accidente": 0
    },
    {
      "antiguedad_avion": 14,
      "clima": 1,
      "horas_vuelo": 14500,
      "mantenimiento": 1,
      "accidente": 0
    },
    {
      "antiguedad_avion": 19,
      "clima": 1,
      "horas_vuelo": 21000,
      "mantenimiento": 0,
      "accidente": 1
    },
    {
      "antiguedad_avion": 7,
      "clima": 0,
      "horas_vuelo": 6000,
      "mantenimiento": 1,
      "accidente": 0
    },
    {
      "antiguedad_avion": 23,
      "clima": 1,
      "horas_vuelo": 26000,
      "mantenimiento": 0,
      "accidente": 1
    }
  ],
  "limitacion": "Solo ejercicio academico: los porcentajes NO son probabilidades reales ni validadas."
};
