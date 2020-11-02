module.exports = (sequelize, DataTypes) => (
    sequelize.define(
        'review',
        {
            subject: {
                type: DataTypes.STRING(1000),
                allowNull: false,            
                defaultValue: "",
            }, 
            picture: {
                type: DataTypes.BOOLEAN,
                allowNull: false,     
                defaultValue: false,                          
            },
            rate: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 3,
            }
        }, {
            timestamps: true,   // createdAt, updatedAt 컬럼 추가. 
            paranoid: true,     // deletedAt 컬럼 추가
            // freezeTableName: true,  // 테이블이름과 모델이름을 동일하게 적용
        }        
    )
);
 