module.exports = (sequelize, DataTypes) => {
    const Manager = sequelize.define('managers', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        avatar: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        fullName: {
            type: DataTypes.TEXT,
            allowNull: false,
            filed: 'full_name'
        },
        accountId: {
            type: DataTypes.UUID,
            allowNull: false,
            filed: 'account_id'
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: false
        },
        nationality: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at'
        }
    });

    Manager.associate = (models) => {
        
        Manager.belongsTo(models.accounts, {
            foreignKey: 'accountId',
            targetKey: 'id',
            as: 'manager_account',
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        });
    }

    return Manager;
};