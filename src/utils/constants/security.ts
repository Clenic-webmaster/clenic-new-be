export const security = {
  secret: `-----BEGIN RSA PRIVATE KEY-----
  MIICXAIBAAKBgQChG2Ka9Wm95gzyF+I0acOuI3mpgRqtcOCoi/EIGMVTvaP0tIN0
  qJ9//11WJ9MJTxfIh8nqTzrxj2hQn6DJFCqoMMaNIBUEg3ecXQri/TLTz6UnaJMn
  l3HkxKkPc5qYmzGP1sO/6C89dcrz1r9/AqEb0ULV+rFFleXpFUXi4STL0wIDAQAB
  AoGAaCWJ4t6PEuGqsL3bz0In62Sne3ooQsLbmFmO4UsSFQZc/Q3MhReUtGvibJWm
  CTiGCW4uizfYxNuN9cCbciGFSNYdr7mStNet7ddU6S/mx3Va5mF4iuQUM82EkXYZ
  Y7gqWv1qudxr2jVOWss2lb1akuWvxbwODy84Vg58SE84gjECQQDzDRN+zJOshoDr
  PHn/6t635OBp8ZrZUI2pLIHvfsn3NCfOkZKegYfApC93hvdHFtWPGbMknXN0Cqw1
  YjUwxNOfAkEAqbCwrrHktbcNkCv4ZisdLa75FFF+10wJsQauJ284VxE+RF6nmEUl
  KX3stv/FxB5jgMH+IngPTLOBkuFzMyS7TQJAdcRRPPBNYZwunUzJZGpejkY1QsBR
  opi4e09Yij4qCEDaROoeW/UxXPNxGH5qFKUIx3TRa51rEsAVHyy9zyqfywJAHekn
  O6PfzKgXm/IkNt4iporRHOPAl/KvQqUKzaitJavEbgjBQfXuNwIbV6Z+FbPFlkyb
  nzfKepqpnFphFALFgQJBAM8TV+4XplA8GHCnhRv5qTFSBAmusUe/MRH57OfgXPAB
  8D80UayqMchckJIw+gEbZ45tl3N/8YaQfw+qGZ6okfE=
  -----END RSA PRIVATE KEY-----`,
  secretPublicKey: `-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQChG2Ka9Wm95gzyF+I0acOuI3mp
  gRqtcOCoi/EIGMVTvaP0tIN0qJ9//11WJ9MJTxfIh8nqTzrxj2hQn6DJFCqoMMaN
  IBUEg3ecXQri/TLTz6UnaJMnl3HkxKkPc5qYmzGP1sO/6C89dcrz1r9/AqEb0ULV
  +rFFleXpFUXi4STL0wIDAQAB
  -----END PUBLIC KEY-----`,
  roles: {
    ROLE_ADMIN: 'ROLE_ADMIN',
    ROLE_CLENIC: 'ROLE_CLENIC',
    ROLE_ENGINEER: 'ROLE_ENGINEER',
  },
  userStates: {
    INACTIVE_STATE: "INACTIVO",
    HOLIDAYS_STATE: "VACACIONES",
    ON_ROUTE_STATE: "EN RUTA",
    AVAILABLE: "DISPONIBLE",
    BLOQUED_STATE: "BLOQUEADO",
  },
  bussinessTypes: {
    COMPANY: 'EMPRESA_MANTENIMIENTO',
    CLENIC: 'CLENIC',
  }
};
