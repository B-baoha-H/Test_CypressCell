/// <reference types="cypress" />

// describe('Test chức năng thanh toán', () => {
//   beforeEach(() => {
//       cy.session('loginSession', () => {
//            cy.visit('https://cellphones.com.vn/');
//            cy.get('input[placeholder="Bạn cần tìm gì?"]').type('oppo{enter}')
//            cy.wait(2000)
//            cy.get('.product-list-filter.is-flex.is-flex-wrap-wrap .product-item')
//            .first()
//            .find("a") // tìm đến thẻ <a> 
//           .click({ force: true })
//            cy.get('.order-button').click({ force: true });
//            cy.get('.group-login-btn > .login-btn').click();
//            cy.get('input[placeholder="Nhập số điện thoại"]').type('0355052071');
//            cy.get('input[placeholder="Nhập mật khẩu"]').type('Baoha2312');
//            cy.contains('button', 'Đăng nhập').click();
//            //cy.get('.order-button').click({ force: true });
//            cy.wait(2000);
//       });
//       // Wait for the login to complete before navigating
//       cy.visit('https://cellphones.com.vn/cart'); 
//       // Chọn sản phẩm
//      cy.get(':nth-child(2) > .block__product-item > .checkbox-product > .select-product-action > .custom-control-label > .product-img').click();         
//      cy.wait(1000);// thời gian click chọn thêm sản phẩm        
//      // Nhấn "Mua ngay"
//      cy.get('.btn-action').click(); 
//      // nhấn giao tận nơi
//      cy.get('#emailPromo').click();
//      cy.get('.block-payment__method > :nth-child(2)').click();
//      cy.wait(3000);
//      // Chuyển sang bước tiếp theo
//      cy.get('.button__go-next').click(); // Nhấn nút "Tiếp tục"
//   });
//   // Kiểm tra thanh toán khi nhận hàng
//   it('PayCOD_01 - Kiểm tra thanh toán khi nhận hàng', () => {
    
//     // Nhấn để chọn phương thức thanh toántoán
//     cy.get('.payment-quote__main').click();
//       // Tìm phần tử có class payment-item__title chứa văn bản "Thanh toán khi nhận hàng"
//       cy.get('.payment-item__title')
//         .contains('Thanh toán khi nhận hàng') // Tìm văn bản cụ thể
//         .click(); // Click vào phần tử
//       cy.get('.payment-modal__bottom > .btn').click();// xác nhận
//       cy.wait(1000);
//       cy.get('.payment-main__title > p')
//       .should('contain.text', 'Thanh toán khi nhận hàng'); // Kiểm tra có hiển thị đúng hình thức thanh toán sau khi chọn
//       cy.wait(1000);
//       cy.screenshot('PayCOD_01',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PayCOD_01"
      
//   });

//   //Kiểm tra thanh toán Chuyển khoản ngân hàng qua mã QR
//   it('PayQR_01 - Kiểm tra thanh toán Chuyển khoản ngân hàng qua mã QR', () => {
    
//     // Nhấn để chọn phương thức thanh toántoán
//     cy.get('.payment-quote__main').click();
//       // Tìm phần tử có class payment-item__title chứa văn bản "Chuyển khoản ngân hàng qua mã QRR"
//       cy.get('.payment-item__title')
//         .contains('Chuyển khoản ngân hàng qua mã QR') // Tìm văn bản cụ thể
//         .click(); // Click vào phần tử
//       cy.get('.payment-modal__bottom > .btn').click();// xác nhận
//       cy.wait(1000);
//       cy.get('.payment-main__title > p')
//       .should('contain.text', 'Chuyển khoản ngân hàng qua mã QR'); // Kiểm tra có hiển thị đúng hình thức thanh toán sau khi chọn
//       cy.wait(1000);
//       cy.screenshot('PayQR_01',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PayQR_01"
//   });

//   //Kiểm tra thanh toán Ví MoMo
//   it('PayMoMo_01 - Kiểm tra thanh toán Ví MoMo', () => {
      
//     // Nhấn để chọn phương thức thanh toántoán
//     cy.get('.payment-quote__main').click();
//       // Tìm phần tử có class payment-item__title chứa văn bản "Ví MoMo"
//       cy.get('.payment-item__title')
//         .contains('Ví MoMo') // Tìm văn bản cụ thể
//         .click(); // Click vào phần tử
//       cy.get('.payment-modal__bottom > .btn').click();// xác nhận
//       cy.wait(1000);
//       cy.get('.payment-main__title > p')
//       .should('contain.text', 'Ví MoMo'); // Kiểm tra có hiển thị đúng hình thức thanh toán sau khi chọn
//       cy.wait(1000);
//       cy.screenshot('PayMoMo_01',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PayMoMo_01"
//   });
//   //Kiểm tra thanh toán ShopeePay
//   it('PaySPay_01 - Kiểm tra thanh toán ShopeePay', () => {
        
