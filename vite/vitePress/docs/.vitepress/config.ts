const sidebar = {
  '/': [
    { text: '学习笔记', link: '/' },
    {
      text: '分享',
      children: [
        { text: 'webpack打包优化', link: '/webpack/' },
        { text: 'webpack相关文档', link: '/webpack/index3' },
        { text: 'babel', link: '/babel/' },
        { text: 'gulp', link: '/gulp/' },
      ],
    },
    { text: '待定' },
  ],
};

export default {
  title: '学习笔记',
  description: '记录学习笔记.',
  base: '/',
  themeConfig: {
    docsDir: 'docs',
    sidebar,
  },
};
