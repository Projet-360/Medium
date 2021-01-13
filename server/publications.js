import { Articles, Comments } from '../both'
import { check } from 'meteor/check'

Meteor.publish('articles.list', function() {

    let articleCursor = Articles.find({}, { fields: {content:0}})

    let arrayArticle = articleCursor.fetch()

    let arrayOwnerId = arrayArticle.map(article => article.ownerId )
    let arrayUniqueOwnerId = Array.from(new Set(arrayOwnerId))

    
    return [
        articleCursor,
        Meteor.users.find({_id :{$in: arrayUniqueOwnerId}})
    ]
})

Meteor.publish('articles.single', function(articleId) {
    check(articleId, String)
    
    let articleCursor = Articles.find({_id: articleId})
    let commentCursor = Comments.find({articleId: articleId})

    let arrayComment = commentCursor.fetch()
    let arrayOwnerId = arrayComment.map(comment => comment.ownerId )

    let article = articleCursor.fetch().find(article => article._id === articleId )
    arrayOwnerId.push(article.ownerId)

    let arrayUniqueOwnerId = Array.from(new Set(arrayOwnerId))

    return [
        articleCursor,
        commentCursor,
        Meteor.users.find({_id :{$in: arrayUniqueOwnerId}})
    ]
})