import { sequelize } from './pgConfig';
import Employee from '../entity/employee';
import Shift from '../entity/shift';
import Timesheet from '../entity/timesheet';
import Claim from '../entity/claims';

const initDB = async () => {
  Employee.hasMany(Shift, { foreignKey: 'employeeId' });
  Shift.belongsTo(Employee, { foreignKey: 'employeeId' });

  Employee.hasMany(Timesheet, { foreignKey: 'employeeId' });
  Timesheet.belongsTo(Employee, { foreignKey: 'employeeId' });

  Shift.hasMany(Timesheet, { foreignKey: 'shiftId' });
  Timesheet.belongsTo(Shift, { foreignKey: 'shiftId' });

  Employee.hasMany(Claim, { foreignKey: 'employeeId' });
  Claim.belongsTo(Employee, { foreignKey: 'employeeId' });

  await sequelize.sync(); 
};

export { initDB };
