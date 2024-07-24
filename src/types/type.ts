export interface User {
  username: string;
  email: string;
  password: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  date: Date;
  status?: boolean;
}
