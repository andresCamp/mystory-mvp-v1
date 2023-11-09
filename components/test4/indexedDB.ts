// indexedDB.ts
const dbName = 'videoDB';
const storeName = 'videos';

export const openDB = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = function(event) {
      const db = (event.target as IDBRequest).result;
      db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
    };

    request.onsuccess = function(event) {
      resolve((event.target as IDBRequest).result);
    };

    request.onerror = function(event) {
      reject('Error opening IndexedDB');
    };
  });
};

export const saveVideo = async (question: string, videoBlob: Blob) => {
  const db = await openDB();
  const tx = db.transaction([storeName], 'readwrite');
  const store = tx.objectStore(storeName);

  return new Promise<void>((resolve, reject) => {
    const request = store.add({ question, videoBlob });

    request.onsuccess = function() {
      resolve();
    };

    request.onerror = function() {
      reject('Error saving video to IndexedDB');
    };
  });
};

// Add more utility functions to delete and read videos
