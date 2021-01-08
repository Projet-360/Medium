import './comment.html'
import {FlowRouter} from 'meteor/ostrio:flow-router-extra'
import { Comments } from '../../../both'

Template.comment_form.events({
    'submit .js-create-comment' (event, instance) {
        event.preventDefault();

        const content = event.target.content.value

        Meteor.call('insertComment', {content:content, articleId: FlowRouter.getParam('articleId')})

        event.target.content.value = ""
    }
})

Template.comment_list.helpers({
    comments() {
        return Comments.find({articleId: FlowRouter.getParam('articleId')}, {sort: {createdAt: 1}})
    }
})