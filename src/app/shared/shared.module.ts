// Core modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Angular material shared modules
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextFieldModule } from '@angular/cdk/text-field';

// Scroll animation module
import { InViewportModule } from 'ng-in-viewport';

// Bootstrap module
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Fort awesome
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

// Shared components
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [NgbModule, CommonModule, FontAwesomeModule],
  declarations: [NavbarComponent, FooterComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TextFieldModule,
    InViewportModule,
    NavbarComponent,
    FooterComponent,
    FontAwesomeModule,
  ],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
