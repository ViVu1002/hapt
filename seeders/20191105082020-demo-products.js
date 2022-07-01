'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
    name :'Hến',
    categoriesId :  4,
    picture:'https://media-ak.static-adayroi.com/400_400/80/h7d/h4e/9623097507870.jpg',
    price: 16800 ,
    description:'Sản phẩm có thể cắt nhỏ hoặc làm sạch tùy vào khối lượng',
    detail:'Các thực phẩm tươi do VinMart cung cấp luôn được chọn lọc kỹ càng từ những cơ sở uy tín, đảm bảo vệ sinh an toàn vệ sinh.',
    order_time: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Products', null, {});
  }
};
