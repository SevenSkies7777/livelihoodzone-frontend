import { Injectable } from '@angular/core';

import { takeUntil, tap, startWith, map } from 'rxjs/operators';
import { each, keys } from 'lodash';

import { LoginForm } from '../constants/login-form.constant';
import { RegistrationForm } from '../constants/registration.constant';
import { DocumentTypesForm } from '../constants/document-types.constant';
import { SportsCategoriesForm } from '../constants/sports-categories.constant';
import { BillableItemsForm } from '../constants/billable-items.constant';
import { FinancialYearForm } from '../constants/financial-year.constant';
import { OrganizationBudgetForm } from '../constants/organization-budgets.constant';
import { ApplicationItemForm } from '../constants/application-items.constant';
import { AllowancesForm } from '../constants/allowances.constant';
import { ApplicationAttendeesForm } from '../constants/application-attendees.constant';
import { 
    OrganizationBudgetActivitiesForm
} from '../constants/organization-budget-activities.constant';
import {
    OrganizationBankAccountForm
} from '../constants/organization-bank-account.constant';
import { OrganizationMembersForm }from '../constants/organization-members.constant';
import { OrganizationRolesForm } from '../constants/organization-roles.constant';
import {
    ApplicationAlternateFundingSourcesForm
} from '../constants/application-alternate-funding-sources.constant';
import * as _ from 'lodash';
import { ApplicationForm } from '../constants/application.constant';
import { OrganizationForm } from '../constants/organization.constant';
import { OrganizationBudgetActivityItem } from '../constants/organization-budget-activity-items.constant';
import { OrganizationBudgetActivityAttendee } from '../constants/organization-budget-activity-attendees.constant';
import { OrganizationAcitivityAllowance } from '../constants/organization-budget-activity-allowances.constant';
import { ApplicationMEForm } from '../constants/application-me.constant';
import { ApplicationAllowanceForm } from '../constants/application-allowances';
import { UsersForm } from '../constants/users.constant';

@Injectable()
export class FormlyService {
    formConfig: Array<any> = [
        { name: 'login', field: LoginForm },
        { name: 'registration', field: RegistrationForm },
        { name: 'users', field: UsersForm },
        { name: 'document-types', field: DocumentTypesForm },
        { name: 'applications', field: ApplicationForm },
        { name: 'billable-items', field:  BillableItemsForm },
        { name: 'allowances', field: AllowancesForm },
        { name: 'application-items', field: ApplicationItemForm },
        { name: 'application-allowances', field: ApplicationAllowanceForm },
        { name: 'application-activity-items', field: ApplicationItemForm },
        { name: 'application-attendees', field: ApplicationAttendeesForm },
        { name: 'application-me', field: ApplicationMEForm },
        { name: 'application-activity-attendees', field: ApplicationAttendeesForm },
        { name: 'sports-categories', field: SportsCategoriesForm },
        { name: 'organizations', field: OrganizationForm },
        { name: 'organization-roles', field: OrganizationRolesForm },
        { name: 'organization-budgets', field: OrganizationBudgetForm },
        // budget acitivity details
        { name: 'organization-budget-activity-items', field: OrganizationBudgetActivityItem },
        { name: 'organization-budget-activity-attendees', field: OrganizationBudgetActivityAttendee },
        { name: 'organization-budget-activity-allowances', field: OrganizationAcitivityAllowance },
        // end of organization budget activity details
        { name: 'organization-members', field: OrganizationMembersForm },
        { name: 'organization-financial-years', field: FinancialYearForm },
        { name: 'organization-budget-activities', field: OrganizationBudgetActivitiesForm},
        { name: 'organization-bank-accounts', field: OrganizationBankAccountForm },
        { name: 'application-alternate-funding-sources', field: ApplicationAlternateFundingSourcesForm },
    ]

    getFields(store) {
        return _.find(this.formConfig, { 'name': store });
    }

    checkConfirmPassword(control, cmpt) {
        return control.value === cmpt.formModel.password;
    }

    getPassword(cmpt) {
        const validators = {
            fieldMatch: {
                expression: (control) => 
                    this.checkConfirmPassword(control, cmpt),
                    message: `Password does not match`,
            }
        };
        // const expressionProperties = {
        //     'templateOptions.disabled': () =>
        //         !cmpt.form.get('password').valid,
        // };
        const lifecycle = {
            onInit: (form, field) => {
                form.get('password').valueChanges.pipe(
                    takeUntil(cmpt.onDestroy$),
                    tap(() => {
                        field.formControl.
                        updateValueAndValidity();
                    }),
                ).subscribe();
            },
        };
        return {
            validators,
            // expressionProperties,
            lifecycle
        };
    }

    setPassword(cmpt) {
        const passConfs = this.getPassword(cmpt);
        const passKeys = keys(passConfs);
        each(passKeys, aKey => {
            console.log(aKey);
            cmpt.fields[5][aKey] = passConfs[aKey];
        });
    }
}