import { config } from "https://deno.land/x/dotenv/mod.ts";

const getResult = async (url: string): Promise<void> => {
    const env = config()
    const data = await fetch((url),{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `bearer ${env.GITHUB_GRAHPQL_API_TOKEN}`
        },
        body:
        
        JSON.stringify({
            query: `
            query { 
                repository(name: "material-ui", owner: "mui-org") {
                                pullRequest(number: 21214) {
                                reviews(first: 100) {
                                    nodes {
                                    bodyText
                                    createdAt
                                    author {
                                        login
                                    }
                                    comments(first: 100) {
                                        nodes {
                                        author {
                                            login
                                        }
                                        body
                                        }
                                    }
                                    }
                                }
                                comments(first: 100) {
                                    nodes {
                                    author {
                                        login
                                    }
                                    createdAt
                                    body
                                    }
                                    totalCount
                                }
                                }
                            }
                }
        `})
    });
    const fetchData = await data.json()
    console.log('fetchData.repository.pullRequest.reviews',fetchData.data.repository.pullRequest.reviews)
    console.log('fetchData.repository.pullRequest.comments',fetchData.data.repository.pullRequest.comments)
    // writeFileStr('data.txt',)
    
}

getResult("https://api.github.com/graphql");
