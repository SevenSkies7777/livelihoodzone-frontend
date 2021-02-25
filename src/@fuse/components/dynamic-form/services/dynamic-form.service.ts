import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { takeUntil, tap, startWith, map } from 'rxjs/operators';
import { each, keys } from 'lodash';

@Injectable()
export class DynamicFormService {
    http: HttpClient;

    constructor(private _http: HttpClient) {

    }

    checkConfirmPassword(control, cmpt) {
        return control.value === cmpt.formModel.Passowrd;
    }

    getPassword(cmpt) {
        const validators= {
            fieldMatch: {
                expression: (control) => 
                    this.checkConfirmPassword(control, cmpt),
                    message: `Password does not match`,
            }
        };
        const expressionProperties = {
            'templateOptions.disabled': () =>
                !cmpt.form.get('Password').valid,
        }
        const lifecycle = {
            onInit: (form, field) => {
                form.get('Password').valueChanges.pipe(
                    takeUntil(cmpt.onDestroy$),
                    tap(() => {
                        field.formControl.
                        updateValueAndValidity();
                    })
                ).subscribe();
            }
        };
        return {
            validators,
            expressionProperties,
            lifecycle
        };
    }

    setPassword(cmpt) {
        console.log('Called', cmpt);
        const passConfs = this.getPassword(cmpt);
        const passKeys = keys(passConfs);
        each(passKeys, aKey => {
            // cmpt.fields[1].fieldGroup[1][aKey] =
            console.log(cmpt.fields, cmpt.fields[aKey])
            cmpt.fields[aKey] = passConfs[aKey];
        })
    }
}