import { Zodios } from '@zodios/core';
import { definition } from './definition';

export const client = new Zodios('http://localhost:4200/api', definition);
