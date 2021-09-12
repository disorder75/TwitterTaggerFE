export class Tweet {
    data: {
        text:string,
        author_id:string,
        id:string,
    };
    includes : {
        users: [
           {
              public_metrics : {
                 followers_count:string,
                 following_count:string,
                 tweet_count:string,
                 listed_count:string
              },
              url:string,
              verified:boolean,
              profile_image_url:string,
              description:string,
              protected:boolean,
              username:string,
              id:string,
              name:string,
              created_at:string
           }
        ]
     };
     matching_rules:[
        {
           id:string,
           tag:string
        }
     ];
     visible:boolean;
     prediction:string;
     predictionsWithProbabilities:string;
     arrayOfpredictionsWithProbabilities:string[];
}
