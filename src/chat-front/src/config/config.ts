type ApiUrlType = 'ws' | 'https' | 'http';

export const config = {
  apiUrl: (type: ApiUrlType) => {
    const apiUrl = import.meta.env.API_URL ?? 'localhost:3000';
    return `${type}://${apiUrl}`;
  },
};
