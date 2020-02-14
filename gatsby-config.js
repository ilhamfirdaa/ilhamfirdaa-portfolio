module.exports = {
  siteMetadata: {
    title: `Gatsby starter pack`,
    description: `gatsby starter with material ui, redux and jest`,
    author: `ilhamfirdaa`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        disableAutoprefixing: false,
        disableMinification: false,
        // stylesProvider: {
        //   injectFirst: true,
        // },
        // webFontsConfig: {
        //   fonts: {
        //     google: [
        //       {
        //         family: `Kaushan`,
        //         variants: [`300`, `500`, `700`],
        //       },
        //     ],
        //   },
        // },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
