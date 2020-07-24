module.exports = (sequelize, DataTypes) => {
    const MatchScore = sequelize.define('matches_scores', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        matchId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'match_id'
        },
        time: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        athleteId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'athlete_id'
        },
        typeScore: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'type_score'
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

    MatchScore.associate = function (models) {
        MatchScore.belongsTo(models.typescores, {
            foreignKey: 'typeScore',
            targetKey: 'code',
            as: 'matches_scores_typescore',
            onDelete: "CASCADE",
            onUpdate: 'CASCADE'
        });
        MatchScore.belongsTo(models.matches_athletes, {
            foreignKey: 'athleteId',
            targetKey: 'athleteId',
            as: 'matches_scores_athlete',
            onDelete: "CASCADE",
            onUpdate: 'CASCADE'
        });
        MatchScore.belongsTo(models.matches, {
            foreignKey: 'matchId',
            targetKey: 'id',
            as: 'matches_scores_match',
            onDelete: "CASCADE",
            onUpdate: 'CASCADE'
        });
    };

    return MatchScore;
};