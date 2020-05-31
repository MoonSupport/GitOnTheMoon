import { writeFileStr } from 'https://deno.land/std@0.51.0/fs/mod.ts';

const dumyObjects = [
    {
        isHost : true,
        avartar: 'https://avatars2.githubusercontent.com/u/408825?s=88&u=aec617d7465dcd443093bb2e2367922786ee09dc&v=4',
        author: 'jriecken',
        created: 'commented on 30 May 2013',
        description: `
        I'm trying to programatically invoke the JSX transformer (using the version of react-tools in the npm registry) by running something like

        require('react-tools').transform(someCode);
        Which then throws this error:

        Error: Cannot find module './build/React'
        If I comment out the lines in main.js that require/use ./build/React the react-tools module loads fine and the transformer runs correctly.
        `,
        hasEmotion: false,
        // emotions: [
        //     {
        //         type: 'Hooray',
        //         count :1
        //     },
        //     {
        //         type: 'Rocket',
        //         count: 2
        //     }
        // ]
    },
    {
        isHost : false,
        avartar: 'https://avatars2.githubusercontent.com/u/8445?s=88&v=4',
        author: 'zpao',
        created: 'commented on 30 May 2013',
        description: `
        Bah, I changed build filenames last minute and didn't properly test the module after :( Thanks for finding this! I guess we should write some tests for the node module too, not just our phantomjs tests.

        (Very) Short term, you should be able to change ./build/React to ./build/react and that will fix the problem.
            
        @benjamn - I guess it's time to figure out what we want to do with npm versions vs library versions. Should we just bump them both for the time being?
        `,
        hasEmotion: false,
    },
    {
        isHost : false,
        avartar: 'https://avatars2.githubusercontent.com/u/8445?s=88&v=4',
        author: 'zpao',
        created: 'commented on 30 May 2013',
        description: `
        Nope, that alone won't do it, we're not even packaging. I totally screwed up the node module :( Fix soon!


        `,
        hasEmotion: false,
    },
    {
        isHost : true,
        avartar: 'https://avatars2.githubusercontent.com/u/408825?s=88&u=aec617d7465dcd443093bb2e2367922786ee09dc&v=4',
        author: 'jriecken',
        created: 'commented on 30 May 2013',
        description: `
        Yeah, doesn't look like there's even a build directory there. :)
        `,
        hasEmotion: false,
    }
]

const getFrameDirection = (isHost : boolean) => {
    if(isHost) return `flex-start`
    return 'flex-end'
}

const getEmotion = (type : string) => {
    switch(type) {
        case 'Good':
            return '👍'
        case 'Bad':
            return '👎'
        case 'Laugh':
            return '😄'
        case 'Thinking':
            return '😕'
        case 'Heart':
            return '❤️'
        case 'eyes':
            return '👀'
        case 'Hooray': 
            return '🎉'
        case 'Rocket':
            return '🚀'
    }

}

