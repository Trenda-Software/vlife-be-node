import cucaSiteData from '../../public/data/cuca/siteData_sp_ar.json';

import { SiteSchemaI } from '../types/types';

describe('Sample Test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true);
    });

    it('should be ok with Typescript and match Cuca test data with Schema', () => {
        const data: SiteSchemaI = cucaSiteData;
        expect(data).toBeTruthy();
    });
});
