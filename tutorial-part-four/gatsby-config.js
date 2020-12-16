/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

const dinnerMenu = [
  {
      itemName: "hamburger",
      photoUrl: "asdf",
      description: "a juicy burger",
      price: 12.35
  }
]

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Panadas Eating lots`,
    dinnerMenu
  },

  plugins: [ {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `src`,
      path: `${__dirname}/src/`,
    },
  },
  `gatsby-transformer-remark`,
  `gatsby-plugin-emotion`,
  {
    resolve: `gatsby-plugin-typography`,
    options: {
      pathToConfigModule: `src/utils/typography`,
    },
  },  
  ],
}
