import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appConfirmPwd]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfirmPwdValidatorDirective,
    multi: true
  }]
})
export class ConfirmPwdValidatorDirective implements Validator {
  @Input('appConfirmPwd') appConfirmPwd: string;

  constructor() { }

  validate (contorl: AbstractControl): {[key: string]: any} | null {
    const controlToCompare = contorl.parent.get(this.appConfirmPwd);
    if (controlToCompare && controlToCompare.value !== contorl.value) {
      return {'notEqual': true};
    }

    return null;
  }

}
