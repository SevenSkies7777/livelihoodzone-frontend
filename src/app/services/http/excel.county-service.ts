import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

import * as fs from 'file-saver';
import { ReportConfig } from 'app/features/dashboard/constants/reports-configs.constant';
import { Fill, Font, Workbook } from 'exceljs';
import { get, has, isArray, keys, lastIndexOf, startCase } from 'lodash';
import { map } from 'rxjs/operators';
import { monthsList } from 'app/features/dashboard/constants/county-reports-configs.constant';

@Injectable()
export class ExcelCountyLevelService {
    titleStlyle = {
        name: 'Roboto Light',
        family: 4, size: 14, 
        underline: 'single', bold: true 
    };
    monthsList = monthsList;
    seasonCropsVal: any;

    constructor(private datePipe: DatePipe) {}

    ethnicGroupProcess(worksheet, key, data) {
        worksheet.addRow([]);
        let titleRow = worksheet.addRow(['G. ETHNIC GROUP RESPONSES']);
        titleRow.font = this.titleStlyle;
        const dataCont = get(data, key, []);

        const valKeysArr = ['ethnicGroupModel.ethnicGroupName', 
            'populationPercentage'];
        dataCont.forEach(item => {
            const dataArrCont = [];
            valKeysArr.forEach(aKey => { 
                dataArrCont.push(get(item, aKey, 'Not provided'));
            });
            worksheet.addRow(dataArrCont);
        });
    }

