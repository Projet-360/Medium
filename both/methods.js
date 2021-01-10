import { Articles, Comments, articleUpsertSchema, commentUpsertSchema } from './collections'
import { check } from 'meteor/check'

Meteor.methods({
    insertArticle(article) {
        articleUpsertSchema.validate(article)

        let articleDoc = {
            title: article.title,
            content: article.content,
            createdAt: new Date(),
            ownerId: this.userId
        }
        return Articles.insert(articleDoc)
    },

    updateArticle(article) {
        articleUpsertSchema.validate(article)

        Articles.update({_id: article.id},
        {
            $set: 
            {
                title: article.title, 
                content: article.content
            }
        }
    )},

    removeArticle(articleId) {
        check(articleId, String)
        Articles.remove({_id: articleId})
    },

    insertComment(comment) {
        commentUpsertSchema.validate(comment)

        let commentDoc = {
            content: comment.content,
            articleId: comment.articleId,
            createdAt: new Date(),
            ownerId:  this.userId
        }

        Comments.insert(commentDoc)
    }
})