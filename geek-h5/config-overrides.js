const path = require('path') 

const { override, addWebpackAlias,addPostcssPlugins } = require('customize-cra')// 配置路径别名// - 所有 src 目录下的文件，都可使用 @/ 开始引用// - 公共 scss 文件，存放在 src/assets/styles 目录下，可使用 @scss/ 开始引用
const alias = addWebpackAlias({  
    '@': path.resolve(__dirname, 'src'),  
    '@scss': path.resolve(__dirname, 'src', 'assets', 'styles')
})// 导出要进行覆盖的 webpack 配置

const px2viewport = require('postcss-px-to-viewport')// 配置路径别名// ...// 配置 PostCSS 样式转换插件
const postcssPlugins = addPostcssPlugins([  // 移动端布局 viewport 适配方案  
    px2viewport({    // 视口宽度：可以设置为设计稿的宽度    
        viewportWidth: 375,    // 白名单：不需对其中的 px 单位转成 vw 的样式类类名    // 
        selectorBlackList: ['.ignore', '.hairlines']  
    })])// 导出要进行覆盖的 webpack 配置


module.exports = override(alias,postcssPlugins)



