import * as _ from 'lodash';

export const isNull = (value) => _.isNull(value);

export const isUndefined = (value) => _.isUndefined(value);

export const isDate = (value) => _.isDate(value);

export const isEmpty = (value) => _.isEmpty(value);

export const isEqual = (value, other) => _.isEqual(value, other);

export const clone = (value) => _.clone(value);

export const pick = (object: object, keys: Array<string>) => _.pick(object, keys);

export const inRange = (number, start, end) => _.inRange(number, start, end);