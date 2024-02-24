import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[restrictedWords]',
  standalone: true,
  providers: [{ provide: NG_VALIDATORS, useExisting: RestrictedWordsValidator, multi: true }],
})

export class RestrictedWordsValidator implements Validator {
  @Input('restrictedWords') restrictedWords: string[] = [];
    validate(control: AbstractControl): ValidationErrors | null {
    if(!control.value) return null;
    const invalidWords = this.restrictedWords.map(w=>control.value.includes(w) ? {restrictedWords: w} : null)
    .filter(v => v !== null);

    return invalidWords.length > 0 ?
    { restrictedWords: invalidWords.join(',') } 
    : null;
  }
}   