import Sequelize from 'sequelize';

const ProvinciaModel = (sequelize: any) => {
    const Provincia = sequelize.define(
        'Provincia',
        {
            idProvincia: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nombre: Sequelize.STRING,
            codigo: Sequelize.STRING,
        },
        { timestamps: false }
    );

    Provincia.associate = (models: any) => {
        Provincia.hasMany(models.Usuario);
    };

    return Provincia;
};

export default ProvinciaModel;
