/// <reference types="cypress" />

describe('Test Giao diện Thanh toán', () => {
    beforeEach(() => {
        cy.session('loginSession', () => {
            cy.visit('https://cellphones.com.vn/');
            cy.get('input[placeholder="Bạn cần tìm gì?"]').type('oppo{enter}')
            cy.wait(2000)
            cy.get('.product-list-filter.is-flex.is-flex-wrap-wrap .product-item')
            .first()
            .find("a") // tìm đến thẻ <a> 
            .click({ force: true })
            cy.get('.order-button').click({ force: true });
            cy.get('.group-login-btn > .login-btn').click();
            cy.get('input[placeholder="Nhập số điện thoại"]').type('0355052071');
            cy.get('input[placeholder="Nhập mật khẩu"]').type('Baoha2312');
            cy.contains('button', 'Đăng nhập').click();
            //cy.get('.order-button').click({ force: true });
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
       cy.wait(2000);
       cy.get('.block-payment__method > :nth-child(2)').click();
       cy.wait(2000);
       // Chuyển sang bước tiếp theo
       cy.get('.button__go-next').click(); // Nhấn nút "Tiếp tục"
       cy.wait(2000);// chờ load trang tiếp theo
    });

    //PayUI_01 - Kiểm tra trường nhập mã giảm giá
    it('PayUI_01 - Kiểm tra trường nhập mã giảm giá', () => {
        cy.get('.box-input__main').type('QRCPS4');
        // Nhấn nút "Áp dụng"
        cy.get('.block-promotion-input > .btn').click(); 
        cy.wait(2000);     
        // Kiểm tra modal thông báo xác nhậnnhận hiển thị
        cy.get('#modal-voucher___BV_modal_content_')
        .should('be.visible');
        cy.get('.agree').click();
       
        // Kiểm tra hệ thống áp dụng mã giảm giá 
        cy.get('.toast-body').should('not.contain.text', 'Mã giảm giá không khả dụng. Vui lòng kiểm tra lại');
        
    });
    
    // PayUI_02 - Kiểm tra khi nhập mã giảm giá không hợp lệ
    it('PayUI_02 - Kiểm tra khi nhập mã giảm giá không hợp lệ', () => {
        cy.get('.box-input__main').type('VALIDCODE');
        // Nhấn nút "Áp dụng"
        cy.get('.block-promotion-input > .btn').click();
         // Kiểm tra modal thông báo xác nhậnnhận hiển thị
         cy.wait(2000);
         cy.get('#modal-voucher___BV_modal_content_')
         .should('be.visible');
         cy.wait(2000);
         cy.get('.agree').click();
         cy.get('.toast-body').should('contain.text', 'Mã giảm giá không khả dụng. Vui lòng kiểm tra lại.');
         cy.wait(1000);
        cy.screenshot('PayUI_02',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PayUI_02"
        //  .invoke('text')
        //  .should('match', /Kiểm tra kỹ voucher của bạn trước khi bấm xác nhận, một khi đã bấm Xác nhận, voucher sẽ không thể sử dụng được cho đơn hàng khác nữa./);
    });

    // //PayUI_03 - Kiểm tra phí vận chuyển khi nhận tại cửa hàng
    it('PayUI_03 - Kiểm tra phí vận chuyển khi nhận tại cửa hàng', () => {
        
        cy.visit('https://cellphones.com.vn/cart'); 
        // Chọn sản phẩm
        cy.get(':nth-child(2) > .block__product-item > .checkbox-product > .select-product-action > .custom-control-label > .product-img').click();         
        cy.wait(2000);// thời gian click chọn thêm sản phẩm        
        // Nhấn "Mua ngay"
        cy.get('.btn-action').click(); 
        //Nhấp vào trường quận/huyện để mở dropdown
        cy.get(':nth-child(2) > .box-input__main').click();         
        //chọn quận / huyện 
        cy.wait(2000);
        cy.get('.dropdown > :nth-child(1) > span').click();
        cy.wait(2000);
        cy.get('.payment-main__cod > :nth-child(2) > .box-input > .box-input__main').click();
        cy.wait(2000);
        cy.get('.dropdown > :nth-child(1) > span').click();
        cy.wait(2000);
        cy.get('.button__go-next').click();
        cy.get(':nth-child(3) > .quote-block__value')
        .should('be.visible')  // Kiểm tra phần tử có hiển thị
        .and('contain', 'Miễn phí');  // Kiểm tra rằng giá trị không phải là 'Miễn phí'
        cy.wait(1000);
        cy.screenshot('PayUI_03',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PayUI_03"
        
    });
    //PayUI_04 - Kiểm tra phí vận chuyển khi giao hàng tận nơi có mất phí
    it('PayUI_04 - Kiểm tra phí vận chuyển khi giao hàng tận nơi có mất phí', () => {
        // Kiểm tra xem phí vận chuyển có hiển thị và có giá trị
        cy.get(':nth-child(3) > .quote-block__value')
        .should('be.visible')  // Kiểm tra phần tử có hiển thị
        .and('not.contain', 'Miễn phí');  // Kiểm tra rằng giá trị không phải là 'Miễn phí'
        cy.wait(1000);
        cy.screenshot('PayUI_04',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PayUI_04"
    });
    // //PayUI_05 - Kiểm tra tổng tiền hiển thị chính xác
    it('PayUI_05 - Kiểm tra tổng tiền hiển thị chính xác', () => {     
        // Xác nhận tổng tiền đã bao gồm các khoản như: tiền hàng, phí vận chuyển, giảm giá (nếu có)
         // Lấy giá trị từ phần tử đầu tiên và chuyển đổi thành số
        cy.get(':nth-child(2) > .quote-block__value').invoke('text').then((firstValue) => {
            const firstAmount = parseFloat(firstValue.trim().replace(/[^\d.-]/g, ''));
            // Lấy giá trị từ phần tử thứ hai và chuyển đổi thành số
            cy.get('.info-quote__block > :nth-child(1)').invoke('text').then((secondValue) => {
                const secondAmount = parseFloat(secondValue.trim().replace(/[^\d.-]/g, ''));
                // Lấy giá trị từ phần tử thứ ba và chuyển đổi thành số
                cy.get(':nth-child(3) > .quote-block__value').invoke('text').then((thirdValue) => {
                    const thirdAmount = parseFloat(thirdValue.trim().replace(/[^\d.-]/g, ''));
                    // Tính tổng
                    const totalAmount = firstAmount * secondAmount + thirdAmount;
                    // Lấy giá trị từ .quote-bottom__value và chuyển đổi thành số
                    cy.get('.quote-bottom__value').invoke('text').then((quoteBottomValue) => {
                        const quoteBottomAmount = parseFloat(quoteBottomValue.trim().replace(/[^\d.-]/g, ''));
                        // Kiểm tra xem tổng có bằng .quote-bottom__value không
                        expect(totalAmount).to.equal(quoteBottomAmount);
                    });
                });
            });
        });
        // Lấy giá trị từ phần tử .quote-bottom__value
        cy.get('.quote-bottom__value').invoke('text').then((quoteValue) => {
            // Lấy giá trị từ phần tử .total
            cy.get('.total').invoke('text').then((totalValue) => {
                // So sánh hai giá trị
                expect(quoteValue.trim()).to.equal(totalValue.trim());  // So sánh các giá trị sau khi loại bỏ khoảng trắng
            });
        });
        cy.wait(1000);
        cy.screenshot('PayUI_05',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PayUI_05"
    });
    // //PayUI_06 - Kiểm tra hiển thị đầy đủ các phương thức thanh toán
    it('PayUI_06 - Kiểm tra hiển thị đầy đủ các phương thức thanh toán', () => {
        
        // Nhấn vào "Chọn phương thức thanh toán"
        cy.get('.payment-quote__main').click();
        cy.wait(2000);
        // Kiểm tra hiển thị các phương thức thanh toán
        cy.get('.payment-modal__head > p').should('contain.text', 'Chọn phương thức thanh toán');
        const paymentMethods = [
            'Thanh toán khi nhận hàng',
            'Chuyển khoản ngân hàng qua mã QR',
            'Ví MoMo',
            'ShopeePay'
          ];
          
          paymentMethods.forEach(method => {
            cy.get('.payment-item__title')
              .contains(method);
          });
          cy.wait(1000);
        cy.screenshot('PayUI_06',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PayUI_06"
        //cy.get('.payment-method-options').should('contain.text', 'COD');
    });
    //PayUI_07 - Kiểm tra thông báo lỗi khi chưa chọn phương thức thanh toán
    it('PayUI_07 - Kiểm tra thông báo lỗi khi chưa chọn phương thức thanh toán', () => {        
        // Nhấn nút "Thanh toán"
        cy.get('.button__go-next').click();
        cy.wait(2000);
        // Kiểm tra phần tử .toast-header (tiêu đề thông báo)
        cy.get('.toast-header').should('contain.text', 'Thông Báo');
           // Kiểm tra phần tử .toast-body (nội dung thông báo)
        cy.get('.toast-body').should('contain.text', 'Quý khách vui lòng chọn phương thức thanh toán');
        cy.wait(1000);
        cy.screenshot('PayUI_07',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PayUI_07"
    });
    //PayUI_08 - Kiểm tra hiển thị thông tin người nhận hàng
    it('PayUI_08 - Kiểm tra hiển thị thông tin người nhận hàng', () => {
        cy.wait(2000);
        // Kiểm tra các trường: tên người nhận, số điện thoại, địa chỉ giao hàng
        cy.get(':nth-child(1) > .address-quote__value').should('be.visible');
        cy.get(':nth-child(2) > .address-quote__value').should('be.visible');
        cy.get(':nth-child(4) > .address-quote__value').should('be.visible');
        cy.wait(1000);
        cy.screenshot('PayUI_08',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PayUI_08"
    });
    
    it('PayUI_09 - Kiểm tra hiển thị thông tin danh sách sản phẩm và so sánh', () => {
        cy.visit('https://cellphones.com.vn/cart');         
        // Chọn sản phẩm
        cy.get(':nth-child(2) > .block__product-item > .checkbox-product > .select-product-action > .custom-control-label > .product-img').click();         
        cy.wait(1000); 
        cy.get(':nth-child(3) > .block__product-item > .checkbox-product > .select-product-action > .custom-control-label > .product-img').click();         
        // Lưu giá trị sản phẩm 1 từ giỏ hàng
        let productName1;
        cy.get(':nth-child(2) > .block__product-item > .product-info > .align-items-start > .product-name')
          .then(($el2) => {
              productName1 = $el2.text().trim();  // Lưu tên sản phẩm thứ 1
              cy.log('Sản phẩm thứ 1 từ giỏ hàng: ' + productName1);  // Hiển thị trong console
        });    
        // Lưu giá trị sản phẩm 2 từ giỏ hàng
        let productName2;
        cy.get(':nth-child(3) > .block__product-item > .product-info > .align-items-start > .product-name')
          .then(($el3) => {
              productName2 = $el3.text().trim();  // Lưu tên sản phẩm thứ 2
              cy.log('Sản phẩm thứ 2 từ giỏ hàng: ' + productName2);  // Hiển thị trong console
        });    
        cy.wait(2000); // thời gian click chọn thêm sản phẩm        
        // Nhấn "Mua ngay"
        cy.get('.btn-action').click();         
        // Nhấn giao tận nơi
        cy.get('.block-payment__method > :nth-child(2)').click();
        cy.wait(2000);        
        // Chuyển sang bước tiếp theo
        cy.get('.button__go-next').click(); // Nhấn nút "Tiếp tục"
        cy.wait(2000); // chờ load trang tiếp theo        
        // Nhấn để xem thông tin sản phẩm
        cy.get('#viewListItemInQuote-btn').click(); 
       
        // So sánh sản phẩm thứ 1 với phần tử đầu tiên
        cy.get(':nth-child(1) > .product-info > :nth-child(1)')
          .then(($el1) => {
              const productNameFromFirst = $el1.text().trim();  // Lấy tên sản phẩm từ phần tử đầu tiên
              cy.log('Tên sản phẩm từ phần tử đầu tiên: ' + productNameFromFirst);              
              // So sánh sản phẩm thứ 1
              expect(productName2).to.equal(productNameFromFirst);  // So sánh sản phẩm thứ 1
        });        
        // So sánh sản phẩm thứ 2 với phần tử thứ 2
        cy.get(':nth-child(2) > .product-info > :nth-child(1)')
          .then(($el2) => {
              const productNameFromSecond = $el2.text().trim();  // Lấy tên sản phẩm từ phần tử thứ 2
              cy.log('Tên sản phẩm từ phần tử thứ 2: ' + productNameFromSecond);              
              // So sánh sản phẩm thứ 2
              expect(productName1).to.equal(productNameFromSecond);  // So sánh sản phẩm thứ 2
        });
        cy.wait(1000);
        cy.screenshot('PayUI_09',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PayUI_09"
    });
   

});


  
