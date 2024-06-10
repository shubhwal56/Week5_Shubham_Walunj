
import { Request, Response } from 'express';
import { generateToken } from '../utils/jwtUtils';
import Employee from '../entity/employee';
import Shift from '../entity/shift';
import Timesheet from '../entity/timesheet';
import bcrypt from 'bcryptjs';
import { generateTimesheetReport } from '../service/projectService'; 

export const registerEmployee = async (req: Request, res: Response) => {
  const { name, email, password, assignedShiftHours, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const employee = await Employee.create({ name, email, password: hashedPassword, assignedShiftHours, role });
    res.status(201).json(employee);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

export const loginEmployee = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const employee = await Employee.findOne({ where: { email } });
    if (employee && await bcrypt.compare(password, employee.password)) {
      const token = generateToken(employee.id);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const startShift = async (req: Request, res: Response) => {
  const { employeeId } = req.body;
  try {
    const shift = await Shift.create({ employeeId, startTime: new Date() });
    res.status(201).json(shift);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

export const endShift = async (req: Request, res: Response) => {
  const { shiftId } = req.body;
  try {
    const shift = await Shift.findByPk(shiftId);
    if (shift) {
      shift.endTime = new Date();
      shift.actualHours = (shift.endTime.getTime() - shift.startTime.getTime()) / 3600000; 
      await shift.save();
      res.status(200).json(shift);
    } else {
      res.status(404).json({ error: 'Shift not found' });
    }
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

export const addTimesheetEntry = async (req: Request, res: Response) => {
  const { employeeId, shiftId, projectName, taskName, fromDate, toDate } = req.body;
  try {
    const timesheet = await Timesheet.create({ employeeId, shiftId, projectName, taskName, fromDate, toDate });
    res.status(201).json(timesheet);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

export const generateReport = async (req: Request, res: Response) => {
  try {
    const report = await generateTimesheetReport(); 
    res.status(200).json(report);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
