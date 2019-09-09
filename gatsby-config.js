module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-apiserver",
      options: {
        typePrefix: "api__",
        url: `http://live.random.studio/api/projects`,
        method: "get",
        name: `projects`,
      },
    },
  ],
}
