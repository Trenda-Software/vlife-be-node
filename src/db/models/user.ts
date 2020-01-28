import Sequelize from 'sequelize';

const UserModel = (sequelize: any) => {
    const User = sequelize.define(
        'user',
        {
            idUser: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nombre: Sequelize.STRING,
            clave: Sequelize.STRING,
            coordenadas: Sequelize.STRING,
            apellido: Sequelize.STRING,
            foto: Sequelize.STRING,
            mail: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            celular: Sequelize.STRING,
            ciudad: Sequelize.STRING,
            direccion: Sequelize.STRING,
        },
        { tableName: 'user' }
    );

    return User;
};

export default UserModel;
