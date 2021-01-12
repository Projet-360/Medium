import { Articles, Comments, articleUpsertSchema, commentUpsertSchema } from './collections'
import { check } from 'meteor/check'

Meteor.methods({
    insertArticle(article) {
        articleUpsertSchema.validate(article)

        if(!this.userId) {
            throw new Meteor.Error('pas connecté')
        }

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

        if(!this.userId) {
            throw new Meteor.Error('pas connecté')
        }

        let articleFound = Articles.findOne({_id: article.id})
        if(articleFound.ownerId !== this.userId) {
            throw new Meteor.Error('pas autorisé', "Tu dois etre l'auteur de l'article")
        }

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

        if(!this.userId) {
            throw new Meteor.Error('pas connecté')
        }

        let articleFound = Articles.findOne({_id: articleId})
        if(articleFound.ownerId !== this.userId) {
            throw new Meteor.Error('pas autorisé', "Tu dois etre l'auteur de l'article")
        }

        Articles.remove({_id: articleId})
    },

    insertComment(comment) {
        commentUpsertSchema.validate(comment)

        if(!this.userId) {
            throw new Meteor.Error('pas connecté')
        }

        let commentDoc = {
            content: comment.content,
            articleId: comment.articleId,
            createdAt: new Date(),
            ownerId:  this.userId
        }

        Comments.insert(commentDoc)
    }
})