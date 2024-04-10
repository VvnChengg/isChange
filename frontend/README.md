# 啟動前端
```
cd frontend
npm install
npm start
```
在瀏覽器上開啟 http://localhost:3001 即可。

## 其他注意事項
### 1. 資料夾說明
* `public` 放素材、圖片，例如 icon
* `src/api` 放 api
* `src/components` 放各個頁面共用的元件
* `src/pages` 放各個頁面，底下一個頁面一個資料夾，裏面包含 `<page_name>.js`、`<page_name>-style.js`、`index.js`
* `src/styles` 放各種 css 和字體
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

### 3. 程式命名風格
* **constant**：使用全大寫命名，斷字間以 _ 連接，例如 MAX_VALUE, PI。
* **variables and functions**：使用camelCase，例如 myFunction()、teaPrice。
* **private variables and functions**：前面加 _ ，例如 _privateProp, _myPrivateFunction()。
* **檔名**：頁面開頭小寫、元件開頭大寫，例如 home.js, Header.js。


---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
