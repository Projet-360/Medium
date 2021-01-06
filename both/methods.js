import { Articles, Comments } from './collections'

Meteor.methods({
    insertAticle(article) {
        let articleDoc = {
            title: article.title,
            content: article.content,
            createdAt: new Date(),
            ownerId: this.userId
        }
        return Articles.insert(articleDoc)
    },
    updateArticle(articleId, article) {
        Articles.update({_id: FlowRouter.getParam('articleId')},
        {
            $set: 
            {
                title: article.title, 
                content: article.content
            }
        }
    )},
    removeArticle(articleId) {
        Articles.remove({_id: FlowRouter.getParam('articleId')})
    },
    insertComment(comment) {
        let commentDoc = {
            content: comment.content,
            articleId: comment.articleId,
            createdAt: new Date(),
            ownerId:  this.userId
        }

        Comments.insert(commentDoc)
    }
})