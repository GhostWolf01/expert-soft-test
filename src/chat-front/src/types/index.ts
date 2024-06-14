export type User = {
  id: number;
  name: string;
};

export type Message = {
  id: number;
  text: string;
  type: 'text' | 'file';
  url: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};
