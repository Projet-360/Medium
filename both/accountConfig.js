T9n.setLanguage('fr')

let email = AccountsTemplates.removeField('email');
let password = AccountsTemplates.removeField('password');

AccountsTemplates.addField({
    _id:'fullname',
    type:'text',
    displayName:'Nom complet',
    placeholder:'Nom complet',
    required: true,
    minLenght:3,
    trim:true
})

AccountsTemplates.addField(email);
AccountsTemplates.addField(password);