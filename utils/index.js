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

