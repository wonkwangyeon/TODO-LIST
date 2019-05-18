module.exports = (sequelize, DataTypes) => {
    return sequelize.define('list_master', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        complete: {
            type: DataTypes.INTEGER,
            defaultValue: sequelize.literal('0'),
            allowNull: false,
        },
        created_time: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
        expire: {
            type: 'TIMESTAMP',
            allowNull: true,
        },
        priority: {
            type: 'TIMESTAMP',
            allowNull: true,
        },
    }, {
        timestamps: false,
        tableName: 'list_master'
    });
};