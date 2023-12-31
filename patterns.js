export const patterns = {
  yellow: [
    [
      ['' , '' , 'x'],
      ['' , '' , 'x']
    ],
    [
      ['x', '' , '' ],
      ['x', '' , '' ]
    ],
    [
      ['' , '' , 'x'],
      ['' , '' , 'x'],
      ['x', 'x', 'x']
    ],    
    [
      ['x', '' , '' ],
      ['x', '' , '' ], //3
      ['x', 'x', 'x']
    ],
    [
      ['x', '' , '' , 'x'],
      ['x', '' , '' , 'x']
    ],
    [
      ['x', '' , '' , 'x'], //5
      ['x', '' , '' , 'x'],
      ['x', 'x', 'x', 'x']
    ],
    [
      ['' , '' , 'x']
    ],
    [
      ['x', '' , '' ]
    ],
    [
      ['x', '' , '' , 'x'] //8
    ],
    [
      ['' , '' , 'x'],
      ['x', 'x', 'x']
    ],
    [
      ['x', '' , '' ], //10
      ['x', 'x', 'x']
    ],
    [
      ['x', '' , '' , 'x'],
      ['x', 'x', 'x', 'x']
    ],
    [
      ['' , '' ] //12
    ],
    [
      ['' , '' ],
      ['x', 'x']
    ],
    [
      ['' , 'x'] //14
    ],
    [
      ['x', '' ] //15
    ],
    [
      ['' , 'x'], //16
      ['x', 'x']
    ],
    [
      ['x', '' ], //17
      ['x', 'x']
    ],
    [
      ['' , 'x'], //18
      ['' , 'x']
    ],
    [
      ['x', '' ], //19
      ['x', '' ]
    ]
  ],
  green: [
    [
      ['' , '' , 'x'] //0
    ],
    [
      ['x', '' ] //1
    ],
    [
      ['' , '' , 'x'], //2
      ['x', 'x', '*']
    ],
    [
      ['x', '' ], //3
      ['*', 'x']
    ],
    [
      ['x', '' ], //4
      ['*', '' ]
    ],
    [
      ['' , '' , '' ], //5
    ],
    [
      ['' , '' , '' ], //6
      ['x', 'x', 'x']
    ],
    [
      ['x', '' ], //7
      ['*', '' ],
      ['*', '' ]
    ],
    [
      ['x', '' ], //8
      ['*', '' ],
      ['*', '' ],
      ['*', 'x']
    ],
    [
      ['' , 'x', 'x'] //9
    ],
    [
      ['' , 'x', 'x'], //10
      ['x', '*', '*']
    ]
  ],
  red: [
    [
      ['x', '' , '' ] //0
    ],
    [
      ['' , 'x'] //1
    ],
    [
      ['x', '' , '' ], //2
      ['*', 'x', 'x']
    ],
    [
      ['' , 'x'], //3
      ['x', '*']
    ],
    [
      ['' , 'x'], //4
      ['' , '*']
    ],
    [
      ['' , '' , '' ], //5
    ],
    [
      ['' , '' , '' ], //6
      ['x', 'x', 'x']
    ],
    [
      ['' , 'x'], //7
      ['' , '*'],
      ['' , '*']
    ],
    [
      ['' , 'x'], //8
      ['' , '*'],
      ['' , '*'],
      ['x', '*']
    ],
    [
      ['x', 'x', '' ] //9
    ],
    [
      ['x', 'x', '' ], //10
      ['*', '*', 'x']
    ]
  ],
  orange: [
    [
      ['x', '' ], //0
      ['*', '' ]
    ],
    [
      ['x', '' , 'x'], //1
      ['*', '' , '*']
    ],
    [
      ['' , '' , 'x'],
      ['x', '' , '*'], //2
      ['*', '' , '*']
    ],
    [
      ['' , '' , 'x'],
      ['x', '' , '*'], //3
      ['*', '' , '*'],
      ['*', 'x', '*']
    ],
    [
      ['x', '' , 'x'], //4
      ['*', '' , '*'],
      ['*', 'x', '*']
    ],
    [
      ['' , 'x', 'x'] //5
    ],
    [
      ['' , 'x', 'x'], //6
      ['x', '*', '*']
    ],
    [
      ['' , '' , '' ] //7
    ],
    [
      ['' , '' ] //8
    ],
    [
      ['' , '' , '' ], //9
      ['x', 'x', 'x']
    ],
    [
      ['' , '' ], //10
      ['x', 'x']
    ],
    [
      ['x', '' ], //11
      ['*', '' ],
      ['*', '' ]
    ],
    [
      ['' , 'x', 'x' ], //12
    ],
    [
      ['x', '' , 'x' ], //13
    ],
    [
      ['x', 'x', '' ], //14
    ],
    [
      ['' , 'x', 'x' ], //15
      ['x', '*', '*' ]
    ],
    [
      ['x', '' , 'x' ], //16
      ['*', 'x', '*' ]
    ],
    [
      ['x', 'x', '' ], //17
      ['*', '*', 'x']
    ],
    [
      ['' , 'x'] //18
    ],
    [
      ['x', '' ] //19
    ],
    [
      ['x', '' ], //20 (4.1)
      ['*', '' ],
      ['*', 'x']
    ],
    [
      ['' , 'x'], //21
      ['x', '*']
    ],
    [
      ['x', '' ], //22
      ['*', 'x']
    ],
    [
      ['x', '' ], //23
      ['*', '' ],
      ['*', '' ],
      ['*', '' ]
    ]
  ],
  blue: [
    [
      ['' , 'x'], //0
      ['' , '*']
    ],
    [
      ['x', '' , 'x'], //1
      ['*', '' , '*']
    ],
    [
      ['x', '' , '' ],
      ['*', '' , 'x'], //2
      ['*', '' , '*']
    ],
    [
      ['x', '' , '' ],
      ['*', '' , 'x'], //3
      ['*', '' , '*'],
      ['*', 'x', '*']
    ],
    [
      ['x', '' , 'x'], //4
      ['*', '' , '*'],
      ['*', 'x', '*']
    ],
    [
      ['x', 'x', '' ] //5
    ],
    [
      ['x', 'x', '' ], //6
      ['*', '*', 'x']
    ],
    [
      ['' , '' , '' ] //7
    ],
    [
      ['' , '' ] //8
    ],
    [
      ['' , '' , '' ], //9
      ['x', 'x', 'x']
    ],
    [
      ['' , '' ], //10
      ['x', 'x']
    ],
    [
      ['' , 'x'], //11
      ['' , '*'],
      ['' , '*']
    ],
    [
      ['x', 'x', '' ], //12
    ],
    [
      ['x', '' , 'x' ], //13
    ],
    [
      ['' , 'x', 'x'], //14
    ],
    [
      ['x', 'x', '' ], //15
      ['' , '*', 'x']
    ],
    [
      ['x', '' , 'x' ], //16
      ['*', 'x', '*' ]
    ],
    [
      ['' , 'x', 'x'], //17
      ['x', '*', '*']
    ],
    [
      ['' , 'x'] //18
    ],
    [
      ['x', '' ] //19
    ],
    [
      ['' , 'x'], //20 (4.1)
      ['' , '*'],
      ['x', '*']
    ],
    [
      ['' , 'x'], //21
      ['x', '*']
    ],
    [
      ['x', '' ], //22
      ['*', 'x']
    ],
    [
      ['' , 'x'], //23
      ['' , '*'],
      ['' , '*'],
      ['' , '*']
    ]
  ],
  magenta: [
    [
      ['x', '' , 'x'] //0
    ],
    [
      ['x', '' ] //1
    ],
    [
      ['' , 'x'] //2
    ],
    [
      ['x', '' , 'x'], //3
      ['*', 'x', '*']
    ],
    [
      ['x', '' ], //4
      ['*', 'x']
    ],
    [
      ['' , 'x'], //5
      ['x', '*']
    ],
    [
      ['' , '' , '' ] //6
    ],
    [
      ['' , '' , '' ], //7
      ['x', 'x', 'x']
    ]
  ],
  cyan: [
    [
      ['x', '' , 'x'] //0
    ],
    [
      ['' , 'x'] //1
    ],
    [
      ['x', '' ] //2
    ]
  ]
}