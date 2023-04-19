const functions = require("firebase-functions");
const { Configuration, OpenAIApi } = require("openai");
const admin = require('firebase-admin');
admin.initializeApp();

const chatCodeSystemMessage = "You are a programming assistant that produces programs for users. " + 
                            "You follow these guidelines when producing the code: " +
                            "- Provide only the code with no additional prose. " + 
                            "- Provide any necessary comments in the code only. " + 
                            "- Program in the language and frameworks provided by the user. " + 
                            "- If there are multiple solutions to the question, you provide the solution you see fit."


const snippetCodeSystemMessage = "You are a programming assistant that produces programs for users. " + 
                                "Users describe a piece of code they need, and you produce the code for them. " +
                                "You follow these guidelines when producing the code: " + 
                                "- Provide only the code with no additional prose. " + 
                                "- Provide one response with the most robust code possible" + 
                                "- Program in the language and frameworks provided by the user. " + 
                                "- If there are multiple solutions to the question, you provide the solution you see fit."

const checkAuthPrecondition = (context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
}

exports.getChainResponse = functions.runWith({ secrets: ['OPENAI']}).https.onCall((data, context) => {
    checkAuthPrecondition(context)
    const chain = data.chain
    const frames = data.frames
    const lang = data.lang
    if (frames !== "") {
        chain.unshift({"role": "user", "content": "I am using " + frames})
    }
    chain.unshift({"role": "user", "content": "I am programming with " + lang + "."})
    chain.unshift({"role": "system", "content": chatCodeSystemMessage})
    functions.logger.log(chain)
    const configuration = new Configuration({
        apiKey: process.env.OPENAI,
    });
    const openai = new OpenAIApi(configuration);
    const aiRes = openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: chain,
        temperature: 0.1,
    }).then((response) => {
        return response.data.choices[0].message;
    })
    return aiRes
})

exports.getEdit = functions.runWith({ secrets: ['OPENAI']}).https.onCall((data, context) => {
    checkAuthPrecondition(context)
    let chain
    const frames = data.frames
    const lang = data.lang
    if (frames !== "") {
        chain = [{"role": "system", "content": snippetCodeSystemMessage},
                {"role": "user", "content": "I am programming with " + lang + ". I am using " + frames + "."},
                {"role": "user", "content": data.prompt}, 
                {"role": "assistant", "content": data.previousMessage}, 
                {"role": "user", "content": data.edit}]
        
    } else {
        chain = [{"role": "system", "content": snippetCodeSystemMessage},
                {"role": "user", "content": "I am programming with " + lang}, 
                {"role": "user", "content": data.prompt}, 
                {"role": "assistant", "content": data.previousMessage}, 
                {"role": "user", "content": data.edit}]
    }
    functions.logger.log(chain)
    const configuration = new Configuration({
        apiKey: process.env.OPENAI,
    });
    const openai = new OpenAIApi(configuration);
    const aiRes = openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: chain,
        max_tokens: 2000, 
        temperature: 0.1,
    }).then((response) => {
        return response.data.choices[0].message;
    }).catch((error) => [
        functions.logger.log(error)
    ])
    return aiRes
})

exports.getSnippetResponse = functions.runWith({ secrets: ['OPENAI']}).https.onCall((data, context) => {
    checkAuthPrecondition(context)
    let chain
    const frames = data.frames
    const lang = data.lang
    if (frames !== "") {
        chain = [{"role": "system", "content": snippetCodeSystemMessage},
                {"role": "user", "content": "I am programming with " + lang + "."}, 
                {"role": "user", "content": "I am using " + frames}, 
                {"role": "user", "content": data.prompt}]
        
    } else {
        chain = [{"role": "system", "content": snippetCodeSystemMessage},
                {"role": "user", "content": "I am programming with " + lang + "."}, 
                {"role": "user", "content": data.prompt}]
    }
    functions.logger.log(chain)
    const configuration = new Configuration({
        apiKey: process.env.OPENAI,
    });
    const openai = new OpenAIApi(configuration);
    const aiRes = openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: chain,
        max_tokens: 3500, 
        temperature: 0.1,
    }).then((response) => {
        return response.data.choices[0].message;
    })
    return aiRes
})