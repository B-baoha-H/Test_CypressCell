/// <reference types="cypress" />

describe('Kiểm tra chức năng đăng nhập tài khoản', () => {
  it('Đăng nhập với thông tin hợp lệ', () => {
    cy.visit('https://cellphones.com.vn/')
    cy.contains('Đăng nhập').click({force: true})
    cy.get('.login-btn').click({multiple: true, force: true})
    cy.get('input[placeholder="Nhập số điện thoại"]').type('0373280670') 
    cy.get('input[placeholder="Nhập mật khẩu"]').type('Vulehongngoc1103')
    cy.contains('button', 'Đăng nhập').click()   
  })


  it('Đăng nhập với số điện thoại không tồn tại', () => {
    cy.visit('https://cellphones.com.vn/')
    cy.contains('Đăng nhập').click({force: true})
    cy.get('.login-btn').click({multiple: true, force: true})
    cy.get('input[placeholder="Nhập số điện thoại"]').type('0373280678') 
    cy.get('input[placeholder="Nhập mật khẩu"]').type('Vulehongngoc1103')
    cy.contains('button', 'Đăng nhập').click()
    cy.contains('Thông tin đăng nhập không đúng. Vui lòng kiểm tra và thử lại.').should('be.visible')
  })


  it('Đăng nhập với số điện thoại không đúng định dạng', () => {
    cy.visit('https://cellphones.com.vn/')
    cy.contains('Đăng nhập').click({force: true})
    cy.get('.login-btn').click({multiple: true, force: true})
    cy.get('input[placeholder="Nhập số điện thoại"]').type('12asd') 
    cy.get('input[placeholder="Nhập mật khẩu"]').type('Vulehongngoc1103')
    cy.contains('button', 'Đăng nhập').click()
    cy.contains('Vui lòng kiểm tra lại số điện thoại').should('be.visible')
  })


  it('Đăng nhập với số điện thoại rỗng', () => {
    cy.visit('https://cellphones.com.vn/')
    cy.contains('Đăng nhập').click({force: true})
    cy.get('.login-btn').click({multiple: true, force: true})
    cy.get('input[placeholder="Nhập mật khẩu"]').type('Vulehongngoc1103')
    cy.contains('button', 'Đăng nhập').click()
    cy.get('input[placeholder="Nhập số điện thoại"]:invalid').should('exist')
  })


  it('Đăng nhập với mật khẩu không đúng', () => {
    cy.visit('https://cellphones.com.vn/')
    cy.contains('Đăng nhập').click({force: true})
    cy.get('.login-btn').click({multiple: true, force: true})
    cy.get('input[placeholder="Nhập số điện thoại"]').type('0373280670')
    cy.get('input[placeholder="Nhập mật khẩu"]').type('1')
    cy.contains('button', 'Đăng nhập').click()
    cy.contains('Thông tin đăng nhập không đúng. Vui lòng kiểm tra và thử lại.').should('be.visible')
  })


  it('Đăng nhập với mật khẩu rỗng', () => {
    cy.visit('https://cellphones.com.vn/')
    cy.contains('Đăng nhập').click({force: true})
    cy.get('.login-btn').click({multiple: true, force: true})
    cy.get('input[placeholder="Nhập số điện thoại"]').type('0373280670')
    cy.contains('button', 'Đăng nhập').click()
    cy.get('input[placeholder="Nhập mật khẩu"]:invalid').should('exist')
  })


  it('Đăng nhập với số điện thoại và mật khẩu rỗng', () => {
    cy.visit('https://cellphones.com.vn/')
    cy.contains('Đăng nhập').click({force: true})
    cy.get('.login-btn').click({multiple: true, force: true})
    cy.contains('button', 'Đăng nhập').click()
    cy.get('input[placeholder="Nhập số điện thoại"]:invalid').should('exist')
    cy.get('input[placeholder="Nhập mật khẩu"]:invalid').should('exist')
  })


    it('Đăng xuất', () => {
        cy.visit('https://cellphones.com.vn/')
        cy.contains('Đăng nhập').click({force: true})
        cy.get('.login-btn').click({multiple: true, force: true})
        cy.get('input[placeholder="Nhập số điện thoại"]').type('0373280670') 
        cy.get('input[placeholder="Nhập mật khẩu"]').type('Vulehongngoc1103')
        cy.contains('button', 'Đăng nhập').click()
        cy.contains('Ngọc').click()
        cy.contains('Truy cập Smember').click()
        cy.contains('Thoát tài khoản').click({force: true})
        cy.contains('Xác nhận').click()
        cy.contains('Đăng nhập với').should('be.visible')
    })


    it('Quên mật khẩu', () => {
      cy.visit('https://cellphones.com.vn/')
      cy.contains('Đăng nhập').click({force: true})
      cy.get('.login-btn').click({multiple: true, force: true})
      cy.contains('Quên mật khẩu?').click()
      cy.get('input[placeholder="Số điện thoại/ Email"]').type('0373280670')
      cy.contains('Tiếp tục').click()
      cy.pause()
      cy.contains('button', 'Xác nhận').click()
      cy.contains('Xác thực mã otp thành công').should('be.visible')
      cy.get('input[placeholder="Nhập mật khẩu mới của bạn"]').type('Vulehongngoc1103')
      cy.get('input[placeholder="Xác nhận lại mật khẩu"]').type('Vulehongngoc1103')
      cy.contains('Xác nhận').click()
      cy.contains('Thành công').should('be.visible')
   })


})


