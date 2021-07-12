import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'app/services/excel.service';
import { DataLayerService } from 'app/services/http/dataLayer.service';
import { get, has, isArray, keys, lastIndexOf, startCase } from 'lodash';
import { countyReportsConfigs, monthsList } from '../constants/county-reports-configs.constant';

@Component({
    selector: 'raw-data',
    templateUrl: 'raw-data.component.html',
    styleUrls: ['raw-data.component.scss',
        '../reports-wrapper/reports-wrapper.component.scss'],
    providers: [DataLayerService, ExcelService],
})

export class RawDataComponent implements OnInit {
    data: any = [];
    countyData: any = [];
    activeTab: number = 0;
    questDetails: any = {};
    headerConfig: Array<any> = [
        { name: 'Questionnaire' },
        { name: 'User' },
        { name: 'County' },
        { name: 'Livelihoodzone' },
        { name: 'Wealth Group' },
    ];

    countyHeaderConfig: Array<any> = [
        { name: 'Questionnaire' },
        { name: 'User' },
        { name: 'County' },
        { name: 'Livelihoodzone' },
    ];
    monthsList: Array<any> = monthsList;
    countyReportsSections: any = countyReportsConfigs;

    reportSections: any = {
        header: [
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
        ],
        incomeAndFoodSourceResponses: {
            title: 'MAIN SOURCES OF INCOME AND FOOD',
            content: [
                { label: 'Livestock Production (including meat, milk, hides, skins, and by products/manure, pasture)', key: 'livestockProduction' },
                { label: 'Poultry Production including meat and egg production', key: 'poultryProduction' },
                { label: 'Pasture/Fodder crop production', key: 'pastureFodderProduction' },
                { label: 'Cash crop production', key: 'cashCropProduction' },
                { label: 'Food production', key: 'foodCropProduction' },
                { label: 'Casual wedge labor', key: 'casualOrWagedLabour' },
                { label: 'Formal wedge labor', key: 'formalWagedLabour' },
                { label: 'Fishing', key: 'fishing' },
                { label: 'Hunting and gathering', key: 'huntingAndGathering' },
                { label: 'Small Business', key: 'smallBusiness' },
                { label: 'Firewood or charcoal', key: 'firewoodOrCharcoal' },
                { label: 'Petty Trading', key: 'pettyTrading' },
                { label: 'Remittance', key: 'remittance' },
                { label: 'Bodaboda', key: 'bodaboda' },
                { label: 'Bee Keeping', key: 'beeKeeping' },
                { label: 'Sand Harvesting', key: 'sandHarvesting' },
                { label: 'Other', key: 'other.value' },
            ]
        },
        foodConsumptionResponses: {
            title: 'TYPES OF FOOD',
            header: ['Own Farm', 'Market Food Purchase', 'Gifts'],
            content: [
                { label: 'Beans', key: 'beans' },
                { label: 'Cooking Fat', key: 'cookingFats' },
                { label: 'Eggs', key: 'eggs' },
                { label: 'Fish', key: 'fish' },
                { label: 'Maize and Posho', key: 'maizeAndPosho' },
                { label: 'Milk', key: 'milk' },
                { label: 'Pulses', key: 'pulses' },
                { label: 'Rice', key: 'rice' },
                { label: 'Sorghum or millet', key: 'sorghumOrMillet'},
                { label: 'Rice', key: 'spices' },
                { label: 'Vegetables', key: 'vegetables'},
                { label: 'Wheat or barley', key: 'wheatOrBarley'},
                { label: 'White roots', key: 'whiteRoots'},
            ],
        },
        cropContributionResponseItems: {
            title: 'CROP PRODUCTION - CRO CONTRIBUTION',
            header: [
                'Cash Income Rank', 
                'Cash Income Approx %age', 
                'Food Consumption Rank', 
                'Food Consumption Approx %age'
            ],
            content: [],
        },
        livestockContributionResponses: {
            title: 'LIVESTOCK AND POULTRY OWNERSHIP',
            header: [],
            rows: [],
            content: [],
            contentKeys: {},
        },
        labourPatternResponses: {
            title: 'LABOR PATTERNS',
            header: ['Women', 'Men'],
            content: [
                { label: 'Begging', key: 'begging' },
                { label: 'Commercial sex work', key: 'commercialSexWork' },
                { label: 'Domestic unpaid work', key: 'domesticUnpaidWork' },
                { label: 'Fishing', key: 'fishing' },
                { label: 'Formal employement', key: 'formalEmployment' },
                { label: 'Hunting and gathering', key: 'huntingAndGathering' },
                { label: 'Inactivity', key: 'inactivity' },
                { label: 'Leisure', key: 'leisure' },
                { label: 'Livestock husbandry', key: 'livestockHusbandry' },
                { label: 'Low skilled non-farm labor', key: 'lowSkilledNonFarmLabour' },
                { label: 'Owan farm crop production', key: 'ownFarmCropProduction' },
                { label: 'Skilled labor', key: 'skilledLabour' },
                { label: 'Trading', key: 'trading' },
                { label: 'Transport services', key: 'transportServices' },
                { label: 'Waged labor on farms', key: 'wagedLabourOnFarms' },
            ],
        },
        expenditurePatternsResponses: {
            title: 'EXPENDITURE PATTERNS',
            header: [' ', ' '],
            content: [],
        },
        migrationPatternResponses: {
            title: 'SETTLEMENT AND MIGRATION ',
            header: ['', ''],
            content: [],
        },
        constraintsResponses: {
            title: 'CONSTRAINTS TO MAIN ECONOMIC ACTIVITIES',
            header: [' ', ' '],
            content: [],
        },
        fdgParticipants: {
            title: 'FGD PARTICIPANTS',
            header: ['Name', 'Age', 'Gender', 'Disability', 
                'Education Level', 'Consent To Participate'],
            contentKeys: [
                { key: 'participantName'},
                { key: 'age' },
                { key: 'gender' },
                { key: 'disability' },
                { key: 'levelOfEducation' },
                { key: 'consentToParticipate' },
            ],
            content: [],
        }
    }

