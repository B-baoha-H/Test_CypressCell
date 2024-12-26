const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    redirectionLimit: 60, // Tăng giới hạn số lần chuyển hướng
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
module.exports = {
  e2e: {
    video: true, // Bật ghi video
    screenshotOnRunFailure: true, // Chụp ảnh khi bài kiểm tra thất bại
    //videoCompression: 32, // Chất lượng video (0 đến 51, 0 là tốt nhất)
    ///videoUploadOnPasses: false, // Không tải lên video nếu bài kiểm tra thành công
    screenshotsFolder: "cypress/screenshots", // Thư mục lưu ảnh chụp màn hình
    //videosFolder: "cypress/videos" // Thư mục lưu video
  }
};
