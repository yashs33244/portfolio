(()=>{var e={};e.id=2,e.ids=[2],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},6206:(e,r,t)=>{"use strict";t.r(r),t.d(r,{patchFetch:()=>w,routeModule:()=>l,serverHooks:()=>g,workAsyncStorage:()=>d,workUnitAsyncStorage:()=>c});var s={};t.r(s),t.d(s,{POST:()=>p});var n=t(96559),o=t(48088),i=t(37719),a=t(32190),u=t(37740);async function p(e,r){let t=r.params.slug;try{let e=await u.A.post.findUnique({where:{slug:t}});if(!e)return a.NextResponse.json({error:"Blog post not found"},{status:404});return await u.A.post.update({where:{id:e.id},data:{views:{increment:1}}}),a.NextResponse.json({message:"View count incremented successfully"})}catch(e){return console.error(`Error incrementing view count for post with slug ${t}:`,e),a.NextResponse.json({error:"Failed to increment view count"},{status:500})}}let l=new n.AppRouteRouteModule({definition:{kind:o.RouteKind.APP_ROUTE,page:"/api/blog/[slug]/view/route",pathname:"/api/blog/[slug]/view",filename:"route",bundlePath:"app/api/blog/[slug]/view/route"},resolvedPagePath:"/Users/tanishqsingh/Downloads/portfolio-website/app/api/blog/[slug]/view/route.ts",nextConfigOutput:"standalone",userland:s}),{workAsyncStorage:d,workUnitAsyncStorage:c,serverHooks:g}=l;function w(){return(0,i.patchFetch)({workAsyncStorage:d,workUnitAsyncStorage:c})}},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},37740:(e,r,t)=>{"use strict";t.d(r,{A:()=>n});let s=require("@prisma/client"),n=global.prisma||new s.PrismaClient},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},78335:()=>{},96487:()=>{}};var r=require("../../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[447,580],()=>t(6206));module.exports=s})();