    cropProductionProcess(worksheet, key, data) {
        const valKey = `${key}.cropProductionResponses`;
        const dataCont = get(data, valKey);
        const keysArr = keys(dataCont[0]);
        const excemptKeys = ['harvestingPeriod', 
            'landPreparationPeriod', 'plantingPeriod'];
        const cropArray =  dataCont.map(crop => {
            const val = { value: [] };
            keysArr.filter(item => lastIndexOf(excemptKeys, item) < 0)
            .forEach(nestedKey => {
                if (nestedKey === 'crop') {
                    val.value.push(get(crop, 'crop.cropName'))
                } else {
                    keys(crop[nestedKey])
                    .filter(item => item !== 'irrigatedAverageYieldPerHa')
                    .forEach(otherKey => {
                        const nestValKey = `${nestedKey}.${otherKey}`;
                        val.value.push(get(crop, nestValKey).value);
                    });
                }
            });
            worksheet.addRow(val.value);
            return val;
        });
        let excropArr = [];
        excropArr = excemptKeys.map(exKey => [
            startCase(exKey),
            ...dataCont.map(crop => {
                return [
                    get(crop, 'crop.cropName'),
                    get(crop, exKey),
                ]
            })
        ]);
        this.seasonCropsVal = excropArr;
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
            content: val.map(item => {
                const valArr =  contentKeys.map(aKey => 
                    get(item, aKey));
                return valArr;
            }),
        }
    }

    generateExcel(key, data, worksheet) {
        const addTitleRow = (title) => {
            worksheet.addRow([]);
            let titleRow = worksheet.addRow([title]);
            titleRow.font = {
                name: 'Roboto Light',
                family: 4, size: 14, 
                underline: 'single', bold: true 
            };
        };

        const addSectionHeaders = (sectionHeaders, noTopRow?) => {
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

        const processMap = (key) => {
            const dataCont = data[key];
            const keysArr = keys(dataCont);
            keysArr.forEach(aKey => {
                const formattedArr = [startCase(aKey), dataCont[aKey]];
                worksheet.addRow(formattedArr);
            });
        }

        const processNestedKeys = (nKey) => {
            const dataCont = get(data, nKey);
            const keysArr = keys(dataCont);
            keysArr.forEach(item => {
                const val = get(data, `${nKey}.${item}`);
                const nestedKeys = keys(val);
                const resultArr =  [
                    startCase(item),
                    ...nestedKeys.map(aKey => 
                        get(data, `${nKey}.${item}.${aKey}`, 'Not provided')),
                ]
                worksheet.addRow(resultArr);
            });
        }

        const subHeader = (objKey) => {
            const dataCont = get(data, objKey);
            const objKeysArr = keys(dataCont);
            objKeysArr.forEach(aKey => {
                const rowData = [];
                rowData.push(startCase(aKey));
                let val = get(data, `${objKey}.${aKey}`);
                val = isArray(val) ? val[0] : (val)+'%';
                rowData.push(val);
                worksheet.addRow(rowData);
            });
        }

        switch (key) {
            case 'wealthGroupCharectariticsResponses':
                addTitleRow('WEALTH GROUP CHARACTERISTICS RESPONSES');
                subHeader('wealthGroupCharectariticsResponses');
                break;
            case 'wealthGroupResponse':
                addTitleRow('WEALTH GROUP PERCENTAGES');
                subHeader('wealthGroupResponse');
                break;
            case 'lzCropProductionResponses':
                addTitleRow('D. CROP PRODUCTION RESPONSE');
                addSectionHeaders(['', 'Long Rains', '', '', 
                    'Short Rains', '', '']);
                addSectionHeaders(['Crop', 'Rainfed %age cultivated area', 
                    'Rainfed avg yield per HA', 
                    'Irrigated %age cultivated area', 
                    'Rainfed %age cultivated area', 
                    'Rainfed avg yield per HA', 
                    'Irrigated %age cultivated area'], true);
                this.cropProductionProcess(worksheet, 
                    'lzCropProductionResponses', data);
                break; 
            case 'waterSourceResponses':
                addTitleRow('E. WATER SOURCE RESPONSES');
                addSectionHeaders(['', 'Wet Season Population', 
                    'Dry Season Population Response', 'Extra Description']);
                processNestedKeys('waterSourceResponses');
                break;
            case 'marketTransactionItems':
                addTitleRow('F. MARKET TRANSACTIONS');
                const mData = this.configMapResp(
                    data, 'marketTransactionItems');
                mData.headers.shift();
                addSectionHeaders(mData.headers);
                addListDataRows(mData.content);
                break;
            case 'ethnicGroupResponseList':
                this.ethnicGroupProcess(worksheet, key, data);
                break;
            case 'hungerPatternsResponses':
                addTitleRow('H. HUNGER PATTERNS RESPONSES');
                addSectionHeaders(['Season', 
                    'No of Years of Widespread Hunger']);
                processMap('hungerPatternsResponses');
                break;
            case 'hazardResponses':
                addTitleRow('I. HAZARD RESPONSES');
                addSectionHeaders(['', 'Importance Rank', 
                    'No Experience Years', 'Extra Description']);
                processNestedKeys('hazardResponses');
                break;
            case 'livelihoodZoneSeasonsResponses':
                addTitleRow('J. SEASON RESPONSES');
                this.formatSeasonResponses(worksheet, data, key);
                break;
            default:
                console.log(key);
                break;
        }
    }

    formatSeasonResponses(worksheet, data, key?) {
        key = key || 'livelihoodZoneSeasonsResponses';

        const seasonsKeys = ['dry', 'longRains', 'shortRains'];
        const arrKeys = keys(get(data, key));
        let seasonsData = arrKeys.filter(
            item => lastIndexOf(seasonsKeys, item) >= 0 
            || lastIndexOf(seasonsKeys, item) < 0)
                .map(aKey => {
                    return {
                        label: startCase(aKey),
                        value: get(data, `${key}.${aKey}`)
                    }
                });
        const seasonsRow = seasonsData.map(season => {
            return [
                season.label,
                ...season.value.map(month => month.monthId),
            ];
        });
        const addMonthsHeaders = (label) => {
            const headerArr = [
                label,
                ...monthsList.map(month => month.monthName.slice(0, 3))
            ];
            worksheet.addRow([]);
            worksheet.addRow(headerArr);
        }

        const stlyeCell = (season, aRow) => {
            let arrCont = season;
                arrCont.shift();                
                arrCont.forEach(val => {
                    let cell = aRow.getCell(val + 1);
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: '008080' }
                    }
                });
        }

        const addMonthRows = () => {
            seasonsRow.forEach(season => {
                const rowCont = [
                    season[0],
                    ...monthsList.map(month => '')
                ];
                let aRow = worksheet.addRow(rowCont);
                stlyeCell(season, aRow);
            })
        }
        addMonthsHeaders('Seasons');
        addMonthRows();

        worksheet.addRow([]);
        this.seasonCropsVal.forEach(prepSeason => {
            addMonthsHeaders(prepSeason[0]);
            const seasonObj = prepSeason;
            seasonObj.shift();
            seasonObj.forEach(season => {
                const rowCont  = [
                    season[0],
                    ...monthsList.map(month => ''),
                ];
                let aRow = worksheet.addRow(rowCont);
                
                let arrCont = season[1];
                if (isArray(arrCont) && arrCont.length > 0) {
                    arrCont.forEach(val => {
                        const countVal = val['monthId'];
                        let cell = aRow.getCell(countVal + 1);
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: '008080' },
                        }
                    });
                }
            })
        })
    }

    formatData(data, countyName) {
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet('County Response');

        const processData = (mainKey) => {
            this.generateExcel(mainKey, data, worksheet);
        }
        const title = `${get(data, 'questionnaireName')}`;
        let titleRow = worksheet.addRow([title]);

        titleRow['font'] = this.titleStlyle as Partial<Font>;
        worksheet.addRow([]);

        const subHeader = () => {
            worksheet.addRow([]);
            const configs = [
                { label: 'County Name', key: 'countyName' },
                { label: 'Questionnaire Unique ID', key: 'uniqueId' },
                { 
                    label: 'Livelihoodzone', 
                    key: 'selectedLivelihoodZone.livelihoodZoneName' 
                },
                { label: 'Questionnaire Name', key: 'questionnaireName' },
                { label: 'Latitude', key: 'latitude' },
                { label: 'Longitude', key: 'longitude' },
            ];
            configs.forEach(row => {
                const arrRow = [
                    row.label,
                    row.key === 'countyName' 
                        ? countyName 
                        : get(data, row.key),
                ];
                worksheet.addRow(arrRow);
            });
            worksheet.addRow([]);
        }
        subHeader();
        const dataKeys = keys(data);

        dataKeys.forEach(aMainKey => processData(aMainKey));

        // this.formatSeasonResponses(worksheet, data);

        worksheet.mergeCells('A1:L2');
        workbook.xlsx.writeBuffer().then((data) => {
            let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            fs.saveAs(blob, `${title}.xlsx`);
        });
    }
}