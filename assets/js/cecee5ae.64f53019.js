"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[791],{4126:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>d,contentTitle:()=>r,default:()=>c,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var n=a(2218),i=a(1879);const o={sidebar_position:2},r="Anomaly Detection",s={id:"anomaly-detection",title:"Anomaly Detection",description:"Language",source:"@site/docs/anomaly-detection.md",sourceDirName:".",slug:"/anomaly-detection",permalink:"/tos2ca-documentation/docs/anomaly-detection",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/tos2ca-documentation/docs/intro"},next:{title:"ForTraCC Module",permalink:"/tos2ca-documentation/docs/fortracc-module"}},d={},l=[{value:"Requirements",id:"requirements",level:2},{value:"Resources",id:"resources",level:2},{value:"Library Flow",id:"library-flow",level:2},{value:"Phenomenon Definition (PhDef) Stage",id:"phenomenon-definition-phdef-stage",level:3},{value:"Data Curation Stage",id:"data-curation-stage",level:3}];function h(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",li:"li",p:"p",ul:"ul",...(0,i.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.header,{children:(0,n.jsx)(t.h1,{id:"anomaly-detection",children:"Anomaly Detection"})}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.a,{href:"#",children:(0,n.jsx)(t.img,{src:"https://img.shields.io/badge/python-3.9-blue",alt:"Language"})})}),"\n",(0,n.jsx)(t.p,{children:"This python library is responsible for:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"Taking user input about an inequality, variables, temporal bounds, and geospatial bounds"}),"\n",(0,n.jsx)(t.li,{children:"Retrieving subsetted data matching that user input"}),"\n",(0,n.jsx)(t.li,{children:"Converting that data to a binary format in a time-ordered sequence"}),"\n",(0,n.jsx)(t.li,{children:"Passing the data to ForTraCC"}),"\n",(0,n.jsx)(t.li,{children:"Using the masks produced by ForTraCC to retrieve curated data of interest to the user"}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"requirements",children:"Requirements"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:["Access to the TOS2CA ",(0,n.jsx)(t.a,{href:"https://github.jpl.nasa.gov/TOS2CA/data-dictionaries",children:"data dictionaries"})]}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://github.jpl.nasa.gov/TOS2CA/fortracc-module",children:"ForTraCC"})}),"\n",(0,n.jsx)(t.li,{children:"See the requirements.txt file for required Python libraries"}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"resources",children:"Resources"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"Access to an S3 bucket where you can read and write data"}),"\n",(0,n.jsx)(t.li,{children:"Access to a MySQL database that stores user input"}),"\n",(0,n.jsx)(t.li,{children:"Access to a Redis/Elasticache memory store to temporarily house data that's being read/curated"}),"\n",(0,n.jsx)(t.li,{children:"Access to AWS Secrets Manager to retrieve things like credentails, tokes, etc."}),"\n",(0,n.jsxs)(t.li,{children:["Should have a ",(0,n.jsx)(t.a,{href:"https://urs.earthdata.nasa.gov",children:"NASA Earthdata login"})," to use any tools DAAC tools/applications"]}),"\n",(0,n.jsxs)(t.li,{children:["Should have access to the ",(0,n.jsx)(t.code,{children:"us-west-2"})," AWS region to access any NASA DAAC data over S3"]}),"\n",(0,n.jsx)(t.li,{children:"The code is currently run on an EC2 instance but future work includes containerizing the code and running it in chunks on AWS Fargate"}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"library-flow",children:"Library Flow"}),"\n",(0,n.jsx)(t.h3,{id:"phenomenon-definition-phdef-stage",children:"Phenomenon Definition (PhDef) Stage"}),"\n",(0,n.jsxs)(t.p,{children:["Running the library in an end-to-end fashion requires the following steps:\n01. Read the job information from the database that includes all the infomration about the temporal, spatial, operator, dataset, and variable requested.  Initially, jobs will be in ",(0,n.jsx)(t.code,{children:"'pending'"})," status in the database.\n02. Once you have the job information, choose the appropriate reader for the dataset/variable in question and mark the job as ",(0,n.jsx)(t.code,{children:"'running'"})," in the database.\n03. Request and/or read the data, returning a subset based on the user input.\n04. Format the data into a dict type and convert it to binary.\n05. Store the read data in Elasticache.\n06. Call the ForTraCC operator class that will start the ForTraCC job, reading the data from Elasticache and converting it back from binary to dict.\n07. Deposit the ForTraCC output into th S3 bucket.\n08. Create plots and GeoJSON polygons of the anomalies.\n09. Upload the plots and GeoJSON to S3.\n10. E-Mail the user that their job is complete and send them the locatin of the S3 bucket with their job directory.\n11. Mark the job as ",(0,n.jsx)(t.code,{children:"'complete'"})," in the database.\nThe user can continue on to data curation or exit the system here."]}),"\n",(0,n.jsx)(t.h3,{id:"data-curation-stage",children:"Data Curation Stage"}),"\n",(0,n.jsxs)(t.p,{children:["Running the library in an end-to-end fashion requires the following steps:\n01. Read the job information from the database that include information about what PhDef to run against, along with the dataset and variable information.\n02. Once you have the job information, choose the appropriate curator for the dataset/variable in question and mark the job as ",(0,n.jsx)(t.code,{children:"'running'"})," in the database.  Initially, jobs will be in ",(0,n.jsx)(t.code,{children:"'pending'"})," status in the database.\n03. Run the curator, which will output a netCDF-4 file with the data for each anomaly at each time step.  Note that incronguities may exist beween the grids and timesteps between the data used in PhDef and the requested curator data.  See the metadata in the output curated data file for additional information on this.\n04. Upload the curated data file and JSON hierarchy file to S3.\n05. Run the curated file through the interpolater.  This will get the curated data on the same temporal and spatial resolution as the original mask data.  This way the user can compare them more easily.  This will also generate statistics in the metadata of the interpolated file.  The interpolated fill will also be stored in S3.\n05. E-Mail the user that their job is complete and send them the locatin of the S3 bucket with their job directory.\n06. Mark the job as ",(0,n.jsx)(t.code,{children:"'complete'"})," in the database.\n07. User can make plots of individual anomalies at spcific timestamps using the interpolated file.\nThe user can continue on to visualization tools, download the data, or exit the system here."]})]})}function c(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},1879:(e,t,a)=>{a.d(t,{R:()=>r,x:()=>s});var n=a(3746);const i={},o=n.createContext(i);function r(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);