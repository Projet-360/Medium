import './comment.html'
import {FlowRouter} from 'meteor/ostrio:flow-router-extra'
import { Comments } from '../../../both'

Template.comment_form.events({
    'submit .js-create-comment' (event, instance) {
        event.preventdDefault();

        const content = event.target.centent.value

        let commentDoc = {
            content: content,
            articleId: FlowRouter.getParam('articleId'),
            createdAt: new Date(),
            ownerId:  Meteor.userId()
        }

        Comments.insert(commentDoc)

        event.target.centent.value = ""
    }
})