import {FormControl, ValidationErrors} from '@angular/forms';

export class CustomValidators {

  static validateLength(min: number) {
    return (control: FormControl): ValidationErrors | null => {
      const value = control.value.trim() || '';
      if (value.length < min) {
        return {minLength: true}
      }
      return null;
    }
  }

  static validateEmail() {
    return (control: FormControl): ValidationErrors | null => {
      const email = control.value || '';
      const regEx = /^[^\s@]+@[^\s@.]+\.[a-z]{2,3}/       // паттерн имейла
      if (email && !regEx.test(email)) {
        return {invalidEmail: true};
      }
      return null;
    };
  }

  static rusPhoneNumber() {
    return (control: FormControl): ValidationErrors | null => {
      const phoneNumber = control.value || '';
      const regEx = /^\+79\d{9}$/                         // паттерн ру номера из таблицы;
      if (phoneNumber && !regEx.test(phoneNumber)) {
        return { invalidPhone: true };
      }
      return null;
    };
  }
}
