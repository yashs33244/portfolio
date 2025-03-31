"use strict";exports.id=412,exports.ids=[412],exports.modules={31412:(e,s,t)=>{t.d(s,{default:()=>v});var a=t(60687),r=t(43210),l=t(41312),o=t(80375),n=t(64398),i=t(86121),c=t(40228),d=t(24934),m=t(85814),u=t.n(m),g=t(29494),h=t(48502);let x={login:"yashs33244",id:0xbc614e,node_id:"MDQ6VXNlcjEyMzQ1Njc4",avatar_url:"https://avatars.githubusercontent.com/u/yashs33244",gravatar_id:"",url:"https://api.github.com/users/yashs33244",html_url:"https://github.com/yashs33244",followers_url:"https://api.github.com/users/yashs33244/followers",following_url:"https://api.github.com/users/yashs33244/following{/other_user}",gists_url:"https://api.github.com/users/yashs33244/gists{/gist_id}",starred_url:"https://api.github.com/users/yashs33244/starred{/owner}{/repo}",subscriptions_url:"https://api.github.com/users/yashs33244/subscriptions",organizations_url:"https://api.github.com/users/yashs33244/orgs",repos_url:"https://api.github.com/users/yashs33244/repos",events_url:"https://api.github.com/users/yashs33244/events{/privacy}",received_events_url:"https://api.github.com/users/yashs33244/received_events",type:"User",site_admin:!1,name:"Yash Singh",company:"@EpicGames",blog:"",location:"India",email:null,hireable:null,bio:"A Passionate Fullstack Developer and Data Science Enthusiast from India",twitter_username:"yashs3324",public_repos:82,public_gists:17,followers:1,following:3,created_at:"2023-01-15T12:34:56Z",updated_at:"2023-01-15T12:34:56Z"},p={topLanguages:[{name:"TypeScript",percentage:45,color:"#2b7489"},{name:"JavaScript",percentage:25,color:"#f1e05a"},{name:"Python",percentage:15,color:"#3572A5"},{name:"HTML",percentage:10,color:"#e34c26"},{name:"Jupyter Notebook",percentage:5,color:"#DA5B0B"}],totalStars:6,totalForks:1},b=()=>(console.log("Using unauthenticated GitHub API - rate limits will be lower"),new h.E),f="yashs33244";async function j(){try{console.log("Fetching GitHub user data for:",f);let e=b();try{let s=await e.request("GET /users/{username}",{username:f,headers:{"X-GitHub-Api-Version":"2022-11-28"}});if(console.log("GitHub API response status:",s.status),s&&200===s.status)return console.log("GitHub user data successfully fetched"),s.data}catch(e){console.warn("GitHub API request failed:",e instanceof Error?e.message:e)}return console.warn("Falling back to mock GitHub user data"),x}catch(e){return console.error("Unexpected error fetching GitHub user:",e),e instanceof Error&&console.error("Error message:",e.message),x}}async function N(e){try{console.log("Fetching language stats for:",e);let s=b();try{let t=await s.request("GET /users/{username}/repos",{username:e,per_page:100,sort:"updated",direction:"desc",headers:{"X-GitHub-Api-Version":"2022-11-28"}});if(console.log("GitHub repos API response status:",t.status),t&&200===t.status){let s=t.data;if(console.log(`Found ${s.length} repositories for ${e}`),s&&s.length>0){let t={},a=0,r={JavaScript:"#f1e05a",TypeScript:"#2b7489",Python:"#3572A5","C++":"#f34b7d",HTML:"#e34c26",CSS:"#563d7c",Java:"#b07219",Go:"#00ADD8",Ruby:"#701516",Rust:"#dea584",PHP:"#4F5D95","Jupyter Notebook":"#DA5B0B"},l=0,o=0;for(let r of s){if(r.fork&&r.owner.login!==e)continue;l+=r.stargazers_count||0,o+=r.forks_count||0;let s=r.language;s&&(t[s]=(t[s]||0)+1,a++)}if(console.log("Language counts:",t),console.log("Total stars:",l),console.log("Total forks:",o),0===a)return console.warn("No languages found in GitHub repos, using mock data"),p;let n=Object.entries(t).map(([e,s])=>{let t=Math.round(s/a*100);return{name:e,percentage:t,color:r[e]||"#333333"}}).sort((e,s)=>s.percentage-e.percentage).slice(0,5);return console.log("Top languages:",n),{topLanguages:n,totalStars:l,totalForks:o}}}return console.warn("Failed to get useful data from GitHub API, using mock data"),p}catch(e){return console.warn("GitHub API request failed:",e instanceof Error?e.message:e),p}}catch(e){return console.error("Unexpected error fetching language stats:",e),e instanceof Error&&console.error("Error message:",e.message),p}}function v({detailed:e=!1}){let[s,t]=(0,r.useState)("loading"),m=(0,g.I)({queryKey:["githubUser",f],queryFn:j,staleTime:6e4,retry:1}),h=(0,g.I)({queryKey:["githubLanguages",f],queryFn:()=>N(f),staleTime:6e4,retry:1}),b=m.data,v=h.data,y=m.isPending||h.isPending,w=m.isError||h.isError;if(y)return(0,a.jsx)("section",{className:`py-12 ${!e&&"border-t"}`,children:(0,a.jsxs)("div",{className:"container",children:[(0,a.jsx)("h2",{className:"text-3xl font-bold mb-8 text-blueviolet",children:"GitHub Stats"}),(0,a.jsxs)("div",{className:"animate-pulse",children:[(0,a.jsx)("div",{className:"h-8 bg-gray-200 rounded w-1/4 mb-4"}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,a.jsx)("div",{className:"h-64 bg-gray-200 rounded"}),(0,a.jsx)("div",{className:"h-64 bg-gray-200 rounded"})]})]})]})});w&&console.error("Error loading GitHub data:",m.error||h.error);let _=b||x,k=v||p;return(console.log("Using user data:",_.login===x.login?"MOCK":"REAL",_),console.log("Using language data:",k===p?"MOCK":"REAL",k),e)?(0,a.jsxs)("div",{className:"space-y-8",children:["mock"===s&&(0,a.jsx)("div",{className:"text-center py-2 bg-amber/10 rounded-lg border border-amber/30",children:(0,a.jsxs)("p",{className:"text-sm text-amber-700",children:[(0,a.jsx)("span",{className:"font-medium",children:"⚠️ Using mock GitHub data"})," - API connection unavailable. The data shown is placeholder data."]})}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[(0,a.jsxs)("div",{className:"rounded-lg border p-6 bg-background",children:[(0,a.jsx)("div",{className:"flex items-center justify-between mb-6",children:(0,a.jsx)("div",{className:"flex items-center gap-4",children:(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:"text-xl font-bold",children:_.name||_.login}),(0,a.jsx)(d.$,{variant:"link",className:"p-0 h-auto text-blueviolet",asChild:!0,children:(0,a.jsxs)(u(),{href:_.html_url,target:"_blank",children:["@",_.login]})})]})})}),(0,a.jsxs)("div",{className:"grid grid-cols-2 gap-y-6",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)(l.A,{className:"h-5 w-5 text-primary"}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm text-muted-foreground",children:"Followers"}),(0,a.jsx)("p",{className:"font-medium",children:_.followers})]})]}),(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)(l.A,{className:"h-5 w-5 text-primary"}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm text-muted-foreground",children:"Following"}),(0,a.jsx)("p",{className:"font-medium",children:_.following})]})]}),(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)(o.A,{className:"h-5 w-5 text-primary"}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm text-muted-foreground",children:"Repositories"}),(0,a.jsx)("p",{className:"font-medium",children:_.public_repos})]})]}),(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)(c.A,{className:"h-5 w-5 text-primary"}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm text-muted-foreground",children:"Joined"}),(0,a.jsx)("p",{className:"font-medium",children:new Date(_.created_at).toLocaleDateString("en-US",{year:"numeric",month:"short"})})]})]})]}),_.bio&&(0,a.jsxs)("div",{className:"mt-6 pt-6 border-t",children:[(0,a.jsx)("h4",{className:"text-sm font-medium text-muted-foreground mb-2",children:"Bio"}),(0,a.jsx)("p",{className:"text-sm",children:_.bio})]})]}),(0,a.jsxs)("div",{className:"rounded-lg border p-6 bg-background",children:[(0,a.jsx)("h3",{className:"text-xl font-semibold mb-6",children:"Language Distribution"}),(0,a.jsx)("div",{className:"space-y-6",children:k.topLanguages.map(e=>(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,a.jsx)("span",{className:"font-medium",children:e.name}),(0,a.jsxs)("span",{className:"text-sm text-muted-foreground",children:[e.percentage,"%"]})]}),(0,a.jsx)("div",{className:"w-full bg-muted rounded-full h-3",children:(0,a.jsx)("div",{className:"h-3 rounded-full",style:{width:`${e.percentage}%`,backgroundColor:e.color}})})]},e.name))}),(0,a.jsxs)("div",{className:"grid grid-cols-2 gap-4 mt-8 pt-6 border-t",children:[(0,a.jsxs)("div",{className:"flex flex-col items-center p-4 rounded-lg bg-muted/50",children:[(0,a.jsx)(n.A,{className:"h-6 w-6 mb-2 text-amber"}),(0,a.jsx)("span",{className:"text-2xl font-bold",children:k.totalStars}),(0,a.jsx)("span",{className:"text-sm text-muted-foreground",children:"Total Stars"})]}),(0,a.jsxs)("div",{className:"flex flex-col items-center p-4 rounded-lg bg-muted/50",children:[(0,a.jsx)(i.A,{className:"h-6 w-6 mb-2 text-rose"}),(0,a.jsx)("span",{className:"text-2xl font-bold",children:k.totalForks}),(0,a.jsx)("span",{className:"text-sm text-muted-foreground",children:"Total Forks"})]})]})]})]}),(0,a.jsx)("div",{className:"flex justify-center",children:(0,a.jsx)(d.$,{asChild:!0,variant:"outline",className:"border-orange text-orange hover:bg-orange hover:text-white",children:(0,a.jsx)(u(),{href:_.html_url,target:"_blank",children:"View Full GitHub Profile"})})})]}):(0,a.jsx)("section",{className:"py-12 border-t border-border",children:(0,a.jsxs)("div",{className:"container",children:[(0,a.jsxs)("h2",{className:"text-3xl font-bold mb-8 text-blueviolet",children:["GitHub Stats","mock"===s&&(0,a.jsx)("span",{className:"text-xs font-normal text-amber ml-2 align-top",children:"(Mock data)"})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[(0,a.jsxs)("div",{className:"rounded-lg border p-6 bg-background",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,a.jsx)("h3",{className:"text-xl font-semibold",children:"Profile Overview"}),(0,a.jsx)(d.$,{variant:"ghost",size:"sm",asChild:!0,children:(0,a.jsxs)(u(),{href:_.html_url,target:"_blank",className:"text-muted-foreground",children:["@",_.login]})})]}),(0,a.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)(l.A,{className:"h-5 w-5 text-orange"}),(0,a.jsxs)("span",{className:"text-sm text-muted-foreground",children:[(0,a.jsx)("strong",{className:"text-foreground",children:_.followers})," ","Followers"]})]}),(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)(o.A,{className:"h-5 w-5 text-amber"}),(0,a.jsxs)("span",{className:"text-sm text-muted-foreground",children:[(0,a.jsx)("strong",{className:"text-foreground",children:_.public_repos})," ","Repos"]})]}),(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)(n.A,{className:"h-5 w-5 text-rose"}),(0,a.jsxs)("span",{className:"text-sm text-muted-foreground",children:[(0,a.jsx)("strong",{className:"text-foreground",children:k.totalStars})," ","Stars"]})]}),(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)(i.A,{className:"h-5 w-5 text-blueviolet"}),(0,a.jsxs)("span",{className:"text-sm text-muted-foreground",children:[(0,a.jsx)("strong",{className:"text-foreground",children:k.totalForks})," ","Forks"]})]})]})]}),(0,a.jsxs)("div",{className:"rounded-lg border p-6 bg-background",children:[(0,a.jsx)("h3",{className:"text-xl font-semibold mb-4",children:"Top Languages"}),(0,a.jsx)("div",{className:"space-y-4",children:k.topLanguages.map(e=>(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-1",children:[(0,a.jsx)("span",{className:"text-sm font-medium",children:e.name}),(0,a.jsxs)("span",{className:"text-sm text-muted-foreground",children:[e.percentage,"%"]})]}),(0,a.jsx)("div",{className:"w-full bg-muted rounded-full h-2.5",children:(0,a.jsx)("div",{className:"h-2.5 rounded-full",style:{width:`${e.percentage}%`,backgroundColor:e.color}})})]},e.name))})]})]})]})})}}};