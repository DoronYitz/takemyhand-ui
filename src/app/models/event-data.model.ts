/**
 * Helper class used for event emitting to all components about logout/sudden logout
 */
export class EventData {
  name: string;
  value: any;

  constructor(name: string, value: any) {
    this.name = name;
    this.value = value;
  }
}