describe('Kiểm tra chức năng đăng ký tài khoản', () => {
  it('Đăng ký với tài khoản đã tồn tại', () => {
    cy.visit('https://cellphones.com.vn/')
    cy.contains('Đăng nhập').click()
    cy.get('.register-btn').click({multiple: true, force: true})
    cy.get('input[placeholder="Nhập họ và tên"]').type('Vũ Lê Hồng Ngọc')
    cy.get('input[placeholder="Nhập số điện thoại"]').type('0373280670')
    cy.get('input[placeholder="Ngày sinh"]').type('2003-01-01')
    cy.get('input[placeholder="Nhập mật khẩu"]').type('Vulehongngoc1103')
    cy.get('input[placeholder="Nhập lại mật khẩu"]').type('Vulehongngoc1103')
    cy.contains('button', 'Đăng ký').click()
    cy.contains('Số điện thoại đã được đăng ký trước đó. Bạn có muốn đăng nhập ngay?').should('be.visible')
  })


  it('Đăng ký với mã OTP không chính xác', () => {                 
    cy.visit('https://cellphones.com.vn/')
    cy.contains('Đăng nhập').click()
    cy.get('.register-btn').click({multiple: true, force: true})
    cy.get('input[placeholder="Nhập họ và tên"]').type('abcd')
    cy.get('input[placeholder="Nhập số điện thoại"]').type('0355090909')
    cy.get('input[placeholder="Ngày sinh"]').type('2003-01-01')
    cy.get('input[placeholder="Nhập mật khẩu"]').type('abcd12')
    cy.get('input[placeholder="Nhập lại mật khẩu"]').type('abcd12')
    cy.contains('button', 'Đăng ký').click()
    cy.wait(5000)
    cy.get('input.otp-input').type('1234')       // nhập đủ 4 số nhưng bị sai
    cy.contains('button', 'Xác nhận').click()
    cy.contains('OTP không chính xác. Vui lòng thử lại.').should('be.visible')
  })


  it('Đăng ký với mã OTP không đầy đủ', () => {                 
    cy.visit('https://cellphones.com.vn/')
    cy.contains('Đăng nhập').click()
    cy.get('.register-btn').click({multiple: true, force: true})
    cy.get('input[placeholder="Nhập họ và tên"]').type('abcd')
    cy.get('input[placeholder="Nhập số điện thoại"]').type('0355090909')
    cy.get('input[placeholder="Ngày sinh"]').type('2003-01-01')
    cy.get('input[placeholder="Nhập mật khẩu"]').type('abcd12')
    cy.get('input[placeholder="Nhập lại mật khẩu"]').type('abcd12')
    cy.contains('button', 'Đăng ký').click()
    cy.wait(5000)
    cy.get('input.otp-input').type('123')       // nhập không đủ 4 số
    cy.contains('button', 'Xác nhận').click()
    cy.contains('Vui lòng nhập đầy đủ mã xác thực').should('be.visible')
  })


  // it('Đăng ký với mã OTP chính xác', () => {                  
  //   cy.visit('https://cellphones.com.vn/')
  //   cy.contains('Đăng nhập').click()
  //   cy.get('.register-btn').click({multiple: true, force: true})
  //   cy.get('input[placeholder="Nhập họ và tên"]').type('Vũ Lê Hồng Ngọc')
  //   cy.get('input[placeholder="Nhập số điện thoại"]').type('0355745478')  // thay đổi sdt để đăng ký tài khoản mới vì số này đã đăng ký rồi
  //   cy.get('input[placeholder="Ngày sinh"]').type('2009-01-16')
  //   cy.get('input[placeholder="Nhập mật khẩu"]').type('Vulehongngoc1103')
  //   cy.get('input[placeholder="Nhập lại mật khẩu"]').type('Vulehongngoc1103')
  //   cy.contains('button', 'Đăng ký').click()
  //   cy.pause()                                                        // tự nhập otp 
  //   cy.contains('button', 'Xác nhận').click()
  //   cy.contains('Tạo tài khoản thành công').should('be.visible')
  // })


  it('Đăng ký với địa chỉ email không đúng định dạng', () => {
    cy.visit('https://cellphones.com.vn/')
    cy.contains('Đăng nhập').click()
    cy.get('.register-btn').click({multiple: true, force: true})
    cy.get('input[placeholder="Nhập họ và tên"]').type('abcd')
    cy.get('input[placeholder="Nhập số điện thoại"]').type('0355090909')
    cy.get('input[placeholder="Nhập email (không bắt buộc)"]').type('vulehongngoc1103gmail.com')  //thiếu @ và . sẽ bị lỗi
    cy.get('input[placeholder="Ngày sinh"]').type('2003-01-01')
    cy.get('input[placeholder="Nhập mật khẩu"]').type('abcd12')
    cy.get('input[placeholder="Nhập lại mật khẩu"]').type('abcd12')
    cy.contains('button', 'Đăng ký').click()
    cy.contains('Vui lòng kiểm tra lại email').should('be.visible')
  })


  it('Đăng ký với số điện thoại không đúng định dạng',  () => {
    cy.visit('https://cellphones.com.vn/')
    cy.contains('Đăng nhập').click()
    cy.get('.register-btn').click({multiple: true, force: true})
    cy.get('input[placeholder="Nhập họ và tên"]').type('abcd')
    cy.get('input[placeholder="Nhập số điện thoại"]').type('037328067')  //sdt kh đúng định dạng và sdt < 9 số sẽ bị lỗi
    cy.get('input[placeholder="Ngày sinh"]').type('2003-01-01')
    cy.get('input[placeholder="Nhập mật khẩu"]').type('abcd12')
    cy.get('input[placeholder="Nhập lại mật khẩu"]').type('abcd12')
    cy.contains('button', 'Đăng ký').click()
    cy.contains('Vui lòng kiểm tra lại số điện thoại').should('be.visible')
  })


  it('Đăng ký với ngày sinh không đúng định dạng', () => {
    cy.visit('https://cellphones.com.vn/')
    cy.contains('Đăng nhập').click()
    cy.get('.register-btn').click({multiple: true, force: true})
    cy.get('input[placeholder="Nhập họ và tên"]').type('abcd')
    cy.get('input[placeholder="Nhập số điện thoại"]').type('0355090909')  
    cy.get('input[placeholder="Ngày sinh"]').type('2025-01-01')  // năm sinh lớn hơn năm hiện tại sẽ bị lỗi, ngày và tháng bắt buộc phải đúng định dạng
    cy.get('input[placeholder="Nhập mật khẩu"]').type('abcd12')
    cy.get('input[placeholder="Nhập lại mật khẩu"]').type('abcd12')
    cy.contains('button', 'Đăng ký').click()
    cy.contains('Vui lòng không chọn ngày sinh từ tương lai').should('be.visible')
  })


  it('Đăng ký với mật khẩu không đúng định dạng', () => {
    cy.visit('https://cellphones.com.vn/')
    cy.contains('Đăng nhập').click()
    cy.get('.register-btn').click({multiple: true, force: true})
    cy.get('input[placeholder="Nhập họ và tên"]').type('abcd')
    cy.get('input[placeholder="Nhập số điện thoại"]').type('0355090909')
    cy.get('input[placeholder="Ngày sinh"]').type('2003-01-01')
    cy.get('input[placeholder="Nhập mật khẩu"]').type('vule3')   // Mật khẩu thiếu 1 trong 3 yếu tố đều bị thông báo lỗi như nhau
    cy.get('input[placeholder="Nhập lại mật khẩu"]').type('vule3')
    cy.contains('button', 'Đăng ký').click()
    cy.contains('Mật khẩu tối thiểu 6 ký tự, có ít nhất 1 chữ và 1 số').should('be.visible')
  })


  it('Đăng ký với mật khẩu xác thực không trùng khớp', () => {
    cy.visit('https://cellphones.com.vn/')
    cy.contains('Đăng nhập').click()
    cy.get('.register-btn').click({multiple: true, force: true})
    cy.get('input[placeholder="Nhập họ và tên"]').type('abcd')
    cy.get('input[placeholder="Nhập số điện thoại"]').type('0373090909')
    cy.get('input[placeholder="Ngày sinh"]').type('2003-01-01')
    cy.get('input[placeholder="Nhập mật khẩu"]').type('abcd12')   
    cy.get('input[placeholder="Nhập lại mật khẩu"]').type('abcd1')
    cy.contains('button', 'Đăng ký').click()
    cy.contains('Mật khẩu xác thực lại không trùng khớp').should('be.visible')
  })

})
