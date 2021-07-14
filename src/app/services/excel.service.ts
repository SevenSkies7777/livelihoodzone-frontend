import { DatePipe } from '@angular/common';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Injectable } from '@angular/core';
import { ReportConfig } from 'app/features/dashboard/constants/reports-configs.constant';
import { Fill, Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { find, get, has, keys, startCase } from 'lodash';
import { map } from 'rxjs/operators';
import { DataLayerService } from './http/dataLayer.service';
import { ExcelCountyLevelService } from './http/excel.county-service';

@Injectable()
export class ExcelService {

    constructor(private datePipe: DatePipe,
        private _dataLayer: DataLayerService,
        private _excelCLService: ExcelCountyLevelService,
    ) {}

    configureHeader(resp, countyName) {
        let headerConfigs: Array<any> = [];
        const headers = [
            { label: 'County Name', key: 'countyName' },
            { label: 'Sub-County Name', key: 'questionnaireGeography.selectedSubCounty.subCountyName' },
            { label: 'Ward Name', key: 'questionnaireGeography.selectedWard.wardName' },
            { label: 'SubLocation Name', key: 'questionnaireGeography.selectedSubLocation.subLocationName' },
            { label: 'Livelihood Zone', key: 'questionnaireGeography.selectedLivelihoodZone.livelihoodZoneName' },
            { label: 'Wealth Group', key: 'questionnaireGeography.selectedWealthGroup.wealthGroupName' },
            { label: 'Questionnaire Type', key: 'questionnaireGeography.selectedWgQuestionnaireType.wgQuestionnaireTypeDescription' },
            { label: 'Questionnaire Name', key: 'questionnaireName' },
            { label: 'Latitude', key: 'questionnaireGeography.latitude' },
            { label: 'Longitude', key: 'questionnaireGeography.longitude' },
        ];
        headerConfigs = headers.map(data => {
            const arrRow = [];
            const val = get(resp, data.key, 
                data.key === 'countyName' ? countyName : 'Not provided');
            arrRow.push(data.label);
            arrRow.push(val);
            return arrRow;
        });
        return headerConfigs;
    }

    configMainIncomeSources(resp) {
        const content = ReportConfig.incomeAndFoodSourceResponses;
        return content.map(data => {
            const arrRow = [];
            const key = `incomeAndFoodSourceResponses.${data.key}`;
            const val = get(resp, key, 'Not provided');
            arrRow.push(data.label);
            arrRow.push(val);
            return arrRow;
        });
    }

    configFoodConsumption(resp) {
        const content = ReportConfig.foodConsumptionResponses;
        return content.map(data => {
            const arrRow = [];
            const key = `foodConsumptionResponses.${data.key}`;
            const val1 = get(resp, `${key}.ownFarm`, 'Not provided');
            const val2 = get(resp, `${key}.marketFoodPurchase`, 'Not provided');
            const val3 = get(resp, `${key}.gifts`, 'Not provided');
            arrRow.push(data.label);
            arrRow.push(val1);
            arrRow.push(val2);
            arrRow.push(val3);
            return arrRow;
        });
    }

    configCropContribution(resp) {
        const val = get(resp, 'cropContributionResponseItems', []);
        return val.map(data => {
            return [
                get(data, 'cropModel.cropName', 'Not Provided'),
                get(data, 'cashIncomeRank.actualValue', 'Not Provided'),
                get(data, 'cashIncomeApproxPercentage.actualValue', 'Not Provided'),
                get(data, 'foodConsumptionRank.actualValue', 'Not Provided'),
                get(data, 'foodConsumptionApproxPercentage.actualValue', 'Not Provided'),
            ]
        });
    }

    configNestedMapResp(resp, mainKey) {
        const val = get(resp, mainKey);
        const keysArr = keys(val);
        return keysArr.map(aKey => {
            const contentKeys = keys(get(resp, `${mainKey}.${aKey}`))
            return {
                title: startCase(aKey),
                content: [
                    ...contentKeys.map(key => [
                        startCase(key),
                        get(resp, `${mainKey}.${aKey}.${key}`, '-'),
                    ]
                )],
            }
        })
    }

    configMapResp(resp, mainKey) {
        const val = get(resp, mainKey);
        const keysArr = keys(val);
        const contentKeys = keys(val[keysArr[0]]);
        return {
            headers: [
                '',
                ...contentKeys.map(aKey => startCase(aKey)),
            ],
            content: keysArr.map(aKey => [
                startCase(aKey),
                ...contentKeys.map(key => 
                    get(resp, 
                        `${mainKey}.${aKey}.${key}`, 'Not provided')
                )
            ])
        }
    }

    configArrResp(resp, mainKey) {
        const keysArr = keys(get(resp, mainKey));
        return keysArr.map(key => [
            startCase(key),
            get(resp, `${mainKey}.${key}`, 'Not provided'),
        ]);
    }

    configLSContrib(resp) {
        const mainKey = 'livestockContributionResponses';
        const keysArr = keys(resp[mainKey]);
        const contentKeys = has(resp[mainKey], 'beeHives') 
            ? keys(resp[mainKey]['beeHives'])
            : [];
        return {
            headers: [
                '',
                ...contentKeys.map(aKey => startCase(aKey))],
            content: keysArr.map(aKey => [
                startCase(aKey),
                ...contentKeys.map(key => 
                    get(resp, 
                        `${mainKey}.${aKey}.${key}.actualValue`, 
                        'Not provided'))
            ])
        }
    }

    configParticipant(resp) {
        const contentKeys = [
            {  key: 'participantName' },
            { 
                key: 'age',
                mappedValue: [
                    { key: 1, val: '18-24 years' },
                    { key: 2, val: '25-35 years' },
                    { key: 3, val: '36-49 years' },
                    { key: 4, val: '50-59 years' },
                    { key: 5, val: '60 years and above' },
                ]
            },
            { 
                key: 'gender', 
                mappedValue: [
                    {key: 1, val: 'Male'}, 
                    {key: 2, val: 'Female'}
                ] 
            },
            { key: 'disability' },
            { 
                key: 'levelOfEducation',
                mappedValue: [
                    { key: 1, val: 'Non-formal Education' },
                    { key: 2, val: 'Primary' },
                    { key: 3, val: 'Secondary' },
                    { key: 4, val: 'Post-Secondary' },
                ]
            },
            { 
                key: 'consentToParticipate',
                mappedValue: [
                    {key: 1, val: 'Consented'}, 
                    {key: 2, val: 'Not consented'}
                ] 
            },
        ];
        const mainKey = 'fdgParticipants';
        const val = get(resp, mainKey, []);
        const finalVal = val.map(participant => [
            ...contentKeys.map(aKey => {
                if(has(aKey, 'mappedValue')) {
                    return get(find(aKey.mappedValue, 
                        { key: get(participant, aKey.key)}), 
                            'val', 'Not provided');
                }
                return get(participant, aKey.key, 'Not provided')
            })
        ]);
        console.log(finalVal);
        return finalVal;
    }
    
    fetchResponse(store, quest) {
        const questId = quest['questionnaireUniqueId'];
        const countyName = quest['countyName'];
        const processData = (result) => {
            const data = {
                header: this.configureHeader(result, countyName),
                sectionHeader1: 'B(i) MAIN SOURCES OF INCOME AND FOOD',
                mainSourcesOfIncome: this.configMainIncomeSources(result),
                sectionHeader2: 'B(ii) TYPES OF FOOD',
                foodConsumptionHeaders: ['', 'Own Farm', 'Market Food Purchase', 'Gifts'],
                foodConsumption: this.configFoodConsumption(result),
                sectionHeader3: 'C. CROP PRODCTION - CROP CONTRIBUTION',
                cropContributionHeaders: ReportConfig.cropContributionResponseItemsHeaders,
                cropContributionItems: this.configCropContribution(result),
                sectionHeader4: 'D. LIVESTOCK AND POULTRY OWNERSHIP',
                livestockContributionHeaders: this.configLSContrib(result)['headers'],
                livestockContribution: this.configLSContrib(result)['content'],
                sectionHeader5: 'E. LABOR PATTERNS',
                laborPatternsHeaders: store == 'wealth-group-responses' 
                    ? this.configMapResp(result, 'labourPatternResponses')['headers']
                    : [],
                laborPatterns: store == 'wealth-group-responses'  
                    ? this.configMapResp(result, 'labourPatternResponses')['content']
                    : [],
                sectionHeader6: 'F. EXPENDITURE PATTERNS',
                expenditurePatterns: this.configArrResp(result, 'expenditurePatternsResponses'),
                sectionHeader7: 'G. SETTLEMENT AND MIGRATION',
                migrationPatterns: this.configArrResp(result, 'migrationPatternResponses'),
                sectionHeader8: 'H. CONSTRAINTS TO MAIN ECONOMIC ACTIVITIES',
                constraintsResponses: this.configNestedMapResp(result, 'constraintsResponses'),
                sectionHeader9: 'I. FGD PARTICIPANT',
                fdgParticipantsHeaders: ['Name', 'Age', 'Gender', 
                    'Disability', 'Education Level', 'Consent To Participate'],
                fdgParticipants: this.configParticipant(result),
            };
            this.generateExcel(data, store);
        }
        const processCountyData = (result) => {
            this._excelCLService.formatData(result, countyName);
        }
        return this._dataLayer.get(store, questId)
            .pipe(map(result => store === 'wealth-group-responses' 
                ? processData(result) : processCountyData(result)));
    }

    formatAndExportData(responseDetails) {
        console.log(responseDetails);
    }

    generateExcel(processedData, type) {
        const title = processedData['header'][7][1]
            || 'Car Sell Report';
        const exportData = {
            ...processedData,
            // content: data
        }
        this.addWorkSheet(title, exportData, type);
    }

    addRowSection(key, data, worksheet) {
        const addTitleRow = (title) => {
            worksheet.addRow([]);
            let titleRow = worksheet.addRow([title]);
            titleRow.font = { 
                name: 'Roboto Light',
                family: 4, size: 14, 
                underline: 'single', bold: true 
            };
        };
        const addSectionHeaders = (sectionHeaders) => {
            let headerRow = worksheet.addRow(sectionHeaders);
            headerRow.eachCell((cell, number) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFFFF00' },
                    bgColor: { argb: 'FF0000FF' }
                }
                cell.border = { 
                    top: { style: 'thin' }, 
                    left: { style: 'thin' }, 
                    bottom: { style: 'thin' }, 
                    right: { style: 'thin' } 
                };
            });
        }
        const addListDataRows = (data) => {
            data.forEach(d => {
                let row = worksheet.addRow(d);
            });
        }
        const addNestedListDataRows = (data) => {
            data.forEach(listData => {
                addTitleRow(listData['title']);
                addListDataRows(listData['content']);
            });
        }
        switch (key) {
            case 'mainSourcesOfIncome':
                addTitleRow(data['sectionHeader1']);
                addListDataRows(data['mainSourcesOfIncome']);
                break;
            case 'foodConsumption':
                addTitleRow(data['sectionHeader2']);
                addSectionHeaders(data['foodConsumptionHeaders']);
                addListDataRows(data['foodConsumption']);
                break;
            case 'cropContributionItems':
                addTitleRow(data['sectionHeader3']);
                addSectionHeaders(data['cropContributionHeaders']);
                addListDataRows(data['cropContributionItems']);
                break;
            case 'livestockContribution':
                addTitleRow(data['sectionHeader4']);
                addSectionHeaders(data['livestockContributionHeaders']);
                addListDataRows(data['livestockContribution']);
                break;
            case 'laborPatterns':
                addTitleRow(data['sectionHeader5']);
                addSectionHeaders(data['laborPatternsHeaders']);
                addListDataRows(data['laborPatterns']);
                break;
            case 'expenditurePatterns':
                addTitleRow(data['sectionHeader6']);
                addListDataRows(data['expenditurePatterns']);
                break;
            case 'migrationPatterns':
                addTitleRow(data['sectionHeader7']);
                addListDataRows(data['migrationPatterns']);
                break;
            case 'constraintsResponses':
                addTitleRow(data['sectionHeader8']);
                addNestedListDataRows(data['constraintsResponses']);
                break;
            case 'fdgParticipants':
                addTitleRow(data['sectionHeader9']);
                addSectionHeaders(data['fdgParticipantsHeaders']);
                addListDataRows(data['fdgParticipants']);
                break;
            default:
                // console.log(key, 'Invalid key');
                break;
                // throw Error('Provide a valid option');
        }
    }
    
    addWorkSheet(title, data, type) {
        let cellHeaderPattern = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFFF00' },
            bgColor: { argb: 'FF0000FF' }
        };
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet('Wealth Group Response');

        // Add new row
        let titleRow = worksheet.addRow([title]);
        // Set font, size and style in title row.
        titleRow.font = { name: 'Roboto Light', family: 4, size: 14, underline: 'single', bold: true };
        // Blank Row
        worksheet.addRow([]);
        
        // let logo = workbook.addImage({filename: 'assets/images/logos/logo.png', extension: 'png' });

        // worksheet.addImage(logo, 'E1:F3');
        worksheet.addRow([]);
        data.header.forEach(d => {
            let subheaderRow = worksheet.addRow(d);
            // subheaderRow.eachCell((cell, number) => {
            //     cell.fill = cellHeaderPattern as Fill;
            // });
        });
        worksheet.addRow([]);
        worksheet.addRow([]);

        // -----START OF DYNAMIC SECTIONS----
        // add excel sections dynamically
        if (type === 'wealth-group-responses') {
            const dynamicKeysArr = keys(data);
            dynamicKeysArr.forEach(aKey => this.addRowSection(aKey, data, worksheet));
        }
        // -----END OF DYNAMIC SECTIONS----

        worksheet.mergeCells('A1:L2');

        // adding dynamic sections of the excel export

        workbook.xlsx.writeBuffer().then((data) => {
            let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            fs.saveAs(blob, `${title}.xlsx`);
        });
    }
}