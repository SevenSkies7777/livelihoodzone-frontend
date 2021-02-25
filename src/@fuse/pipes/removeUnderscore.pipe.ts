import { Pipe, PipeTransform } from '@angular/core';
import { isNull, isUndefined } from 'lodash';

@Pipe({ name: 'removeUnderscore' })

export class RemoveUnderscorePipe implements PipeTransform{
    transform(value: any, args?: any): any {
        return !isNull(value) && !isUndefined(value) ? 
            value.replace(/_/g, ' ') : value;
    }
}