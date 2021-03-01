import { Component }  from '@angular/core';

@Component({
    selector: 'questionnaire-list',
    styleUrls: ['questionnaire-list.component.scss'],
    templateUrl: 'questionnaire-list.component.html',
})

export class QuestionnaireList {
    list: Array<any> = [
        {
            name: 'County Livelihood Zoning',
            responses: 20,
            created: new Date(),
        },
        {
            name: 'County Livelihood Zoning By Wealth Group',
            responses: 50,
            created: new Date(),
        }
    ];
}