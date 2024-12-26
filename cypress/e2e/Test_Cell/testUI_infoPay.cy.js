/// <reference types="cypress" />
describe('Test Giao diện payment-info', () => {      
    beforeEach(() => {
        // Sử dụng cy.session() để lưu trạng thái đăng nhập
        cy.session('loginSession', () => {
            cy.visit('https://cellphones.com.vn/');
            cy.contains('Đăng nhập').click();
            cy.get('.login-btn').click({ multiple: true, force: true });
            cy.get('input[placeholder="Nhập số điện thoại"]').type('0355052071');
            cy.get('input[placeholder="Nhập mật khẩu"]').type('Baoha2312');
            cy.contains('button', 'Đăng nhập').click();
            cy.wait(2000);
            cy.get('.about-cart').click(); // Vào trang giỏ hàng
        });
        cy.visit('https://cellphones.com.vn/cart'); // Điều hướng đến giỏ hàng
    });
    // // PayInfo_01: Kiểm tra thông tin sản phẩm
    it('PayInfo_01 - Kiểm tra thông tin sản phẩm hiển thị đúng', () => {         
        cy.get(':nth-child(2) > .block__product-item > .checkbox-product > .select-product-action > .custom-control-label > .product-img').click(); // Chọn sản phẩm muốn mua
        cy.get(':nth-child(2) > .block__product-item > .product-info > .align-items-start > .product-name')// Lấy giá trị và lưu vào alias
            .invoke('text') // Lấy giá trị text
            .as('productName'); // Lưu với alias tên 'productName'    
        cy.get('.btn-action').click();
        // So sánh giá trị đã lưu
        cy.get('@productName').then((productName) => {
            cy.get('.item__name').should('have.text', productName); // So sánh với giá trị trên giao diện
        });
        cy.wait(1000);
        cy.screenshot('PayInfo_01',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PayInfo_01"
    });
    // // PayInfo_02: Kiểm tra hiển thị hình ảnh sản phẩm
    it('PayInfo_02 - Kiểm tra hiển thị hình ảnh sản phẩm', () => {
        // Chọn sản phẩm muốn mua
        cy.get(':nth-child(2) > .block__product-item > .checkbox-product > .select-product-action > .custom-control-label > .product-img').click();     
        // Nhấn "Mua ngay"
        cy.get('.btn-action').click();    
        // Đảm bảo ảnh thứ hai đã hiển thị
        cy.wait(1000);
        cy.get('.item__img') //  thời gian chờ ảnh hiển thị lên 1s
            .should('be.visible');
        cy.wait(1000);
        cy.screenshot('PayInfo_02',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PayInfo_02"
    }); 
    // // PayInfo_03: Kiểm tra hiển thị giá sản phẩm
    it('PayInfo_03 - Kiểm tra hiển thị giá sản phẩm', () => {
        cy.get(':nth-child(2) > .block__product-item > .checkbox-product > .select-product-action > .custom-control-label > .product-img').click(); // Chọn sản phẩm muốn mua
        cy.get(':nth-child(2) > .block__product-item > .product-info > .align-items-end > .block-box-price > .box-info__box-price > .product__price--show')
            .invoke('text')
            .as('productPriceFirst'); // Lưu vào alias 'productPriceFirst'
        cy.get('.btn-action').click();
        // Lấy giá trị của giá sản phẩm hiển thị sau khi mua và lưu vào alias
        cy.get('.product__price--show')
            .invoke('text')
            .as('productPriceSecond'); // Lưu vào alias 'productPriceSecond'
        // So sánh hai giá trị giá sản phẩm
        cy.get('@productPriceFirst').then((productPriceFirst) => {
            cy.get('@productPriceSecond').should('eq', productPriceFirst); // So sánh giá của hai phần tử
        });
        cy.wait(1000);
        cy.screenshot('PayInfo_03',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PayInfo_03"
    });
    //
    it('PayInfo_04 - Kiểm tra trường email có yêu cầu nhập đúng định dạng', () => {
        // Chọn sản phẩm muốn mua
        cy.get(':nth-child(2) > .block__product-item > .checkbox-product > .select-product-action > .custom-control-label > .product-img').click();     
        // Nhấn "Mua ngay"
        cy.get('.btn-action').click();    
        // Nhập email sai định dạng vào trường email
        cy.get('.customer-input__2 > .box-input > .box-input__main')
            .type('email-sai-dinh-dang'); // Nhập email không hợp lệ    
        // Nhấn vào nút "Tiếp tục"
        cy.contains('button', 'Tiếp tục').click();    
        // Kiểm tra thông báo toast xuất hiện
        cy.get('.toast-header').should('be.visible'); // Đảm bảo thông báo toast hiển thị
        // Kiểm tra nội dung thông báo trong phần thân thông báo
        cy.get('.toast-body')
            .should('be.visible') // Đảm bảo phần thân thông báo hiển thị
            .and('contain.text', 'Quý khách vui lòng kiểm tra lại email'); // Kiểm tra thông báo lỗi
        cy.wait(1000);
        cy.screenshot('PayInfo_04',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PayInfo_04"
    });
    // // PayInfo_05: Kiểm tra tùy chọn "Nhận tại cửa hàng" được chọn mặc định
    it('PayInfo_05 - Kiểm tra tùy chọn "Nhận tại cửa hàng" được chọn mặc định', () => {
        // Chọn sản phẩm muốn mua
        cy.get(':nth-child(2) > .block__product-item > .checkbox-product > .select-product-action > .custom-control-label > .product-img').click();    
        // Nhấn "Mua ngay"
        cy.get('.btn-action').click();        
        // Kiểm tra xem tùy chọn "Nhận tại cửa hàng" có được chọn mặc định hay không
        cy.get('.block-payment__method > :nth-child(1) > input[type="radio"]').should('be.checked'); // Kiểm tra radio "Nhận tại cửa hàng" đã được chọn mặc định        
        // Nhấn vào "Nhận tại cửa hàng"
        cy.get('.block-payment__method > :nth-child(1)').click();
        cy.get('.button__go-next').click();
        cy.get('.toast-header').should('be.visible');
        // Kiểm tra nội dung thông báo trong phần thân thông báo
        cy.get('.toast-body')
        .should('be.visible') // Đảm bảo phần thân thông báo hiển thị
        .and('contain.text', 'Quý khách vui lòng không bỏ trống Tỉnh / thành phố'); // Kiểm tra thông báo lỗi
        // Kiểm tra các trường thông tin cần thiết
        // Nếu các trường nhập liệu chưa có thông tin, sẽ hiển thị thông báo lỗi        
        // Kiểm tra trường thông tin địa chỉ
        cy.get('.box-input--hasvalue > .box-input__main').then(($input) => {
            if ($input.length === 0) {
                // Nếu trường chưa có giá trị, kiểm tra thông báo lỗi
                cy.get('.error-message').should('contain.text', 'Thông tin không được để trống'); // Lỗi nếu không có thông tin
            }
        });
        // Kiểm tra trường thông tin thanh toán
        cy.get(':nth-child(2) > .box-input__main').then(($input) => {
            if ($input.length === 0) {
                // Nếu trường thanh toán chưa có thông tin, kiểm tra thông báo lỗi
                cy.get('.error-message').should('contain.text', 'Thông tin không được để trống');
            }
        });
        // Kiểm tra thêm trường thông tin thanh toán khác
        cy.get('.payment-main__cod > :nth-child(2) > .box-input > .box-input__main').then(($input) => {
            if ($input.length === 0) {
                // Nếu trường này không có giá trị, hiển thị thông báo lỗi
                cy.get('.error-message').should('contain.text', 'Thông tin không được để trống');
            }
        });
        cy.wait(1000);
        cy.screenshot('PayInfo_05',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PayInfo_05"
    });
    // PayInfo_06: Kiểm tra dropdown tỉnh/thành phố hoạt động
    it('PayInfo_06 - Kiểm tra dropdown tỉnh/thành phố hoạt động', () => {
        // Chọn sản phẩm muốn mua
        cy.get(':nth-child(2) > .block__product-item > .checkbox-product > .select-product-action > .custom-control-label > .product-img').click();         
        // Nhấn "Mua ngay"
        cy.get('.btn-action').click();       
        // Nhấp vào trường tỉnh/thành phố để mở dropdown
        cy.get('.box-input--hasvalue > .box-input__main').click();         
        // Đảm bảo dropdown hiển thị sau khi nhấp
        cy.get('.dropdown').should('be.visible');  // Kiểm tra xem dropdown có hiển thị  
        cy.wait(1000);
        cy.screenshot('PayInfo_06',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PayInfo_06"          
    });
    // PayInfo_07: Kiểm tra dropdown quận/huyện thay đổi theo tỉnh/thành phố đã chọn
    it('PayInfo_07 - Kiểm tra dropdown quận/huyện thay đổi theo tỉnh/thành phố', () => {
        // Chọn sản phẩm muốn mua
        cy.get(':nth-child(2) > .block__product-item > .checkbox-product > .select-product-action > .custom-control-label > .product-img').click();         
        // Nhấn "Mua ngay"
        cy.get('.btn-action').click(); 
        // Nhấp vào trường quận/huyện để mở dropdown
        cy.get(':nth-child(2) > .box-input__main').click();         
        // Đảm bảo dropdown hiển thị sau khi nhấp
        cy.get('.dropdown').should('be.visible'); 
        cy.wait(1000);
        cy.screenshot('PayInfo_07',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PayInfo_07"
    });

    // PayInfo_08: Kiểm tra danh sách cửa hàng hiển thị đúng theo quận/huyện đã chọn
    it('PayInfo_08 - Kiểm tra danh sách cửa hàng theo quận/huyện', () => {
        cy.get(':nth-child(2) > .block__product-item > .checkbox-product > .select-product-action > .custom-control-label > .product-img').click();         
        // Nhấn "Mua ngay"
        cy.get('.btn-action').click(); 
        // Nhập Hồ Chí Minh để chọn Tỉnh/ Thành phố
        cy.get('.box-input--hasvalue > .box-input__main').click();
        cy.get('.box-input--hasvalue > .box-input__main').type('Hồ Chí');
        // Chọn Thành phố HCM
       // cy.get('.dropdown__item--active > span').click();
        // Nhấp vào trường quận/huyện để mở dropdown
        cy.get(':nth-child(2) > .box-input__main').click();         
        //chọn quận / huyện (quận 5)
        cy.get(':nth-child(2) > .box-input__main').type('Quận 4');
        cy.wait(2000);
        cy.get('.dropdown__item > span').click();
        cy.get('.payment-main__cod > :nth-child(2) > .box-input > .box-input__main').click();     
        // //kiểm tra có đúng ở quận 4
        it('Kiểm tra dropdown chứa "Quận 4" hoặc "Q. 4"', () => {
            cy.get('.dropdown__item > span')
                .should('include.text', 'Quận 4')
                .should('include.text', 'Q. 4');
        });
        cy.wait(1000);
        cy.screenshot('PayInfo_08',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PayInfo_08"
    });

    // PayInfo_09: Kiểm tra hiển thị các trường thông tin giao hàng
    it('PayInfo_09 - Kiểm tra hiển thị thông tin giao hàng đầy đủ', () => {
        cy.get(':nth-child(2) > .block__product-item > .checkbox-product > .select-product-action > .custom-control-label > .product-img').click();         
        // Nhấn "Mua ngay"
        cy.get('.btn-action').click(); 
        // giao hàng tận nơi
        cy.get('.block-payment__method > :nth-child(2)').click();// Kiểm tra tên khách hàng
        // Kiểm tra tên khách hàng
        // Đảm bảo trường nhập "Tên khách hàng" hiển thị và không được để trống
        cy.get('.customer-receiver > :nth-child(1) > .box-input__main')
        .should('be.visible') // Kiểm tra trường nhập liệu có hiển thị
        .and(($input) => {
            const value = $input.val().trim(); // Lấy giá trị trong ô nhập và loại bỏ khoảng trắng
            expect(value).to.not.equal(''); // Kiểm tra rằng giá trị không rỗng
        });
        // Kiểm tra số điện thoại
        // Đảm bảo trường nhập "Số điện thoại" hiển thị và không được để trống
        cy.get(':nth-child(2) > .box-input__main')
        .should('be.visible') // Kiểm tra trường nhập liệu có hiển thị
        .and(($input) => {
            const value = $input.val().trim(); // Lấy giá trị trong ô nhập và loại bỏ khoảng trắng
            expect(value).to.not.equal(''); // Kiểm tra rằng giá trị không rỗng
        });
        // Kiểm tra địa chỉ
        // Đảm bảo mục hiển thị "Địa chỉ" có nội dung và không được để trống
        cy.get('.box-user__address')
        .should('be.visible') // Kiểm tra mục địa chỉ có hiển thị
        .and(($div) => {
            const text = $div.text().trim(); // Lấy nội dung trong mục địa chỉ và loại bỏ khoảng trắng
            expect(text).to.not.equal(''); // Kiểm tra rằng nội dung không rỗng
        });   
        cy.wait(1000);
        cy.screenshot('PayInfo_09',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PayInfo_09"     
    });

    // PayInfo_10: Kiểm tra trường "Tên người nhận" bắt buộc nhập
    it('PayInfo_10 - Kiểm tra trường "Tên người nhận" bắt buộc nhập', () => {
        cy.get(':nth-child(2) > .block__product-item > .checkbox-product > .select-product-action > .custom-control-label > .product-img').click();         
        // Nhấn "Mua ngay"
        cy.get('.btn-action').click(); 
        // giao hàng tận nơi
        cy.get('.block-payment__method > :nth-child(2)').click();
        cy.get('.customer-receiver > :nth-child(1) > .box-input__main').clear();
        cy.get('.button__go-next').click();
        
        cy.get('.toast-body')
            .should('be.visible') // Đảm bảo phần thân thông báo hiển thị
            .and('contain.text', 'Quý khách vui lòng nhập tên và số điện thoại để tiếp tục mua hàng.');
        cy.wait(1000);
        cy.screenshot('PayInfo_10',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PayInfo_10"
     
    // });//cy.get('.error-message').should('contain.text', 'Tên người nhận không được để trống');
    });

    // PayInfo_11: Kiểm tra định dạng "SĐT người nhận"
    it('PayInfo_11 - Kiểm tra định dạng và để trống "SĐT người nhận"', () => {
        // Chọn sản phẩm
        cy.get(':nth-child(2) > .block__product-item > .checkbox-product > .select-product-action > .custom-control-label > .product-img').click();         
        // Nhấn "Mua ngay"
        cy.get('.btn-action').click(); 
        // Chọn phương thức giao hàng tận nơi
        cy.get('.block-payment__method > :nth-child(2)').click();
    
        // Kiểm tra khi trường "SĐT người nhận" để trống
        cy.get(':nth-child(2) > .box-input__main').clear(); // Xóa nội dung hiện tại trong ô nhập
        cy.get('.button__go-next').click(); // Nhấn nút "Tiếp tục"
        cy.get('.toast-body') // Kiểm tra thông báo lỗi
            .should('be.visible') // Đảm bảo thông báo hiển thị
            .and('contain.text', 'Quý khách vui lòng nhập tên và số điện thoại để tiếp tục mua hàng.');
    
        // Kiểm tra khi nhập số điện thoại sai định dạng
        cy.get(':nth-child(2) > .box-input__main').type('12345abc'); // Nhập số điện thoại sai định dạng
        cy.get('.button__go-next').click(); // Nhấn nút "Tiếp tục"
        cy.get('.toast-body') // Kiểm tra thông báo lỗi
            .should('be.visible') // Đảm bảo thông báo hiển thị
            .and('contain.text', 'Quý khách vui lòng kiểm tra lại số điện thoại người nhận thay'); // Nội dung tùy thuộc vào thông báo hệ thống
        cy.wait(1000);
        cy.screenshot('PayInfo_11',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PayInfo_11"
    });
    

    // PayInfo_12: Kiểm tra tùy chọn nhập mới địa chỉ giao hàng
    it('PayInfo_12 - Kiểm tra tùy chọn nhập mới địa chỉ giao hàng', () => {
        // Chọn sản phẩm
        cy.get(':nth-child(2) > .block__product-item > .checkbox-product > .select-product-action > .custom-control-label > .product-img').click();         
        // Nhấn "Mua ngay"
        cy.get('.btn-action').click(); 
        // Chọn phương thức giao hàng tận nơi
        cy.get('.block-payment__method > :nth-child(2)').click();
        //cy.get('.btn-address-books__showmore').click();
        cy.get('.btn-address-books__create').click();
        //Chọn Thành phố HCM
        cy.get('.box-input--hasvalue > .box-input__main').type('Hồ Chí');            
        cy.get('.dropdown__item--active > span').click();

        //kiểm tra trống quận/ huyện
        cy.get('.button__go-next').click(); // Nhấn nút "Tiếp tục"
        cy.get('.toast-body') // Kiểm tra thông báo lỗi
                .should('be.visible') // Đảm bảo thông báo hiển thị
                .and('contain.text', 'Quý khách vui lòng không bỏ trống Quận / huyện');
        // chọn quận/huyện
        cy.get('.box-wrapper > :nth-child(1) > :nth-child(2) > .box-input__main').type('Quận 5');
            cy.wait(1000);
            cy.get('.dropdown__item > span').click();
        // kiểm tra trống phường/ x\ã
        cy.get('.button__go-next').click(); // Nhấn nút "Tiếp tục"
        cy.get('.toast-body') // Kiểm tra thông báo lỗi
                .should('be.visible') // Đảm bảo thông báo hiển thị
                .and('contain.text', 'Quý khách vui lòng không bỏ trống Quận / huyện'); // Nội dung tùy thuộc vào thông báo hệ thống
    
        // chọn phường
        cy.get(':nth-child(2) > [data-v-99f06132=""][data-v-0aae0a5c=""] > .box-input__main').type('Phường 4');
            cy.wait(1000);
            cy.get('.dropdown__item > span').click();
        //Kiểm tra khi thếu số nhà     
        cy.get('.button__go-next').click(); // Nhấn nút "Tiếp tục"
        cy.get('.toast-body') // Kiểm tra thông báo lỗi
                .should('be.visible') // Đảm bảo thông báo hiển thị
                .and('contain.text', 'Quý khách vui lòng không bỏ trống Số nhà, tên đường'); // Nội dung tùy thuộc vào thông báo hệ thống
        //nhập địa chỉ số nhà 
        cy.get('.box-wrapper > :nth-child(2) > [data-v-18807a6f=""][data-v-0aae0a5c=""] > .box-input__main').type('421 An Dương VươngVương');
        cy.get('.button__go-next').click(); // Nhấn nút "Tiếp tục"
        cy.wait(1000);
        cy.screenshot('PayInfo_12',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PayInfo_12"
        
    });
    
    //PayInfo_13: Kiểm tra tùy chọn địa chỉ giao hàng có trong sổ địa chỉ mặc định 
    it('PayInfo_13 - Kiểm tra tùy chọn địa chỉ giao hàng có trong sổ địa chỉ ', () => {
        // Chọn sản phẩm
        cy.get(':nth-child(2) > .block__product-item > .checkbox-product > .select-product-action > .custom-control-label > .product-img').click();         
        cy.wait(1000);// thời gian click chọn thêm sản phẩm        
        // Nhấn "Mua ngay"
        cy.get('.btn-action').click(); 
        // nhấn giao tận nơi
        cy.get('.block-payment__method > :nth-child(2)').click();
        cy.wait(1000);
         // Lấy giá trị địa chỉ giao hàng từ `.box-user__address`
        cy.get('.box-user__address')
        .invoke('text') // Lấy nội dung văn bản
        .then((userAddress) => {
        // Chuyển sang bước tiếp theo
        cy.get('.button__go-next').click(); // Nhấn nút "Tiếp tục"

        // Lấy giá trị từ `.address-quote__value` để so sánh
        cy.get(':nth-child(4) > .address-quote__value')
            .invoke('text')
            .then((quoteAddress) => {
                // So sánh hai giá trị
                expect(userAddress.trim()).to.equal(quoteAddress.trim());
            });
        });
        cy.wait(1000);
        cy.screenshot('PayInfo_13',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PayInfo_13"
    });
    // PayInfo_14: Kiểm tra ghi chú giao hàng
    it('PayInfo_14 - Kiểm tra ghi chú giao hàng', () => {
        // Chọn sản phẩm
        cy.get(':nth-child(2) > .block__product-item > .checkbox-product > .select-product-action > .custom-control-label > .product-img').click();
        cy.wait(1000); // Thời gian click chọn thêm sản phẩm
        
        // Nhấn "Mua ngay"
        cy.get('.btn-action').click();
        
        // Nhấn giao tận nơi
        cy.get('.block-payment__method > :nth-child(2)').click();
    
        // Nhập ghi chú giao hàng
        const deliveryNote = 'Giao hàng sau 6h tối';
        cy.get('.box-note > .box-input > .box-input__main').type(deliveryNote);
    
        // Nhấn nút "Tiếp tục"
        cy.get('.button__go-next').click();
    
        // Lấy ghi chú đã nhập và so sánh với giá trị hiển thị ở bước sau
        cy.get('.box-note > .box-input > .box-input__main')
            .invoke('val') // Lấy giá trị từ input
            .then((noteInputValue) => {
                // Lấy giá trị ghi chú giao hàng được hiển thị
                cy.get(':nth-child(6) > .address-quote__value')
                    .invoke('text') // Lấy nội dung văn bản
                    .then((quoteValue) => {
                        // So sánh hai giá trị
                        expect(noteInputValue.trim()).to.equal(quoteValue.trim());
                    });
            });
        cy.wait(1000);
        cy.screenshot('PayInfo_14',{ capture: 'runner' });  // Lưu ảnh chụp với tên "PayInfo_14"
    });  
    
});

  