## Project setup
```
npm install
```

## Compiles and hot-reloads for development
```
npm run dev
```

## Compiles for production
```
npm start
```

### 其他注意事項
1. 請複製一份`.env.example`，並改名成`.env`，填入所需設定
2. 資料夾說明
    * `src/controllers` 放 api
    * `src/models` 放 資料庫相關的定義
    * `src/routes` 放 api 路徑
    * `src/middlewares` 放 一些守門員（？）像是驗證是否有登入、上傳資料的中介等
3. git commit 說明文字
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
4. 程式命名風格
* **constant**：使用全大寫命名，斷字間以 _ 連接，例如 MAX_VALUE, PI。
* **variables and functions**：使用camelCase，例如 myFunction()、teaPrice。
* **private variables and functions**：前面加 _ ，例如 _privateProp, _myPrivateFunction()。
* **router、檔名**：使用短橫線分隔單詞，例如：/user-profile, /product-details, /login。