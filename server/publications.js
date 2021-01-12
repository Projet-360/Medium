import { Articles } from '../both'

Meteor.publish('articles.list', function() {
    return [
        Articles.find(),
        Meteor.users.find()
    ]
})