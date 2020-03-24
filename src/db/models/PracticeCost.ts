import Sequelize from 'sequelize';
import { DBModelsI } from '../../types/types';

const PracticeCostModel = (sequelize: any) => {
    const Practice = sequelize.define('PracticeCost', {
        cost: Sequelize.DOUBLE,
    });

    return Practice;
};

export default PracticeCostModel;
