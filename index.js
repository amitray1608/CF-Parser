
const axios = require('axios');
const cheerio = require('cheerio');
var fs = require('fs');

url = 'https://codeforces.com/';

const getTestCase = (dir, html) => {
    
    fs.copyFileSync(`${dir}/../snippet.cpp`, `${dir}/sol.cpp`);
    data = [];
    const $ = cheerio.load(html);
    
    $('div.input pre').each((i, elem) => {
        data[i] = {
            ...data[i],
            input: $(elem).text()
        };
    });

    $('div.output pre').each((i, elem) => {
        data[i] = {
            ...data[i],
            output: $(elem).text()
        };
    });

    console.log(data);
    data.forEach((test, i) => {
        fs.writeFile(`${dir}/in${i}.txt`, test.input, (err) => {
            if (err) {
                console.log(err);
            }
            console.log(`The file ${dir}/in${i}.txt was saved!`);
        });
    })
    console.log(data);
}

const getTestCaseFromProblemUrl = (url) => {
    var dir = `./${url.substring(url.lastIndexOf('/') + 1)}`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    axios.get(url)
        .then(response => {
            getTestCase(dir, response.data);
        }) 
        .catch(err => console.log(err));
}

const getTotalContestProblems = (html) => {
    data = [];
    const $ = cheerio.load(html);
    console.log('parsing..');
    $('tr td.id a').each((i, elem) => {
        problem_url = 'https://codeforces.com/' + $(elem).attr('href')
        console.log(problem_url);
        getTestCaseFromProblemUrl(problem_url);
    });
}

axios.get(process.env.CF_CONTEST)
    .then(response => {
        getTotalContestProblems(response.data);
    });