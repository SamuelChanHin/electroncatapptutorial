const path = require("path");
const builder = require("electron-builder");

builder
  .build({
    projectDir: path.resolve(__dirname),
    win: ["portable", "nsis"], // portable 為 Windows 的免安裝程式，nsis 為安裝程式
    mac: ["dmg"], // dmg 為 Mac 常見的打包方式，若開發環境為 Windows 無法打包，需註解掉，否則會出錯
    config: {
      appId: "com.app.cat", // 應用程式 ID
      productName: "Cat App", // 應用程式名稱
      copyright: "", // 授權宣告
      directories: {
        output: "packages", // 打包後的應用程式放置在 electron-build/win
      },
      // 設定打包後的 icon
      win: {
        icon: path.resolve(__dirname, "src/assets/appicon.png"),
      },
      mac: {
        icon: path.resolve(__dirname, "src/assets/appicon.png"),
        identity: null,
      },
      // 打包需要用到的原始碼、模組，皆需要寫到 files 內
      files: ["dist/**/*", "node_modules/**/*", "package.json", "main.js"],
      extends: null,
    },
  })
  .then(
    (data) => console.log(data),
    (err) => console.error(err)
  );
