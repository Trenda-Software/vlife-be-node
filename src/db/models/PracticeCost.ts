import Sequelize from 'sequelize';
import { DBModelsI } from '../../types/types';

const PracticeCostModel = (sequelize: any) => {
    const PracticeCost = sequelize.define('PracticeCost', {
        cost: Sequelize.DOUBLE,
    });

    return PracticeCost;
};

export default PracticeCostModel;
