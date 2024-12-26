/// <reference types="cypress" />

describe('Kiểm tra chức năng chỉnh sửa số lượng sản phẩm trong giỏ hàng', () => {
  beforeEach(() => {
    //Đăng nhập trước khi kiểm tra
    cy.visit('https://cellphones.com.vn/')
    cy.contains("Đăng nhập").click({ multiple: true, force: true })
    cy.get('.login-btn').click({ multiple: true, force: true })
    cy.get('input[placeholder="Nhập số điện thoại"]').type('0373280670')
    cy.get('input[placeholder="Nhập mật khẩu"]').type('Vulehongngoc1103')
    cy.contains('button', 'Đăng nhập').click()
    cy.contains('Ngọc').should('be.visible')
  })
  it('Tăng số lượng sản phẩm', () => {  
    //Thêm sản phẩm vào giỏ hàng
    cy.get('input[placeholder="Bạn cần tìm gì?"]').type('oppo{enter}')
    cy.wait(2000)
    cy.get('.product-list-filter.is-flex.is-flex-wrap-wrap .product-item')
      .first()
      .find("a") // tìm đến thẻ <a> 
      .click({ force: true })

    // Nhấn nút "Thêm vào giỏ hàng"
    cy.get('button.btn-cta.button.button--small.add-to-cart-button')
      .click({force: true})
    cy.contains('Thêm vào giỏ hàng thành công').should('be.visible')

    //Truy cập vào giỏ hàng
    cy.get('.header-item.about-cart.button__link-to-cart').click()

    // Lấy số lượng ban đầu
    cy.get('.block__product-item__outer')
      .first()
      .find('input[readonly]')
      .invoke('val')
      .then((initialQuantity) => {
        const currentQuantity = parseInt(initialQuantity, 10)

        // Nhấn nút tăng số lượng
        cy.get('.block__product-item__outer')
          .first()
          .within(() => {
          cy.get('.plus.d-flex.justify-content-center.align-items-center').click()
          })
        cy.wait(1000)
        // Kiểm tra số lượng mới
        cy.get('.block__product-item__outer')
          .first()
          .find('input[readonly]')
          .should('have.value', (currentQuantity + 1).toString())
      })
  })

  it('Giảm số lượng sản phẩm', () => {
    // Truy cập vào giỏ hàng
    cy.get('.header-item.about-cart.button__link-to-cart').click()
    // Lấy số lượng ban đầu
    cy.get('.block__product-item__outer')
      .first()
      .find('input[readonly]')
      .invoke('val')
      .then((initialQuantity) => {
        const currentQuantity = parseInt(initialQuantity, 10)
        // Nhấn nút giảm số lượng
        cy.get('.block__product-item__outer')
          .first()
          .within(() => {
            cy.get('.minus.d-flex.justify-content-center.align-items-center').click()
          })
        cy.wait(1000)
        // Kiểm tra số lượng mới
        cy.get('.block__product-item__outer')
          .first()
          .find('input[readonly]')
          .should('have.value', (currentQuantity - 1).toString())
      })
  })
  it('Thêm nhiều sản phẩm vào giỏ hàng' , () => {
    //Thêm sản phẩm đầu tiên
    cy.get('input[placeholder="Bạn cần tìm gì?"]').type('iphone 13{enter}')
    cy.get('.product-list-filter.is-flex.is-flex-wrap-wrap .product-item')
      .first()
      .find("a") // tìm đến thẻ <a> 
      .click({ force: true })
    // Nhấn nút "Thêm vào giỏ hàng"
    cy.get('button.btn-cta.button.button--small.add-to-cart-button')
      .click({force: true})
    cy.contains('Thêm vào giỏ hàng thành công').should('be.visible')
    // Trở về trang chủ
    cy.get('.box-logo').click({multiple: true, force: true})

    //Thêm sản phẩm thứ hai
    cy.get('input[placeholder="Bạn cần tìm gì?"]').type('samsung{enter}')
    cy.wait(2000)
    cy.get('.product-list-filter.is-flex.is-flex-wrap-wrap .product-item')
      .first()
      .find("a") 
      .click({ force: true })
    cy.get('button.btn-cta.button.button--small.add-to-cart-button')
      .click({force: true})
    cy.contains('Thêm vào giỏ hàng thành công').should('be.visible')

    // Truy cập vào giỏ hànghàng
    cy.get('.header-item.about-cart.button__link-to-cart').click()

  })  
  it('Xóa một sản phẩm khỏi giỏ hàng', () => {
    // Truy cập vào giỏ hàng
    cy.get('.header-item.about-cart.button__link-to-cart').click()

    // Xóa sản phẩm đầu tiên trong giỏ hàng
    cy.get('.block__product-item__outer')
      .first()
      .within(() => {
        cy.get('.remove-item').click()
        cy.get('.block__product-item__outer').should('not.exist')
      })
  })
  it('Xoá tất cả sản phẩm khỏi giỏ hàng', () => {
    // Truy cập vào giỏ hàng
    cy.get('.header-item.about-cart.button__link-to-cart').click()

    //  Xóa tất cả sản phẩm trong giỏ hàng
    cy.get('input[type="checkbox"]').check({ force: true })
    cy.contains('Xóa sản phẩm đã chọn').click({ force: true })
    cy.contains('Giỏ hàng của bạn đang trống').should('be.visible')
  })
  it('Tăng số lượng sản phẩm vượt quá số lượng tồn kho', () => {

    //Thêm sản phẩm vào giỏ hàng
    cy.get('input[placeholder="Bạn cần tìm gì?"]').type('oppo{enter}')
    cy.wait(2000)

    cy.get('.product-list-filter.is-flex.is-flex-wrap-wrap .product-item')
      .first()
      .find("a") // tìm đến thẻ <a> 
      .click({ force: true })

    // Nhấn nút "Thêm vào giỏ hàng"
    cy.get('button.btn-cta.button.button--small.add-to-cart-button')
      .click({force: true})
    cy.contains('Thêm vào giỏ hàng thành công').should('be.visible')

    //Truy cập vào giỏ hàng
    cy.get('.header-item.about-cart.button__link-to-cart').click()

    let flag = true; // Biến cờ để kiểm soát vòng lặp
    let tmp = 0; // Biến đếm số lần thực hiện
  
    const addProduct = () => {
      if (!flag) return; // Dừng nếu flag là false
  
      tmp++; // Tăng biến đếm mỗi lần hàm được gọi
  
      cy.get('body')
        .invoke('attr', 'data-modal-open-count')
        .then((count) => {
          if (count === '1') {
            // Nếu đạt giới hạn, đặt flag = false và kiểm tra thông báo
            flag = false;
            cy.contains('Số lượng sản phẩm đã đạt đến mức tối đa').should('be.visible');
          } else {
            // Nếu chưa đạt giới hạn, nhấn nút tăng số lượng
            cy.get('.block__product-item__outer')
              .first()
              .within(() => {
                cy.get('.plus.d-flex.justify-content-center.align-items-center').click({ force: true });
              });
            addProduct(); // Gọi lại hàm để tiếp tục
          }
        });
    };  
    addProduct(); // Bắt đầu lặp
  }); 

  it('Giảm số lượng sản phẩm xuống tối thiểu', () => {
    // Truy cập vào giỏ hàng
    cy.get('.header-item.about-cart.button__link-to-cart').click()

    //  Lấy số lượng ban đầu
    const reduceProduct = () => {
      cy.get('input[readonly]')
        .invoke('val')
        .then((value) => {
          const quantity = parseInt(value, 10); 
          cy.log(`Số lượng hiện tại: ${quantity}`);
  
          if (quantity > 1) {
            cy.get('.block__product-item__outer')
              .first()
              .within(() => {
                cy.get('.minus.d-flex.justify-content-center.align-items-center').click({ force: true });
              });
            reduceProduct(); // Gọi lại hàm để tiếp tục
          } else if (quantity === 1) {
            cy.get('.block__product-item__outer')
            .first()
            .within(() => {
                cy.get('.minus.d-flex.justify-content-center.align-items-center').click({ force: true });
              });
            // Nếu đạt số lượng tối thiểu, kiểm tra thông báo
            cy.contains('Số lượng sản phẩm đã giảm đến mức tối thiểu').should('be.visible');
          }
        });
    };  
    reduceProduct(); // Bắt đầu giảm
  });
})
  