    constructor(
        private _dataLayer: DataLayerService,
        private _excelService: ExcelService) {}

    getVal = (key, preKey) => {  
        key = preKey ? `${preKey}.${key}` : key;
        return get(this.questDetails, key, 'Not provided');
    };

    getItemVal = (key, item) => { return get(item, key, 'Not provided') }
    toSentenceCase = (str) => { return startCase(str) }

    downLoadResponse(type, quest) {
        const store = type;
        const questId = quest['questionnaireUniqueId'];
        const countyName = quest['countyName'];

        const processKeys = () => {
            const keyValArrs = ['expenditurePatternsResponses', 
                'migrationPatternResponses'];
            const deepKeyValArrs = ['constraintsResponses'];

            keyValArrs.forEach(keyTitle => {
                const keyArr = keys(this.questDetails[keyTitle]);
                this.reportSections[keyTitle].content = 
                    keyArr.map(aKey => {
                        return {
                            label: startCase(aKey),
                            value: this.questDetails[keyTitle][aKey]
                        }
                    });
            });

            deepKeyValArrs.forEach(keyTitle => {
                const subTitleKeys = keys(this.questDetails[keyTitle]);
                this.reportSections[keyTitle].content = 
                subTitleKeys.map(subKey => {
                        const keyStr = `${keyTitle}.${subKey}`;
                        const subVal = get(this.questDetails, keyStr, null);
                        const subValKeys = keys(subVal);
                        return {
                            title: startCase(subKey),
                            value: subValKeys.map(key => {
                                return {
                                    label: startCase(key),
                                    value: subVal[key],
                                }
                            })
                        }
                    })
            });
        }

        const processLSContrib = () => {
            const mainKey = 'livestockContributionResponses';
            const keysArr = keys(this.questDetails[mainKey]);
            const contentKeys = keys(this.questDetails[mainKey]['beeHives']);
            this.reportSections[mainKey].header = contentKeys.map(
                aKey => startCase(aKey));
            this.reportSections[mainKey].rows = [
                'label',
                ...contentKeys.map(aKey => aKey)
            ];
            this.reportSections[mainKey].content = keysArr.map(
                aKey => { 
                    return {
                        label: startCase(aKey),
                        ...this.questDetails[mainKey][aKey],
                    }
                });
        }

        const processCountyKeys = () => {
            const arrayKey = ['ethnicGroupResponseList', 
                'hazardResponses', 'waterSourceResponses', 
                'marketTransactionItems'
            ];
            const objectKeys = ['hungerPatternsResponses'];
            const nestedKeysArr = ['animalRustling', 'boreholes'];
            const complexArr = ['lzCropProductionResponses'];

            const objNestedArrKeys = ['livelihoodZoneSeasonsResponses'];

            arrayKey.forEach(mainKey => {
                if (this.questDetails[mainKey].length &&
                    isArray(this.questDetails[mainKey])) {
                        const arrKeys = keys(this.questDetails[mainKey][0]);
                        this.countyReportsSections[mainKey].header = 
                            arrKeys.map(aKey => startCase(aKey));
                        this.countyReportsSections[mainKey].rows = 
                            arrKeys.map(aKey => aKey);
                        this.countyReportsSections[mainKey].content =
                            this.questDetails[mainKey];
                }
                nestedKeysArr.forEach(nestedKey => {
                    if (has(this.questDetails[mainKey], nestedKey)) {
                        const keysArr = keys(this.questDetails[mainKey]);
                        const contentKeys = keys(this.questDetails[mainKey][nestedKey]);
                        this.countyReportsSections[mainKey].header = contentKeys.map(
                            aKey => startCase(aKey));
                        this.countyReportsSections[mainKey].rows = [
                            'label',
                            ...contentKeys.map(aKey => aKey)
                        ];
                        this.countyReportsSections[mainKey].content = keysArr.map(
                            aKey => { 
                                return {
                                    label: startCase(aKey),
                                    ...this.questDetails[mainKey][aKey],
                                }
                            });
                    }
                })
            });

            objectKeys.forEach(aKey => {
                const arrKeys = keys(this.questDetails[aKey]);
                this.countyReportsSections[aKey].content = arrKeys.map(key => {
                    return {
                        label: startCase(key),
                        value: this.questDetails[aKey][key],
                    }
                })
            });

            objNestedArrKeys.forEach(aKey => {
                const arrKeys = keys(this.questDetails[aKey]);
                const seasonsKeys = ['dry', 'longRains', 'shortRains'];
                this.countyReportsSections[aKey].seasonContent = 
                    arrKeys.filter(item => lastIndexOf(seasonsKeys, item) >= 0)
                        .map(key => {
                            return {
                                label: startCase(key),
                                value: this.questDetails[aKey][key],
                            }
                        });
                this.countyReportsSections[aKey].content = 
                    arrKeys.filter(item => lastIndexOf(seasonsKeys, item) < 0)
                        .map(key => {
                            return {
                                label: startCase(key),
                                value: this.questDetails[aKey][key],
                            }
                        });
            });

            complexArr.forEach(aKey => {
                const valKey = `${aKey}.cropProductionResponses`;
                const dataCont = get(this.questDetails, valKey);
                if (isArray(dataCont) && dataCont.length) {
                    const keysArr = keys(dataCont[0]);
                    const excemptKeys = [
                        'harvestingPeriod', 'landPreparationPeriod', 
                        'plantingPeriod'
                    ];
                    this.countyReportsSections[aKey].content = 
                        dataCont.map(crop => {
                            const val = {
                                value: [],
                            };
                            keysArr.filter(item => lastIndexOf(excemptKeys, item) < 0)
                            .forEach(nestedKey => {
                                if (nestedKey === 'crop') {
                                    val.value.push(get(crop, 'crop.cropName'));
                                } else {
                                    keys(crop[nestedKey]).filter(item => 
                                        item !== 'irrigatedAverageYieldPerHa')
                                        .forEach(otherKey => {
                                            const nestValKey = `${nestedKey}.${otherKey}`;
                                            val.value.push(get(crop, nestValKey).value);
                                    });
                                }
                            });
                            return val;
                        });
                    excemptKeys.forEach(exKey => {
                        this.countyReportsSections[exKey] = dataCont.map(crop => {
                            return {
                                label: get(crop, 'crop.cropName'),
                                value: get(crop, exKey),
                            }
                        })
                    })
                }
            });

        }

        this._dataLayer.get(store, questId)
            .subscribe(resp => {
                this.questDetails = { 
                    ...resp, 
                    'countyName': countyName,
                    'userDetails': quest['userDetails']
                };
                this.reportSections['cropContributionResponseItems'].content
                    = this.questDetails['cropContributionResponseItems'];
                this.reportSections['fdgParticipants'].content = 
                    this.questDetails['fdgParticipants'];
                if (store === 'wealth-group-responses') {
                    processKeys();
                    processLSContrib();
                } else {
                    processCountyKeys()
                }
                setTimeout(() => window.print(), 300);
            }, err => console.log(err));
    }

    selectTab(tab) {
        this.activeTab = tab['index'];
        this.activeTab === 1
            ? this.fetchCountyResponses()
            : this.fetchWealthGroupResponses()
    }

    tabSelected = (tab) => this.selectTab(tab);

    fetchCountyResponses() {
        this._dataLayer.list('county-questionnaire-id', {})
            .subscribe(resp => {
                this.countyData = resp;
            }, err => console.log(err));
    }

    fetchWealthGroupResponses() {
        this._dataLayer.list('wealth-group-questionnaire-id', {})
            .subscribe(resp => {
                this.data = resp;
            }, err => console.log(err));
    }

    exportExcel(store, resp) {
        const responses = this._excelService.fetchResponse(store, resp);
        responses.subscribe(result => {
            this._excelService.formatAndExportData(result);
        });
        // this._excelService.generateExcel();
    }

    ngOnInit() {
        this.fetchWealthGroupResponses();
        this.fetchCountyResponses();
    }
}