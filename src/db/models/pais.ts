import Sequelize from 'sequelize';

const PaisModel = (sequelize: any) => {
    const Pais = sequelize.define('Pais', {
        nombre: Sequelize.STRING,
        codigo: Sequelize.STRING,
    });

    Pais.associate = (models: any) => {
        Pais.hasMany(models.Usuario);
    };

    return Pais;
};

export default PaisModel;
