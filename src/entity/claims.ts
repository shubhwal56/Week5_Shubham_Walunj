import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../postresDB/pgConfig';

class Claims extends Model {
  public id!: string;
  public key!: string;
  public value!: string;
  public employeeId!: string;
}

Claims.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employeeId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Claims',
});

export default Claims;
