import Dexie, { Table } from 'dexie';

export interface Video {
  id?: number;
  question: string;
  blob: Blob;
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  videos!: Table<Video>; 

  constructor() {
    super('myVideoDB');
    this.version(1).stores({
      videos: '++id, question, blob' // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();