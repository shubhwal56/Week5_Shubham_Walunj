
import Employee from '../entity/employee';
import Shift from '../entity/shift';
import Timesheet from '../entity/timesheet';
import Claims from '../entity/claims';

export const findEmployeeByEmail = async (email: string) => {
  return await Employee.findOne({ where: { email } });
};

export const createEmployee = async (employeeData: any) => {
  return await Employee.create(employeeData);
};

export const createShift = async (shiftData: any) => {
  return await Shift.create(shiftData);
};

export const findShiftById = async (shiftId: string) => {
  return await Shift.findByPk(shiftId);
};

export const updateShift = async (shift: any, updateData: any) => {
  return await shift.update(updateData);
};

export const createTimesheet = async (timesheetData: any) => {
  return await Timesheet.create(timesheetData);
};

export const generateTimesheetReport = async () => {
  try {
    const timesheets = await Timesheet.findAll();

    if (!timesheets || timesheets.length === 0) {
      return [];
    }

    const reportData: { [key: string]: any[] } = {};

    timesheets.forEach((timesheet: any) => {
      const { employeeId, projectName, taskName, fromDate, toDate } = timesheet;
      const entry = { projectName, taskName, fromDate, toDate };

      if (!reportData[employeeId]) {
        reportData[employeeId] = [entry];
      } else {
        reportData[employeeId].push(entry);
      }
    });

    const report: any[] = [];
    for (const employeeId in reportData) {
      const entries = reportData[employeeId];
      report.push({ employeeId, entries });
    }

    return report;
  } catch (error) {
    throw new Error('Failed to generate timesheet report');
  }
};