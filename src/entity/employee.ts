
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../postresDB/pgConfig';

class Employee extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public assignedShiftHours!: number;
  public role!: 'SuperAdmin' | 'Manager' | 'Employee';
}

Employee.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assignedShiftHours: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('SuperAdmin', 'Manager', 'Employee'),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Employee',
});

export default Employee;
