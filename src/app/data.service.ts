import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private fs: AngularFirestore) {}

  // All
  all$<T>(collection: string): Observable<T[]> {
    return this.fs
      .collection<T>(collection)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(action => {
            const id = action.payload.doc.id;
            return { id, ...action.payload.doc.data() } as T;
          })
        )
      );
  }

  // Create
  create$<T>(collection: string, obj: T): Observable<T> {
    const id: string = this.fs.createId();
    return from(
      this.fs
        .collection<T>(collection)
        .doc(id)
        .set(obj)
    ).pipe(
      map(() => {
        return { id, ...obj } as T;
      })
    );
  }

  // Update
  update$<T>(collection: string, obj: T): Observable<T> {
    return from(
      this.fs
        .collection<T>(collection)
        .doc(obj['id'])
        .update(obj)
    ).pipe(map(() => obj));
  }

  // Destroy
  destroy$<T>(collection: string, obj: T): Observable<T> {
    return from(
      this.fs
        .collection<T>(collection)
        .doc(obj['id'])
        .delete()
    ).pipe(map(() => obj));
  }
}