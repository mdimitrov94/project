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
        console.log(this._users)
        return `${username} with ${email} was registered successfully!`
    }
    login(username, password) {
        const user = this._users.find(x => x.username === username);
        if (!user) {
            throw new Error('There is no such user');
        }
        if (user.password === password) {
            user.login = true;
            return 'Hello! You have logged in successfully';
        }
    }

    logout(username, password) {
        const user = this._users.find(x => x.username === username);
        if (!user) {
            throw new Error('There is no such user');
        }
        if (user.password === password) {
            user.login = false;
            return 'You have logged out successfully';
        }
    }
    postQuestion(username, question) {
        const user = this._users.find(x => x.username === username);
        if (!user) {
            throw new Error('You should be logged in to post questions');
        }
        if(!user.login){
            throw new Error('You should be logged in to post questions');
        }
        if(!question){
            throw new Error ('Invalid question');
        }
        const currentQuestion = {
            name: username,
            id: this._id++,
            question,
            answers: [],
        };
        this._questions.push(currentQuestion);
        return 'Your question has been posted successfully';
    }

    postAnswer(username, questionId, answer) {
        const user = this._users.find(x => x.username === username);
        if (!user) {
            throw new Error('You should be logged in to post answers');
        }
        if(!user.login){
            throw new Error('You should be logged in to post answers');
        }
        if(!answer){
            throw new Error ('Invalid answer');
        }
        if(!this._questions.find(x => x.id === questionId)){
            throw new Error('There is no such question');
        }
        const question = this._questions.find(x => x.id === questionId);
        question.answers.push({
            username,
            answer,
        });
        return 'Your answer has been posted successfully';
    }

    showQuestions() {
        return this._questions.map(e => `Question ${e.id} by ${e.username}: ${e.question}
${e.answers.map(x => `---${x.username}: ${x.answer}`).join('\n')}`).join('\n');
    }
}
let forum = new Forum();

forum.register('Michael', '123', '123', 'michael@abv.bg');
forum.register('Stoyan', '123ab7', '123ab7', 'some@gmail@.com');
forum.login('Michael', '123');
forum.login('Stoyan', '123ab7');

forum.postQuestion('Michael', "Can I rent a snowboard from your shop?");
forum.postAnswer('Stoyan',1, "Yes, I have rented one last year.");
forum.postQuestion('Stoyan', "How long are supposed to be the ski for my daughter?");
forum.postAnswer('Michael',2, "How old is she?");
forum.postAnswer('Michael',2, "Tell us how tall she is.");
forum.postAnswer('Stoyan',1, "Yes, I have rented one last year.");

console.log(forum.showQuestions());
