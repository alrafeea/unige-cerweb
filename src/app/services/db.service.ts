import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor(private afs: AngularFirestore) {}

  collection$(path, query?) {
    return this.afs
      .collection(path, query)
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  buildPropertyQuery(
    key: any,
    statusId: number,
    user: any,
    company: any,
    pageSize: number,
    ref: any
  ): firebase.firestore.CollectionReference | firebase.firestore.Query {
    let query:
      | firebase.firestore.CollectionReference
      | firebase.firestore.Query = ref;


    if (company) {
      query = query.where('owner.id', '==', company.id);
    }
    if (user) {
      query = query.where('owner.uid', '==', user.uid);
    }
    if (statusId) {
      query = query.where('status.id', '==', statusId);
    }
    query = query.orderBy('createdAt', 'desc');
    if (key) {
      query = query.startAt(key);
    }

    query = query.limit(pageSize + 1);

    return query;
  }

  collectionSnapshots$(path, query?) {
    return this.afs.collection(path, query).snapshotChanges();
  }

  collectionGroup$(path, query?) {
    return this.afs
      .collectionGroup(path, query)
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  collectionGroupSnapshots$(path, query?) {
    return this.afs.collectionGroup(path, query).snapshotChanges();
  }

  doc$(path): Observable<any> {
    return this.afs
      .doc(path)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return { id: doc.payload.id, ...doc.payload.data() };
        })
      );
  }

  exists$(path): Observable<any> {
    return this.afs
      .doc(path)
      .snapshotChanges()
      .pipe(
        map(doc => {
          if (doc.payload.exists) {
            return {
              id: doc.payload.id,
              exists: doc.payload.exists,
              ...doc.payload.data()
            };
          } else {
            return { exists: doc.payload.exists };
          }
        })
      );
  }

  updateAt(path: string, data: object): Promise<any> {
    const segment = path.split('/').filter(v => v);
    if (segment.length % 2) {
      // odd is allways a collection
      return this.afs.collection(path).add(data);
    } else {
      // Then we have a document
      return this.afs.doc(path).set(data, { merge: true }); // merge = true ? if the file exists, then update,, or create
    }
  }

  delete(path) {
    return this.afs.doc(path).delete();
  }
}
