import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule, MatProgressSpinnerModule, MatCardModule } from '@angular/material';

const modules = [
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatRadioModule,
  MatInputModule,
  MatDividerModule,
  MatTabsModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatCardModule
];

@NgModule({
  imports: modules,
  exports: modules,
  declarations: [],
  providers: []
})
export class MaterialModule {}
