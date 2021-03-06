import Sequelize from 'sequelize';
import { DBModelsI } from '../../types/types';

const PracticeModel = (sequelize: any) => {
    const Practice = sequelize.define('Practice', {
        code: Sequelize.STRING,
        name: Sequelize.STRING,
        cost: Sequelize.DOUBLE,
        additional_info: Sequelize.BOOLEAN,
    });

    return Practice;
};

export default PracticeModel;
