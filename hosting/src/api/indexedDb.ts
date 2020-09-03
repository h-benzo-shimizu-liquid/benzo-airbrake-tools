
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export interface IndexedData {
	id: string;
	time: string;
	value: string;
};

const dbName: string = "sampleDB";
const storeName: string  = "sampleStore";

export const getIndexedData = async (keyValue: string): Promise<IndexedData | undefined> => {
	return await Promise.resolve().then((): Promise<IDBDatabase> => new Promise((resolve: (db: IDBDatabase) => void, reject: (error: Error) => void): void => {
		const db: IDBOpenDBRequest = window.indexedDB.open(dbName);
		db.onupgradeneeded = (event: IDBVersionChangeEvent): void => { db.result.createObjectStore(storeName, { keyPath : "id", }); };
		db.onsuccess = (event: Event): void => resolve(db.result);
		db.onerror = (event: Event): void => reject(new Error());
	})).then((db: IDBDatabase): Promise<IndexedData | undefined> => new Promise((resolve: (value: IndexedData | undefined) => void, reject: (error: Error) => void): void => {
		const trans: IDBTransaction = db.transaction(storeName, "readonly");
		const store: IDBObjectStore = trans.objectStore(storeName);
		const request: IDBRequest<IndexedData | undefined> = store.get(keyValue);
		request.onsuccess = (event: Event): void => resolve(request.result);
		request.onerror = (event: Event): void => reject(new Error());
		db.close();
	}));
};

export const putIndexedData = async (value: IndexedData): Promise<void> => {
	Promise.resolve().then((): Promise<IDBDatabase> => new Promise((resolve: (db: IDBDatabase) => void, reject: (error: Error) => void): void => {
		const db: IDBOpenDBRequest = window.indexedDB.open(dbName);
		db.onupgradeneeded = (event: IDBVersionChangeEvent): void => { db.result.createObjectStore(storeName, { keyPath : "id", }); };
		db.onsuccess = (event: Event): void => resolve(db.result);
		db.onerror = (event: Event): void => reject(new Error());
	})).then((db: IDBDatabase): Promise<void> => new Promise((resolve: () => void, reject: (error: Error) => void): void => {
		const trans: IDBTransaction = db.transaction(storeName, "readwrite");
		const store: IDBObjectStore = trans.objectStore(storeName);
		const request: IDBRequest<IDBValidKey> = store.put(value)
		request.onsuccess = (event: Event): void => resolve();
		request.onerror = (event: Event): void => reject(new Error());
		db.close();
	}));
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

