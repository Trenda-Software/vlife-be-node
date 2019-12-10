import Sequelize from 'sequelize';

const PaisModel = (sequelize: any) => {
    const Pais = sequelize.define(
        'Pais',
        {
            idPais: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nombre: Sequelize.STRING,
            codigo: Sequelize.STRING,
        },
        { timestamps: false }
    );

    Pais.associate = (models: any) => {
        Pais.hasMany(models.Usuario);
    };

    return Pais;
};

export default PaisModel;
