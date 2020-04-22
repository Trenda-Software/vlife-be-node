import Sequelize from 'sequelize';

const ServicePaymentModel = (sequelize: any) => {
    const ServicePayment = sequelize.define('ServicePayment', {
        name: Sequelize.STRING,
        currencyId: Sequelize.STRING,
        dateApproved: Sequelize.DATE,
        dateCreated: Sequelize.DATE,
        idTransaction: Sequelize.DECIMAL,
        operationType: Sequelize.STRING,
        paymentMethodId: Sequelize.STRING,
        paymentTypeId: Sequelize.STRING,
        status: Sequelize.STRING,
        statusDetail: Sequelize.STRING,
        transactionAmount: Sequelize.DECIMAL(10, 2),
    });

    return ServicePayment;
};

export default ServicePaymentModel;
