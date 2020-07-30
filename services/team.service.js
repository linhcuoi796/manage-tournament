const database = require('../models');

class TeamService {
    static async getAllTeams() {
        try {
            return await database.teams.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async addTeam(newTeam) {
        try {
            return await database.teams.create(newTeam);
        } catch (error) {
            throw error;
        }
    }

    static async updateTeam(id, updateTeam) {
        try {
            const teamToUpdate = await database.teams.findOne({
                where: {
                    id: id
                }
            });

            if (teamToUpdate) {
                await database.teams.update(updateTeam, {
                    where: {
                        id: id
                    }
                });
                return updateTeam;
            }
            
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getMatch(id) {
        try {
            const team = await database.teams.findOne({
                where: {
                    id: id
                }
            });

            return team;
        } catch (error) {
            throw error;
        }
    }

    static async deleteTeam(id) {
        try {
            const teamToDelete = await database.teams.findOne({
                where: {
                    id: id
                }
            });

            if (teamToDelete) {
                const deleteTeam = await database.teams.destroy({
                    where: {
                        id: id
                    }
                });
                return deleteTeam;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TeamService;
