module.exports = (sequelize, DataTypes) => {
    return sequelize.define('list_master', {
        LIST_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        LIST_TITLE: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        LIST_CONTENT: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        LIST_COMPLETE: {
            type: DataTypes.INTEGER,
            defaultValue: sequelize.literal('0'),
            allowNull: false,
        },
        LIST_CREATED_TIME: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
        LIST_EXPIRE: {
            type: 'TIMESTAMP',
            allowNull: true,
        },
        LIST_PRIORITY: {
            type: 'TIMESTAMP',
            allowNull: true,
        },
    }, {
            timestamps: false,
            tableName : 'list_master'
        });
};