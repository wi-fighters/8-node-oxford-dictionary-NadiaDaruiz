const axios = require('axios')

const args = process.argv.slice(2);
let [word] = args;
let upperCase = word.toUpperCase()


axios(`https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${word}`,
    {
        // the method by default is GET so you can put it  or not
        method: 'GET',
        headers: {
            app_id: 'c723d5a8',
            app_key: 'a50914880175d24f167e5b26a992f76a'
        }
    }).then(res => {
        let lexicalEntries = res.data.results[0].lexicalEntries[0];
        let etymologies = lexicalEntries.entries[0].etymologies;
        let definitions = lexicalEntries.entries[0].senses;

        console.log(`${upperCase} is a ${lexicalEntries.lexicalCategory.text} \nEtymology: ${etymologies} \nDefinition: `)
        definitions.map((def, i) => {
            console.log(`${i + 1}. ${def.definitions}`)
        })
        console.log(`Provided by: ${res.data.metadata.provider}`)
    }).catch(err => console.log(err))





/* Another option:

const baseUrl = `https://od-api.oxforddictionaries.com/api/v2/`
let endpoint = `entries/en-us/${arg}`
const client = axios.create({
    baseURL: baseUrl,
    headers: {
        app_id: 'c723d5a8',
        app_key: 'a50914880175d24f167e5b26a992f76a'
    }
});

client.get(endpoint).then(res => console.log(res.data.results[0].lexicalEntries[0]))

*/
