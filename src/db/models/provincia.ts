import Sequelize from 'sequelize';

const ProvinciaModel = (sequelize: any) => {
    const Provincia = sequelize.define('Provincia', {
        nombre: Sequelize.STRING,
        codigo: Sequelize.STRING,
    });

    Provincia.associate = (models: any) => {
        Provincia.hasMany(models.Usuario);
    };

    return Provincia;
};

export default ProvinciaModel;
