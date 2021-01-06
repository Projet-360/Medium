import { Articles, Comments } from './collections'
import { check } from 'meteor/check'

Meteor.methods({
    insertAticle(article) {
        check(article, {
            title: String,
            content: String
        })

        let articleDoc = {
            title: article.title,
            content: article.content,
            createdAt: new Date(),
            ownerId: this.userId
        }
        return Articles.insert(articleDoc)
    },

    updateArticle(article) {
        check(article, {
            id: String,
            title: String,
            content: String
        })

        Articles.update({_id: article.id},
        {
            $set: 
            {
                title: article.title, 
                content: article.content
            }
        })
    },

    removeArticle(articleId) {
        check(articleId, String)
        Articles.remove({_id: FlowRouter.getParam('articleId')})
    },

    insertComment(comment) {
        check(comment, {
            articleId: String,
            content: String
        })

        let commentDoc = {
            content: comment.content,
            articleId: comment.articleId,
            createdAt: new Date(),
            ownerId:  this.userId
        }

        Comments.insert(commentDoc)
    }
})