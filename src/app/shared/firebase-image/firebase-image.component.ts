import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  ViewEncapsulation
} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-firebase-image',
  templateUrl: './firebase-image.component.html',
  styleUrls: ['./firebase-image.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class FirebaseImageComponent implements OnInit , OnChanges{
  @ViewChild('img', { static: false }) img;
  @Input() className: string;
  @Input() imageName: string;
  @Input() alt: string;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onClick = new EventEmitter<any>();
  url: Observable<any>;
  constructor(private storage: AngularFireStorage) {}

  ngOnInit() {}

  runClick() {
    this.onClick.emit(this.imageName);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.imageName) {
      const ref = this.storage.ref(this.imageName);
      this.url = ref.getDownloadURL();
    }
  }
}
