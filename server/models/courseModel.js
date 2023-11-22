module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define("course", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'category', 
                key: 'id'
            }
        },
        status: {
            type: DataTypes.ENUM('Free', 'Subscription', 'Locked', 'Paid')
        },
        teacher: {
            type: DataTypes.STRING
        },
        video_link: {
            type: DataTypes.STRING
        }
    })
    return Course
}