import { zodiosNextApp } from '@zodios/express';

import { router } from '@recipes';

export const app = zodiosNextApp();
app.use('/api', router);
