export interface Task {
  id?: number;
  title: string;
  description?: string;
  createdAt?: string;
}
export interface NewTaskPayload {
  title: string;
  description?: string;
}