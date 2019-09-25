import uuid from 'uuid/v4';

// const state = [
//     {
//       id: uuid(),
//       task: 'Learn React',
//       complete: true,
//     },
//     {
//       id: uuid(),
//       task: 'Learn Firebase',
//       complete: true,
//     },
//     {
//       id: uuid(),
//       task: 'Learn GraphQL',
//       complete: false,
//     },

//   ];

const subscriptions = [
    {key:1,date:"date",title:"title",status:"live",count:"232"},
    {key:2,date:"date",title:"title",status:"live",count:"233"}
];
 
const state = {
    "subscriptions":subscriptions,
    'currentProductInfo':{id:''},
    'currentListing':{id:''},
    'currentModifiers':[]
};

  export default state;