const generator = (objects : any) => {
    let results = ''
    objects.map((object : any)=> {
        const frameDirection = getFrameDirection(object.isHost)
        const frame = `
         <div style="width: 100%; display:flex; justify-content: ${frameDirection};">
         <div style="display:flex; width: 691px;">
             <div>
                 <img style="border-radius: 2.5px" height="40" width="40" src="${object.avartar}">
             </div>
             <div style="width:637px; margin-left: 16px">
                 <div style="align-items: center; background-color: #f6f8fa; border-top: 1px solid #d1d5da; border-left: 1px solid #d1d5da; border-right: 1px solid #d1d5da; border-radius: 5px 5px 0px 0px; display: flex; justify-content: space-between; padding: 8px 16px;">
                     <div>
                         <span style="font-weight: bold">${object.author}</span>
                         <span style="color: #586069">${object.created}</span>
                     </div>
                     <div>
                         <svg style="margin-right: 5px" class="octicon octicon-smiley" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 8C1.5 6.27609 2.18482 4.62279 3.40381 3.40381C4.62279 2.18482 6.27609 1.5 8 1.5C9.72391 1.5 11.3772 2.18482 12.5962 3.40381C13.8152 4.62279 14.5 6.27609 14.5 8C14.5 9.72391 13.8152 11.3772 12.5962 12.5962C11.3772 13.8152 9.72391 14.5 8 14.5C6.27609 14.5 4.62279 13.8152 3.40381 12.5962C2.18482 11.3772 1.5 9.72391 1.5 8ZM8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0V0ZM5 8C5.26522 8 5.51957 7.89464 5.70711 7.70711C5.89464 7.51957 6 7.26522 6 7C6 6.73478 5.89464 6.48043 5.70711 6.29289C5.51957 6.10536 5.26522 6 5 6C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8ZM12 7C12 7.26522 11.8946 7.51957 11.7071 7.70711C11.5196 7.89464 11.2652 8 11 8C10.7348 8 10.4804 7.89464 10.2929 7.70711C10.1054 7.51957 10 7.26522 10 7C10 6.73478 10.1054 6.48043 10.2929 6.29289C10.4804 6.10536 10.7348 6 11 6C11.2652 6 11.5196 6.10536 11.7071 6.29289C11.8946 6.48043 12 6.73478 12 7ZM5.32 9.636C5.48134 9.52303 5.68064 9.47806 5.87486 9.51081C6.06908 9.54355 6.24262 9.65138 6.358 9.811L6.365 9.82C6.46785 9.93795 6.58549 10.0421 6.715 10.13C6.979 10.308 7.398 10.5 8 10.5C8.602 10.5 9.02 10.308 9.285 10.129C9.41451 10.0411 9.53215 9.93695 9.635 9.819L9.642 9.811C9.75737 9.64895 9.93239 9.53937 10.1285 9.50637C10.3247 9.47336 10.526 9.51963 10.688 9.635C10.85 9.75037 10.9596 9.92539 10.9926 10.1215C11.0256 10.3177 10.9794 10.519 10.864 10.681L10.25 10.25C10.864 10.68 10.864 10.681 10.863 10.681V10.682L10.862 10.684L10.86 10.687L10.855 10.694L10.841 10.713C10.7848 10.7883 10.7233 10.8594 10.657 10.926C10.4963 11.0924 10.3187 11.2415 10.127 11.371C9.49722 11.7894 8.75607 12.0086 8 12C7.054 12 6.348 11.692 5.874 11.37C5.62319 11.2003 5.39676 10.9971 5.201 10.766C5.1867 10.7486 5.1727 10.7309 5.159 10.713L5.145 10.693L5.14 10.687L5.138 10.684V10.682H5.137L5.75 10.25L5.136 10.68C5.02196 10.5172 4.97718 10.3159 5.01149 10.1201C5.04581 9.92439 5.1564 9.75027 5.319 9.636H5.32Z"></path></svg>
                         <svg aria-label="Show options" class="octicon octicon-kebab-horizontal" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path d="M8 9C8.82843 9 9.5 8.32843 9.5 7.5C9.5 6.67157 8.82843 6 8 6C7.17157 6 6.5 6.67157 6.5 7.5C6.5 8.32843 7.17157 9 8 9Z"></path><path d="M1.5 9C2.32843 9 3 8.32843 3 7.5C3 6.67157 2.32843 6 1.5 6C0.671573 6 0 6.67157 0 7.5C0 8.32843 0.671573 9 1.5 9Z"></path><path d="M14.5 9C15.3284 9 16 8.32843 16 7.5C16 6.67157 15.3284 6 14.5 6C13.6716 6 13 6.67157 13 7.5C13 8.32843 13.6716 9 14.5 9Z"></path></svg>
                     </div>
                 </div>
                 <div class="message_description" style="background-color: #fff; border: 1px solid #d1d5da; padding: 15px">
                     <p style="margin: 0;">${object.description}</p>
                 </div>
                 ${object.hasEmotion ? '<div class="message_emotion" style="color: #0366d6; display:flex; background-color: #fff; border-bottom: 1px solid #d1d5da; border-left: 1px solid #d1d5da; border-right: 1px solid #d1d5da; border-radius: 0px 0px 5px 5px;">' : ''}
                 ${object.hasEmotion ? object.emotions.map((emotion: any)=>`
                 <div style="padding: 9px 15px 7px 15px; border-right: 1px solid #d1d5da;">
                 <span>${getEmotion(emotion.type)}</span>
                 <span>${emotion.count}</span>
                 </div>
                 ` ).join('') : ''}
                 ${object.hasEmotion ? '</div>': ''}
             </div>
         </div>
         </div>
         <p>&nbsp;</p>
        `
        console.log(results)
        results += frame
    })   
    console.log(results)
    writeFileStr('test.txt',results)
}



generator(dumyObjects)