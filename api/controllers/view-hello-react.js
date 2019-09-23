module.exports = {


  friendlyName: 'View hello react',


  description: 'Display "Hello react" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/hello-react'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
