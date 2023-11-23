import { Zodios } from '@zodios/core';
import { definition } from '@recipes';

export const client = new Zodios('http://localhost:4200/api', definition);
