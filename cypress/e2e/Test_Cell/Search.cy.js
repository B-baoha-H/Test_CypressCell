/// <reference types ="cypress"/>

describe('Kiểm tra chức năng tìm kiếm sản phẩm', () => {
    it('Tìm kiếm với từ khóa hợp lệ', () => {
      cy.visit('https://cellphones.com.vn/')
      cy.get('input[placeholder="Bạn cần tìm gì?"]').type('iphone 14{enter}')
      cy.contains('iPhone 14').should('be.visible')
    })

    it('Tìm kiếm với từ khóa không hợp lệ', () => {
      cy.visit('https://cellphones.com.vn/')
      cy.get('input[placeholder="Bạn cần tìm gì?"]').type('abcxyz1122{enter}')
      cy.contains('Không có kết quả bạn cần tìm').should('be.visible')
    })

    it('Tìm kiếm với chuỗi rỗng', () => {    
      cy.visit('https://cellphones.com.vn/')
      cy.get('input[placeholder="Bạn cần tìm gì?"]').type('{enter}')
      cy.contains('Không có kết quả bạn cần tìm').should('be.visible')
    })

    it('Tìm kiếm với từ khóa chỉ toàn khoản trắng', () => {    
      cy.visit('https://cellphones.com.vn/')
      cy.get('input[placeholder="Bạn cần tìm gì?"]').type('     {enter}')
      cy.contains('Không có kết quả bạn cần tìm').should('be.visible')
    })

    it('Tìm kiếm với ký tự đặc biệt', () => {
      cy.visit('https://cellphones.com.vn/')
      cy.get('input[placeholder="Bạn cần tìm gì?"]').type('@!#$%^&*{enter}')
      cy.contains('Không có kết quả bạn cần tìm').should('be.visible')
    })

    it('Kiểm tra chức năng tìm kiếm tự động', () => {        
      cy.visit('https://cellphones.com.vn/')
      cy.get('input[placeholder="Bạn cần tìm gì?"]').type('iph')
      cy.get('#search_autocomplete').should('exist').should('not.have.class', 'hidden')
    })

    it('Kiểm tra chức năng phân trang', () => {        
      cy.visit('https://cellphones.com.vn/')
      cy.get('input[placeholder="Bạn cần tìm gì?"]').type('iphone 14{enter}')
  
      // Kiểm tra có ít nhất 1 sản phẩm được hiển thị
      cy.get('.product-list-filter.is-flex.is-flex-wrap-wrap', { timeout: 10000 })
        .should('have.length.greaterThan', 0)
        .then((items) => {
          cy.log(`Initial items count: ${items.length}`)
        })
        
        cy.get('.button.load-more-btn').click({ force: true })
        cy.wait(3000)    // sản phẩm load thêm 20 sản phẩm, từ xem thêm 6051 -> 6031      
        cy.get('.product-list-filter.is-flex.is-flex-wrap-wrap .product-item', { timeout: 10000 })
          .should('have.length.greaterThan', 1)
          .then((newItems) => {
        cy.log(`Final new items count after multiple clicks: ${newItems.length}`)
        })  

    })
})

