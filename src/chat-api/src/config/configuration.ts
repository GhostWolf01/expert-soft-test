export const configuration = {
  host: process.env.HOST ?? 'https://localhost',
  port: process.env.PORT ?? 3000,
  database: {
    // url: process.env.DB_URL,
    host: process.env.DB_HOST ?? 'localhost',
    post: process.env.DB_PORT ?? 5434,
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_USERNAME ?? 'postgres',
    name: process.env.DB_NAME ?? 'chatDB',
  },
  // bcrypt: {
  //   hash: {
  //     saltOrRounds: 10,
  //   },
  // },
};

export default () => {
  // console.log(configuration);
  return configuration;
};
