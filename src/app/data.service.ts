import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { DateTime } from 'luxon';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Patient } from './models/patient';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private fs: AngularFirestore) {}

  private titleCase(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }

  // Querying
  query$<T>(collection: string, q: string): Observable<T[]> {
    return this.fs
      .collection<T>(collection, ref =>
        ref
          .where('name.last', '>=', this.titleCase(q))
          .where('name.last', '<=', this.titleCase(q) + 'z')
      )
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

  // Read
  read$<T>(collection: string, id: string): Observable<T> {
    return this.fs
      .collection<T>(collection)
      .doc<T>(id)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return { id, ...doc.payload.data() } as T;
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
