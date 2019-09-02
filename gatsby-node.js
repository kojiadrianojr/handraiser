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
