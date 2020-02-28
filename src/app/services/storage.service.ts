import { Injectable, COMPILER_OPTIONS } from "@angular/core";

export interface item {
  id: number;
  foto: string;
}
const ITEM_KEYS = "my_items";
@Injectable({
  providedIn: "root"
})
export class StorageService {
  constructor(private storage: Storage) {}
  addItem(item: item): Promise<any> {
    return this.storage.get(ITEM_KEYS).then((items: item[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(ITEM_KEYS, [item]);
      } else {
        return this.storage.set(ITEM_KEYS, [item]);
      }
    });
  }
}
