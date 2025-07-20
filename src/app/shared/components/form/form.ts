import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CustomValidators} from './validators/custom-validators';
import {ClientType} from '../../../../types/client.type';

@Component({
  selector: 'app-form',
  imports: [
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './form.html',
  styleUrl: './form.scss'
})
export class Form implements OnChanges{
  public clientForm: FormGroup;
  @Input() client: ClientType | null = null;
  @Output() formSubmit = new EventEmitter<ClientType>();     // проброс клиента после нажатия на "Сохранить"
  @Output() close = new EventEmitter<void>();                    // проброс нажатия на "отмена"

  constructor(private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      name: ['', [Validators.required, CustomValidators.validateLength(2)]],
      surname: ['', [Validators.required, CustomValidators.validateLength(2)]],
      email: ['', [Validators.required, CustomValidators.validateEmail()]],
      phone: ['', [CustomValidators.rusPhoneNumber()]],
    })
  }

  ngOnChanges() {
    if (this.client) {                                // смотрим есть ли данные клиента пришедшие с родителя
      this.clientForm.patchValue(this.client);        // заполняем форму этими данными
    }
  }

  // ВАЛИДНОСТЬ ФОРМЫ
  isInvalid(controlName: string): boolean {
    const control = this.clientForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  // ОТПАРВКА ФОРМЫ
  onSubmit() {
    if (this.clientForm.valid) {
      this.formSubmit.emit(this.clientForm.value)
    }
  }

  // ЗКАРЫТИЕ МОДАЛКИ
  closeModal(event: Event) {
    event.preventDefault();
    this.close.emit()                   // пробрасываем наружу событие нажатия на "отмена"
  }
}
