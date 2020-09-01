import { UserSchema, RoleSchema } from 'src/models/schemas';

export const database = {
  url: 'mongodb://localhost/',
  dev: {
    db: 'clenic-db',
    port: '',
    schema: {
      user: { name: 'User', schema: UserSchema },
      role: { name: 'Role', schema: RoleSchema },
    },
  },
};
