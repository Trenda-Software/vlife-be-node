import Sequelize from 'sequelize';

const CommentModel = (sequelize: any) => {
    const Comment = sequelize.define('Comment', {
        comment: Sequelize.STRING,
        like: Sequelize.INTEGER,
    });

    return Comment;
};

export default CommentModel;
