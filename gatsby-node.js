const path = require(`path`)
exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions
    const result = await graphql(
      `
        {
            demo {
                class {
                  class_id
                  class_name
                  date_created
                }
            }
        }
      `
    )
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }
    console.log(JSON.stringify(result))
    const cohortTemplate = path.resolve(`src/templates/cohort.js`)
    result.data.demo.class.forEach(data => {
        const cohortPath = `/cohorts/${data.class_id}`
        createPage({
          path: cohortPath,
          component: cohortTemplate,
          context: {
            id: data.class_id
          },
        })
    })
  }

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/cohorts/)) {
    page.matchPath = "/cohorts/*"

    // Update the page.
    createPage(page)
  }
}