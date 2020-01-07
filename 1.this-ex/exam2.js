class Forum {
    constructor() {
        this._users = []
        this._questions = []
        this._id = 1
        //this.login = true
    }
    register(username, password, repeatPassword, email) {
        if (!username || !password || !repeatPassword || !email) {
            throw new Error('Input can not be empty')
        }
        if (password !== repeatPassword) {
            throw new Error('Passwords do not match')
        }
        let user = this._users.some(n => n.username === username)
        let searchemail = this._users.some(n => n.email === email)
        if (user || searchemail) {
            throw new Error('This user already exists!')
        }
        this._users.push({
            username,
            password,
            email,
            login: false
        })
        return `${username} with ${email} was registered successfully!`
    }
    login(username, password) {
        let user = this._users.some(n => n.username === username)
        let user2 = this._users.find(n => n.username === username)
        let pass = this._users.some(n => n.password === password)
        if (!user || !pass) {
            throw new Error(`There is no such user`)
        } else if (user || pass) {
            user2.login = true
            return `Hello! You have logged in successfully`
        }
    }
    logout(username, password) {
        let user = this._users.some(n => n.username === username)
        let user2 = this._users.find(n => n.username === username)
        let pass = this._users.some(n => n.password === password)
        if (!user || !pass) {
            throw new Error('There is no such user')
        } else if (user || pass) {
            user2.login = false
            return 'You have logged out successfully'
        }
    }
    postQuestion(username, question) {
        let user2 = this._users.find(n => n.username === username)

        if (!user2 || !user2.login) {
            throw new Error('You should be logged in to post questions')
        }
        if (!question) {
            throw new Error('Invalid question')
        }
        this._questions.push({ id: this._id++, username, question, answer: [] })
        return 'Your question has been posted successfully'
    }
    postAnswer(username, questionId, answer) {
        let user2 = this._users.find(n => n.username === username)
        if (!user2 || !user2.login) {
            throw new Error('You should be logged in to post questions')
        }
        if (!answer) {
            throw new Error('Invalid answer')
        }
        let findquestion = this._questions.find(i => i.id === questionId)
        if (!findquestion) {
            throw new Error('There is no such question')
        }
        //console.log(findquestion)
        findquestion.answer.push({ username, answer })
        return "Your answer has been posted successfully"
    }
    showQuestions() {
        //return this._questions.map(e => `Question ${e.id} by ${e.username}: ${e.question} 
        //${e.answer.map(x => `---${x.username}: ${x.answer}`).join('\n')}`).join('\n');
        return this._questions.map(e => `Question ${e.id} by ${e.username}: ${e.question} 
${e.answer.map(x => `---${x.username}:`+`${x.answer}`).join('\n')}`).join('\n');


    }
}
let forum = new Forum();

forum.register('Michael', '123', '123', 'michael@abv.bg');
forum.register('Stoyan', '123ab7', '123ab7', 'some@gmail@.com');
forum.login('Michael', '123');
forum.login('Stoyan', '123ab7');

forum.postQuestion('Michael', "Can I rent a snowboard from your shop?");
forum.postAnswer('Stoyan', 1, "Yes, I have rented one last year.");
forum.postQuestion('Stoyan', "How long are supposed to be the ski for my daughter?");
forum.postAnswer('Michael', 2, "How old is she?");
forum.postAnswer('Michael', 2, "Tell us how tall she is.");
forum.postAnswer('Stoyan', 1, "Yes, I have rented one last year.");

console.log(forum.showQuestions());