export type CardLayer = {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex?: number;
  order?: number;
  nodeId?: string;
};

// Approved prototype: 996 x 283 Figma coordinates, including PNG padding.
export const cardLayers: Record<string, CardLayer[]> = {
  "nr-10": [
    {
      "src": "nr10-telas1.png",
      "x": 703,
      "y": 14,
      "width": 288,
      "height": 271
    },
    {
      "src": "nr10-telas2.png",
      "x": 697,
      "y": 34,
      "width": 199,
      "height": 261
    },
    {
      "src": "nr10-telas3.png",
      "x": 602,
      "y": 124,
      "width": 178,
      "height": 161
    }
  ],
  "habilita": [
    {
      "src": "tela-habilita1.png",
      "x": 625.8965,
      "y": -68.104,
      "width": 389.8613,
      "height": 325.824,
      "zIndex": 3,
      "order": 0,
      "nodeId": "115:341"
    },
    {
      "src": "tela-habilita2.png",
      "x": 508.8945,
      "y": 42.8957,
      "width": 389.875,
      "height": 325.8814,
      "zIndex": 2,
      "order": 1,
      "nodeId": "115:340"
    },
    {
      "src": "tela-habilita3.png",
      "x": 698.8477,
      "y": 8.8466,
      "width": 458.834,
      "height": 422.5018,
      "zIndex": 1,
      "order": 2,
      "nodeId": "115:339"
    }
  ],
  "ava-senai": [
    {
      "src": "telas1.png",
      "x": 623.9043,
      "y": -15.5179,
      "width": 424.8972,
      "height": 554.0007,
      "zIndex": 1,
      "order": 0,
      "nodeId": "115:1057"
    },
    {
      "src": "telas2.png",
      "x": 487,
      "y": 143.1348,
      "width": 356.0945,
      "height": 434.8314,
      "zIndex": 2,
      "order": 1,
      "nodeId": "115:1064"
    },
    {
      "src": "telas3.png",
      "x": 740.2988,
      "y": -210,
      "width": 424.8987,
      "height": 554.0028,
      "zIndex": 3,
      "order": 2,
      "nodeId": "115:1069"
    }
  ],
  "e-commerce": [
    {
      "src": "ecommerce1.png",
      "x": 632,
      "y": 34,
      "width": 283,
      "height": 228,
      "zIndex": 3,
      "order": 0,
      "nodeId": "115:3149"
    },
    {
      "src": "ecommerce2.png",
      "x": 497.959,
      "y": 106.4991,
      "width": 312.0352,
      "height": 278.1014,
      "zIndex": 2,
      "order": 1,
      "nodeId": "115:3150"
    },
    {
      "src": "ecommerce3.png",
      "x": 738.2773,
      "y": 106.5002,
      "width": 312.0332,
      "height": 278.1001,
      "zIndex": 1,
      "order": 2,
      "nodeId": "115:3152"
    }
  ],
  "seif": [
    {
      "src": "seif-celulares1.png",
      "x": 739.8027,
      "y": 53,
      "width": 355.082,
      "height": 314.564,
      "zIndex": 2,
      "order": 0,
      "nodeId": "115:3141"
    },
    {
      "src": "seif-tela2.png",
      "x": 511.3418,
      "y": 28,
      "width": 442.3164,
      "height": 334.2307,
      "zIndex": 1,
      "order": 1,
      "nodeId": "115:3139"
    }
  ],
  "saep-ia": [
    {
      "src": "saep1.png",
      "x": 457.3477,
      "y": 8.2,
      "width": 489.2363,
      "height": 317.6001,
      "zIndex": 2,
      "order": 0,
      "nodeId": "116:3160"
    },
    {
      "src": "saep2.png",
      "x": 648,
      "y": 100,
      "width": 453.7031,
      "height": 282,
      "zIndex": 3,
      "order": 1,
      "nodeId": "116:3162"
    },
    {
      "src": "saep3.png",
      "x": 599.748,
      "y": -80.3999,
      "width": 485.8008,
      "height": 313.7998,
      "zIndex": 1,
      "order": 2,
      "nodeId": "116:3161"
    }
  ],
  "devstart": [
    {
      "src": "devstart1.png",
      "x": 639.5469,
      "y": 2.5457,
      "width": 385.1738,
      "height": 293.4294,
      "zIndex": 2,
      "order": 0,
      "nodeId": "116:4010"
    },
    {
      "src": "devstart-icone2.png",
      "x": 554,
      "y": 78.9998,
      "width": 272.3984,
      "height": 263.1758,
      "zIndex": 1,
      "order": 1,
      "nodeId": "116:4456"
    },
    {
      "src": "devstart3.png",
      "x": 742,
      "y": 88.9998,
      "width": 337.9902,
      "height": 266.9947,
      "zIndex": 3,
      "order": 2,
      "nodeId": "116:4277"
    }
  ],
  "crm": [
    {
      "src": "CRM + SGN1.png",
      "x": 687.2617,
      "y": 70.7737,
      "width": 360.3184,
      "height": 284.645,
      "zIndex": 3,
      "order": 0,
      "nodeId": "116:4646"
    },
    {
      "src": "CRM + SGN2.png",
      "x": 615.7871,
      "y": 0.3201,
      "width": 359.3652,
      "height": 293.4175,
      "zIndex": 2,
      "order": 1,
      "nodeId": "116:4641"
    },
    {
      "src": "CRM + SGN3.png",
      "x": 521.8984,
      "y": -117.1016,
      "width": 366.127,
      "height": 304.8301,
      "zIndex": 1,
      "order": 2,
      "nodeId": "116:4640"
    }
  ],
  "orbie": [
    {
      "src": "orbie1.png",
      "x": 764,
      "y": 35,
      "width": 264,
      "height": 353.9843,
      "zIndex": 2,
      "order": 0,
      "nodeId": "121:4727"
    },
    {
      "src": "orbie-icones2.png",
      "x": 709,
      "y": 34.9995,
      "width": 245.3559,
      "height": 110.4639,
      "zIndex": 1,
      "order": 1,
      "nodeId": "121:4728"
    },
    {
      "src": "orbie-sig3.png",
      "x": 586,
      "y": 101,
      "width": 238.9297,
      "height": 191.5039,
      "zIndex": 3,
      "order": 2,
      "nodeId": "121:4725"
    }
  ],
  "senai-space": [
    {
      "src": "space-icones1.png",
      "x": 679.3535,
      "y": -27.4766,
      "width": 297.7207,
      "height": 336.8472,
      "zIndex": 2,
      "order": 0,
      "nodeId": "121:4802"
    },
    {
      "src": "tela-space2.png",
      "x": 766.8262,
      "y": 18.9854,
      "width": 236.7891,
      "height": 384.7813,
      "zIndex": 1,
      "order": 1,
      "nodeId": "121:4784"
    }
  ],
  "eleva": [
    {
      "src": "telas-eleva1.png",
      "x": 735,
      "y": 17,
      "width": 250.8457,
      "height": 372.481,
      "zIndex": 2,
      "order": 0,
      "nodeId": "121:4892"
    },
    {
      "src": "telas-eleva2.png",
      "x": 524,
      "y": 23,
      "width": 422.1348,
      "height": 335.4883,
      "zIndex": 1,
      "order": 1,
      "nodeId": "121:4874"
    }
  ],
  "espaco-do-estudante": [
    {
      "src": "bg-ee-figma.png",
      "x": 685,
      "y": 0,
      "width": 311,
      "height": 274,
      "zIndex": 1,
      "order": 0,
      "nodeId": "121:5005"
    },
    {
      "src": "telas-ee2.png",
      "x": 653.9844,
      "y": -28.9997,
      "width": 442.8306,
      "height": 405.1299,
      "zIndex": 2,
      "order": 1,
      "nodeId": "121:4972"
    }
  ],
  "itinerarios-nacionais": [
    {
      "src": "telas-in1.png",
      "x": 693,
      "y": -166,
      "width": 477,
      "height": 621,
      "zIndex": 1,
      "order": 0,
      "nodeId": "121:5202"
    },
    {
      "src": "icone-in2.png",
      "x": 566,
      "y": 81,
      "width": 171,
      "height": 192,
      "zIndex": 2,
      "order": 1,
      "nodeId": "121:5243"
    }
  ],
  "lab-digital": [
    {
      "src": "fundo1.png",
      "x": 600.6465,
      "y": -10.2314,
      "width": 412.2695,
      "height": 397.1577,
      "zIndex": 1,
      "order": 0,
      "nodeId": "121:5978"
    },
    {
      "src": "tela-labdigital2.png",
      "x": 649.8398,
      "y": 21.6152,
      "width": 354.6435,
      "height": 256.1539,
      "zIndex": 2,
      "order": 1,
      "nodeId": "121:6037"
    }
  ],
  "audioxp": [
    {
      "src": "audio-fundo1.png",
      "x": 677,
      "y": 0,
      "width": 310,
      "height": 283,
      "zIndex": 1,
      "order": 0,
      "nodeId": "124:7308"
    },
    {
      "src": "audio-mulher2.png",
      "x": 694.6992,
      "y": -12.2998,
      "width": 274.6015625,
      "height": 305.599609375,
      "zIndex": 2,
      "order": 1,
      "nodeId": "124:7301"
    },
    {
      "src": "audio-logo2.png",
      "x": 636,
      "y": 142.9998,
      "width": 106.73854809999466,
      "height": 104.06657421588898,
      "zIndex": 3,
      "order": 1,
      "nodeId": "124:7303"
    }
  ],
  "dw": [
    {
      "src": "fundo-projetosemfoto2.png",
      "x": 552.7969,
      "y": -22.1016,
      "width": 466.6543,
      "height": 462.2031,
      "zIndex": 1,
      "order": 1,
      "nodeId": "124:7349"
    },
    {
      "src": "icone-projetosemfoto2.png",
      "x": 672,
      "y": 27,
      "width": 239,
      "height": 271,
      "zIndex": 2,
      "order": 1,
      "nodeId": "124:7323"
    }
  ],
  "sgn": [
    {
      "src": "fundo-projetosemfoto2.png",
      "x": 552.7969,
      "y": -22.1016,
      "width": 466.6543,
      "height": 462.2031,
      "zIndex": 1,
      "order": 1,
      "nodeId": "147:3123"
    },
    {
      "src": "icone-projetosemfoto2.png",
      "x": 672,
      "y": 27,
      "width": 239,
      "height": 271,
      "zIndex": 2,
      "order": 1,
      "nodeId": "147:3124"
    }
  ],
  "chatbot-sgn": [
    {
      "src": "fundo-projetosemfoto2.png",
      "x": 552.7969,
      "y": -22.1016,
      "width": 466.6543,
      "height": 462.2031,
      "zIndex": 1,
      "order": 1,
      "nodeId": "147:3117"
    },
    {
      "src": "icone-projetosemfoto2.png",
      "x": 672,
      "y": 27,
      "width": 239,
      "height": 271,
      "zIndex": 2,
      "order": 1,
      "nodeId": "147:3118"
    }
  ],
  "hub-ia": [
    {
      "src": "fundo-projetosemfoto2.png",
      "x": 552.7969,
      "y": -22.1016,
      "width": 466.6543,
      "height": 462.2031,
      "zIndex": 1,
      "order": 1,
      "nodeId": "147:3126"
    },
    {
      "src": "icone-projetosemfoto2.png",
      "x": 672,
      "y": 27,
      "width": 239,
      "height": 271,
      "zIndex": 2,
      "order": 1,
      "nodeId": "147:3127"
    }
  ],
  "predicao-evasao": [
    {
      "src": "fundo-projetosemfoto2.png",
      "x": 552.7969,
      "y": -22.1016,
      "width": 466.6543,
      "height": 462.2031,
      "zIndex": 1,
      "order": 1,
      "nodeId": "147:3120"
    },
    {
      "src": "icone-projetosemfoto2.png",
      "x": 672,
      "y": 27,
      "width": 239,
      "height": 271,
      "zIndex": 2,
      "order": 1,
      "nodeId": "147:3121"
    }
  ],
};

