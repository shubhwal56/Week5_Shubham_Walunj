
import { Router } from 'express';
import { registerEmployee, loginEmployee, startShift, endShift, addTimesheetEntry, generateReport } from '../controller/projectController';

const router = Router();

router.post('/register', registerEmployee);
router.post('/login', loginEmployee);
router.post('/shift/start', startShift);
router.post('/shift/end', endShift);
router.post('/timesheet', addTimesheetEntry);
router.get('/report', generateReport);

export default router;
