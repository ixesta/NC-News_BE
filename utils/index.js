// Format data

const { topicsData, articlesData, usersData, commentsData } = require('../seed/devData')

exports.formatTopicData = (topicsData) => {
  return topicsData.map(topic => {
    return {
      title: topic.title,
      slug: topic.slug
    }
  })
}


exports.formatUserData = (usersData) => {
  return usersData.map(user => {
    return {
      username: user.username,
      name: user.name,
      avatar_url: user.avatar_url
    }
  })
}



exports.formatArticleData = (articlesData, userDocs) => {
  return articlesData.map(article => {
    return {
      ...article,
      belongs_to: article.topic,
      created_by: userDocs.find(user => user.username === article.created_by)
        ._id
    }
  })
}

exports.formatCommentData = (commentData, articleDocs, userDocs) => {
  return commentData.map(comment => {
    return {
      ...comment,
      belongs_to: articleDocs.find(
        article => article.title === comment.belongs_to
      )._id,
      created_by: userDocs.find(user => user.username === comment.created_by)
        ._id
    }
  })
}













// exports.createUserRef = (usersData, usersDocs) => {
//   return usersData.reduce((acc, user, index) => {
//     acc[user.username] = usersDocs[index].username;
//     return acc;
//   }, {})
// }
// const replaceUsernames = (created_by, userRef) => {
//   console.log(created_by, '****************')
//   return created_by.reduce((acc, username, index) => {
//     acc[index] = userRef[username];
//     return acc;
//   }, [])
// }

// exports.formatArticlesData = (articlesData, usersData, userRef) => {
//   console.log('articlesData', articlesData)
//   return articlesData.map((article) => {
//     return {
//       title: article.title,
//       body: article.body,
//       topic: article.belongs_to,
//       votes: 0,
//       created_by: replaceUsernames(article.created_by, userRef)

//     }
//   })
// }

