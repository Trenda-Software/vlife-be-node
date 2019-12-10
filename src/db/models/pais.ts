'use strict';

module.exports = (sequelize: any, DataTypes: any) => {
    const Pais = sequelize.define('Pais', {
        nombre: DataTypes.STRING,
        codigo: DataTypes.STRING,
    });

    Pais.associate = (models: any) => {
        Pais.hasMany(models.Usuario);
    };

    return Pais;
};