//     // Nhấn để chọn phương thức thanh toántoán
//     cy.get('.payment-quote__main').click();
//       // Tìm phần tử có class payment-item__title chứa văn bản "ShopeePay"
//       cy.get('.payment-item__title')
//         .contains('ShopeePay') // Tìm văn bản cụ thể
//         .click(); // Click vào phần tử
//       cy.get('.payment-modal__bottom > .btn').click();// xác nhận
//       cy.wait(1000);
//       cy.get('.payment-main__title > p')
//       .should('contain.text', 'ShopeePay'); // Kiểm tra có hiển thị đúng hình thức thanh toán sau khi chọn
//       cy.wait(1000);
//       cy.screenshot('PaySPay_01',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PaySPay_01"
//   });
    
// });

// trước khi thực hiện kiểm tra cần mở cmt cho dòng nhấn vào nút chọn thực hiện thanh toán 
describe('Test chức năng Thanh toán Chuyển khoản ngân hàng qua mã QR', () => {
    beforeEach(() => {
      cy.session('loginSession', () => {
          cy.visit('https://cellphones.com.vn/');
          cy.contains('Đăng nhập').click();
          cy.get('.login-btn').click({ multiple: true, force: true });
          cy.get('input[placeholder="Nhập số điện thoại"]').type('0356357428');
          cy.get('input[placeholder="Nhập mật khẩu"]').type('Baoha2312');
          cy.contains('button', 'Đăng nhập').click();
          cy.wait(2000);
      });
      // Wait for the login to complete before navigating
      cy.visit('https://cellphones.com.vn/cart'); 
      // Chọn sản phẩm
     cy.get(':nth-child(2) > .block__product-item > .checkbox-product > .select-product-action > .custom-control-label > .product-img').click();         
     cy.wait(1000);// thời gian click chọn thêm sản phẩm        
     // Nhấn "Mua ngay"     
     cy.get('.btn-action').click(); 
     // nhấn giao tận nơi
     cy.get('.block-payment__method > :nth-child(2)').click();
     cy.wait(3000);
     cy.get('#emailPromo').click();
     // Chuyển sang bước tiếp theo
     cy.get('.button__go-next').click(); // Nhấn nút "Tiếp tục"
  });
  //Kiểm tra thanh toán Chuyển khoản ngân hàng qua mã QR
  it('PayQR_02 - Kiểm tra thanh toán Chuyển khoản ngân hàng qua mã QR khi hủy thanh toán ', () => {
    
    // Nhấn để chọn phương thức thanh toántoán
    cy.get('.payment-quote__main').click();
      // Tìm phần tử có class payment-item__title chứa văn bản "Chuyển khoản ngân hàng qua mã QRR"
      cy.get('.payment-item__title')
        .contains('Chuyển khoản ngân hàng qua mã QR') // Tìm văn bản cụ thể
        .click(); // Click vào phần tử
      cy.get('.payment-modal__bottom > .btn').click();// xác nhận
      cy.wait(1000);
      cy.get('.payment-main__title > p')
      .should('contain.text', 'Chuyển khoản ngân hàng qua mã QR'); // Kiểm tra có hiển thị đúng hình thức thanh toán sau khi chọn
      //cy.get('.button__go-next').click(); // nhấn chọn thực hiện thanh toán 

      cy.get('#cps-bank-transfer').should('be.visible');// hiển thị trang giao dịch 
      cy.get('.box-qrcode > a > img')
      .should('be.visible'); // Đảm bảo ảnh hiển thị      
      cy.screenshot('QRCode_Image',{ capture: 'runner' }); // Lưu ảnh với tên "QRCode_Image"

      cy.get('ul > :nth-child(3) > strong').should('be.visible');// hiển thị số tài khoản
      cy.get('span > strong').click();// chọn hủy giao dịch 
      cy.get('.order-status__title > p')
      .should('have.text', 'ĐẶT HÀNG KHÔNG THÀNH CÔNG') ;
      cy.screenshot('Order_Failed_Status',{ capture: 'runner' }); 
      // kiểm tra đơn đã được hủy 
      cy.get('.smember-laptop').click();
      cy.get(':nth-child(1) > :nth-child(1) > .noti-content__content > .action > button').click();     
      cy.get('.order-status').should('contain', 'Đã hủy');    

  });  

});
