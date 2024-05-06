## 環境建置步驟
### 1. Node.js install
查看是否已安裝node.js (如果有的話會顯示版本號)  
```
node -v
```
如果沒有安裝會顯示：'node' 不是內部或外部命令、可執行的程式或批次檔。  
到 https://nodejs.org/en/download 下載 node.js , 安裝完後需要重啟CMD才會顯示版本號。

### 2. 切換到 backend 資料夾
```
cd <到isChange/backend的路徑>
```

### 3. Project setup
```
npm install
```

### 3. 設定 .env 文件
複製一份`.env.example`，並改名成`.env`，填入所需設定(後端會給)  
沒有.env.example的話也可以直接建一個.env檔案

### 4. Run project
- Compiles and hot-reloads for development
    ```
    npm run dev
    ```
- Compiles for production
    ```
    npm start
    ```
### 5. Test Api
環境建置完成，可以在 http://localhost:3000 測試api了


## 其他注意事項
### 1. 資料夾說明
* `src/controllers` 放 api
* `src/models` 放 資料庫相關的定義
* `src/routes` 放 api 路徑
* `src/middlewares` 放 一些守門員（？）像是驗證是否有登入、上傳資料的中介等
### 2. git commit 說明文字
* `build` : Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* `ci` : Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
* `docs` : Documentation only changes
* `feat` : A new feature
* `fix` : A bug fix
* `perf` : A code change that improves performance
* `refactor` : A code change that neither fixes a bug nor adds a feature
* `style` : Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* `test` : Adding missing tests or correcting existing tests

    ```
    範例：
    feat: 新增登入api
    ```
### 3. 程式命名風格
* **constant**：使用全大寫命名，斷字間以 _ 連接，例如 MAX_VALUE, PI。
* **variables and functions**：使用camelCase，例如 myFunction()、teaPrice。
* **private variables and functions**：前面加 _ ，例如 _privateProp, _myPrivateFunction()。
* **router、檔名**：使用短橫線分隔單詞，例如：/user-profile, /product-details, /login。