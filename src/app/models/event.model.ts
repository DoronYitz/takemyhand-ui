export interface IEvent {
  _id: string;
  title?: string;
  category?: string;
  description?: string;
  date?: Date;
  active?: boolean;
  secret?: string;
  fixedDate?: string;
}
