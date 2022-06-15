export const suggestions = [
  {
    key: 1,
    name: "test1",
    adress: "Rabat,Maroc",
  },
  {
    key: 2,
    name: "test2",
    adress: "Rabat,Maroc",
  },
  {
    key: 3,
    name: "test3",
    adress: "Rabat,Maroc",
  },
  {
    key: 4,
    name: "test4",
    adress: "Rabat,Maroc",
  },
  {
    key: 5,
    name: "test5",
    adress: "Rabat,Maroc",
  },
];

export const lignes = [
    {
        id: 1,
        name: '101_1',
        adress: 'Hay Annahda to Hay Alfath',
        status: 'online',
    },
    {
        id: 2,
        name: '101_2',
        adress: 'Hay Annahda to Hay Alfath',
        status: 'offline',
    },
    {
        id: 3,
        name: '104_1',
        adress: 'Hay Annahda to Medina',
        status: 'offline',
    },
    {
        id: 4,
        name: '104_2',
        adress: 'Hay Annahda to Medina',
        status: 'offline',
    },
    {
        id: 5,
        name: '102_1',
        adress: 'Hay Assinaii to Medina',
        status: 'offline',
    },
    {
        id: 6,
        name: '102_2',
        adress: 'Hay Assinaii to Medina',
        status: 'offline',
    }
]

export const stations = [
    {
        id: 1,
        name: 'station 1',
        adress: 'Hay Annahda',
        latitude: 33.975191,
        longitude: -6.822675,
        ligne: [lignes[2], lignes[3], lignes[4], lignes[5]]
    },
    {
        id: 2,
        name: 'station 2',
        adress: 'Hay Annahda',
        latitude: 33.976561,
        longitude: -6.819134,
        ligne: [lignes[0], lignes[1], lignes[4], lignes[5]]
    },
    {
        id: 3,
        name: 'station 3',
        adress: 'Hay Annahda',
        latitude: 33.977362,
        longitude: -6.817210,
        ligne: [lignes[0], lignes[1], lignes[4], lignes[5]]
    },
    {
        id: 4,
        name: 'station 4',
        adress: 'Hay Annahda',
        latitude: 33.978598,
        longitude: -6.814950,
        ligne: [lignes[0], lignes[1], lignes[4], lignes[5]]
    },
    {
        id: 5,
        name: 'station 5',
        adress: 'Hay Annahda',
        latitude: 33.979959,
        longitude: -6.812665,
        ligne: [lignes[0], lignes[1], lignes[4], lignes[5]]
    },
    {
        id: 6,
        name: 'station 6',
        adress: 'Hay Annahda',
        latitude: 33.981605,
        longitude: -6.812665,
        ligne: [lignes[0], lignes[1], lignes[4], lignes[5]]
    },
]
