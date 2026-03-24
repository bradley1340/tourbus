import { useState, useRef, useEffect } from "react";

const E = {
  search: String.fromCodePoint(0x1F50D),
  photo: String.fromCodePoint(0x1F4F8),
  video: String.fromCodePoint(0x1F3AC),
  img: String.fromCodePoint(0x1F5BC),
  vidcam: String.fromCodePoint(0x1F4F9),
  guitar: String.fromCodePoint(0x1F3B8),
  note: String.fromCodePoint(0x1F3B5),
  bus: String.fromCodePoint(0x1F68C),
  sleep: String.fromCodePoint(0x1F634),
  bell: String.fromCodePoint(0x1F514),
  hide: String.fromCodePoint(0x1F648),
  eye: String.fromCodePoint(0x1F441),
  flag: String.fromCodePoint(0x1F6A9),
  clap: String.fromCodePoint(0x1F44F),
  bulb: String.fromCodePoint(0x1F4A1),
  ticket: String.fromCodePoint(0x1F39F),
  satellite: String.fromCodePoint(0x1F4E1),
  lock: String.fromCodePoint(0x1F512),
  red: String.fromCodePoint(0x1F534),
  globe: String.fromCodePoint(0x1F310),
  moon: String.fromCodePoint(0x1F319),
  sun: String.fromCodePoint(0x2600),
  info: String.fromCodePoint(0x2139),
  fire: String.fromCodePoint(0x1F525),
};


const SCREENS = {
  LANDING:"landing", CHOOSE_TYPE:"choose_type", RIDER_SIGNUP:"rider_signup",
  ARTIST_SIGNUP:"artist_signup", RIDER_SUCCESS:"rider_success", ARTIST_SUCCESS:"artist_success",
  RIDER_SIGNIN:"rider_signin", ARTIST_SIGNIN:"artist_signin",
  STREAM:"stream", SEARCH:"search", PROFILE:"profile", CHECKOUT:"checkout", UNLOCKED:"unlocked",
  ACCOUNT:"account", ARTIST_DASHBOARD:"artist_dashboard", NEW_POST:"new_post", POST_VIEW:"post_view", ARTIST_CLOSED:"artist_closed", ARTIST_LIVE:"artist_live", RIDER_CLOSED:"rider_closed", TAG_FEED:"tag_feed",
  TOURBUS_PROFILE:"tourbus_profile", TOURBUS_DASHBOARD:"tourbus_dashboard",
};

const ARTISTS = [
  {id:1,name:"The Midnight",genre:"Synthwave",riders:24105,standby:0,color:"#0a0a2e",bio:"Cinematic synthwave from LA. Tour diaries, soundchecks, and life on the road.",posts:38,active:true,newlyAdded:false,onTour:true},
  {id:2,name:"Jade Carver",genre:"Indie Folk",riders:6015,standby:0,color:"#1a2e0a",bio:"Singer-songwriter documenting her first headline tour across the American South.",posts:22,active:true,newlyAdded:true,onTour:true},
  {id:3,name:"Brass & Bone",genre:"Jazz Fusion",riders:4460,standby:0,color:"#2e1800",bio:"New Orleans jazz collective. Late nights, studio sessions, second-line parades.",posts:17,active:true,newlyAdded:false,onTour:false},
  {id:4,name:"Neon Palms",genre:"Dream Pop",riders:11700,standby:0,color:"#001a2e",bio:"Hazy dream pop from Miami. Behind the scenes of their debut album recording.",posts:29,active:true,newlyAdded:true,onTour:false},
  {id:5,name:"Colt Reyes",genre:"Country",riders:15510,standby:0,color:"#2e1000",bio:"Texas country artist on his first 50-city tour. Backstage, bus life, and honky-tonks.",posts:44,active:true,newlyAdded:false,onTour:true},
  {id:6,name:"Static Bloom",genre:"Shoegaze",riders:3355,standby:0,color:"#0a001a",bio:"UK shoegaze duo documenting their US debut tour from a van.",posts:12,active:true,newlyAdded:true,onTour:true},
  {id:7,name:"Rosa Vega",genre:"Psych Rock",riders:7820,standby:0,color:"#1a0a2e",bio:"Psychedelic rock from Mexico City. Desert sessions, rooftop shows, and late-night jams.",posts:19,active:true,newlyAdded:true,onTour:true},
  {id:8,name:"Hollow Pine",genre:"Ambient Folk",riders:2940,standby:0,color:"#0a1a0e",bio:"Solo project from the Pacific Northwest. Field recordings, campfire sets, and long drives.",posts:14,active:true,newlyAdded:false,onTour:false},
  {id:9,name:"Dusk Radio",genre:"Punk",riders:5670,standby:0,color:"#2e0a00",bio:"Three-piece punk band from Chicago. Fast sets, loud rooms, zero days off.",posts:31,active:true,newlyAdded:false,onTour:true},
  {id:10,name:"Maeve",genre:"Dream Pop",riders:9110,standby:0,color:"#1a002e",bio:"Irish singer-songwriter on her first North American tour. Intimate venues, late nights.",posts:25,active:true,newlyAdded:true,onTour:true},
  {id:11,name:"Sun Copper",genre:"Indie Folk",riders:4230,standby:0,color:"#2e1a00",bio:"Husband-and-wife duo from Nashville documenting life on the road with their two kids.",posts:20,active:true,newlyAdded:false,onTour:false},
];

const LIVE_IDS = new Set([1, 5, 9]); // The Midnight, Colt Reyes, Dusk Radio

const INIT_FEED = [
  {id:11,artist:"The Midnight",type:"photo",color:"#0a0a2e",label:"Lollapalooza 2026 confirmed. See you in Grant Park. This one is going to be something else. #lollapalooza2026",time:"3d ago",likes:892},
  {id:12,artist:"Jade Carver",type:"photo",color:"#1a2e0a",label:"Just got the call. @Jade Carver is playing Lollapalooza 2026. I have been waiting for this moment my entire life. #lollapalooza2026",time:"4d ago",likes:634},
  {id:13,artist:"Neon Palms",type:"video",color:"#001a2e",label:"Grant Park, Chicago. July 2026. We will be there. #lollapalooza2026 #dreampop",time:"5d ago",likes:441},

  {id:8,artist:"The Midnight",type:"photo",color:"#0a0a2e",label:"Soundcheck @ The Roxy -- LA, you have no idea what's coming tonight. We've been sitting on this new arrangement for three months and we're finally letting it loose. Doors at 8. We wouldn't be here if it wasn't for @Wilco.",time:"1h ago",likes:198},
  {id:1,artist:"The Midnight",type:"photo",color:"#0a0a2e",label:"Soundcheck @ The Roxy -- LA, you have no idea what's coming tonight. We've been sitting on this new arrangement for three months and we're finally letting it loose. Doors at 8.",time:"2h ago",likes:312},
  {id:2,artist:"Colt Reyes",type:"video",color:"#2e1800",label:"Mile 1,200 on the bus. Somewhere outside Amarillo, coffee's cold, Jake's already asleep, and I'm watching the sun come up over nothing but flat. Wrote half a song. Might be the best thing I've ever done or complete garbage -- too early to tell.",time:"5h ago",likes:87},
  {id:3,artist:"Neon Palms",type:"photo",color:"#001a2e",label:"Wrapped our last studio session for the record tonight. 11 tracks. 14 months. A lot of late nights and bad takeout and moments where we almost scrapped the whole thing. Feels unreal to finally say it's done.",time:"8h ago",likes:204},
  {id:9,artist:"tourbus",type:"video",color:"#0e0e0e",label:"We sat down with @Jade Carver ahead of her first headline tour to talk about the road, the songs, and what it feels like when it's finally real. One of the most honest conversations we've had. Don't miss her.",time:"12h ago",likes:0,isTourbus:true},
  {id:10,artist:"tourbus",type:"photo",color:"#0e0e0e",label:"Caught up with @Static Bloom on their first night in the van somewhere in New Jersey. It's raining, they're laughing, and they have no idea what's about to hit them. Get on their bus before everyone else does.",time:"14h ago",likes:0,isTourbus:true},
  {id:4,artist:"The Midnight",type:"video",color:"#1a0a3e",label:"Here's how the setlist comes together the day of a show. Tyler and I go back and forth for hours -- we pulled three songs tonight and added one we haven't played live since 2022. No spoilers.",time:"1d ago",likes:519},
  {id:5,artist:"Jade Carver",type:"photo",color:"#1a2e0a",label:"Playing my hometown tonight for the first time since I left at 19. My mom's in the front row. My high school English teacher bought a ticket. I am not going to hold it together and I am completely okay with that.",time:"1d ago",likes:143},
  {id:6,artist:"Colt Reyes",type:"photo",color:"#2e1000",label:"Meet the crew that makes this whole thing run. L to R: Jake (merch + moral support), Dani (tour manager, actual backbone of this operation), T-Ray (sound), and Boots (driver, 22 years, never late once). Buy them a drink if you see them.",time:"2d ago",likes:76},
  {id:7,artist:"tourbus",type:"announcement",color:"#0e0e0e",label:"New artist alert: Static Bloom just joined tourbus. The UK shoegaze duo is documenting their first US tour from a van. Grab your $5 ticket at the Station.",time:"3d ago",likes:0,isTourbus:true},
];

const MOCK_POSTS = [
  {color:"#0a0a2e",type:"photo"},{color:"#1a0a3e",type:"video"},{color:"#001a2e",type:"photo"},
  {color:"#2e1800",type:"video"},{color:"#1a2e0a",type:"photo"},{color:"#0a001a",type:"photo"},
];

const Silhouette = ({size="100%",opacity=0.18})=>(
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}>
    <ellipse cx="50" cy="35" rx="18" ry="20" fill={`rgba(255,255,255,${opacity})`}/>
    <ellipse cx="50" cy="80" rx="28" ry="26" fill={`rgba(255,255,255,${opacity})`}/>
  </svg>
);

const Silhouette2 = ({opacity=0.18})=>(
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}>
    <ellipse cx="35" cy="35" rx="14" ry="16" fill={`rgba(255,255,255,${opacity})`}/>
    <ellipse cx="35" cy="76" rx="22" ry="20" fill={`rgba(255,255,255,${opacity})`}/>
    <ellipse cx="65" cy="38" rx="14" ry="16" fill={`rgba(255,255,255,${opacity})`}/>
    <ellipse cx="65" cy="79" rx="22" ry="20" fill={`rgba(255,255,255,${opacity})`}/>
  </svg>
);

const ArtistThumb = ({artist, style={}, className=""})=>{
  const dual = artist.name==="Brass & Bone"||artist.name==="Static Bloom"||artist.name==="Neon Palms";
  return (
    <div className={className} style={{position:"relative",background:artist.color,overflow:"hidden",...style}}>
      {dual?<Silhouette2 opacity={0.2}/>:<Silhouette opacity={0.2}/>}
    </div>
  );
};

const TOURBUS_ARTIST = {id:0,name:"tourbus",genre:"Official",color:"#0e0e0e",isTourbus:true};
const TOURBUS_STATS = {riders:87420, artists:11, posts:251, tags:1840};
const SPOTIFY_ARTISTS = [
  {id:100,name:'Drake',genre:'',riders:0,standby:24805,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:101,name:'Taylor Swift',genre:'',riders:0,standby:19401,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:102,name:'Bad Bunny',genre:'',riders:0,standby:13782,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:103,name:'The Weeknd',genre:'',riders:0,standby:12239,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:104,name:'Justin Bieber',genre:'',riders:0,standby:19452,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:105,name:'Ariana Grande',genre:'',riders:0,standby:10058,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:106,name:'Travis Scott',genre:'',riders:0,standby:15651,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:107,name:'Ed Sheeran',genre:'',riders:0,standby:8727,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:108,name:'Eminem',genre:'',riders:0,standby:5731,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:109,name:'Kanye West',genre:'',riders:0,standby:7105,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:110,name:'Kendrick Lamar',genre:'',riders:0,standby:12180,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:111,name:'Rihanna',genre:'',riders:0,standby:21465,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:112,name:'Billie Eilish',genre:'',riders:0,standby:16511,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:113,name:'Post Malone',genre:'',riders:0,standby:9065,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:114,name:'J Balvin',genre:'',riders:0,standby:18171,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:115,name:'Bruno Mars',genre:'',riders:0,standby:14184,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:116,name:'Future',genre:'',riders:0,standby:5448,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:117,name:'BTS',genre:'',riders:0,standby:6833,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:118,name:'Ozuna',genre:'',riders:0,standby:22387,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:119,name:'Juice WRLD',genre:'',riders:0,standby:5577,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:120,name:'Coldplay',genre:'',riders:0,standby:23238,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:121,name:'Chris Brown',genre:'',riders:0,standby:18220,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:122,name:'Nicki Minaj',genre:'',riders:0,standby:9622,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:123,name:'Daddy Yankee',genre:'',riders:0,standby:24029,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:124,name:'Dua Lipa',genre:'',riders:0,standby:14080,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:125,name:'David Guetta',genre:'',riders:0,standby:20957,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:126,name:'Lana Del Rey',genre:'',riders:0,standby:21081,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:127,name:'Imagine Dragons',genre:'',riders:0,standby:12991,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:128,name:'Lil Wayne',genre:'',riders:0,standby:13397,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:129,name:'XXXTENTACION',genre:'',riders:0,standby:20813,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:130,name:'Rauw Alejandro',genre:'',riders:0,standby:7669,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:131,name:'Anuel AA',genre:'',riders:0,standby:6649,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:132,name:'21 Savage',genre:'',riders:0,standby:22901,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:133,name:'SZA',genre:'',riders:0,standby:20030,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:134,name:'Lil Uzi Vert',genre:'',riders:0,standby:11620,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:135,name:'KAROL G',genre:'',riders:0,standby:14437,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:136,name:'Lil Baby',genre:'',riders:0,standby:7394,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:137,name:'Lady Gaga',genre:'',riders:0,standby:18211,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:138,name:'Arijit Singh',genre:'',riders:0,standby:6223,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:139,name:'Maroon 5',genre:'',riders:0,standby:18693,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:140,name:'Beyonce',genre:'',riders:0,standby:19597,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:141,name:'Khalid',genre:'',riders:0,standby:8594,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:142,name:'Maluma',genre:'',riders:0,standby:18407,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:143,name:'J. Cole',genre:'',riders:0,standby:11564,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:144,name:'Feid',genre:'',riders:0,standby:18680,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:145,name:'Calvin Harris',genre:'',riders:0,standby:14356,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:146,name:'Myke Towers',genre:'',riders:0,standby:11639,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:147,name:'Doja Cat',genre:'',riders:0,standby:17541,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:148,name:'Sia',genre:'',riders:0,standby:5236,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:149,name:'Linkin Park',genre:'',riders:0,standby:18259,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:150,name:'Young Thug',genre:'',riders:0,standby:1615,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:151,name:'Peso Pluma',genre:'',riders:0,standby:7751,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:152,name:'Shakira',genre:'',riders:0,standby:1448,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:153,name:'Farruko',genre:'',riders:0,standby:1694,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:154,name:'Morgan Wallen',genre:'',riders:0,standby:7476,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:155,name:'Shawn Mendes',genre:'',riders:0,standby:6826,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:156,name:'Nicky Jam',genre:'',riders:0,standby:6813,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:157,name:'Sam Smith',genre:'',riders:0,standby:5022,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:158,name:'Queen',genre:'',riders:0,standby:5194,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:159,name:'One Direction',genre:'',riders:0,standby:2917,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:160,name:'Metro Boomin',genre:'',riders:0,standby:7074,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:161,name:'Adele',genre:'',riders:0,standby:1569,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:162,name:'Harry Styles',genre:'',riders:0,standby:3372,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:163,name:'Gunna',genre:'',riders:0,standby:4383,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:164,name:'Arctic Monkeys',genre:'',riders:0,standby:6376,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:165,name:'Pritam',genre:'',riders:0,standby:2179,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:166,name:'Katy Perry',genre:'',riders:0,standby:7112,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:167,name:'Tyler, The Creator',genre:'',riders:0,standby:1689,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:168,name:'Ty Dolla $ign',genre:'',riders:0,standby:1130,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:169,name:'Selena Gomez',genre:'',riders:0,standby:7183,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:170,name:'Olivia Rodrigo',genre:'',riders:0,standby:5037,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:171,name:'Junior H',genre:'',riders:0,standby:5586,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:172,name:'The Beatles',genre:'',riders:0,standby:4779,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:173,name:'Halsey',genre:'',riders:0,standby:2605,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:174,name:'Playboi Carti',genre:'',riders:0,standby:3565,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:175,name:'Pitbull',genre:'',riders:0,standby:1013,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:176,name:'Fuerza Regida',genre:'',riders:0,standby:3296,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:177,name:'Wiz Khalifa',genre:'',riders:0,standby:1437,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:178,name:'A$AP Rocky',genre:'',riders:0,standby:7392,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:179,name:'Frank Ocean',genre:'',riders:0,standby:3441,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:180,name:'JAY-Z',genre:'',riders:0,standby:1137,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:181,name:'The Chainsmokers',genre:'',riders:0,standby:4997,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:182,name:'Miley Cyrus',genre:'',riders:0,standby:3941,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:183,name:'Sabrina Carpenter',genre:'',riders:0,standby:2489,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:184,name:'Marshmello',genre:'',riders:0,standby:1949,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:185,name:'Cardi B',genre:'',riders:0,standby:6238,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:186,name:'Snoop Dogg',genre:'',riders:0,standby:5386,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:187,name:'Twenty One Pilots',genre:'',riders:0,standby:1873,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:188,name:'Arcangel',genre:'',riders:0,standby:6696,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:189,name:'Disney',genre:'',riders:0,standby:6030,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:190,name:'Michael Jackson',genre:'',riders:0,standby:2814,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:191,name:'Red Hot Chili Peppers',genre:'',riders:0,standby:3777,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:192,name:'Avicii',genre:'',riders:0,standby:1331,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:193,name:'$uicideboy$',genre:'',riders:0,standby:4705,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:194,name:'OneRepublic',genre:'',riders:0,standby:4400,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:195,name:'DaBaby',genre:'',riders:0,standby:3415,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:196,name:'Camila Cabello',genre:'',riders:0,standby:7111,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:197,name:'50 Cent',genre:'',riders:0,standby:3577,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:198,name:'Natanael Cano',genre:'',riders:0,standby:2762,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:199,name:'Mac Miller',genre:'',riders:0,standby:3163,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:200,name:'Romeo Santos',genre:'',riders:0,standby:7168,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:201,name:'Kygo',genre:'',riders:0,standby:3072,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:202,name:'YoungBoy Never Broke Again',genre:'',riders:0,standby:5859,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:203,name:'Quavo',genre:'',riders:0,standby:7839,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:204,name:'Sech',genre:'',riders:0,standby:1835,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:205,name:'Trippie Redd',genre:'',riders:0,standby:1755,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:206,name:'Elton John',genre:'',riders:0,standby:5667,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:207,name:'The Neighbourhood',genre:'',riders:0,standby:7752,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:208,name:'Zach Bryan',genre:'',riders:0,standby:2458,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:209,name:'Tyga',genre:'',riders:0,standby:4564,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:210,name:'Lil Peep',genre:'',riders:0,standby:2523,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:211,name:'Henrique & Juliano',genre:'',riders:0,standby:2049,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:212,name:'Manuel Turizo',genre:'',riders:0,standby:3399,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:213,name:'Don Omar',genre:'',riders:0,standby:5580,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:214,name:'Usher',genre:'',riders:0,standby:7086,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:215,name:'Luke Combs',genre:'',riders:0,standby:4044,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:216,name:'Ti&#235;sto',genre:'',riders:0,standby:5602,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:217,name:'Don Toliver',genre:'',riders:0,standby:3351,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:218,name:'Metallica',genre:'',riders:0,standby:4761,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:219,name:'Charlie Puth',genre:'',riders:0,standby:3379,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:220,name:'Alan Walker',genre:'',riders:0,standby:1643,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:221,name:'Tate McRae',genre:'',riders:0,standby:3719,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:222,name:'Justin Timberlake',genre:'',riders:0,standby:3469,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:223,name:'Kodak Black',genre:'',riders:0,standby:6161,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:224,name:'Jason Derulo',genre:'',riders:0,standby:6610,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:225,name:'Bebe Rexha',genre:'',riders:0,standby:4742,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:226,name:'A Boogie Wit da Hoodie',genre:'',riders:0,standby:5646,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:227,name:'Demi Lovato',genre:'',riders:0,standby:4587,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:228,name:'Sebastian Yatra',genre:'',riders:0,standby:3599,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:229,name:'Sean Paul',genre:'',riders:0,standby:6655,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:230,name:'Kali Uchis',genre:'',riders:0,standby:5474,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:231,name:'BLACKPINK',genre:'',riders:0,standby:3941,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:232,name:'Jhayco',genre:'',riders:0,standby:5689,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:233,name:'Daft Punk',genre:'',riders:0,standby:2932,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:234,name:'Hozier',genre:'',riders:0,standby:6393,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:235,name:'Luis Miguel',genre:'',riders:0,standby:2216,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:236,name:'Pop Smoke',genre:'',riders:0,standby:6496,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:237,name:'AC/DC',genre:'',riders:0,standby:4532,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:238,name:'Akon',genre:'',riders:0,standby:2843,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:239,name:'Big Sean',genre:'',riders:0,standby:6370,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:240,name:'Flo Rida',genre:'',riders:0,standby:5364,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:241,name:'Ellie Goulding',genre:'',riders:0,standby:7287,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:242,name:'Carin Leon',genre:'',riders:0,standby:7348,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:243,name:'Tory Lanez',genre:'',riders:0,standby:2971,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:244,name:'James Arthur',genre:'',riders:0,standby:4577,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:245,name:'Diplo',genre:'',riders:0,standby:7984,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:246,name:'P!nk',genre:'',riders:0,standby:1280,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:247,name:'Lil Durk',genre:'',riders:0,standby:4608,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:248,name:'Pharrell Williams',genre:'',riders:0,standby:3452,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:249,name:'Swae Lee',genre:'',riders:0,standby:4651,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:250,name:'Migos',genre:'',riders:0,standby:6429,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:251,name:'Nirvana',genre:'',riders:0,standby:7640,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:252,name:'Duki',genre:'',riders:0,standby:7050,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:253,name:'Fleetwood Mac',genre:'',riders:0,standby:1886,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:254,name:'G-Eazy',genre:'',riders:0,standby:3020,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:255,name:'DJ Snake',genre:'',riders:0,standby:6040,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:256,name:'Bizarrap',genre:'',riders:0,standby:6797,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:257,name:'Britney Spears',genre:'',riders:0,standby:5836,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:258,name:'Radiohead',genre:'',riders:0,standby:3432,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:259,name:'The Kid LAROI',genre:'',riders:0,standby:3835,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:260,name:'Anitta',genre:'',riders:0,standby:6004,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:261,name:'Justin Quiles',genre:'',riders:0,standby:2215,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:262,name:'Mar&#237;lia Mendon&#231;a',genre:'',riders:0,standby:6797,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:263,name:'Black Eyed Peas',genre:'',riders:0,standby:2807,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:264,name:'Green Day',genre:'',riders:0,standby:1305,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:265,name:'Gucci Mane',genre:'',riders:0,standby:3465,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:266,name:'Polo G',genre:'',riders:0,standby:7014,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:267,name:'Daniel Caesar',genre:'',riders:0,standby:7324,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:268,name:'Kid Cudi',genre:'',riders:0,standby:1407,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:269,name:'2 Chainz',genre:'',riders:0,standby:5450,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:270,name:'Bob Marley & The Wailers',genre:'',riders:0,standby:2469,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:271,name:'Offset',genre:'',riders:0,standby:7505,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:272,name:'Anirudh Ravichander',genre:'',riders:0,standby:4890,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:273,name:'Fall Out Boy',genre:'',riders:0,standby:7578,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:274,name:'Panic! At The Disco',genre:'',riders:0,standby:4999,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:275,name:'Ne-Yo',genre:'',riders:0,standby:2836,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:276,name:'Stray Kids',genre:'',riders:0,standby:2021,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:277,name:'Lenny Tav&#225;rez',genre:'',riders:0,standby:1389,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:278,name:'Joji',genre:'',riders:0,standby:2103,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:279,name:'ROSAL&#205;A',genre:'',riders:0,standby:3576,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:280,name:'A.R. Rahman',genre:'',riders:0,standby:3673,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:281,name:'Morat',genre:'',riders:0,standby:1918,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:282,name:'Bryson Tiller',genre:'',riders:0,standby:3731,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:283,name:'Lewis Capaldi',genre:'',riders:0,standby:5928,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:284,name:'Charli XCX',genre:'',riders:0,standby:3567,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:285,name:'Camilo',genre:'',riders:0,standby:7396,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:286,name:'NF',genre:'',riders:0,standby:3432,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:287,name:'Jorge & Mateus',genre:'',riders:0,standby:5454,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:288,name:'PARTYNEXTDOOR',genre:'',riders:0,standby:4793,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:289,name:'Roddy Ricch',genre:'',riders:0,standby:4879,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:290,name:'Jul',genre:'',riders:0,standby:4664,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:291,name:'Quevedo',genre:'',riders:0,standby:4186,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:292,name:'Mariah Carey',genre:'',riders:0,standby:6368,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:293,name:'Lil Yachty',genre:'',riders:0,standby:3147,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:294,name:'Grupo Frontera',genre:'',riders:0,standby:7190,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:295,name:'Machine Gun Kelly',genre:'',riders:0,standby:5516,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:296,name:'Gorillaz',genre:'',riders:0,standby:6822,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:297,name:'2Pac',genre:'',riders:0,standby:3252,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:298,name:'Martin Garrix',genre:'',riders:0,standby:3626,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:299,name:'Logic',genre:'',riders:0,standby:4232,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:300,name:'Megan Thee Stallion',genre:'',riders:0,standby:1526,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:301,name:'Christian Nodal',genre:'',riders:0,standby:881,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:302,name:'Guns N',genre:'',riders:0,standby:1602,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:303,name:'Major Lazer',genre:'',riders:0,standby:954,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:304,name:'Dr. Dre',genre:'',riders:0,standby:1796,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:305,name:'Wisin',genre:'',riders:0,standby:1774,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:306,name:'Lil Nas X',genre:'',riders:0,standby:465,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:307,name:'Becky G',genre:'',riders:0,standby:1759,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:308,name:'Banda MS de Sergio Liz&#225;rraga',genre:'',riders:0,standby:231,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:309,name:'Tame Impala',genre:'',riders:0,standby:1062,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:310,name:'Pink Floyd',genre:'',riders:0,standby:721,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:311,name:'Zara Larsson',genre:'',riders:0,standby:294,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:312,name:'Rels B',genre:'',riders:0,standby:990,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:313,name:'Miguel',genre:'',riders:0,standby:419,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:314,name:'John Mayer',genre:'',riders:0,standby:1925,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:315,name:'Michael Bubl&#233;',genre:'',riders:0,standby:1944,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:316,name:'Anne-Marie',genre:'',riders:0,standby:1550,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:317,name:'Childish Gambino',genre:'',riders:0,standby:830,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:318,name:'Jack Harlow',genre:'',riders:0,standby:1640,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:319,name:'Mora',genre:'',riders:0,standby:1924,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:320,name:'Cigarettes After Sex',genre:'',riders:0,standby:201,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:321,name:'Brent Faiyaz',genre:'',riders:0,standby:706,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:322,name:'Yandel',genre:'',riders:0,standby:973,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:323,name:'Zion & Lennox',genre:'',riders:0,standby:1683,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:324,name:'5 Seconds of Summer',genre:'',riders:0,standby:1126,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:325,name:'Macklemore',genre:'',riders:0,standby:1469,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:326,name:'French Montana',genre:'',riders:0,standby:890,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:327,name:'Alessia Cara',genre:'',riders:0,standby:769,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:328,name:'Ava Max',genre:'',riders:0,standby:1227,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:329,name:'ZAYN',genre:'',riders:0,standby:1177,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:330,name:'Enrique Iglesias',genre:'',riders:0,standby:1628,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:331,name:'System Of A Down',genre:'',riders:0,standby:1243,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:332,name:'ABBA',genre:'',riders:0,standby:1061,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:333,name:'blackbear',genre:'',riders:0,standby:823,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:334,name:'Rick Ross',genre:'',riders:0,standby:233,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:335,name:'Robin Schulz',genre:'',riders:0,standby:495,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:336,name:'TWICE',genre:'',riders:0,standby:1174,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:337,name:'Wisin & Yandel',genre:'',riders:0,standby:1451,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:338,name:'&#209;engo Flow',genre:'',riders:0,standby:1958,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:339,name:'Gusttavo Lima',genre:'',riders:0,standby:420,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:340,name:'The Rolling Stones',genre:'',riders:0,standby:876,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:341,name:'Bryant Myers',genre:'',riders:0,standby:1838,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:342,name:'YG',genre:'',riders:0,standby:389,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:343,name:'Luis R Conriquez',genre:'',riders:0,standby:473,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:344,name:'Lauv',genre:'',riders:0,standby:1106,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:345,name:'John Legend',genre:'',riders:0,standby:971,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:346,name:'Chance the Rapper',genre:'',riders:0,standby:1994,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:347,name:'Tito Double P',genre:'',riders:0,standby:623,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:348,name:'Meghan Trainor',genre:'',riders:0,standby:1550,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:349,name:'MC Ryan SP',genre:'',riders:0,standby:1962,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:350,name:'Eladio Carrion',genre:'',riders:0,standby:1329,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:351,name:'Reik',genre:'',riders:0,standby:1420,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:352,name:'Alicia Keys',genre:'',riders:0,standby:1500,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:353,name:'Grupo Firme',genre:'',riders:0,standby:333,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:354,name:'Lil Tjay',genre:'',riders:0,standby:407,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:355,name:'Noah Kahan',genre:'',riders:0,standby:1817,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:356,name:'Kesha',genre:'',riders:0,standby:732,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:357,name:'T-Pain',genre:'',riders:0,standby:1069,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:358,name:'Lil Tecca',genre:'',riders:0,standby:797,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:359,name:'Skrillex',genre:'',riders:0,standby:1442,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:360,name:'Frank Sinatra',genre:'',riders:0,standby:553,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:361,name:'Lorde',genre:'',riders:0,standby:746,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:362,name:'Ninho',genre:'',riders:0,standby:1524,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:363,name:'Zedd',genre:'',riders:0,standby:1594,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:364,name:'Melanie Martinez',genre:'',riders:0,standby:1586,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:365,name:'Elvis Presley',genre:'',riders:0,standby:300,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:366,name:'Christina Aguilera',genre:'',riders:0,standby:1830,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:367,name:'Madonna',genre:'',riders:0,standby:556,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:368,name:'Little Mix',genre:'',riders:0,standby:716,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:369,name:'DJ Khaled',genre:'',riders:0,standby:1717,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:370,name:'Paramore',genre:'',riders:0,standby:1542,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:371,name:'Cris Mj',genre:'',riders:0,standby:1141,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:372,name:'Amitabh Bhattacharya',genre:'',riders:0,standby:1420,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:373,name:'The Notorious B.I.G.',genre:'',riders:0,standby:1782,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:374,name:'Creedence Clearwater Revival',genre:'',riders:0,standby:398,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:375,name:'Jung Kook',genre:'',riders:0,standby:1207,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:376,name:'Jhen&#233; Aiko',genre:'',riders:0,standby:534,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:377,name:'Florida Georgia Line',genre:'',riders:0,standby:1140,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:378,name:'Labrinth',genre:'',riders:0,standby:366,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:379,name:'WizKid',genre:'',riders:0,standby:1309,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:380,name:'Slipknot',genre:'',riders:0,standby:407,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:381,name:'Summer Walker',genre:'',riders:0,standby:845,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:382,name:'Rammstein',genre:'',riders:0,standby:1878,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:383,name:'Kehlani',genre:'',riders:0,standby:1517,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:384,name:'Z&#233; Neto & Cristiano',genre:'',riders:0,standby:1473,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:385,name:'De La Ghetto',genre:'',riders:0,standby:1807,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:386,name:'League of Legends',genre:'',riders:0,standby:1243,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:387,name:'Mitski',genre:'',riders:0,standby:1953,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:388,name:'Meek Mill',genre:'',riders:0,standby:1712,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:389,name:'blink-182',genre:'',riders:0,standby:1798,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:390,name:'Oasis',genre:'',riders:0,standby:1115,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:391,name:'Clean Bandit',genre:'',riders:0,standby:1263,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:392,name:'Chencho Corleone',genre:'',riders:0,standby:365,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:393,name:'Chris Stapleton',genre:'',riders:0,standby:315,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:394,name:'Bon Jovi',genre:'',riders:0,standby:1202,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:395,name:'The Killers',genre:'',riders:0,standby:1060,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:396,name:'Foo Fighters',genre:'',riders:0,standby:1471,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:397,name:'David Bowie',genre:'',riders:0,standby:867,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:398,name:'Troye Sivan',genre:'',riders:0,standby:765,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:399,name:'The 1975',genre:'',riders:0,standby:1034,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:400,name:'Maria Becerra',genre:'',riders:0,standby:457,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:401,name:'Russ',genre:'',riders:0,standby:954,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:402,name:'Luis Fonsi',genre:'',riders:0,standby:1216,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:403,name:'Aventura',genre:'',riders:0,standby:1687,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:404,name:'Steve Lacy',genre:'',riders:0,standby:1927,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:405,name:'Jeremih',genre:'',riders:0,standby:1765,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:406,name:'Paulo Londra',genre:'',riders:0,standby:1441,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:407,name:'Conan Gray',genre:'',riders:0,standby:1018,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:408,name:'Be&#233;le',genre:'',riders:0,standby:926,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:409,name:'Matheus & Kauan',genre:'',riders:0,standby:1024,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:410,name:'Dalex',genre:'',riders:0,standby:557,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:411,name:'U2',genre:'',riders:0,standby:297,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:412,name:'Julia Michaels',genre:'',riders:0,standby:1127,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:413,name:'My Chemical Romance',genre:'',riders:0,standby:894,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:414,name:'Alok',genre:'',riders:0,standby:896,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:415,name:'Vishal-Shekhar',genre:'',riders:0,standby:1676,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:416,name:'Burna Boy',genre:'',riders:0,standby:674,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:417,name:'Yeat',genre:'',riders:0,standby:1093,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:418,name:'Plan B',genre:'',riders:0,standby:835,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:419,name:'Bring Me The Horizon',genre:'',riders:0,standby:897,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:420,name:'Marc Anthony',genre:'',riders:0,standby:1580,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:421,name:'Led Zeppelin',genre:'',riders:0,standby:1998,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:422,name:'Danny Ocean',genre:'',riders:0,standby:1234,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:423,name:'M&#229;neskin',genre:'',riders:0,standby:866,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:424,name:'Man&#225;',genre:'',riders:0,standby:1267,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:425,name:'Central Cee',genre:'',riders:0,standby:1692,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:426,name:'The Lumineers',genre:'',riders:0,standby:822,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:427,name:'Anderson .Paak',genre:'',riders:0,standby:1393,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:428,name:'Tainy',genre:'',riders:0,standby:1835,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:429,name:'Mac DeMarco',genre:'',riders:0,standby:1798,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:430,name:'Nickelback',genre:'',riders:0,standby:874,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:431,name:'Jonas Blue',genre:'',riders:0,standby:1560,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:432,name:'La Arrolladora Banda El Lim&#243;n De Rene Camacho',genre:'',riders:0,standby:1162,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:433,name:'Bastille',genre:'',riders:0,standby:1682,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:434,name:'Sfera Ebbasta',genre:'',riders:0,standby:1237,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:435,name:'Benson Boone',genre:'',riders:0,standby:771,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:436,name:'T.I.',genre:'',riders:0,standby:1166,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:437,name:'Prince Royce',genre:'',riders:0,standby:901,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:438,name:'Timbaland',genre:'',riders:0,standby:777,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:439,name:'Alka Yagnik',genre:'',riders:0,standby:1840,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:440,name:'NLE Choppa',genre:'',riders:0,standby:626,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:441,name:'Chase Atlantic',genre:'',riders:0,standby:517,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:442,name:'6LACK',genre:'',riders:0,standby:589,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:443,name:'Florence + The Machine',genre:'',riders:0,standby:378,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:444,name:'Juanes',genre:'',riders:0,standby:927,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:445,name:'Jennifer Lopez',genre:'',riders:0,standby:1816,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:446,name:'Gracie Abrams',genre:'',riders:0,standby:1069,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:447,name:'Tove Lo',genre:'',riders:0,standby:1492,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:448,name:'Luke Bryan',genre:'',riders:0,standby:1344,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:449,name:'Alejandro Sanz',genre:'',riders:0,standby:1204,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:450,name:'RAYE',genre:'',riders:0,standby:1188,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:451,name:'Tanishk Bagchi',genre:'',riders:0,standby:291,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:452,name:'Cartel De Santa',genre:'',riders:0,standby:1366,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:453,name:'Giveon',genre:'',riders:0,standby:1211,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:454,name:'Juli&#243;n &#193;lvarez y su Norte&#241;o Banda',genre:'',riders:0,standby:1560,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:455,name:'Oscar Maydon',genre:'',riders:0,standby:401,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:456,name:'Billy Joel',genre:'',riders:0,standby:851,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:457,name:'Muse',genre:'',riders:0,standby:506,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:458,name:'Miracle Tones',genre:'',riders:0,standby:334,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:459,name:'Jonas Brothers',genre:'',riders:0,standby:1050,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:460,name:'El Alfa',genre:'',riders:0,standby:603,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:461,name:'Natti Natasha',genre:'',riders:0,standby:550,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:462,name:'NAV',genre:'',riders:0,standby:1426,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:463,name:'DJ Luian',genre:'',riders:0,standby:1943,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:464,name:'Bruce Springsteen',genre:'',riders:0,standby:593,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:465,name:'Bonez MC',genre:'',riders:0,standby:1590,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:466,name:'Gabito Ballesteros',genre:'',riders:0,standby:213,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:467,name:'Lost Frequencies',genre:'',riders:0,standby:1772,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:468,name:'Jack Johnson',genre:'',riders:0,standby:1787,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:469,name:'Clairo',genre:'',riders:0,standby:748,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:470,name:'Whitney Houston',genre:'',riders:0,standby:1902,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:471,name:'Alejandro Fern&#225;ndez',genre:'',riders:0,standby:889,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:472,name:'Amy Winehouse',genre:'',riders:0,standby:808,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:473,name:'Alfredo Olivas',genre:'',riders:0,standby:597,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:474,name:'Hans Zimmer',genre:'',riders:0,standby:408,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:475,name:'Neton Vega',genre:'',riders:0,standby:1560,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:476,name:'Avril Lavigne',genre:'',riders:0,standby:1436,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:477,name:'Fetty Wap',genre:'',riders:0,standby:1167,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:478,name:'SEVENTEEN',genre:'',riders:0,standby:370,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:479,name:'Glass Animals',genre:'',riders:0,standby:410,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:480,name:'Udit Narayan',genre:'',riders:0,standby:286,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:481,name:'Mambo Kingz',genre:'',riders:0,standby:1584,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:482,name:'6ix9ine',genre:'',riders:0,standby:558,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:483,name:'Kings of Leon',genre:'',riders:0,standby:1640,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:484,name:'TINI',genre:'',riders:0,standby:979,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:485,name:'Kelly Clarkson',genre:'',riders:0,standby:820,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:486,name:'Teddy Swims',genre:'',riders:0,standby:602,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:487,name:'Jimin',genre:'',riders:0,standby:697,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:488,name:'Sachin-Jigar',genre:'',riders:0,standby:1192,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:489,name:'Stevie Wonder',genre:'',riders:0,standby:1435,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:490,name:'Felix Jaehn',genre:'',riders:0,standby:1178,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:491,name:'Niall Horan',genre:'',riders:0,standby:265,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:492,name:'The Script',genre:'',riders:0,standby:1827,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:493,name:'Joan Sebastian',genre:'',riders:0,standby:1041,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:494,name:'Deftones',genre:'',riders:0,standby:245,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:495,name:'TV Girl',genre:'',riders:0,standby:986,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:496,name:'Backstreet Boys',genre:'',riders:0,standby:934,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:497,name:'Dave',genre:'',riders:0,standby:217,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:498,name:'Calibre 50',genre:'',riders:0,standby:1946,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:499,name:'Rita Ora',genre:'',riders:0,standby:1307,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:500,name:'Mark Ronson',genre:'',riders:0,standby:1265,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:501,name:'The Offspring',genre:'',riders:0,standby:1470,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:502,name:'Piso 21',genre:'',riders:0,standby:396,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:503,name:'Noriel',genre:'',riders:0,standby:1699,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:504,name:'Phil Collins',genre:'',riders:0,standby:1306,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:505,name:'Rae Sremmurd',genre:'',riders:0,standby:1332,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:506,name:'Aerosmith',genre:'',riders:0,standby:596,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:507,name:'Bee Gees',genre:'',riders:0,standby:1991,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:508,name:'Eslabon Armado',genre:'',riders:0,standby:485,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:509,name:'Brytiago',genre:'',riders:0,standby:1713,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:510,name:'Jay Wheeler',genre:'',riders:0,standby:1217,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:511,name:'Blessd',genre:'',riders:0,standby:377,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:512,name:'Kevin Gates',genre:'',riders:0,standby:575,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:513,name:'Ana Castela',genre:'',riders:0,standby:887,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:514,name:'Vance Joy',genre:'',riders:0,standby:1282,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:515,name:'Chappell Roan',genre:'',riders:0,standby:504,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:516,name:'Rod Wave',genre:'',riders:0,standby:1747,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:517,name:'R3HAB',genre:'',riders:0,standby:1430,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:518,name:'Vicente Fern&#225;ndez',genre:'',riders:0,standby:504,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:519,name:'GIMS',genre:'',riders:0,standby:1934,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:520,name:'Jess Glynne',genre:'',riders:0,standby:1314,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:521,name:'RAF Camora',genre:'',riders:0,standby:1706,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:522,name:'Wesley Safad&#227;o',genre:'',riders:0,standby:1528,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:523,name:'ScHoolboy Q',genre:'',riders:0,standby:353,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:524,name:'Disclosure',genre:'',riders:0,standby:1087,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:525,name:'Eagles',genre:'',riders:0,standby:1389,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:526,name:'Rex Orange County',genre:'',riders:0,standby:968,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:527,name:'Alesso',genre:'',riders:0,standby:1645,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:528,name:'Maiara & Maraisa',genre:'',riders:0,standby:1640,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:529,name:'The Police',genre:'',riders:0,standby:1452,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:530,name:'Three Days Grace',genre:'',riders:0,standby:1349,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:531,name:'Mumford & Sons',genre:'',riders:0,standby:1070,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:532,name:'Avenged Sevenfold',genre:'',riders:0,standby:407,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:533,name:'Bibi Blocksberg',genre:'',riders:0,standby:1260,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:534,name:'The Strokes',genre:'',riders:0,standby:1689,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:535,name:'The Smiths',genre:'',riders:0,standby:978,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:536,name:'NewJeans',genre:'',riders:0,standby:934,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:537,name:'Ricardo Arjona',genre:'',riders:0,standby:1799,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:538,name:'Los &#193;ngeles Azules',genre:'',riders:0,standby:973,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:539,name:'H.E.R.',genre:'',riders:0,standby:1901,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:540,name:'Dire Straits',genre:'',riders:0,standby:1016,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:541,name:'Disturbed',genre:'',riders:0,standby:374,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:542,name:'Pearl Jam',genre:'',riders:0,standby:1261,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:543,name:'Atif Aslam',genre:'',riders:0,standby:947,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:544,name:'Kane Brown',genre:'',riders:0,standby:1474,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:545,name:'Steve Aoki',genre:'',riders:0,standby:406,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:546,name:'Luan Santana',genre:'',riders:0,standby:1198,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:547,name:'Milo j',genre:'',riders:0,standby:783,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:548,name:'Nelly',genre:'',riders:0,standby:547,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:549,name:'Johnny Cash',genre:'',riders:0,standby:1053,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:550,name:'Bon Iver',genre:'',riders:0,standby:1496,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:551,name:'Nicki Nicole',genre:'',riders:0,standby:801,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:552,name:'C&#233;line Dion',genre:'',riders:0,standby:1615,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:553,name:'KHEA',genre:'',riders:0,standby:1485,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:554,name:'Tiago PZK',genre:'',riders:0,standby:1815,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:555,name:'Nelly Furtado',genre:'',riders:0,standby:456,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:556,name:'Five Finger Death Punch',genre:'',riders:0,standby:244,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:557,name:'Karan Aujla',genre:'',riders:0,standby:1787,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:558,name:'Jason Aldean',genre:'',riders:0,standby:790,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:559,name:'Macklemore & Ryan Lewis',genre:'',riders:0,standby:446,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:560,name:'Thomas Rhett',genre:'',riders:0,standby:1866,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:561,name:'Moneybagg Yo',genre:'',riders:0,standby:1546,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:562,name:'Ovy On The Drums',genre:'',riders:0,standby:1791,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:563,name:'Dean Lewis',genre:'',riders:0,standby:425,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:564,name:'B.o.B',genre:'',riders:0,standby:1147,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:565,name:'Bryan Adams',genre:'',riders:0,standby:1663,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:566,name:'LANY',genre:'',riders:0,standby:250,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:567,name:'Ryan Lewis',genre:'',riders:0,standby:1185,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:568,name:'Calum Scott',genre:'',riders:0,standby:1384,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:569,name:'JENNIE',genre:'',riders:0,standby:1802,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:570,name:'Tom Odell',genre:'',riders:0,standby:566,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:571,name:'beabadoobee',genre:'',riders:0,standby:764,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:572,name:'Marco Antonio Sol&#237;s',genre:'',riders:0,standby:235,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:573,name:'YNW Melly',genre:'',riders:0,standby:1704,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:574,name:'Jason Mraz',genre:'',riders:0,standby:1094,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:575,name:'Mc IG',genre:'',riders:0,standby:1560,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:576,name:'Hailee Steinfeld',genre:'',riders:0,standby:836,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:577,name:'benny blanco',genre:'',riders:0,standby:1987,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:578,name:'Armin van Buuren',genre:'',riders:0,standby:418,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:579,name:'ENHYPEN',genre:'',riders:0,standby:1172,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:580,name:'TOMORROW X TOGETHER',genre:'',riders:0,standby:1960,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:581,name:'Bazzi',genre:'',riders:0,standby:1144,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:582,name:'Ryan Castro',genre:'',riders:0,standby:1348,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:583,name:'Ski Mask The Slump God',genre:'',riders:0,standby:1319,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:584,name:'Grupo Marca Registrada',genre:'',riders:0,standby:544,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:585,name:'Morad',genre:'',riders:0,standby:258,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:586,name:'Juan Gabriel',genre:'',riders:0,standby:559,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:587,name:'Alec Benjamin',genre:'',riders:0,standby:1598,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:588,name:'Outkast',genre:'',riders:0,standby:543,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:589,name:'Los Tigres Del Norte',genre:'',riders:0,standby:259,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:590,name:'Pablo Albor&#225;n',genre:'',riders:0,standby:1567,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:591,name:'Los Temerarios',genre:'',riders:0,standby:211,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:592,name:'Korn',genre:'',riders:0,standby:1497,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:593,name:'Lizzo',genre:'',riders:0,standby:623,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:594,name:'Mustard',genre:'',riders:0,standby:1407,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:595,name:'Jesse & Joy',genre:'',riders:0,standby:1367,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:596,name:'Grupo Menos &#201; Mais',genre:'',riders:0,standby:1536,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:597,name:'The Cure',genre:'',riders:0,standby:1737,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:598,name:'Phoebe Bridgers',genre:'',riders:0,standby:1667,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:599,name:'Jos&#233; Jos&#233;',genre:'',riders:0,standby:826,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:600,name:'Filipe Ret',genre:'',riders:0,standby:408,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:601,name:'Train',genre:'',riders:0,standby:161,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:602,name:'Trey Songz',genre:'',riders:0,standby:287,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:603,name:'MGMT',genre:'',riders:0,standby:308,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:604,name:'Limp Bizkit',genre:'',riders:0,standby:473,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:605,name:'Galantis',genre:'',riders:0,standby:333,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:606,name:'Gera MX',genre:'',riders:0,standby:239,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:607,name:'Ricky Martin',genre:'',riders:0,standby:289,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:608,name:'Laufey',genre:'',riders:0,standby:384,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:609,name:'Die drei !!!',genre:'',riders:0,standby:225,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:610,name:'Bibi und Tina',genre:'',riders:0,standby:214,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:611,name:'Mc Don Juan',genre:'',riders:0,standby:197,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:612,name:'Lin-Manuel Miranda',genre:'',riders:0,standby:230,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:613,name:'Matu&#234;',genre:'',riders:0,standby:269,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:614,name:'Luciano',genre:'',riders:0,standby:264,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:615,name:'d4vd',genre:'',riders:0,standby:200,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:616,name:'Carlos Vives',genre:'',riders:0,standby:112,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:617,name:'Fifth Harmony',genre:'',riders:0,standby:399,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:618,name:'Empire of the Sun',genre:'',riders:0,standby:69,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:619,name:'KK',genre:'',riders:0,standby:141,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:620,name:'Santa Fe Klan',genre:'',riders:0,standby:161,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:621,name:'George Ezra',genre:'',riders:0,standby:78,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:622,name:'Chief Keef',genre:'',riders:0,standby:330,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:623,name:'Baby Keem',genre:'',riders:0,standby:192,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:624,name:'Damso',genre:'',riders:0,standby:298,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:625,name:'Dominic Fike',genre:'',riders:0,standby:441,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:626,name:'NIKI',genre:'',riders:0,standby:68,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:627,name:'Capital Bra',genre:'',riders:0,standby:405,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:628,name:'Juan Luis Guerra 4.40',genre:'',riders:0,standby:297,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:629,name:'Cosculluela',genre:'',riders:0,standby:413,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:630,name:'Swedish House Mafia',genre:'',riders:0,standby:344,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:631,name:'The Mar&#237;as',genre:'',riders:0,standby:126,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:632,name:'John Williams',genre:'',riders:0,standby:205,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:633,name:'A$AP Ferg',genre:'',riders:0,standby:286,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:634,name:'Soda Stereo',genre:'',riders:0,standby:86,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:635,name:'Calmly',genre:'',riders:0,standby:395,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:636,name:'Lord Huron',genre:'',riders:0,standby:114,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:637,name:'Jelly Roll',genre:'',riders:0,standby:320,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:638,name:'Marvin Gaye',genre:'',riders:0,standby:118,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:639,name:'White Noise Radiance',genre:'',riders:0,standby:263,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:640,name:'Cage The Elephant',genre:'',riders:0,standby:435,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:641,name:'LUDMILLA',genre:'',riders:0,standby:424,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:642,name:'Cheat Codes',genre:'',riders:0,standby:495,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:643,name:'Trueno',genre:'',riders:0,standby:375,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:644,name:'Tyler Childers',genre:'',riders:0,standby:306,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:645,name:'Journey',genre:'',riders:0,standby:350,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:646,name:'Lil Skies',genre:'',riders:0,standby:321,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:647,name:'Gwen Stefani',genre:'',riders:0,standby:452,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:648,name:'Devi Sri Prasad',genre:'',riders:0,standby:175,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:649,name:'Nio Garcia',genre:'',riders:0,standby:216,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:650,name:'The Cranberries',genre:'',riders:0,standby:270,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:651,name:'King Von',genre:'',riders:0,standby:85,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:652,name:'Julieta Venegas',genre:'',riders:0,standby:190,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:653,name:'Rema',genre:'',riders:0,standby:309,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:654,name:'Flume',genre:'',riders:0,standby:100,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:655,name:'Aleman',genre:'',riders:0,standby:298,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:656,name:'Young Miko',genre:'',riders:0,standby:176,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:657,name:'Glee Cast',genre:'',riders:0,standby:352,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:658,name:'MEDUZA',genre:'',riders:0,standby:478,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:659,name:'Shiloh Dynasty',genre:'',riders:0,standby:309,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:660,name:'bbno$',genre:'',riders:0,standby:405,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:661,name:'Gerardo Ortiz',genre:'',riders:0,standby:469,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:662,name:'Sidhu Moose Wala',genre:'',riders:0,standby:384,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:663,name:'The Game',genre:'',riders:0,standby:263,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:664,name:'24kGoldn',genre:'',riders:0,standby:295,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:665,name:'Madison Beer',genre:'',riders:0,standby:376,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:666,name:'Wale',genre:'',riders:0,standby:84,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:667,name:'Lunay',genre:'',riders:0,standby:135,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:668,name:'Skillet',genre:'',riders:0,standby:463,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:669,name:'Lu&#237;sa Sonza',genre:'',riders:0,standby:148,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:670,name:'AJR',genre:'',riders:0,standby:56,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:671,name:'Jessie J',genre:'',riders:0,standby:224,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:672,name:'Mon Laferte',genre:'',riders:0,standby:263,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:673,name:'X Ambassadors',genre:'',riders:0,standby:371,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:674,name:'Depeche Mode',genre:'',riders:0,standby:343,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:675,name:'Becky Hill',genre:'',riders:0,standby:57,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:676,name:'Weezer',genre:'',riders:0,standby:159,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:677,name:'AP Dhillon',genre:'',riders:0,standby:316,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:678,name:'Nas',genre:'',riders:0,standby:298,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:679,name:'Bob Dylan',genre:'',riders:0,standby:351,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:680,name:'Cazzu',genre:'',riders:0,standby:473,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:681,name:'Aitana',genre:'',riders:0,standby:369,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:682,name:'Mithoon',genre:'',riders:0,standby:243,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:683,name:'Daya',genre:'',riders:0,standby:100,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:684,name:'PinkPantheress',genre:'',riders:0,standby:358,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:685,name:'LE SSERAFIM',genre:'',riders:0,standby:377,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:686,name:'James Bay',genre:'',riders:0,standby:123,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:687,name:'V',genre:'',riders:0,standby:452,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:688,name:'Sonu Nigam',genre:'',riders:0,standby:137,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:689,name:'Badshah',genre:'',riders:0,standby:249,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:690,name:'Yuvan Shankar Raja',genre:'',riders:0,standby:345,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:691,name:'Jax Jones',genre:'',riders:0,standby:79,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:692,name:'Foster The People',genre:'',riders:0,standby:242,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:693,name:'Mrs. GREEN APPLE',genre:'',riders:0,standby:429,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:694,name:'Paul McCartney',genre:'',riders:0,standby:375,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:695,name:'Emilia',genre:'',riders:0,standby:322,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:696,name:'DJ Nelson',genre:'',riders:0,standby:52,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:697,name:'Stormzy',genre:'',riders:0,standby:199,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:698,name:'Daryl Hall & John Oates',genre:'',riders:0,standby:173,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:699,name:'Hugo & Guilherme',genre:'',riders:0,standby:214,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:700,name:'Tones And I',genre:'',riders:0,standby:472,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:701,name:'Earth, Wind & Fire',genre:'',riders:0,standby:292,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:702,name:'Ice Cube',genre:'',riders:0,standby:52,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:703,name:'Dan + Shay',genre:'',riders:0,standby:296,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:704,name:'Ludovico Einaudi',genre:'',riders:0,standby:334,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:705,name:'Lukas Graham',genre:'',riders:0,standby:338,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:706,name:'Alex Warren',genre:'',riders:0,standby:257,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:707,name:'Shaggy',genre:'',riders:0,standby:415,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:708,name:'Olivia Dean',genre:'',riders:0,standby:157,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:709,name:'Latto',genre:'',riders:0,standby:120,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:710,name:'TOTO',genre:'',riders:0,standby:104,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:711,name:'C. Tangana',genre:'',riders:0,standby:500,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:712,name:'Ha*Ash',genre:'',riders:0,standby:492,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:713,name:'Iron Maiden',genre:'',riders:0,standby:268,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:714,name:'ILLENIUM',genre:'',riders:0,standby:97,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:715,name:'Blake Shelton',genre:'',riders:0,standby:449,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:716,name:'Lil Mosey',genre:'',riders:0,standby:404,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:717,name:'Diljit Dosanjh',genre:'',riders:0,standby:425,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:718,name:'PNL',genre:'',riders:0,standby:366,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:719,name:'Black Sabbath',genre:'',riders:0,standby:313,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:720,name:'Los Tucanes De Tijuana',genre:'',riders:0,standby:451,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:721,name:'Rod Stewart',genre:'',riders:0,standby:231,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:722,name:'Kacey Musgraves',genre:'',riders:0,standby:445,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:723,name:'Eric Church',genre:'',riders:0,standby:374,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:724,name:'Zac Brown Band',genre:'',riders:0,standby:191,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:725,name:'KPop Demon Hunters Cast',genre:'',riders:0,standby:84,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:726,name:'MARINA',genre:'',riders:0,standby:441,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:727,name:'Enya',genre:'',riders:0,standby:131,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:728,name:'Natalia Lafourcade',genre:'',riders:0,standby:151,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:729,name:'Dei V',genre:'',riders:0,standby:473,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:730,name:'The Doors',genre:'',riders:0,standby:372,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:731,name:'Passenger',genre:'',riders:0,standby:398,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:732,name:'Geolier',genre:'',riders:0,standby:242,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:733,name:'Lil Pump',genre:'',riders:0,standby:216,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:734,name:'Yo Yo Honey Singh',genre:'',riders:0,standby:393,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:735,name:'R.E.M.',genre:'',riders:0,standby:419,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:736,name:'Sleepy Hallow',genre:'',riders:0,standby:400,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:737,name:'Papa Roach',genre:'',riders:0,standby:239,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:738,name:'Evanescence',genre:'',riders:0,standby:184,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:739,name:'girl in red',genre:'',riders:0,standby:389,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:740,name:'Iggy Azalea',genre:'',riders:0,standby:286,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:741,name:'Maren Morris',genre:'',riders:0,standby:384,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:742,name:'Sade',genre:'',riders:0,standby:389,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:743,name:'Jubin Nautiyal',genre:'',riders:0,standby:341,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:744,name:'ROS&#201;',genre:'',riders:0,standby:383,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:745,name:'Melendi',genre:'',riders:0,standby:450,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:746,name:'Topic',genre:'',riders:0,standby:367,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:747,name:'Carly Rae Jepsen',genre:'',riders:0,standby:288,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:748,name:'Chino Pacas',genre:'',riders:0,standby:419,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:749,name:'Kumar Sanu',genre:'',riders:0,standby:98,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:750,name:'Noah Cyrus',genre:'',riders:0,standby:465,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:751,name:'Rain Sounds',genre:'',riders:0,standby:186,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:752,name:'Key Glock',genre:'',riders:0,standby:245,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:753,name:'Norah Jones',genre:'',riders:0,standby:248,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:754,name:'James Blunt',genre:'',riders:0,standby:493,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:755,name:'Ufo361',genre:'',riders:0,standby:447,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:756,name:'Elevation Worship',genre:'',riders:0,standby:233,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:757,name:'aespa',genre:'',riders:0,standby:492,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:758,name:'Christina Perri',genre:'',riders:0,standby:213,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:759,name:'George Michael',genre:'',riders:0,standby:338,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:760,name:'MC Cabelinho',genre:'',riders:0,standby:404,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:761,name:'JVKE',genre:'',riders:0,standby:295,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:762,name:'The Beach Boys',genre:'',riders:0,standby:70,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:763,name:'MF DOOM',genre:'',riders:0,standby:401,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:764,name:'TKKG',genre:'',riders:0,standby:187,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:765,name:'LISA',genre:'',riders:0,standby:237,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:766,name:'Lazza',genre:'',riders:0,standby:213,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:767,name:'Omar Courtz',genre:'',riders:0,standby:376,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:768,name:'Orochi',genre:'',riders:0,standby:394,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:769,name:'Carlos Rivera',genre:'',riders:0,standby:244,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:770,name:'Tim McGraw',genre:'',riders:0,standby:104,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:771,name:'Jorja Smith',genre:'',riders:0,standby:71,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:772,name:'Sam Feldt',genre:'',riders:0,standby:495,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:773,name:'Hillsong Worship',genre:'',riders:0,standby:347,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:774,name:'Lynyrd Skynyrd',genre:'',riders:0,standby:452,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:775,name:'Mike Posner',genre:'',riders:0,standby:484,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:776,name:'YOASOBI',genre:'',riders:0,standby:106,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:777,name:'Seeb',genre:'',riders:0,standby:357,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:778,name:'Zo&#233;',genre:'',riders:0,standby:348,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:779,name:'El Fantasma',genre:'',riders:0,standby:125,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:780,name:'D-Block Europe',genre:'',riders:0,standby:390,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:781,name:'The Black Keys',genre:'',riders:0,standby:159,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:782,name:'The Goo Goo Dolls',genre:'',riders:0,standby:273,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:783,name:'Charlie Brown Jr.',genre:'',riders:0,standby:185,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:784,name:'Dimitri Vegas & Like Mike',genre:'',riders:0,standby:180,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:785,name:'Jeremy Zucker',genre:'',riders:0,standby:472,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:786,name:'Ferrugem',genre:'',riders:0,standby:151,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:787,name:'Mau y Ricky',genre:'',riders:0,standby:74,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:788,name:'Kenny Chesney',genre:'',riders:0,standby:339,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:789,name:'Fred again..',genre:'',riders:0,standby:385,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:790,name:'Milky Chance',genre:'',riders:0,standby:338,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:791,name:'George Strait',genre:'',riders:0,standby:402,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:792,name:'Kim Petras',genre:'',riders:0,standby:341,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:793,name:'Keane',genre:'',riders:0,standby:142,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:794,name:'Van Morrison',genre:'',riders:0,standby:394,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:795,name:'Juan Mag&#225;n',genre:'',riders:0,standby:497,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:796,name:'Niska',genre:'',riders:0,standby:69,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:797,name:'Stromae',genre:'',riders:0,standby:112,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:798,name:'Joey Bada$$',genre:'',riders:0,standby:141,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:799,name:'BigXthaPlug',genre:'',riders:0,standby:81,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:800,name:'Bruno & Marrone',genre:'',riders:0,standby:404,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:801,name:'Ella Henderson',genre:'',riders:0,standby:248,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:802,name:'Eric Clapton',genre:'',riders:0,standby:265,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:803,name:'Dilsinho',genre:'',riders:0,standby:217,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:804,name:'Ozzy Osbourne',genre:'',riders:0,standby:377,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:805,name:'keshi',genre:'',riders:0,standby:108,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:806,name:'Ms. Lauryn Hill',genre:'',riders:0,standby:164,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:807,name:'Dolly Parton',genre:'',riders:0,standby:485,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:808,name:'CNCO',genre:'',riders:0,standby:275,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:809,name:'Imanbek',genre:'',riders:0,standby:104,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:810,name:'Ruth B.',genre:'',riders:0,standby:173,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:811,name:'Vishal Mishra',genre:'',riders:0,standby:335,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:812,name:'Lata Mangeshkar',genre:'',riders:0,standby:69,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:813,name:'Robbie Williams',genre:'',riders:0,standby:146,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:814,name:'AURORA',genre:'',riders:0,standby:74,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:815,name:'Destiny',genre:'',riders:0,standby:355,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:816,name:'Los Bukis',genre:'',riders:0,standby:82,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:817,name:'Rudimental',genre:'',riders:0,standby:492,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:818,name:'Birdy',genre:'',riders:0,standby:382,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:819,name:'Bill Withers',genre:'',riders:0,standby:408,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:820,name:'Sido',genre:'',riders:0,standby:269,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:821,name:'Sigala',genre:'',riders:0,standby:256,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:822,name:'Veigh',genre:'',riders:0,standby:398,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:823,name:'Chayanne',genre:'',riders:0,standby:470,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:824,name:'Banda El Recodo',genre:'',riders:0,standby:54,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:825,name:'Tears For Fears',genre:'',riders:0,standby:395,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:826,name:'Sam Hunt',genre:'',riders:0,standby:379,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:827,name:'Ivan Cornejo',genre:'',riders:0,standby:136,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:828,name:'Dermot Kennedy',genre:'',riders:0,standby:375,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:829,name:'Jon Pardi',genre:'',riders:0,standby:344,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:830,name:'Aya Nakamura',genre:'',riders:0,standby:354,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:831,name:'Rise Against',genre:'',riders:0,standby:424,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:832,name:'Simon & Garfunkel',genre:'',riders:0,standby:441,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:833,name:'Pentatonix',genre:'',riders:0,standby:210,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:834,name:'Alan Jackson',genre:'',riders:0,standby:157,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:835,name:'Carrie Underwood',genre:'',riders:0,standby:293,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:836,name:'Canserbero',genre:'',riders:0,standby:80,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:837,name:'alt-J',genre:'',riders:0,standby:221,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:838,name:'Shubh',genre:'',riders:0,standby:273,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:839,name:'Tulus',genre:'',riders:0,standby:491,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:840,name:'The Smashing Pumpkins',genre:'',riders:0,standby:243,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:841,name:'Booba',genre:'',riders:0,standby:161,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:842,name:'MC Kevin o Chris',genre:'',riders:0,standby:131,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:843,name:'Scorpions',genre:'',riders:0,standby:238,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:844,name:'Van Halen',genre:'',riders:0,standby:438,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:845,name:'Alice In Chains',genre:'',riders:0,standby:437,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:846,name:'Darshan Raval',genre:'',riders:0,standby:282,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:847,name:'FloyyMenor',genre:'',riders:0,standby:170,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:848,name:'Leon Bridges',genre:'',riders:0,standby:439,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:849,name:'La Oreja de Van Gogh',genre:'',riders:0,standby:326,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:850,name:'L7NNON',genre:'',riders:0,standby:104,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:851,name:'Apache 207',genre:'',riders:0,standby:314,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:852,name:'Harris Jayaraj',genre:'',riders:0,standby:238,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:853,name:'Breaking Benjamin',genre:'',riders:0,standby:342,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:854,name:'(G)I-DLE',genre:'',riders:0,standby:102,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:855,name:'Gabry Ponte',genre:'',riders:0,standby:339,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:856,name:'Oliver Tree',genre:'',riders:0,standby:360,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:857,name:'Ke Personajes',genre:'',riders:0,standby:92,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:858,name:'Joel Corry',genre:'',riders:0,standby:283,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:859,name:'Xavi',genre:'',riders:0,standby:108,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:860,name:'Gazo',genre:'',riders:0,standby:406,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:861,name:'Young Dolph',genre:'',riders:0,standby:142,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:862,name:'Victor Mendivil',genre:'',riders:0,standby:179,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:863,name:'Cody Johnson',genre:'',riders:0,standby:284,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:864,name:'Jay Chou',genre:'',riders:0,standby:401,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:865,name:'The Fray',genre:'',riders:0,standby:476,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:866,name:'Sublime',genre:'',riders:0,standby:162,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:867,name:'WILLOW',genre:'',riders:0,standby:73,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:868,name:'Shania Twain',genre:'',riders:0,standby:210,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:869,name:'Boyce Avenue',genre:'',riders:0,standby:381,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:870,name:'Joyner Lucas',genre:'',riders:0,standby:203,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:871,name:'KISS',genre:'',riders:0,standby:337,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:872,name:'Dadju',genre:'',riders:0,standby:112,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:873,name:'Ghost',genre:'',riders:0,standby:276,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:874,name:'Denzel Curry',genre:'',riders:0,standby:381,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:875,name:'EXO',genre:'',riders:0,standby:407,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:876,name:'Hillsong UNITED',genre:'',riders:0,standby:59,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:877,name:'Ken Car$on',genre:'',riders:0,standby:198,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:878,name:'Sabaton',genre:'',riders:0,standby:297,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:879,name:'Johann Sebastian Bach',genre:'',riders:0,standby:354,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:880,name:'Pierce The Veil',genre:'',riders:0,standby:252,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:881,name:'Hungria Hip Hop',genre:'',riders:0,standby:121,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:882,name:'sombr',genre:'',riders:0,standby:232,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:883,name:'Lofi Fruits Music',genre:'',riders:0,standby:451,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:884,name:'UZI',genre:'',riders:0,standby:173,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:885,name:'Shankar-Ehsaan-Loy',genre:'',riders:0,standby:138,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:886,name:'Nat King Cole',genre:'',riders:0,standby:163,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:887,name:'David Bisbal',genre:'',riders:0,standby:118,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:888,name:'Sting',genre:'',riders:0,standby:395,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:889,name:'Shinedown',genre:'',riders:0,standby:203,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:890,name:'Hindia',genre:'',riders:0,standby:495,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:891,name:'Yuridia',genre:'',riders:0,standby:321,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:892,name:'Sorriso Maroto',genre:'',riders:0,standby:399,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:893,name:'Keith Urban',genre:'',riders:0,standby:415,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:894,name:'Rage Against The Machine',genre:'',riders:0,standby:276,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:895,name:'Bradley Cooper',genre:'',riders:0,standby:438,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:896,name:'BONES',genre:'',riders:0,standby:120,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:897,name:'Wham!',genre:'',riders:0,standby:192,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:898,name:'SAINt JHN',genre:'',riders:0,standby:271,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:899,name:'Dean Martin',genre:'',riders:0,standby:355,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:900,name:'PLK',genre:'',riders:0,standby:180,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:901,name:'Why Don',genre:'',riders:0,standby:395,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:902,name:'Sum 41',genre:'',riders:0,standby:395,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:903,name:'Amit Trivedi',genre:'',riders:0,standby:337,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:904,name:'The White Stripes',genre:'',riders:0,standby:128,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:905,name:'Shiva',genre:'',riders:0,standby:287,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:906,name:'KayBlack',genre:'',riders:0,standby:360,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:907,name:'Kevin Kaarl',genre:'',riders:0,standby:235,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:908,name:'Kevin Roldan',genre:'',riders:0,standby:130,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:909,name:'Guilherme & Benuto',genre:'',riders:0,standby:495,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:910,name:'Ciara',genre:'',riders:0,standby:50,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:911,name:'Electric Light Orchestra',genre:'',riders:0,standby:478,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:912,name:'Intocable',genre:'',riders:0,standby:276,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:913,name:'Murilo Huff',genre:'',riders:0,standby:191,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:914,name:'Volbeat',genre:'',riders:0,standby:206,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:915,name:'Prince',genre:'',riders:0,standby:469,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:916,name:'Years & Years',genre:'',riders:0,standby:423,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:917,name:'Red Velvet',genre:'',riders:0,standby:466,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:918,name:'Jes&#250;s Adri&#225;n Romero',genre:'',riders:0,standby:241,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:919,name:'La Santa Grifa',genre:'',riders:0,standby:91,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:920,name:'3 Doors Down',genre:'',riders:0,standby:132,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:921,name:'j-hope',genre:'',riders:0,standby:253,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:922,name:'LUCKI',genre:'',riders:0,standby:481,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:923,name:'Alex Rose',genre:'',riders:0,standby:128,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:924,name:'Falling In Reverse',genre:'',riders:0,standby:96,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:925,name:'Eden Mu&#241;oz',genre:'',riders:0,standby:69,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:926,name:'Calle 24',genre:'',riders:0,standby:405,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:927,name:'B Praak',genre:'',riders:0,standby:242,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:928,name:'Samra',genre:'',riders:0,standby:448,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:929,name:'Danna Paola',genre:'',riders:0,standby:278,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:930,name:'Odetari',genre:'',riders:0,standby:148,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:931,name:'Camila',genre:'',riders:0,standby:275,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:932,name:'DNCE',genre:'',riders:0,standby:495,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:933,name:'Jaani',genre:'',riders:0,standby:368,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:934,name:'Funk Wav',genre:'',riders:0,standby:195,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:935,name:'Axwell',genre:'',riders:0,standby:136,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:936,name:'a-ha',genre:'',riders:0,standby:465,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:937,name:'Gustavo Mioto',genre:'',riders:0,standby:235,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:938,name:'Tyla',genre:'',riders:0,standby:201,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:939,name:'Gryffin',genre:'',riders:0,standby:119,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:940,name:'Kylie Minogue',genre:'',riders:0,standby:265,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:941,name:'Bronco',genre:'',riders:0,standby:460,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:942,name:'YUNGBLUD',genre:'',riders:0,standby:250,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:943,name:'DMX',genre:'',riders:0,standby:198,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:944,name:'Diego & Victor Hugo',genre:'',riders:0,standby:235,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:945,name:'Roxette',genre:'',riders:0,standby:164,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:946,name:'All Time Low',genre:'',riders:0,standby:329,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:947,name:'The Vamps',genre:'',riders:0,standby:206,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:948,name:'Jimi Hendrix',genre:'',riders:0,standby:223,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:949,name:'Ella Mai',genre:'',riders:0,standby:56,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:950,name:'Amin&#233;',genre:'',riders:0,standby:194,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:951,name:'Stephen Sanchez',genre:'',riders:0,standby:375,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:952,name:'Timmy Trumpet',genre:'',riders:0,standby:67,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:953,name:'JP Cooper',genre:'',riders:0,standby:421,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:954,name:'Beach House',genre:'',riders:0,standby:265,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:955,name:'Kontra K',genre:'',riders:0,standby:271,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:956,name:'Los Enanitos Verdes',genre:'',riders:0,standby:151,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:957,name:'Casper Magico',genre:'',riders:0,standby:198,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:958,name:'Ezhel',genre:'',riders:0,standby:201,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:959,name:'M83',genre:'',riders:0,standby:177,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:960,name:'Sean Kingston',genre:'',riders:0,standby:208,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:961,name:'Thiaguinho',genre:'',riders:0,standby:140,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:962,name:'Sufjan Stevens',genre:'',riders:0,standby:437,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:963,name:'Marilyn Manson',genre:'',riders:0,standby:96,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:964,name:'NEFFEX',genre:'',riders:0,standby:478,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:965,name:'Kodaline',genre:'',riders:0,standby:432,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:966,name:'Doechii',genre:'',riders:0,standby:72,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:967,name:'R&#220;F&#220;S DU SOL',genre:'',riders:0,standby:279,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:968,name:'Aretha Franklin',genre:'',riders:0,standby:374,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:969,name:'Bethel Music',genre:'',riders:0,standby:238,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:970,name:'Sezen Aksu',genre:'',riders:0,standby:104,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:971,name:'Carla Morrison',genre:'',riders:0,standby:143,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:972,name:'M&#246;tley Cr&#252;e',genre:'',riders:0,standby:245,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:973,name:'ANAVIT&#211;RIA',genre:'',riders:0,standby:75,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:974,name:'310187161',genre:'',riders:0,standby:322,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:975,name:'BROCKHAMPTON',genre:'',riders:0,standby:274,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:976,name:'Ice Spice',genre:'',riders:0,standby:320,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:977,name:'Ilaiyaraaja',genre:'',riders:0,standby:62,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:978,name:'Mari Fernandez',genre:'',riders:0,standby:232,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:979,name:'Sin Bandera',genre:'',riders:0,standby:269,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:980,name:'Annie Lennox',genre:'',riders:0,standby:408,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:981,name:'Mother Mother',genre:'',riders:0,standby:405,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:982,name:'Wolfgang Amadeus Mozart',genre:'',riders:0,standby:382,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:983,name:'YSY A',genre:'',riders:0,standby:462,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:984,name:'Kenshi Yonezu',genre:'',riders:0,standby:265,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:985,name:'Os Bar&#245;es Da Pisadinha',genre:'',riders:0,standby:236,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:986,name:'CRO',genre:'',riders:0,standby:119,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:987,name:'Laura Pausini',genre:'',riders:0,standby:245,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:988,name:'PNAU',genre:'',riders:0,standby:442,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:989,name:'John Lennon',genre:'',riders:0,standby:231,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:990,name:'A Day To Remember',genre:'',riders:0,standby:494,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:991,name:'Andy Grammer',genre:'',riders:0,standby:376,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:992,name:'Mabel',genre:'',riders:0,standby:280,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:993,name:'Liam Payne',genre:'',riders:0,standby:451,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:994,name:'Israel & Rodolffo',genre:'',riders:0,standby:470,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:995,name:'ATEEZ',genre:'',riders:0,standby:142,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:996,name:'Rag',genre:'',riders:0,standby:65,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:997,name:'Tiakola',genre:'',riders:0,standby:350,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:998,name:'Santana',genre:'',riders:0,standby:436,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:999,name:'Kany Garc&#237;a',genre:'',riders:0,standby:486,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1000,name:'Benjamin Bl&#252;mchen',genre:'',riders:0,standby:153,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1001,name:'Cavetown',genre:'',riders:0,standby:115,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1002,name:'Lauana Prado',genre:'',riders:0,standby:449,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1003,name:'Vintage Culture',genre:'',riders:0,standby:388,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1004,name:'Simone Mendes',genre:'',riders:0,standby:376,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1005,name:'Rvssian',genre:'',riders:0,standby:56,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1006,name:'Cristian Castro',genre:'',riders:0,standby:90,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1007,name:'Powfu',genre:'',riders:0,standby:291,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1008,name:'Jordan Davis',genre:'',riders:0,standby:385,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1009,name:'Fergie',genre:'',riders:0,standby:398,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1010,name:'NCT DREAM',genre:'',riders:0,standby:274,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1011,name:'ODESZA',genre:'',riders:0,standby:391,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1012,name:'WALK THE MOON',genre:'',riders:0,standby:299,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1013,name:'Fr&#233;d&#233;ric Chopin',genre:'',riders:0,standby:500,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1014,name:'Gloria Trevi',genre:'',riders:0,standby:396,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1015,name:'The Clash',genre:'',riders:0,standby:210,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1016,name:'Pedro Cap&#243;',genre:'',riders:0,standby:117,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1017,name:'Felipe Amorim',genre:'',riders:0,standby:464,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1018,name:'Nanpa B&#225;sico',genre:'',riders:0,standby:230,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1019,name:'*NSYNC',genre:'',riders:0,standby:327,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1020,name:'Lvbel C5',genre:'',riders:0,standby:439,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1021,name:'Louis Armstrong',genre:'',riders:0,standby:317,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1022,name:'PEDRO SAMPAIO',genre:'',riders:0,standby:138,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1023,name:'Werenoi',genre:'',riders:0,standby:442,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1024,name:'Jo&#227;o Gomes',genre:'',riders:0,standby:92,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1025,name:'Ado',genre:'',riders:0,standby:476,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1026,name:'Jere Klein',genre:'',riders:0,standby:338,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1027,name:'DENNIS',genre:'',riders:0,standby:338,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1028,name:'Boney M.',genre:'',riders:0,standby:290,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1029,name:'Queens of the Stone Age',genre:'',riders:0,standby:394,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1030,name:'Cyndi Lauper',genre:'',riders:0,standby:284,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1031,name:'Sleep Token',genre:'',riders:0,standby:288,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1032,name:'Hollywood Undead',genre:'',riders:0,standby:206,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1033,name:'Of Monsters and Men',genre:'',riders:0,standby:255,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1034,name:'Westlife',genre:'',riders:0,standby:211,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1035,name:'Rascal Flatts',genre:'',riders:0,standby:491,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1036,name:'Bing Crosby',genre:'',riders:0,standby:292,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1037,name:'Amaal Mallik',genre:'',riders:0,standby:471,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1038,name:'IU',genre:'',riders:0,standby:224,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1039,name:'BoyWithUke',genre:'',riders:0,standby:77,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1040,name:'JIN',genre:'',riders:0,standby:308,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1041,name:'Cardenales De Nuevo Le&#243;n',genre:'',riders:0,standby:415,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1042,name:'Dread Mar I',genre:'',riders:0,standby:319,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1043,name:'The Pussycat Dolls',genre:'',riders:0,standby:317,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1044,name:'FISHER',genre:'',riders:0,standby:178,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1045,name:'Arcane',genre:'',riders:0,standby:409,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1046,name:'S. S. Thaman',genre:'',riders:0,standby:54,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1047,name:'Selena',genre:'',riders:0,standby:395,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1048,name:'Ella Fitzgerald',genre:'',riders:0,standby:399,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1049,name:'Agust D',genre:'',riders:0,standby:393,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1050,name:'Bailey Zimmerman',genre:'',riders:0,standby:254,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1051,name:'back number',genre:'',riders:0,standby:224,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1052,name:'Supernova Ent',genre:'',riders:0,standby:433,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1053,name:'La Adictiva Banda San Jos&#233; de Mesillas',genre:'',riders:0,standby:304,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1054,name:'Toby Fox',genre:'',riders:0,standby:257,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1055,name:'Beret',genre:'',riders:0,standby:456,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1056,name:'Semicenk',genre:'',riders:0,standby:190,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1057,name:'Rochak Kohli',genre:'',riders:0,standby:105,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1058,name:'Kenia OS',genre:'',riders:0,standby:445,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1059,name:'Lenny Kravitz',genre:'',riders:0,standby:208,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1060,name:'Eyedress',genre:'',riders:0,standby:264,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1061,name:'Two Feet',genre:'',riders:0,standby:453,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1062,name:'Hombres G',genre:'',riders:0,standby:421,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1063,name:'Nick Jonas',genre:'',riders:0,standby:54,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1064,name:'Bad Gyal',genre:'',riders:0,standby:454,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1065,name:'The xx',genre:'',riders:0,standby:365,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1066,name:'NATTAN',genre:'',riders:0,standby:284,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1067,name:'Taio Cruz',genre:'',riders:0,standby:428,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1068,name:'Tracy Chapman',genre:'',riders:0,standby:56,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1069,name:'Sleeping At Last',genre:'',riders:0,standby:398,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1070,name:'Gigi D',genre:'',riders:0,standby:399,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1071,name:'Wallows',genre:'',riders:0,standby:359,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1072,name:'RADWIMPS',genre:'',riders:0,standby:123,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1073,name:'Lionel Richie',genre:'',riders:0,standby:350,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1074,name:'Official HIGE DANdism',genre:'',riders:0,standby:95,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1075,name:'Ofenbach',genre:'',riders:0,standby:477,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1076,name:'Djo',genre:'',riders:0,standby:54,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1077,name:'Owl City',genre:'',riders:0,standby:221,color:'#150010',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1078,name:'Two Door Cinema Club',genre:'',riders:0,standby:451,color:'#0d1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1079,name:'HUNTR/X',genre:'',riders:0,standby:261,color:'#1a0d00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1080,name:'Alex G',genre:'',riders:0,standby:133,color:'#000d1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1081,name:'Ali Gatie',genre:'',riders:0,standby:440,color:'#1a000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1082,name:'Toby Keith',genre:'',riders:0,standby:476,color:'#0d000d',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1083,name:'Karsten Gl&#252;ck',genre:'',riders:0,standby:218,color:'#0d1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1084,name:'Simone Sommerland',genre:'',riders:0,standby:493,color:'#0a0a2e',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1085,name:'ITZY',genre:'',riders:0,standby:89,color:'#1a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1086,name:'Die Kita-Fr&#246;sche',genre:'',riders:0,standby:461,color:'#0a1a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1087,name:'Incubus',genre:'',riders:0,standby:470,color:'#1a0a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1088,name:'Lee Brice',genre:'',riders:0,standby:113,color:'#001a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1089,name:'Foreigner',genre:'',riders:0,standby:348,color:'#1a1a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1090,name:'IVE',genre:'',riders:0,standby:81,color:'#0a001a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1091,name:'KALEO',genre:'',riders:0,standby:112,color:'#1a000a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1092,name:'Thirty Seconds To Mars',genre:'',riders:0,standby:82,color:'#001a00',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1093,name:'Tina Turner',genre:'',riders:0,standby:226,color:'#0a1a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1094,name:'Conjunto Primavera',genre:'',riders:0,standby:314,color:'#1a0a0a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1095,name:'Creed',genre:'',riders:0,standby:85,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1096,name:'Caifanes',genre:'',riders:0,standby:329,color:'#150a1a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1097,name:'Yung Gravy',genre:'',riders:0,standby:67,color:'#0a150a',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1098,name:'Old Dominion',genre:'',riders:0,standby:335,color:'#1a1500',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1099,name:'Seether',genre:'',riders:0,standby:405,color:'#001510',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1100,name:'Snow Patrol',genre:'',riders:0,standby:452,color:'#100015',posts:0,active:false,newlyAdded:false,onTour:false},
  {id:1101,name:'Wilco',genre:'',riders:0,standby:12345,color:'#0a0a1a',posts:0,active:false,newlyAdded:false,onTour:false},
];

const MY_ARTISTS = [ARTISTS[0],ARTISTS[1],ARTISTS[2],ARTISTS[3],ARTISTS[4],ARTISTS[5],ARTISTS[6],ARTISTS[7],ARTISTS[8],ARTISTS[9],ARTISTS[10]];
const ARTIST_ACCOUNTS = {"midnight@tourbus.live":0,"jade@tourbus.live":1,"brass@tourbus.live":2,"neon@tourbus.live":3,"colt@tourbus.live":4,"static@tourbus.live":5};
const DEMO_AUTH_CODE = "12345";
const RIDER_DEMO_STANDBY = {1101: true}; // Wilco
const RIDER_ACCOUNTS = {
  mattbradley:{password:"tourbus123",purchased:new Map(),username:"mattbradley",standby:{}},
  rider:{password:"rider",purchased:new Map(MY_ARTISTS.map((a,i)=>[a.id, new Date(Date.now()-(i+1)*30*24*60*60*1000)])),username:"rider",standby:RIDER_DEMO_STANDBY},
};

const mkDate = daysAgo => new Date(Date.now() - daysAgo*24*60*60*1000);
const MOCK_CLAPPERS = [
  {username:"nightowl88",    purchased: mkDate(312), zip:"90210"},
  {username:"synthwave_sara",purchased: mkDate(289), zip:"10001"},
  {username:"roadtrip_kyle", purchased: mkDate(245), zip:"60614"},
  {username:"velvetears",    purchased: mkDate(201), zip:"78701"},
  {username:"jessicat",      purchased: mkDate(178), zip:"30301"},
  {username:"loud_louisa",   purchased: mkDate(155), zip:"94102"},
  {username:"driftwood99",   purchased: mkDate(134), zip:"98101"},
  {username:"hex_maren",     purchased: mkDate(112), zip:"55401"},
  {username:"tourbusrider",  purchased: mkDate(88),  zip:"02101"},
  {username:"midnightfan42", purchased: mkDate(67),  zip:"77001"},
  {username:"reverbhead",    purchased: mkDate(54),  zip:"85001"},
  {username:"cassette_carl", purchased: mkDate(41),  zip:"80201"},
  {username:"glitchgrrl",    purchased: mkDate(29),  zip:"19101"},
  {username:"rider",         purchased: mkDate(22),  zip:"90210"},
  {username:"mattbradley",   purchased: mkDate(9),   zip:"60614"},
];

const makeCSS = (dark) => {
  const t = dark ? {
    bg:         '#0e0e0e',
    bgCard:     '#161616',
    bgInput:    '#1a1a1a',
    border:     '#2a2a00',
    borderMid:  '#1e1e00',
    borderDim:  '#3a3a00',
    borderFaint:'#111',
    text:       '#f5f5f5',
    textMuted:  '#aaa',
    textDim:    '#888',
    textFaint:  '#666',
    textDeep:   '#555',
    textDeeper: '#444',
    textDeepest:'#333',
    accent:     '#e6ff00',
    accentHover:'#eeff33',
    accentGlow: 'rgba(230,255,0,0.5)',
    accentGlow2:'rgba(230,255,0,0.07)',
    accentGlow3:'rgba(230,255,0,0.04)',
    accentDim:  '#a8bb00',
    accentBg:   'rgba(230,255,0,0.02)',
    accentBg2:  'rgba(230,255,0,0.03)',
    accentBg3:  'rgba(230,255,0,0.04)',
    accentDark: '#3a5a00',
    navBg:      'rgba(14,14,14,0.97)',
    shadowColor:'rgba(0,0,0,0.9)',
    tourbusBorder:'2px solid #e6ff00',
    inputColor: '#f5f5f5',
    badgeTour:  'rgba(230,255,0,0.1)',
    badgeTourText:'#a8bb00',
    badgeTourBorder:'#3a3a00',
    badgeNew:   'rgba(0,200,100,0.08)',
    badgeNewText:'#00aa55',
    badgeNewBorder:'#003322',
    green:      '#00aa55',
    logoColor:  '#e6ff00',
    logoGlow:   'rgba(230,255,0,0.5)',
  } : {
    bg:         '#f4f4f0',
    bgCard:     '#ffffff',
    bgInput:    '#f0f0ec',
    border:     '#d0cfc0',
    borderMid:  '#e0dfd0',
    borderDim:  '#c0bfb0',
    borderFaint:'#e8e8e0',
    text:       '#1a1a2e',
    textMuted:  '#3a3a5a',
    textDim:    '#5a5a7a',
    textFaint:  '#7a7a9a',
    textDeep:   '#8a8aaa',
    textDeeper: '#aaaacc',
    textDeepest:'#bbbbdd',
    accent:     '#ff4d1a',
    accentHover:'#ff6633',
    accentGlow: 'rgba(255,77,26,0.4)',
    accentGlow2:'rgba(255,77,26,0.05)',
    accentGlow3:'rgba(255,77,26,0.03)',
    accentDim:  '#cc3300',
    accentBg:   'rgba(255,77,26,0.03)',
    accentBg2:  'rgba(255,77,26,0.05)',
    accentBg3:  'rgba(255,77,26,0.07)',
    accentDark: '#993311',
    navBg:      'rgba(244,244,240,0.97)',
    shadowColor:'rgba(0,0,20,0.12)',
    tourbusBorder:'2px solid #ff4d1a',
    inputColor: '#1a1a2e',
    badgeTour:  'rgba(255,77,26,0.1)',
    badgeTourText:'#cc3300',
    badgeTourBorder:'#ffb399',
    badgeNew:   'rgba(0,150,80,0.08)',
    badgeNewText:'#007744',
    badgeNewBorder:'#99ddbb',
    green:      '#007744',
    logoColor:  '#0e0e0e',
    logoGlow:   'rgba(0,0,0,0.15)',
  };
  return `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Caveat:wght@700&family=Anton&family=Inter:wght@400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  html,body{width:100%;overflow-x:hidden;touch-action:pan-x pan-y;}
  body{background:${t.bg};margin:0;text-align:left;}
  .root{min-height:100vh;width:100%;overflow-x:hidden;background:${t.bg};background-image:radial-gradient(ellipse at 30% 40%,${t.accentGlow2} 0%,transparent 55%),radial-gradient(ellipse at 75% 70%,${t.accentGlow3} 0%,transparent 50%);font-family:'Inter',sans-serif;color:${t.text};display:flex;flex-direction:column;align-items:center;padding:0 0 40px;text-align:left;}
  .page-content{width:100%;display:flex;flex-direction:column;align-items:center;padding:68px 12px 40px;text-align:left;overflow-x:hidden;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}.fade{animation:fadeUp 0.35s ease forwards;}
  /* NAV -- mobile first */
  .nav{position:fixed;top:0;left:0;right:0;z-index:999;background:${t.navBg};backdrop-filter:blur(8px);border-bottom:1px solid ${t.borderMid};display:flex;align-items:center;justify-content:center;padding:0 10px;height:52px;}
  .nav-inner{width:100%;display:flex;align-items:center;justify-content:space-between;position:relative;}
  .nav-logo{font-family:'Caveat',cursive;font-size:28px;color:${t.logoColor};line-height:1;text-shadow:0 0 20px ${t.logoGlow};cursor:pointer;letter-spacing:-1px;flex-shrink:0;}
  .nav-right{display:flex;align-items:center;gap:6px;flex-shrink:0;}
  .nav-search-wrap{display:none;}
  .nav-station-icon{display:flex;}
  .nav-station-label{display:none;}
  .nav-station-btn{font-family:'Anton',sans-serif;font-size:11px;letter-spacing:1px;color:${t.textDeep};background:transparent;border:1px solid ${t.border};border-radius:1px;padding:6px 8px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:4px;}
  .nav-station-btn:hover{color:${t.accent};border-color:${t.accent};}
  .nav-post-btn{font-family:'Anton',sans-serif;font-size:10px;letter-spacing:1px;color:${t.bg};background:${t.accent};border:none;border-radius:1px;padding:6px 8px;cursor:pointer;transition:all 0.2s;}
  .nav-post-btn:hover{background:${t.accentHover};}
  .nav-account-btn{background:transparent;border:1px solid ${t.border};border-radius:1px;padding:6px 7px;cursor:pointer;color:${t.textDeep};transition:all 0.2s;display:flex;align-items:center;}
  .nav-account-btn:hover,.nav-account-btn.active{color:${t.accent};border-color:${t.accent};}
  .nav-search-inp{background:${t.bgInput};border:1px solid ${t.border};border-radius:1px;padding:7px 12px 7px 30px;font-family:'Inter',sans-serif;font-size:12px;color:${t.text};outline:none;width:min(130px,35vw);transition:all 0.2s;}
  .nav-search-inp:focus{border-color:${t.accent};width:min(160px,40vw);}
  .nav-search-icon{position:absolute;left:10px;top:50%;transform:translateY(-50%);font-size:12px;}
  .nav-search-results{position:absolute;top:calc(100% + 4px);left:0;right:0;background:${t.bgCard};border:1px solid ${t.border};border-radius:1px;z-index:1000;max-height:200px;overflow-y:auto;}
  .nav-search-result{display:flex;align-items:center;gap:10px;padding:8px 12px;cursor:pointer;border-bottom:1px solid ${t.borderMid};}
  .nav-search-result:hover{background:${t.accentBg2};}
  .nav-search-result:last-child{border-bottom:none;}
  .nav-result-name{font-size:12px;color:${t.text};letter-spacing:0.5px;}
  .nav-result-genre{font-size:10px;color:${t.textDeeper};letter-spacing:1px;}
  /* CARD -- mobile first */
  .card{background:${t.bgCard};border:1px solid ${t.border};border-radius:2px;width:100%;padding:28px 16px;box-shadow:0 0 0 1px ${t.borderMid},0 20px 60px ${t.shadowColor};}
  /* CONTENT CONTAINERS -- full width on mobile */
  .stream,.account-wrap,.dashboard-wrap,.new-post-wrap,.post-view-wrap,.search-wrap,.artist-cards,.station-tabs,.tag-summary-cards,.filter-row,.search-bar-wrap{width:100%;max-width:100%;}
  /* DESKTOP overrides */

  .logo{font-family:'Caveat',cursive;font-size:72px;color:${t.logoColor};text-align:center;line-height:1;text-shadow:0 0 25px ${t.logoGlow};margin-bottom:2px;letter-spacing:-2px;}.logo-sm{font-size:48px;letter-spacing:-1px;}
  .logo-sub{font-family:'Playfair Display',serif;font-style:normal;font-size:17px;letter-spacing:2px;color:${t.text};text-align:center;margin-bottom:26px;}
  .headline{font-family:'Playfair Display',serif;font-size:24px;font-weight:700;color:${t.text};text-align:center;line-height:1.3;margin-bottom:10px;}.headline em{font-style:italic;color:${t.accent};}
  .subtext{font-size:13px;color:${t.textDim};text-align:center;line-height:1.7;margin-bottom:26px;}
  .btn{display:block;width:100%;padding:13px 24px;font-family:'Anton',sans-serif;font-size:17px;letter-spacing:2px;border:none;border-radius:1px;cursor:pointer;transition:all 0.2s;text-align:center;}
  .btn-primary{background:${t.accent};color:${t.bg};margin-bottom:14px;box-shadow:0 0 20px ${t.accentGlow};}
  .btn-primary:hover{background:${t.accentHover};}
  .btn-outline{background:transparent;color:${t.accent};border:1px solid ${t.accent};margin-bottom:12px;font-family:'Anton',sans-serif;font-size:17px;letter-spacing:2px;padding:12px 24px;border-radius:1px;cursor:pointer;transition:all 0.2s;text-align:center;display:block;width:100%;}
  .btn-ghost{background:transparent;color:${t.textFaint};border:1px solid ${t.border};font-family:'Anton',sans-serif;font-size:14px;letter-spacing:2px;padding:11px 24px;border-radius:1px;cursor:pointer;transition:all 0.2s;text-align:center;display:block;width:100%;}
  .btn-ghost:hover{color:${t.text};border-color:${t.textDeep};}
  .inp{display:block;width:100%;background:${t.bgInput};border:1px solid ${t.border};border-radius:1px;padding:11px 14px;font-family:'Inter',sans-serif;font-size:13px;color:${t.text};outline:none;transition:border-color 0.2s;margin-bottom:12px;}
  .inp:focus{border-color:${t.accent};}
  .inp-error{border-color:#ff4444!important;}
  .inp-label{font-size:10px;letter-spacing:2px;color:${t.textDeeper};margin-bottom:6px;font-family:'Anton',sans-serif;}
  .lbl{display:block;font-size:10px;letter-spacing:2px;color:${t.textDeeper};margin-bottom:6px;font-family:'Anton',sans-serif;}
  .auth-code-inp{font-family:'Anton',sans-serif;font-size:28px;letter-spacing:12px;text-align:center;padding:14px;}
  .char-count{font-size:10px;color:${t.textDeeper};letter-spacing:1px;text-align:right;margin-top:-8px;margin-bottom:8px;}
  .note{background:${t.accentBg3};border:1px solid ${t.border};border-radius:1px;padding:12px 14px;font-size:11px;color:${t.textFaint};line-height:1.7;letter-spacing:0.5px;}
  .back{font-size:11px;letter-spacing:2px;color:${t.textDeeper};cursor:pointer;display:block;margin-bottom:20px;background:none;border:none;}.back:hover{color:${t.accent};}
  .error{color:#ff4444;font-size:11px;letter-spacing:1px;margin-top:-6px;margin-bottom:10px;}
  .artist-signin-hint{text-align:center;margin-top:10px;font-size:12px;color:${t.textDeep};letter-spacing:1px;}
  .artist-signin-hint span{color:${t.accent};cursor:pointer;text-decoration:underline;text-underline-offset:3px;}
  .artist-signin-hint span:hover{opacity:0.8;}
  .divider{border:none;border-top:1px solid ${t.borderMid};margin:20px 0;}
  .signin-divider{display:flex;align-items:center;gap:12px;margin:20px 0;width:100%;}
  .signin-divider-line{flex:1;border-top:1px solid ${t.borderMid};}
  .signin-divider-text{font-family:'Anton',sans-serif;font-size:10px;letter-spacing:2px;color:${t.textDeeper};white-space:nowrap;}
  .code-hint{font-size:11px;color:${t.textDeep};letter-spacing:1px;line-height:1.6;text-align:center;margin-top:10px;}
  .section-label{font-family:'Anton',sans-serif;font-size:11px;letter-spacing:3px;color:${t.accentDark};margin-top:8px;}.success-icon{font-size:40px;text-align:center;margin-bottom:10px;}
  .type-card{border:2px solid ${t.border};border-radius:2px;padding:18px 20px;margin-bottom:12px;cursor:pointer;transition:all 0.2s;text-align:left;}
  .type-card:hover{border-color:${t.accent};border-width:2px;background:${t.accentBg2};}
  .type-title{font-family:'Anton',sans-serif;font-size:16px;letter-spacing:2px;color:${t.text};margin-bottom:6px;text-align:left;}.type-desc{font-size:12px;color:${t.textDeep};line-height:1.6;text-align:left;}
  .stream{width:100%;max-width:min(560px,100%);overflow-x:hidden;}
  .stream-greeting{font-size:13px;color:${t.textDeep};letter-spacing:1px;margin-bottom:16px;}
  .stream-label{font-size:9px;letter-spacing:3px;color:${t.textDeeper};margin-bottom:10px;font-family:'Anton',sans-serif;}
  .my-buses{display:flex;gap:12px;overflow-x:auto;padding-bottom:8px;margin-bottom:28px;scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;scroll-snap-type:x mandatory;scroll-padding-left:0;}
  .my-buses::-webkit-scrollbar{display:none;}
  .my-bus-chip,.my-bus-chip-wrap{scroll-snap-align:start;}
  .my-bus-chip{display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;flex-shrink:0;}
  .my-bus-avatar{width:52px;height:52px;border-radius:2px;border:1px solid ${t.border};transition:border-color 0.2s;}.my-bus-chip:hover .my-bus-avatar{border-color:${t.accent};}
  @keyframes live-glow{0%,100%{box-shadow:0 0 6px 1px rgba(255,30,30,0.5);}50%{box-shadow:0 0 18px 4px rgba(255,30,30,0.9);}}
  .live-badge{position:absolute;top:-7px;left:50%;transform:translateX(-50%);background:#ff2222;color:#fff;font-family:'Anton',sans-serif;font-size:7px;letter-spacing:1.5px;padding:1px 5px;border-radius:1px;pointer-events:none;white-space:nowrap;}
  .my-bus-chip-wrap{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;flex-shrink:0;}
  .live-thumb{animation:live-glow 1.4s ease-in-out infinite;}
  .my-bus-name{font-family:'Inter',sans-serif;font-size:9px;letter-spacing:1px;color:${t.textDeep};text-align:center;max-width:60px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .feed-post{background:${t.bgCard};border:1px solid ${t.border};border-radius:2px;margin-bottom:16px;overflow:visible;width:100%;transition:opacity 0.3s;position:relative;}.feed-post.muted{opacity:0.35;}
  .feed-post-header{display:flex;align-items:center;gap:10px;padding:12px 14px;width:100%;overflow:visible;position:relative;}
  .feed-post-avatar{width:32px;height:32px;border:1px solid ${t.border};border-radius:2px;flex-shrink:0;}
  .feed-post-artist{font-family:'Anton',sans-serif;font-size:13px;letter-spacing:1px;color:${t.text};}
  .feed-post-artist.tourbus-author{font-family:'Caveat',cursive;font-size:20px;letter-spacing:-1px;color:${t.logoColor};}
  .feed-post-time{font-size:10px;color:${t.textDeeper};letter-spacing:1px;}
  .feed-post-media{width:100%;aspect-ratio:4/3;background:${t.bgInput};display:flex;align-items:center;justify-content:center;font-size:32px;}
  .feed-post-thumb{width:100%;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;font-size:64px;position:relative;overflow:hidden;}
  .feed-post-thumb img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0;}
  .type-badge{position:absolute;bottom:8px;right:8px;font-family:'Anton',sans-serif;font-size:8px;letter-spacing:2px;color:${t.bg};background:${t.accent};padding:2px 6px;border-radius:1px;}
  .tourbus-post-thumb{padding:10px 14px 14px;display:flex;flex-direction:column;gap:8px;}
  .tourbus-logo-sm{font-family:'Caveat',cursive;font-size:18px;color:${t.accent};letter-spacing:-1px;font-weight:700;line-height:1;}
  .feed-post-label{padding:10px 14px 4px;font-size:13px;color:${t.textMuted};letter-spacing:0;font-family:'Inter',sans-serif;line-height:1.6;text-align:left;word-wrap:break-word;overflow-wrap:break-word;width:100%;}
  .feed-post-actions{display:flex;align-items:center;gap:14px;padding:10px 14px 14px;}
  .feed-post-footer{display:flex;align-items:center;gap:16px;padding:8px 14px 12px;width:100%;}
  .like-btn{background:none;border:none;cursor:pointer;font-size:14px;transition:transform 0.15s;padding:0;color:${t.textDeep};font-family:'Anton',sans-serif;letter-spacing:1px;display:flex;align-items:center;gap:5px;}.like-btn:hover{transform:scale(1.1);}
  .like-btn.liked{color:${t.accent};}
  .amp-btn{background:none;border:1px solid ${t.border};border-radius:1px;cursor:pointer;font-size:11px;padding:3px 10px;color:${t.textDeep};font-family:'Anton',sans-serif;letter-spacing:2px;display:flex;align-items:center;gap:6px;transition:all 0.2s;}.amp-btn:hover{border-color:${t.accent};color:${t.accent};}
  .amp-btn.amped{border-color:${t.accent};color:${t.accent};background:${t.accentBg2};}
  .amp-count{font-size:11px;letter-spacing:1px;}
  .tag-btn{background:none;border:1px solid ${t.border};border-radius:1px;cursor:pointer;font-size:13px;padding:3px 9px;color:${t.accent};font-family:'Anton',sans-serif;letter-spacing:1px;display:flex;align-items:center;transition:all 0.2s;}.tag-btn:hover{border-color:${t.accent};}
  .tag-btn.active{border-color:${t.accent};background:${t.accentBg2};}
  .tag-pills{display:flex;flex-wrap:wrap;gap:6px;padding:0 14px 10px;width:100%;}
  .tag-pill{font-family:'Anton',sans-serif;font-size:9px;letter-spacing:1.5px;color:${t.accent};background:${t.accentBg2};border:1px solid ${t.border};border-radius:1px;padding:2px 8px;cursor:pointer;transition:all 0.15s;user-select:none;}.tag-pill:hover{border-color:${t.accent};background:${t.accentBg3};transform:scale(1.05);}.tag-pill:active{transform:scale(0.97);}
  .tag-input-wrap{padding:6px 14px 10px;display:flex;gap:6px;align-items:center;}
  .tag-input{background:${t.bgInput};border:1px solid ${t.border};border-radius:1px;padding:5px 10px;font-family:'Anton',sans-serif;font-size:11px;letter-spacing:1px;color:${t.text};outline:none;width:140px;transition:border-color 0.2s;}.tag-input:focus{border-color:${t.accent};}
  .tag-submit{font-family:'Anton',sans-serif;font-size:10px;letter-spacing:2px;color:${t.bg};background:${t.accent};border:none;border-radius:1px;padding:5px 12px;cursor:pointer;}
  .post-menu-wrap{position:relative;flex-shrink:0;}
  .post-menu-btn{background:none;border:none;cursor:pointer;font-size:15px;color:${t.textDeep};letter-spacing:2px;padding:2px 6px;line-height:1;transition:color 0.15s;}.post-menu-btn:hover{color:${t.accent};}
  .post-menu{position:absolute;right:0;top:28px;background:${t.bgCard};border:1px solid ${t.border};border-radius:1px;z-index:10;min-width:min(160px,40vw);box-shadow:0 4px 20px ${t.shadowColor};}
  .post-menu-label{font-family:'Anton',sans-serif;font-size:9px;letter-spacing:2px;color:${t.textDeeper};padding:8px 16px 6px;border-bottom:1px solid ${t.borderMid};}
  .post-menu-item{display:block;width:100%;padding:9px 16px;font-family:'Inter',sans-serif;font-size:12px;letter-spacing:0.5px;color:${t.text};background:none;border:none;cursor:pointer;text-align:left;transition:background 0.15s;}
  .post-menu-item:hover{background:${t.accentBg2};}
  .post-menu-item.danger{color:#ff4444;}
  .status-bar{background:${t.bgCard};border:1px solid ${t.border};border-radius:1px;padding:8px 14px;font-size:11px;color:${t.textDeep};letter-spacing:1px;display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;}
  .status-bar-undo{font-family:'Anton',sans-serif;font-size:9px;letter-spacing:2px;color:${t.accent};background:none;border:none;cursor:pointer;}
  .on-tour-badge{display:inline-block;font-family:'Anton',sans-serif;font-size:8px;letter-spacing:2px;color:${t.accent};border:1px solid ${t.borderDim};border-radius:1px;padding:1px 5px;margin-left:6px;vertical-align:middle;}
  .new-post-badge{display:inline-block;font-family:'Anton',sans-serif;font-size:8px;letter-spacing:2px;color:#00cc66;border:1px solid #003322;border-radius:1px;padding:1px 5px;margin-left:6px;vertical-align:middle;}
  .tourbus-post{background:${t.bgCard};border:1px solid ${t.border};border-left:3px solid ${t.accent};border-radius:2px;margin-bottom:16px;padding:14px;}
  .tourbus-post-header{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
  .tourbus-avatar{width:32px;height:32px;border-radius:2px;background:${dark?"#0e0e0e":"#ffffff"};border:2px solid ${t.logoColor};display:flex;align-items:center;justify-content:center;font-family:'Caveat',cursive;font-size:18px;color:${t.logoColor};flex-shrink:0;}
  .tourbus-post-label{font-family:'Anton',sans-serif;font-size:11px;letter-spacing:2px;color:${t.logoColor};}
  .tourbus-post-time{font-size:10px;color:${t.textDeeper};letter-spacing:1px;}
  .tourbus-post-text{font-size:13px;color:${t.textMuted};line-height:1.7;letter-spacing:0;font-family:'Inter',sans-serif;text-align:left;}
  .search-wrap{width:100%;max-width:min(560px,100%);}
  .station-tabs{display:flex;gap:0;margin-bottom:20px;border-bottom:1px solid ${t.borderMid};width:100%;max-width:min(560px,100%);}
  .station-tab{font-family:'Anton',sans-serif;font-size:11px;letter-spacing:2px;color:${t.textDeeper};background:transparent;border:none;border-bottom:2px solid transparent;padding:10px 20px;cursor:pointer;transition:all 0.2s;margin-bottom:-1px;}
  .station-tab:hover{color:${t.textDim};}
  .station-tab.active{color:${t.accent};border-bottom-color:${t.accent};}
  .tag-summary-cards{width:100%;max-width:min(560px,100%);display:flex;flex-direction:column;gap:10px;}
  .tag-summary-card{background:${t.bgCard};border:1px solid ${t.border};border-radius:2px;padding:14px 16px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:border-color 0.2s;}.tag-summary-card:hover{border-color:${t.accent};}
  .tag-summary-name{font-family:'Anton',sans-serif;font-size:18px;letter-spacing:1px;color:${t.accent};}
  .tag-summary-meta{font-size:10px;color:${t.textDeeper};letter-spacing:2px;margin-top:3px;}
  .tag-summary-count{font-family:'Anton',sans-serif;font-size:28px;color:${t.textDeep};letter-spacing:1px;text-align:right;}
  .tag-summary-count-lbl{font-size:9px;color:${t.textDeeper};letter-spacing:2px;text-align:right;}
  .reco-grid{display:flex;gap:12px;overflow-x:auto;padding-bottom:8px;scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}
  .reco-grid::-webkit-scrollbar{display:none;}
  .reco-chip{display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;flex-shrink:0;position:relative;}
  .reco-chip-avatar{width:52px;height:52px;border-radius:2px;border:1px solid ${t.border};transition:border-color 0.2s;}.reco-chip:hover .reco-chip-avatar{border-color:${t.accent};}
  .reco-chip-name{font-family:'Inter',sans-serif;font-size:9px;letter-spacing:1px;color:${t.textDeep};text-align:center;max-width:60px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .reco-chip-remove{position:absolute;top:-4px;right:-4px;width:14px;height:14px;border-radius:50%;background:#331111;border:none;cursor:pointer;font-size:8px;color:#cc4444;display:flex;align-items:center;justify-content:center;line-height:1;}
  .reco-search-results{background:${t.bgCard};border:1px solid ${t.border};border-radius:1px;margin-top:4px;max-height:200px;overflow-y:auto;}
  .reco-result{padding:10px 12px;cursor:pointer;display:flex;align-items:center;gap:8px;transition:background 0.15s;border-bottom:1px solid ${t.borderMid};}.reco-result:last-child{border-bottom:none;}
  .reco-result:hover{background:${t.accentBg2};}
  .reco-result-name{font-family:'Anton',sans-serif;font-size:13px;letter-spacing:1px;color:${t.text};}
  .reco-result-genre{font-size:10px;color:${t.textDeeper};letter-spacing:1px;}
  .station-header{font-family:'Anton',sans-serif;font-size:42px;letter-spacing:6px;color:${t.accent};text-align:center;margin-bottom:20px;text-shadow:0 0 30px ${t.accentGlow};}
  .search-bar-wrap{display:flex;align-items:center;gap:0;margin-bottom:16px;background:${t.bgInput};border:1px solid ${t.border};border-radius:1px;padding:0 14px;transition:border-color 0.2s;width:100%;max-width:min(560px,100%);box-sizing:border-box;}
  .search-bar-wrap:focus-within{border-color:${t.accent};}
  .search-icon{font-size:14px;margin-right:10px;flex-shrink:0;}
  .search-bar{flex:1;background:transparent;border:none;padding:11px 0;font-family:'Inter',sans-serif;font-size:13px;color:${t.text};outline:none;width:100%;}
  .search-inp{flex:1;background:${t.bgInput};border:1px solid ${t.border};border-radius:1px;padding:11px 14px;font-family:'Inter',sans-serif;font-size:13px;color:${t.text};outline:none;transition:border-color 0.2s;}
  .search-inp:focus{border-color:${t.accent};}
  .search-btn{font-family:'Anton',sans-serif;font-size:12px;letter-spacing:2px;color:${t.bg};background:${t.accent};border:none;border-radius:1px;padding:11px 20px;cursor:pointer;}
  .genre-filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;}
  .filter-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;width:100%;max-width:min(560px,100%);}
  .genre-btn,.filter-pill{font-family:'Anton',sans-serif;font-size:9px;letter-spacing:2px;color:${t.textDeep};background:transparent;border:1px solid ${t.border};border-radius:1px;padding:5px 10px;cursor:pointer;transition:all 0.2s;}
  .genre-btn:hover,.genre-btn.active,.filter-pill:hover,.filter-pill.active{color:${t.accent};border-color:${t.accent};background:${t.accentBg2};}
  .tab-row{display:flex;gap:0;margin-bottom:16px;border-bottom:1px solid ${t.borderMid};}
  .tab-btn{font-family:'Anton',sans-serif;font-size:10px;letter-spacing:2px;color:${t.textDeeper};background:transparent;border:none;border-bottom:2px solid transparent;padding:8px 14px;cursor:pointer;transition:all 0.2s;margin-bottom:-1px;}
  .tab-btn:hover{color:${t.textDim};}
  .tab-btn.active{color:${t.accent};border-bottom-color:${t.accent};}
  .artist-cards{width:100%;max-width:min(560px,100%);display:flex;flex-direction:column;gap:12px;}
  .artist-card{background:${t.bgCard};border:1px solid ${t.border};border-radius:2px;overflow:hidden;cursor:pointer;transition:border-color 0.2s;display:flex;}.artist-card:hover{border-color:${t.accent};}
  .artist-card.standby{border-color:${t.borderFaint};opacity:0.7;}.artist-card.standby:hover{border-color:${t.textDeeper};opacity:1;}
  .artist-card-main{flex:1;padding:14px 16px;display:flex;flex-direction:column;gap:4px;}
  .artist-card-top{display:flex;align-items:center;justify-content:space-between;}
  .artist-card-name{font-family:'Anton',sans-serif;font-size:17px;letter-spacing:2px;color:${t.text};}.artist-card-genre{font-size:10px;color:${t.textDeep};letter-spacing:2px;text-transform:uppercase;}
  .artist-card-badges{display:flex;gap:6px;margin-top:6px;}
  .badge{font-family:'Anton',sans-serif;font-size:8px;letter-spacing:1.5px;padding:2px 6px;border-radius:1px;}
  .badge-tour{background:${t.badgeTour};color:${t.badgeTourText};border:1px solid ${t.badgeTourBorder};}.badge-new{background:${t.badgeNew};color:${t.badgeNewText};border:1px solid ${t.badgeNewBorder};}.badge-standby{background:rgba(100,100,100,0.1);color:${t.textDeep};border:1px solid ${t.border};}
  .artist-card-stub{width:90px;border-left:1px dashed ${t.border};display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12px 10px;gap:4px;position:relative;flex-shrink:0;}
  .stub-count{font-family:'Anton',sans-serif;font-size:18px;color:${t.accent};letter-spacing:1px;}.stub-label{font-size:8px;letter-spacing:1px;color:${t.textDeeper};text-transform:uppercase;text-align:center;}
  .stub-action{font-family:'Anton',sans-serif;font-size:9px;letter-spacing:1px;background:${t.accent};color:${t.bg};border:none;border-radius:1px;padding:4px 8px;cursor:pointer;margin-top:4px;}
  .artist-card.standby .stub-action{background:${t.accent};color:${t.bg};}.artist-img-box{width:44px;height:44px;border:1px solid ${t.border};border-radius:2px;flex-shrink:0;}.artist-card.standby .artist-img-box{border-color:${t.borderMid};opacity:0.4;}
  .suggest-box{border:1px solid ${t.border};border-radius:2px;padding:16px;margin-top:12px;}
  .suggest-inp-row{display:flex;gap:8px;margin-top:10px;}
  .suggest-success{text-align:center;padding:8px 0;}
  .profile-wrap{width:100%;max-width:min(560px,100%);}.profile-back{font-size:11px;letter-spacing:2px;color:${t.textDeeper};cursor:pointer;display:block;margin-bottom:20px;background:none;border:none;}.profile-back:hover{color:${t.accent};}
  .profile-header{display:flex;flex-direction:column;align-items:center;text-align:center;margin-bottom:24px;}
  .profile-name{font-family:'Anton',sans-serif;font-size:28px;letter-spacing:3px;color:${t.text};margin-bottom:4px;}
  .profile-genre{font-size:10px;color:${t.textDeep};letter-spacing:3px;text-transform:uppercase;margin-bottom:12px;}
  .profile-bio{font-size:13px;color:${t.textDim};line-height:1.7;margin-bottom:16px;text-align:center;}
  .profile-stats{display:flex;gap:24px;align-items:center;justify-content:center;width:100%;margin-bottom:0;}
  .stat{text-align:center;}.stat-num{font-family:'Anton',sans-serif;font-size:20px;color:${t.accent};letter-spacing:1px;}.stat-lbl{font-size:9px;color:${t.textDeeper};letter-spacing:2px;text-transform:uppercase;}
  .unlock-box{border:1px solid ${t.border};border-radius:2px;padding:20px;text-align:center;background:${t.accentBg};margin-bottom:20px;}
  .unlock-title{font-family:'Anton',sans-serif;font-size:18px;letter-spacing:2px;color:${t.text};margin-bottom:8px;}
  .unlock-desc{font-size:12px;color:${t.textFaint};letter-spacing:0.5px;line-height:1.6;margin-bottom:16px;}
  .feed-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;margin-bottom:20px;position:relative;}
  .feed-grid-item{aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:20px;cursor:pointer;overflow:hidden;}
  .feed-grid-lock{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:36px;z-index:2;}
  .standby-box{border:1px solid ${t.border};border-radius:2px;padding:20px;text-align:center;background:rgba(100,100,100,0.03);margin-bottom:20px;}
  .standby-count{font-family:'Anton',sans-serif;font-size:36px;color:${t.textDeep};letter-spacing:2px;}.standby-lbl{font-size:10px;color:${t.textDeeper};letter-spacing:3px;text-transform:uppercase;margin-bottom:14px;}
  .btn-standby{display:block;width:100%;padding:12px;font-family:'Anton',sans-serif;font-size:14px;letter-spacing:2px;border:none;border-radius:1px;cursor:pointer;transition:all 0.2s;text-align:center;background:${t.accent};color:${t.bg};margin-bottom:10px;}
  .btn-standby:hover{background:${t.accentHover};}.btn-standby.on{background:transparent;border:1px solid ${t.accent};color:${t.accent};}
  .checkout-wrap{width:100%;max-width:min(480px,100%);}
  .checkout-artist{display:flex;align-items:center;gap:14px;background:${t.bgCard};border:1px solid ${t.border};border-radius:2px;padding:16px;margin-bottom:20px;}
  .checkout-name{font-family:'Anton',sans-serif;font-size:20px;letter-spacing:2px;color:${t.text};}
  .ticket-price{font-family:'Anton',sans-serif;font-size:28px;color:${t.accent};letter-spacing:2px;margin-bottom:4px;}
  .ticket-desc{font-size:11px;color:${t.textFaint};letter-spacing:1px;margin-bottom:16px;}
  .price-split{display:flex;gap:10px;margin-bottom:20px;}
  .split-box{flex:1;background:${t.accentBg3};border:1px solid ${t.border};border-radius:2px;padding:16px 12px;}
  .split-amount{font-family:'Anton',sans-serif;font-size:22px;color:${t.accent};letter-spacing:1px;}
  .split-label{font-size:9px;color:${t.textFaint};letter-spacing:2px;text-transform:uppercase;margin-top:4px;}
  .cc-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  .policy-check-row{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
  .policy-checkbox{width:18px;height:18px;border:1px solid ${t.border};border-radius:1px;flex-shrink:0;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s;}
  .policy-checkbox.checked{background:${t.accent};border-color:${t.accent};}
  .policy-checkbox-mark{font-size:12px;color:${t.bg};font-weight:bold;line-height:1;}
  .policy-check-text{font-family:'Inter',sans-serif;font-size:12px;color:${t.textMuted};line-height:1.5;}
  .policy-link{color:${t.accent};cursor:pointer;text-decoration:underline;text-underline-offset:2px;}.policy-link:hover{opacity:0.8;}
  .account-wrap{width:100%;max-width:min(560px,100%);}
  .account-section{background:${t.bgCard};border:1px solid ${t.border};border-radius:2px;margin-bottom:16px;overflow:hidden;}
  .account-section-title{font-family:'Anton',sans-serif;font-size:10px;letter-spacing:3px;color:${t.textDeeper};padding:10px 16px;border-bottom:1px solid ${t.borderMid};}
  .account-row{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid ${t.borderMid};}
  .account-row:last-child{border-bottom:none;}
  .account-row-label{font-size:10px;color:${t.textDeeper};letter-spacing:1px;margin-bottom:2px;}
  .account-row-value{font-size:13px;color:${t.text};letter-spacing:0.5px;}
  .account-edit-btn{font-family:'Anton',sans-serif;font-size:9px;letter-spacing:2px;color:${t.textDeep};background:transparent;border:1px solid ${t.border};border-radius:1px;padding:4px 10px;cursor:pointer;}
  .account-edit-btn:hover{color:${t.accent};border-color:${t.accent};}
  .account-signout{display:block;width:100%;padding:12px;font-family:'Anton',sans-serif;font-size:13px;letter-spacing:3px;color:${t.textDeeper};background:transparent;border:1px solid ${t.borderMid};border-radius:1px;cursor:pointer;transition:all 0.2s;text-align:center;margin-top:8px;}
  .account-signout:hover{color:${t.text};border-color:${t.textDeep};}
  .ticket-row{display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid ${t.borderMid};}
  .ticket-row:last-child{border-bottom:none;}
  .ticket-color{width:8px;height:40px;border-radius:1px;flex-shrink:0;}
  .ticket-name{font-family:'Anton',sans-serif;font-size:14px;letter-spacing:1px;color:${t.text};}
  .ticket-genre{font-size:10px;color:${t.textDeep};letter-spacing:1px;margin-top:2px;}
  .ticket-status{font-family:'Anton',sans-serif;font-size:9px;letter-spacing:2px;color:${t.accent};}
  .dashboard-wrap{width:100%;max-width:min(560px,100%);}
  .dashboard-header{display:flex;align-items:center;gap:16px;margin-bottom:28px;padding:20px;background:${t.bgCard};border:1px solid ${t.border};border-radius:2px;}
  .dashboard-color{width:56px;height:56px;border-radius:2px;flex-shrink:0;}.dashboard-name{font-family:'Anton',sans-serif;font-size:22px;letter-spacing:2px;color:${t.text};}.dashboard-genre{font-size:10px;color:${t.textDeep};letter-spacing:2px;margin-top:2px;}
  .dashboard-stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:24px;}
  .dash-stat{background:${t.bgCard};border:1px solid ${t.border};border-radius:2px;padding:14px;text-align:center;}
  .dash-stat-num{font-family:'Anton',sans-serif;font-size:24px;color:${t.accent};letter-spacing:1px;}
  .dash-stat-lbl{font-size:9px;color:${t.textDeeper};letter-spacing:2px;text-transform:uppercase;margin-top:4px;}
  .post-list{display:flex;flex-direction:column;gap:10px;margin-bottom:24px;}
  .post-list-item{background:${t.bgCard};border:1px solid ${t.border};border-radius:2px;padding:12px 14px;display:flex;align-items:center;gap:12px;}
  .post-list-thumb{width:44px;height:44px;border-radius:1px;background:${t.bgInput};flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:16px;}
  .post-list-label{font-size:13px;color:${t.textMuted};flex:1;}.post-list-meta{font-size:10px;color:${t.textDeeper};letter-spacing:1px;text-align:right;}.post-list-likes{font-size:11px;color:${t.textDeep};}
  .post-type-row{display:flex;gap:10px;margin-bottom:20px;}
  .post-type-btn{border:1px solid ${t.border};border-radius:2px;padding:16px;cursor:pointer;transition:all 0.2s;text-align:center;background:transparent;}.post-type-btn:hover{border-color:${t.textDeep};}
  .post-type-btn.selected{border-color:${t.accent};background:${t.accentBg2};}
  .post-type-icon{font-size:24px;margin-bottom:6px;}.post-type-label{font-family:'Anton',sans-serif;font-size:11px;letter-spacing:2px;color:${t.text};}
  .upload-zone{border:1px dashed ${t.border};border-radius:2px;padding:32px;text-align:center;margin-bottom:16px;cursor:pointer;transition:all 0.2s;}
  .upload-zone:hover,.upload-zone.has-file{border-color:${t.accent};}
  .upload-preview{width:100%;max-height:200px;object-fit:contain;border-radius:1px;}
  .upload-hint{font-size:12px;color:${t.textDeep};letter-spacing:1px;}.upload-hint strong{color:${t.accent};}
  .new-post-wrap{width:100%;max-width:min(560px,100%);}
  .post-view-wrap{width:100%;max-width:min(560px,100%);} .post-view-thumb{width:100%;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;font-size:64px;position:relative;overflow:hidden;background:#111;} .post-view-thumb img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0;}
  .post-view-media{width:100%;aspect-ratio:4/3;background:${t.bgInput};display:flex;align-items:center;justify-content:center;font-size:48px;border-radius:2px;margin-bottom:16px;}
  .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px;}
  .modal{background:${t.bgCard};border:1px solid ${t.border};border-radius:2px;padding:24px;max-width:min(380px,100%);width:100%;box-shadow:0 20px 60px ${t.shadowColor};}
  .modal-title{font-family:'Anton',sans-serif;font-size:18px;letter-spacing:2px;color:${t.text};margin-bottom:12px;}
  .modal-desc{font-size:12px;color:${t.textFaint};line-height:1.7;letter-spacing:0.5px;margin-bottom:20px;}
  .policy-modal{background:${t.bgCard};border:1px solid ${t.border};border-radius:2px;padding:24px;max-width:min(480px,100%);width:100%;max-height:80vh;display:flex;flex-direction:column;box-shadow:0 20px 60px ${t.shadowColor};}
  .policy-modal-title{font-family:'Anton',sans-serif;font-size:16px;letter-spacing:3px;color:${t.accent};margin-bottom:16px;flex-shrink:0;}
  .policy-modal-body{font-size:12px;color:${t.textMuted};line-height:1.8;overflow-y:auto;flex:1;margin-bottom:16px;}
  .policy-modal-body h4{font-family:'Anton',sans-serif;font-size:10px;letter-spacing:2px;color:${t.textDeep};margin:14px 0 6px;}
  .policy-modal-body p{margin-bottom:8px;}
  .modal-btns{display:flex;flex-direction:column;gap:8px;}
  .tour-toggle{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid ${t.borderMid};}
  .tour-toggle-label{font-size:10px;color:${t.textDeeper};letter-spacing:1px;}
  .tour-toggle-status{font-size:12px;letter-spacing:0.5px;color:#444;}
  .tour-toggle-status.on-tour{color:${t.text};}
  .toggle-switch{cursor:pointer;padding:4px;}
  .toggle-track{width:36px;height:20px;border-radius:10px;background:${t.border};position:relative;transition:background 0.2s;}
  .toggle-track.on{background:${t.accent};}
  .toggle-thumb{width:16px;height:16px;border-radius:50%;background:#fff;position:absolute;top:2px;left:2px;transition:left 0.2s;}
  .toggle-track.on .toggle-thumb{left:18px;}
  .privacy-content,.terms-content{font-size:12px;color:${t.textFaint};line-height:1.8;letter-spacing:0.3px;}
  .privacy-content h3,.terms-content h3{font-family:'Anton',sans-serif;font-size:13px;letter-spacing:2px;color:${t.text};margin:16px 0 8px;}
  .privacy-content p,.terms-content p{margin-bottom:10px;}
  .tourbus-bus-avatar{width:52px;height:52px;border-radius:2px;border:2px solid ${t.logoColor};background:${t.bg};display:flex;align-items:center;justify-content:center;font-family:'Caveat',cursive;font-size:13px;color:${t.logoColor};flex-shrink:0;text-shadow:0 0 8px ${t.logoGlow};}
  `;
};


export default function App() {
  const [screen, setScreen] = useState(SCREENS.LANDING);
  const [prevScreen, setPrevScreen] = useState(null);
  const [allArtistPosts, setAllArtistPosts] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [userMode, setUserMode] = useState("rider");
  const [artistUser, setArtistUser] = useState(null);
  const [isTourbuAdmin, setIsTourbuAdmin] = useState(false);
  const [tourbusRecos, setTourbusRecos] = useState([ARTISTS[0],ARTISTS[1],ARTISTS[4],ARTISTS[6],ARTISTS[9]]); // The Midnight, Jade Carver, Colt Reyes, Rosa Vega, Maeve
  const [tourbusNewPost, setTourbusNewPost] = useState(false);
  const [riderSignInForm, setRiderSignInForm] = useState({username:"",password:""});
  const [riderSignInError, setRiderSignInError] = useState("");
  const [artistSignInForm, setArtistSignInForm] = useState({email:"",code:""});
  const [artistSignInError, setArtistSignInError] = useState("");
  const [editingProfile, setEditingProfile] = useState(false);
  const [artistRecos, setArtistRecos] = useState(()=>{
    const A = (id) => [...ARTISTS,...SPOTIFY_ARTISTS].find(a=>a.id===id);
    return {
      // The Midnight (id:1) -- synthwave/electronic adjacent
      1:  [A(4),A(10),A(6),A(103),A(126)],  // Neon Palms, Maeve, Static Bloom, The Weeknd, Lana Del Rey
      // Jade Carver (id:2) -- indie folk
      2:  [A(11),A(8),A(10),A(107),A(164)], // Sun Copper, Hollow Pine, Maeve, Ed Sheeran, Arctic Monkeys
      // Brass & Bone (id:3) -- jazz fusion / New Orleans
      3:  [A(7),A(9),A(11),A(115),A(109)],  // Rosa Vega, Dusk Radio, Sun Copper, Bruno Mars, Kanye West
      // Neon Palms (id:4) -- dream pop
      4:  [A(1),A(10),A(6),A(126),A(112)],  // The Midnight, Maeve, Static Bloom, Lana Del Rey, Billie Eilish
      // Colt Reyes (id:5) -- country
      5:  [A(11),A(2),A(8),A(154),A(107)],  // Sun Copper, Jade Carver, Hollow Pine, Morgan Wallen, Ed Sheeran
      // Static Bloom (id:6) -- shoegaze
      6:  [A(1),A(4),A(10),A(149),A(164)],  // The Midnight, Neon Palms, Maeve, Linkin Park, Arctic Monkeys
      // Rosa Vega (id:7) -- psych rock
      7:  [A(9),A(3),A(6),A(164),A(113)],   // Dusk Radio, Brass & Bone, Static Bloom, Arctic Monkeys, Post Malone
      // Hollow Pine (id:8) -- ambient folk
      8:  [A(2),A(11),A(5),A(126),A(138)],  // Jade Carver, Sun Copper, Colt Reyes, Lana Del Rey, Arijit Singh
      // Dusk Radio (id:9) -- punk
      9:  [A(7),A(6),A(3),A(149),A(164)],   // Rosa Vega, Static Bloom, Brass & Bone, Linkin Park, Arctic Monkeys
      // Maeve (id:10) -- dream pop
      10: [A(4),A(2),A(6),A(124),A(126)],   // Neon Palms, Jade Carver, Static Bloom, Dua Lipa, Lana Del Rey
      // Sun Copper (id:11) -- indie folk
      11: [A(2),A(8),A(5),A(107),A(154)],   // Jade Carver, Hollow Pine, Colt Reyes, Ed Sheeran, Morgan Wallen
    };
  });
  const [recoSearch, setRecoSearch] = useState("");
  const [recoSearchActive, setRecoSearchActive] = useState(false);
  const [growthOpen, setGrowthOpen] = useState(false);
  const [clapModal, setClapModal] = useState(null);
  const [closeAccountModal, setCloseAccountModal] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [goLiveModal, setGoLiveModal] = useState(false);
  const [closeRiderAccountModal, setCloseRiderAccountModal] = useState(false); // post object
  const [profileDraft, setProfileDraft] = useState({bio:"",spotify:"",website:"",onTour:false});
  const [artistProfiles, setArtistProfiles] = useState({});
  const [editingPost, setEditingPost] = useState(null);
  const [editPostCaption, setEditPostCaption] = useState("");
  const [confirmDeletePost, setConfirmDeletePost] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [riderUser, setRiderUser] = useState(null);
  const [purchased, setPurchased] = useState(()=>new Map(MY_ARTISTS.map((a,i)=>[a.id, new Date(Date.now()-(i+1)*30*24*60*60*1000)])));
  const [selectedPost, setSelectedPost] = useState(null);
  const [search, setSearch] = useState("");
  const [navSearch, setNavSearch] = useState("");
  const [showNavResults, setShowNavResults] = useState(false);
  const [genre, setGenre] = useState("Top This Month");
  const [riderForm, setRiderForm] = useState({username:"",zip:"",cc:"",exp:"",cvv:""});
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [showPolicy, setShowPolicy] = useState(null);
  const [artistForm, setArtistForm] = useState({name:"",artist:"",email:"",agencyName:"",agencyEmail:"",mgmtName:"",mgmtEmail:"",spotify:""});
  const [ccForm, setCcForm] = useState({number:"",exp:"",cvv:""});
  const [feedPosts, setFeedPosts] = useState(INIT_FEED);
  const [likes, setLikes] = useState(()=>Object.fromEntries(INIT_FEED.map(p=>[p.id,{count:p.likes,liked:false}])));
  const [amps, setAmps] = useState(()=>Object.fromEntries(INIT_FEED.map(p=>[p.id,{count:Math.floor(p.likes*0.3),amped:false}])));
  const [tags, setTags] = useState({
    8:  {synthwave:14, soundcheck:11, theroxy:9, livemusic:7, midnight:5, tourlife2025:24},
    1:  {theroxy:18, synthwave:15, losangeles:12, setlist:8, newmusic:6, tourlife2025:31},
    2:  {buslife:22, songwriting:17, texas:14, countryroad:10, ontour:7},
    3:  {newalbum:31, studiolife:24, dreampop:18, neonpalms:12, recordingday:9},
    9:  {jadecarver:28, indiefolk:21, tourlife:16, newartist:11, firsttour:8, tourlife2025:27},
    10: {staticbloom:19, shoegaze:14, vanlife:12, uktour:9, newartist:7},
    4:  {setlist:42, behindthescenes:35, synthwave:28, midnight:19, liveshow:14, tourlife2025:22},
    5:  {hometown:38, indiefolk:29, emotional:22, firsttour:17, jadecarver:11, tourlife2025:35},
    6:  {tourlife:29, crew:24, country:18, ontour:14, coltreyes:9},
    7:  {newartist:33, staticbloom:27, shoegaze:21, tourbus:16, announcement:11},
    11: {lollapalooza2026:87, synthwave:44, chicago:31, festival:28, liveshows:19},
    12: {lollapalooza2026:76, indiefolk:39, jadecarver:28, festival:24, grantpark:18},
    13: {lollapalooza2026:65, dreampop:41, neonpalms:33, festival:27, chicago:22},
  });
  const [activeTagInput, setActiveTagInput] = useState(null);
  const [activeTag, setActiveTag] = useState(null);
  const [stationView, setStationView] = useState("artists"); // "artists" | "tags"
  const [tagDraft, setTagDraft] = useState("");
  const [standby, setStandby] = useState({});
  const [standbyCounts, setStandbyCounts] = useState(()=>{
    const counts = {};
    [...ARTISTS,...SPOTIFY_ARTISTS].forEach(a=>{ counts[a.id]=a.standby; });
    return counts;
  });
  const [artistMenu, setArtistMenu] = useState(null);
  const [snoozed, setSnoozed] = useState({});
  const [hidden, setHidden] = useState({});
  const [offBus, setOffBus] = useState({});
  const [confirmOff, setConfirmOff] = useState(null);
  const [suggestNote, setSuggestNote] = useState("");
  const [suggestSubmitted, setSuggestSubmitted] = useState(false);
  const [postType, setPostType] = useState("photo");
  const [postCaption, setPostCaption] = useState("");
  const [postPreviewUrl, setPostPreviewUrl] = useState(null);
  const [postFile, setPostFile] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const cameraStreamRef = useRef(null);

  const go = s => { setScreen(s); window.scrollTo(0,0); };
  const toggleLike = id => setLikes(p=>({...p,[id]:{count:p[id].liked?p[id].count-1:p[id].count+1,liked:!p[id].liked}}));
  const toggleAmp = id => setAmps(p=>({...p,[id]:{count:p[id].amped?p[id].count-1:p[id].count+1,amped:!p[id].amped}}));
  const TAG_THRESHOLD = 20;
  const BLOCKED_TAGS = new Set([
    'fuck','shit','ass','bitch','cunt','dick','cock','pussy','bastard','damn',
    'asshole','bullshit','crap','piss','whore','slut','fag','nigger','nigga',
    'retard','rape','kill','nazi','porn','sex','nude','naked','hate',
  ]);
  const sanitizeTag = raw => {
    // Strip non-alphanumeric, lowercase, remove leading #
    const clean = raw.trim().replace(/^#+/,'').replace(/[^a-z0-9]/gi,'').toLowerCase();
    if (!clean) return null;
    if (BLOCKED_TAGS.has(clean)) return null;
    // Also block tags that contain blocked words
    if ([...BLOCKED_TAGS].some(w => clean.includes(w))) return null;
    return clean;
  };
  const addTag = (id, raw) => {
    const tag = sanitizeTag(raw);
    if (!tag) { setTagDraft(""); return; }
    setTags(p=>{ const prev=p[id]||{}; return {...p,[id]:{...prev,[tag]:(prev[tag]||0)+1}}; });
    setActiveTagInput(null); setTagDraft("");
  };
  const toggleStandby = id => {
    setStandby(p => {
      const next = {...p,[id]:!p[id]};
      if(riderUser) riderUser.standby = next;
      setStandbyCounts(c=>({...c,[id]:c[id]+(next[id]?1:-1)}));
      return next;
    });
  };

  const ALL_ARTISTS = [...ARTISTS, ...SPOTIFY_ARTISTS];
  const parseCaption = (text) => {
    if (!text) return text;
    const results = [];
    let remaining = text;
    let key = 0;
    while (remaining.length > 0) {
      const atIdx = remaining.indexOf('@');
      if (atIdx === -1) { results.push(remaining); break; }
      if (atIdx > 0) results.push(remaining.slice(0, atIdx));
      const afterAt = remaining.slice(atIdx + 1);
      const found = ALL_ARTISTS.slice().sort((a,b)=>b.name.length-a.name.length)
        .find(a => afterAt.toLowerCase().startsWith(a.name.toLowerCase()) &&
          (afterAt.length === a.name.length || /[\s.,!?]/.test(afterAt[a.name.length])));
      if (found) {
        results.push(<span key={key++} style={{color:darkMode?"#e6ff00":"#cc3300",cursor:"pointer"}} onClick={()=>{setSelectedArtist(found);go(SCREENS.PROFILE);}}>@{found.name}</span>);
        remaining = afterAt.slice(found.name.length);
      } else {
        const wordMatch = afterAt.match(/^[\w&]+/);
        const tag = wordMatch ? wordMatch[0] : '';
        results.push(<span key={key++} style={{color:darkMode?"#e6ff00":"#cc3300",cursor:"pointer"}} onClick={()=>{setSuggestNote(tag);go(SCREENS.SEARCH);}}>@{tag}</span>);
        remaining = afterAt.slice(tag.length);
      }
    }
    return results;
  };
  const doSnooze = name => { setSnoozed(p=>({...p,[name]:true})); setArtistMenu(null); };
  const doUnsnooze = name => setSnoozed(p=>({...p,[name]:false}));
  const doHide = name => { setHidden(p=>({...p,[name]:true})); setArtistMenu(null); };
  const doUnhide = name => setHidden(p=>({...p,[name]:false}));
  const doGetOff = name => { setOffBus(p=>({...p,[name]:true})); setConfirmOff(null); setArtistMenu(null); };

  const handleRiderSignIn = () => {
    const acct = RIDER_ACCOUNTS[riderSignInForm.username.trim().toLowerCase()];
    if (!acct) { setRiderSignInError("Username not found."); return; }
    if (riderSignInForm.password !== acct.password) { setRiderSignInError("Incorrect password."); return; }
    setRiderUser(acct);
    setPurchased(new Map(acct.purchased));
    const initialStandby = acct.standby||{};
    setStandby(initialStandby);
    setStandbyCounts(c=>{
      const next = {...c};
      Object.keys(initialStandby).forEach(id=>{ if(initialStandby[id]) next[id]=(next[id]||0)+1; });
      return next;
    });
    setOffBus({});
    setSnoozed({});
    setUserMode("rider");
    if (acct.purchased && acct.purchased.size > 0) {
      setFeedPosts(INIT_FEED.filter(p => !p.newRiderOnly));
    }
    go(SCREENS.STREAM);
  };

  const handleArtistSignIn = () => {
    const idx = ARTIST_ACCOUNTS[artistSignInForm.email.toLowerCase().trim()];
    if (idx===undefined) { setArtistSignInError("No artist account found for that email."); return; }
    if (artistSignInForm.code.trim()!==DEMO_AUTH_CODE) { setArtistSignInError("Invalid authentication code. Check your email."); return; }
    setArtistUser(ARTISTS[idx]); setUserMode("artist"); setArtistSignInError(""); setArtistSignInForm({email:"",code:""});
    go(SCREENS.ARTIST_DASHBOARD);
  };

  const handleFileChange = e => { const file = e.target.files[0]; if (!file) return; setPostFile(file); setPostPreviewUrl(URL.createObjectURL(file)); };

  const handleSaveEditPost = () => {
    if (!editPostCaption.trim()) return;
    setFeedPosts(prev=>prev.map(p=>p.id===editingPost.id?{...p,label:editPostCaption}:p));
    setEditingPost(null); setEditPostCaption("");
  };

  const handleDeletePost = (id) => {
    setFeedPosts(prev=>prev.filter(p=>p.id!==id));
    setLikes(prev=>{const n={...prev};delete n[id];return n;});
    setConfirmDeletePost(null);
  };

  const handleSaveProfile = () => {
    setArtistProfiles(p=>({...p,[artistUser.id]:{bio:profileDraft.bio,spotify:profileDraft.spotify,website:profileDraft.website,onTour:profileDraft.onTour}}));
    setEditingProfile(false);
  };

  const getArtistProfile = (artist) => {
    const ov = artistProfiles[artist.id];
    return {bio: ov?.bio!==undefined?ov.bio:artist.bio||"", spotify: ov?.spotify!==undefined?ov.spotify:artist.spotify||"", website: ov?.website!==undefined?ov.website:artist.website||"", onTour: ov?.onTour!==undefined?ov.onTour:artist.onTour||false};
  };

  const startCamera = async (videoEl) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video:{facingMode:"user"},audio:true});
      cameraStreamRef.current = stream;
      if (videoEl) {
        videoEl.srcObject = stream;
        videoEl.play().catch(()=>{});
      } else if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(()=>{});
      }
    } catch(e) {
      console.warn("Camera access denied or unavailable:", e);
    }
  };

  const stopCamera = () => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach(t => t.stop());
      cameraStreamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  useEffect(() => {
    const fontId = "tourbus-google-fonts";
    if (!document.getElementById(fontId)) {
      const link = document.createElement("link");
      link.id = fontId;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Caveat:wght@700&family=Anton&family=Inter:wght@400;500&display=swap";
      document.head.appendChild(link);
    }
    // Hard clamp to prevent any horizontal overflow
    document.documentElement.style.overflowX = 'hidden';
    document.documentElement.style.maxWidth = '100vw';
    document.body.style.overflowX = 'hidden';
    document.body.style.maxWidth = '100vw';
    document.body.style.width = '100%';
    // Force iframe to respect its own width
    const w = window.innerWidth;
    document.body.style.width = w + 'px';
    document.documentElement.style.width = w + 'px';
    const viewportId = "tourbus-viewport";
    if (!document.getElementById(viewportId)) {
      const meta = document.createElement("meta");
      meta.id = viewportId;
      meta.name = "viewport";
      meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
      document.head.appendChild(meta);
    }
    // Prevent pinch zoom via touch events
    const preventZoom = (e) => { if (e.touches && e.touches.length > 1) e.preventDefault(); };
    document.addEventListener('touchmove', preventZoom, { passive: false });
    document.addEventListener('touchstart', preventZoom, { passive: false });
    return () => {
      document.removeEventListener('touchmove', preventZoom);
      document.removeEventListener('touchstart', preventZoom);
    };
  }, []);

  useEffect(() => {
    if (screen === SCREENS.ARTIST_LIVE) {
      // Small delay to ensure video element is mounted
      const timer = setTimeout(() => startCamera(videoRef.current), 100);
      return () => { clearTimeout(timer); stopCamera(); };
    } else {
      stopCamera();
    }
  }, [screen]);

  const handlePublishPost = () => {
    if (!postCaption.trim()) return;
    const p = {id:Date.now(),artist:artistUser.name,type:postType,color:artistUser.color,label:postCaption,time:"just now",likes:0,previewUrl:postPreviewUrl,isNew:true};
    setFeedPosts(prev=>[p,...prev]); setLikes(prev=>({...prev,[p.id]:{count:0,liked:false}})); setAmps(prev=>({...prev,[p.id]:{count:0,amped:false}}));
    setPostCaption(""); setPostFile(null); setPostPreviewUrl(null); go(SCREENS.ARTIST_DASHBOARD);
  };

  const GENRE_FILTERS = ["Top This Month","Newly Added","On The Road","Lollapalooza 2026"];
  const GENRE_TAGS = ["Synthwave","Indie Folk","Jazz Fusion","Dream Pop","Country","Shoegaze","Punk","Psych Rock","Ambient Folk"];
  const filteredArtists = ALL_ARTISTS.filter(a=>{
    const ms=a.name.toLowerCase().includes(search.toLowerCase())||a.genre.toLowerCase().includes(search.toLowerCase());
    const LOLLA_IDS=new Set([1,2,3,4,5,6,7,8,9,10,11,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149]);const mg=genre==="Top This Month"?a.active:genre==="Newly Added"?a.newlyAdded:genre==="On The Road"?a.onTour:genre==="Lollapalooza 2026"?LOLLA_IDS.has(a.id):a.genre===genre;
    const showInSearch = search.length>0;
    return (showInSearch?ms:ms&&mg);
  }).sort((a,b)=>genre==="Top This Month"?(b.riders+b.standby)-(a.riders+a.standby):0);

  const navResults = ALL_ARTISTS.filter(a=>navSearch.length>1&&a.name.toLowerCase().includes(navSearch.toLowerCase()));
  const isLoggedIn = [SCREENS.STREAM,SCREENS.SEARCH,SCREENS.PROFILE,SCREENS.CHECKOUT,SCREENS.UNLOCKED,SCREENS.ACCOUNT,SCREENS.ARTIST_DASHBOARD,SCREENS.NEW_POST,SCREENS.POST_VIEW,SCREENS.TAG_FEED,SCREENS.ARTIST_LIVE,SCREENS.ARTIST_CLOSED,SCREENS.RIDER_CLOSED,SCREENS.TOURBUS_PROFILE,SCREENS.TOURBUS_DASHBOARD].includes(screen);
  const isArtistMode = userMode==="artist"&&!!artistUser;
  const myArtistPosts = feedPosts.filter(p=>artistUser&&p.artist===artistUser.name);

  return (
    <>
      <style>{makeCSS(darkMode)}</style>
      <div className="root">
        {isLoggedIn&&(
          <div className="nav">
            <div className="nav-inner">
              <div className="nav-logo" onClick={()=>go(isArtistMode?SCREENS.ARTIST_DASHBOARD:SCREENS.STREAM)}>tourbus</div>
              <div className="nav-right">
                {isArtistMode?(
                  <>
                    <button className="nav-post-btn" onClick={()=>go(SCREENS.NEW_POST)}>+ New Post</button>
                    <button className={`nav-account-btn${screen===SCREENS.PROFILE&&selectedArtist?.id===artistUser?.id?" active":""}`} onClick={()=>{if(screen===SCREENS.PROFILE&&selectedArtist?.id===artistUser?.id){go(SCREENS.ARTIST_DASHBOARD);}else{setPrevScreen(SCREENS.ARTIST_DASHBOARD);setSelectedArtist(artistUser);go(SCREENS.PROFILE);}}} title={screen===SCREENS.PROFILE&&selectedArtist?.id===artistUser?.id?"Back to Dashboard":"View public profile"}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                    </button>
                  </>
                ):(
                  <>
                    <div className="nav-search-wrap">
                      <span className="nav-search-icon">{E.search}</span>
                      <input className="nav-search-inp" placeholder="Quick search..." value={navSearch} onChange={e=>{setNavSearch(e.target.value);setShowNavResults(true);}} onBlur={()=>setTimeout(()=>setShowNavResults(false),150)}/>
                      {showNavResults&&navResults.length>0&&(
                        <div className="nav-search-results">
                          {navResults.map(a=>(
                            <div key={a.id} className="nav-search-result" onClick={()=>{setSelectedArtist(a);setNavSearch("");go(SCREENS.PROFILE);}}>
                              <div style={{width:24,height:24,borderRadius:2,background:a.color,flexShrink:0}}></div>
                              <div><div className="nav-result-name">{a.name}</div><div className="nav-result-genre">{a.genre}</div></div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <button className="nav-station-btn" onClick={()=>go(SCREENS.SEARCH)}>
                      <span className="nav-station-label">Station</span>
                      <span className="nav-station-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
                    </button>
                    <button className={`nav-account-btn${screen===SCREENS.ACCOUNT?" active":""}`} onClick={()=>go(SCREENS.ACCOUNT)}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="22"/><line x1="2" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="22" y2="12"/></svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {isLoggedIn&&(
          <div className="nav">
            <div className="nav-inner">
              <div className="nav-logo" onClick={()=>go(isArtistMode?SCREENS.ARTIST_DASHBOARD:SCREENS.STREAM)}>tourbus</div>
              <div className="nav-right">
                {isArtistMode?(
                  <>
                    <button className="nav-post-btn" onClick={()=>go(SCREENS.NEW_POST)}>+ New Post</button>
                    <button className={`nav-account-btn${screen===SCREENS.PROFILE&&selectedArtist?.id===artistUser?.id?" active":""}`} onClick={()=>{if(screen===SCREENS.PROFILE&&selectedArtist?.id===artistUser?.id){go(SCREENS.ARTIST_DASHBOARD);}else{setPrevScreen(SCREENS.ARTIST_DASHBOARD);setSelectedArtist(artistUser);go(SCREENS.PROFILE);}}} title={screen===SCREENS.PROFILE&&selectedArtist?.id===artistUser?.id?"Back to Dashboard":"View public profile"}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                    </button>
                  </>
                ):(
                  <>
                    <div className="nav-search-wrap">
                      <span className="nav-search-icon">{E.search}</span>
                      <input className="nav-search-inp" placeholder="Quick search..." value={navSearch} onChange={e=>{setNavSearch(e.target.value);setShowNavResults(true);}} onBlur={()=>setTimeout(()=>setShowNavResults(false),150)}/>
                      {showNavResults&&navResults.length>0&&(
                        <div className="nav-search-results">
                          {navResults.map(a=>(
                            <div key={a.id} className="nav-search-result" onClick={()=>{setSelectedArtist(a);setNavSearch("");go(SCREENS.PROFILE);}}>
                              <div style={{width:24,height:24,borderRadius:2,background:a.color,flexShrink:0}}></div>
                              <div><div className="nav-result-name">{a.name}</div><div className="nav-result-genre">{a.genre}</div></div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <button className="nav-station-btn" onClick={()=>go(SCREENS.SEARCH)}>
                      <span className="nav-station-label">Station</span>
                      <span className="nav-station-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
                    </button>
                    <button className={`nav-account-btn${screen===SCREENS.ACCOUNT?" active":""}`} onClick={()=>go(SCREENS.ACCOUNT)}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="22"/><line x1="2" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="22" y2="12"/></svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {isLoggedIn&&(
          <div className="nav">
            <div className="nav-inner">
              <div className="nav-logo" onClick={()=>go(isArtistMode?SCREENS.ARTIST_DASHBOARD:SCREENS.STREAM)}>tourbus</div>
              <div className="nav-right">
                {isArtistMode?(
                  <>
                    <button className="nav-post-btn" onClick={()=>go(SCREENS.NEW_POST)}>+ New Post</button>
                    <button className={`nav-account-btn${screen===SCREENS.PROFILE&&selectedArtist?.id===artistUser?.id?" active":""}`} onClick={()=>{if(screen===SCREENS.PROFILE&&selectedArtist?.id===artistUser?.id){go(SCREENS.ARTIST_DASHBOARD);}else{setPrevScreen(SCREENS.ARTIST_DASHBOARD);setSelectedArtist(artistUser);go(SCREENS.PROFILE);}}} title={screen===SCREENS.PROFILE&&selectedArtist?.id===artistUser?.id?"Back to Dashboard":"View public profile"}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                    </button>
                  </>
                ):(
                  <>
                    <div className="nav-search-wrap">
                      <span className="nav-search-icon">{E.search}</span>
                      <input className="nav-search-inp" placeholder="Quick search..." value={navSearch} onChange={e=>{setNavSearch(e.target.value);setShowNavResults(true);}} onBlur={()=>setTimeout(()=>setShowNavResults(false),150)}/>
                      {showNavResults&&navResults.length>0&&(
                        <div className="nav-search-results">
                          {navResults.map(a=>(
                            <div key={a.id} className="nav-search-result" onClick={()=>{setSelectedArtist(a);setNavSearch("");go(SCREENS.PROFILE);}}>
                              <div style={{width:24,height:24,borderRadius:2,background:a.color,flexShrink:0}}></div>
                              <div><div className="nav-result-name">{a.name}</div><div className="nav-result-genre">{a.genre}</div></div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <button className="nav-station-btn" onClick={()=>go(SCREENS.SEARCH)}>
                      <span className="nav-station-label">Station</span>
                      <span className="nav-station-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
                    </button>
                    <button className={`nav-account-btn${screen===SCREENS.ACCOUNT?" active":""}`} onClick={()=>go(SCREENS.ACCOUNT)}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="22"/><line x1="2" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="22" y2="12"/></svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {isLoggedIn&&(
          <div className="nav">
            <div className="nav-inner">
              <div className="nav-logo" onClick={()=>go(isArtistMode?SCREENS.ARTIST_DASHBOARD:SCREENS.STREAM)}>tourbus</div>
              <div className="nav-right">
                {isArtistMode?(
                  <>
                    <button className="nav-post-btn" onClick={()=>go(SCREENS.NEW_POST)}>+ New Post</button>
                    <button className={`nav-account-btn${screen===SCREENS.PROFILE&&selectedArtist?.id===artistUser?.id?" active":""}`} onClick={()=>{if(screen===SCREENS.PROFILE&&selectedArtist?.id===artistUser?.id){go(SCREENS.ARTIST_DASHBOARD);}else{setPrevScreen(SCREENS.ARTIST_DASHBOARD);setSelectedArtist(artistUser);go(SCREENS.PROFILE);}}} title={screen===SCREENS.PROFILE&&selectedArtist?.id===artistUser?.id?"Back to Dashboard":"View public profile"}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                    </button>
                  </>
                ):(
                  <>
                    <div className="nav-search-wrap">
                      <span className="nav-search-icon">{E.search}</span>
                      <input className="nav-search-inp" placeholder="Quick search..." value={navSearch} onChange={e=>{setNavSearch(e.target.value);setShowNavResults(true);}} onBlur={()=>setTimeout(()=>setShowNavResults(false),150)}/>
                      {showNavResults&&navResults.length>0&&(
                        <div className="nav-search-results">
                          {navResults.map(a=>(
                            <div key={a.id} className="nav-search-result" onClick={()=>{setSelectedArtist(a);setNavSearch("");go(SCREENS.PROFILE);}}>
                              <div style={{width:24,height:24,borderRadius:2,background:a.color,flexShrink:0}}></div>
                              <div><div className="nav-result-name">{a.name}</div><div className="nav-result-genre">{a.genre}</div></div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <button className="nav-station-btn" onClick={()=>go(SCREENS.SEARCH)}>
                      <span className="nav-station-label">Station</span>
                      <span className="nav-station-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
                    </button>
                    <button className={`nav-account-btn${screen===SCREENS.ACCOUNT?" active":""}`} onClick={()=>go(SCREENS.ACCOUNT)}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="22"/><line x1="2" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="22" y2="12"/></svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {!isLoggedIn&&(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",width:"100%",padding:"24px",background:"#f5f4ef"}}>
          <style>{makeCSS(false)}</style>
          <style>{makeCSS(false)}</style>
            {screen===SCREENS.LANDING&&(
              <div className="card fade">
                <div className="logo" style={{color:"#ff4d1a"}}>tourbus</div>
                <div className="logo-sub" style={{fontSize:"18px",letterSpacing:"2px",marginBottom:"26px"}}>"We're with the band."</div>
                <div className="headline">The <em>inside seat</em> with your favorite artists on their musical journey.</div>
                <p className="subtext" style={{fontFamily:"'Inter',sans-serif"}}>Support artists directly, and get on board for exclusive content only they can provide -- photos, videos and livestream moments from backstage to the main stage, and everything in between.<br/><br/>No ads. No subscriptions. No upsells.<br/>Just an app to make your <em style={{color:darkMode?"#e6ff00":"#ff4d1a",fontWeight:"bold",fontStyle:"italic"}}>live</em> better.</p>
                <div style={{width:"100%",aspectRatio:"16/9",background:darkMode?"#0a0a0a":"#e8e8e4",border:`1px solid ${darkMode?"#2a2a00":"#d0cfc0"}`,borderRadius:2,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,marginBottom:24,position:"relative",overflow:"hidden"}}>
                  <div style={{width:52,height:52,borderRadius:"50%",background:darkMode?"rgba(230,255,0,0.1)":"rgba(255,77,26,0.1)",border:`2px solid ${darkMode?"#e6ff00":"#ff4d1a"}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <div style={{width:0,height:0,borderTop:"10px solid transparent",borderBottom:"10px solid transparent",borderLeft:`16px solid ${darkMode?"#e6ff00":"#ff4d1a"}`,marginLeft:4}}/>
                  </div>
                  <div style={{fontFamily:"'Anton',sans-serif",fontSize:10,letterSpacing:3,color:darkMode?"#555":"#aaa"}}>TOURBUS EXPLAINED IN 30 SECONDS</div>
                </div>
                <div className="ticket-box">
                  <div className="ticket-price" style={{textAlign:"center"}}>$5 TICKET TO RIDE</div>
                  <div className="ticket-desc" style={{textAlign:"center"}}>One-time fee per artist / Transparent pricing</div>
                  <div style={{display:"flex",alignItems:"stretch",justifyContent:"center",gap:8,marginTop:8}}>
                    <div style={{textAlign:"center",flex:1,background:"rgba(230,255,0,0.04)",border:"1px solid #3a3a00",borderRadius:2,padding:"16px 12px"}}>
                      <div style={{fontFamily:"'Anton',sans-serif",fontSize:44,color:darkMode?"#e6ff00":"#ff4d1a",letterSpacing:2,lineHeight:1}}>$3</div>
                      <div style={{fontFamily:"'Anton',sans-serif",fontSize:18,color:darkMode?"#e6ff00":"#ff4d1a",letterSpacing:3,marginTop:8,lineHeight:1}}>to ARTIST</div>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:11,fontWeight:700,color:"#888",marginTop:6}}>no fine print, just what's right and fair</div>
                    </div>
                    <div style={{textAlign:"center",flex:1,background:"rgba(230,255,0,0.04)",border:"1px solid #3a3a00",borderRadius:2,padding:"16px 12px"}}>
                      <div style={{fontFamily:"'Anton',sans-serif",fontSize:44,color:darkMode?"#e6ff00":"#ff4d1a",letterSpacing:2,lineHeight:1}}>$2</div>
                      <div style={{fontFamily:"'Anton',sans-serif",fontSize:18,color:darkMode?"#e6ff00":"#ff4d1a",letterSpacing:3,marginTop:8,lineHeight:1}}>to TOURBUS</div>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:11,fontWeight:700,color:"#888",marginTop:6}}>our charity and our amazing team</div>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary" onClick={()=>go(SCREENS.CHOOSE_TYPE)}>Get On The Bus</button>
                <div className="signin-divider"><div className="signin-divider-line"/><div className="signin-divider-text">Already have an account?</div><div className="signin-divider-line"/></div>
                <button className="btn btn-outline" onClick={()=>go(SCREENS.RIDER_SIGNIN)}>Rider Sign In</button>
                <div className="artist-signin-hint">Are you an artist? <span onClick={()=>go(SCREENS.ARTIST_SIGNIN)}>Sign in here -></span></div>
              </div>
            )}
            {screen===SCREENS.RIDER_SIGNIN&&(
              <div className="card fade">
                <button className="back" onClick={()=>go(SCREENS.LANDING)}>Back</button>
                <div className="logo logo-sm" style={{marginBottom:16}}>tourbus</div>
                <div className="headline">Welcome back, rider!</div>
                <label className="lbl">Username</label>
                <input className={`inp${riderSignInError?" inp-error":""}`} placeholder="your_handle" value={riderSignInForm.username} onChange={e=>{setRiderSignInForm(p=>({...p,username:e.target.value}));setRiderSignInError("");}}/>
                <label className="lbl">Password</label>
                <input className={`inp${riderSignInError?" inp-error":""}`} type="password" placeholder="********" value={riderSignInForm.password} onChange={e=>{setRiderSignInForm(p=>({...p,password:e.target.value}));setRiderSignInError("");}}/>
                {riderSignInError&&<div className="error-msg">{riderSignInError}</div>}
                <div className="note" style={{marginTop:14}}>{E.bulb} Demo rider: <strong style={{color:darkMode?"#e6ff00":"#ff4d1a"}}>rider</strong> / <strong style={{color:darkMode?"#e6ff00":"#ff4d1a"}}>rider</strong> &nbsp;.&nbsp; New rider: <strong style={{color:darkMode?"#e6ff00":"#ff4d1a"}}>mattbradley</strong> / <strong style={{color:darkMode?"#e6ff00":"#ff4d1a"}}>tourbus123</strong></div>
                <button className="btn btn-primary" style={{marginTop:22}} onClick={handleRiderSignIn}>Sign In</button>
              </div>
            )}
            {screen===SCREENS.ARTIST_SIGNIN&&(
              <div className="card fade">
                <button className="back" onClick={()=>go(SCREENS.LANDING)}>Back</button>
                <div className="logo logo-sm">tourbus</div><div className="logo-sub">Artist sign in</div>
                <div className="headline">Your <em>tourbus</em> awaits.</div>
                <label className="lbl">Email</label>
                <input className={`inp${artistSignInError?" inp-error":""}`} placeholder="you@yourdomain.com" value={artistSignInForm.email} onChange={e=>{setArtistSignInForm(p=>({...p,email:e.target.value}));setArtistSignInError("");}}/>
                <label className="lbl">Authentication Code</label>
                <input className={`inp auth-code-inp${artistSignInError?" inp-error":""}`} placeholder="5-digit code" maxLength={5} value={artistSignInForm.code} onChange={e=>{setArtistSignInForm(p=>({...p,code:e.target.value.replace(/\D/g,"").slice(0,5)}));setArtistSignInError("");}}/>
                {artistSignInError?<div className="error-msg">{artistSignInError}</div>:<div className="code-hint">We'll email you a code each time you sign in.</div>}
                <div className="note" style={{marginTop:14}}>{E.bulb} Demo: use any artist email + code <strong style={{color:darkMode?"#e6ff00":"#ff4d1a",letterSpacing:3}}>12345</strong><br/>e.g. midnight@tourbus.live</div>
                <button className="btn btn-primary" style={{marginTop:20}} onClick={handleArtistSignIn}>Sign In</button>
              </div>
            )}
            {screen===SCREENS.CHOOSE_TYPE&&(
              <div className="card fade">
                <div className="logo logo-sm">tourbus</div><div className="logo-sub">"We're with the band."</div>
                <div className="headline">Who are you?</div>

                <div style={{display:"flex",gap:12,marginBottom:12}}>
                  <div className="type-card" style={{flex:1,marginBottom:0}} onClick={()=>go(SCREENS.RIDER_SIGNUP)}><div className="type-title">I'm a Rider</div><div className="type-desc">A fan looking to get closer to the artists I love. A one-time fee to ride on an artist's tourbus.</div></div>
                  <div className="type-card" style={{flex:1,marginBottom:0}} onClick={()=>go(SCREENS.ARTIST_SIGNUP)}><div className="type-title">I'm an Artist</div><div className="type-desc">A musician or band ready to share the real tour experience. Requires validation.</div></div>
                </div>
                <button className="btn btn-ghost" onClick={()=>go(SCREENS.LANDING)}>Back</button>
              </div>
            )}
            {screen===SCREENS.RIDER_SIGNUP&&(
              <div className="card fade">
                <button className="back" onClick={()=>go(SCREENS.CHOOSE_TYPE)}>Back</button>
                <div className="logo logo-sm">tourbus</div><div className="logo-sub">Rider Registration</div>
                <div className="headline">Climb aboard.</div>
                <p className="subtext" style={{marginBottom:8}}>Here's how it works. Free to join. Once you set up your account with a valid payment method, you will be able to buy a ticket (one-time $5) to ride on an artist's tourbus.</p>
                <label className="lbl">Username</label><input className="inp" placeholder="your_handle" value={riderForm.username} onChange={e=>setRiderForm(p=>({...p,username:e.target.value}))}/>
                <label className="lbl">Zip Code</label><input className="inp" placeholder="00000" maxLength={5} value={riderForm.zip} onChange={e=>setRiderForm(p=>({...p,zip:e.target.value}))}/>
                <hr className="divider"/>
                <label className="lbl">Card Number</label><input className="inp" placeholder=".... .... .... ...." value={riderForm.cc} onChange={e=>setRiderForm(p=>({...p,cc:e.target.value}))}/>
                <div className="cc-row">
                  <div><label className="lbl">Expiry</label><input className="inp" placeholder="MM / YY" value={riderForm.exp} onChange={e=>setRiderForm(p=>({...p,exp:e.target.value}))}/></div>
                  <div><label className="lbl">CVV</label><input className="inp" placeholder="..." maxLength={4} value={riderForm.cvv} onChange={e=>setRiderForm(p=>({...p,cvv:e.target.value}))}/></div>
                  <div></div>
                </div>
                <p style={{fontSize:10,color:"#555",marginTop:8,letterSpacing:1}}>Card saved for $5 purchases. Not charged today.</p>
                <hr className="divider"/>
                <div className="policy-check-row">
                  <div className={`policy-checkbox${agreedPrivacy?" checked":""}`} onClick={()=>setAgreedPrivacy(p=>!p)}>
                    {agreedPrivacy&&<span className="policy-checkbox-mark">&#10003;</span>}
                  </div>
                  <div className="policy-check-text">I have read and agree to the <span className="policy-link" onClick={()=>setShowPolicy("privacy")}>Privacy Policy</span></div>
                </div>
                <div className="policy-check-row">
                  <div className={`policy-checkbox${agreedTerms?" checked":""}`} onClick={()=>setAgreedTerms(p=>!p)}>
                    {agreedTerms&&<span className="policy-checkbox-mark">&#10003;</span>}
                  </div>
                  <div className="policy-check-text">I have read and agree to the <span className="policy-link" onClick={()=>setShowPolicy("terms")}>Terms of Use</span></div>
                </div>
                <button className="btn btn-primary" style={{marginTop:22,opacity:agreedPrivacy&&agreedTerms&&riderForm.username.trim()&&riderForm.zip.trim().length===5&&riderForm.cc.trim()&&riderForm.exp.trim()&&riderForm.cvv.trim()?1:0.4}} disabled={!agreedPrivacy||!agreedTerms||!riderForm.username.trim()||riderForm.zip.trim().length!==5||!riderForm.cc.trim()||!riderForm.exp.trim()||!riderForm.cvv.trim()} onClick={()=>go(SCREENS.RIDER_SUCCESS)}>Create My Account</button>
              </div>
            )}
            {screen===SCREENS.ARTIST_SIGNUP&&(
              <div className="card fade">
                <button className="back" onClick={()=>go(SCREENS.CHOOSE_TYPE)}>Back</button>
                <div className="logo logo-sm">tourbus</div><div className="logo-sub">Artist Application</div>
                <div className="headline">Start your <em>tourbus.</em></div>
                <p className="subtext" style={{marginBottom:8}}>We'll reach out within 2-3 business days.</p>
                <label className="lbl">Your Full Name</label><input className="inp" placeholder="First Last" value={artistForm.name} onChange={e=>setArtistForm(p=>({...p,name:e.target.value}))}/>
                <label className="lbl">Artist / Band Name</label><input className="inp" placeholder="The name your fans know you by" value={artistForm.artist} onChange={e=>setArtistForm(p=>({...p,artist:e.target.value}))}/>
                <label className="lbl">Contact Email</label><input className="inp" type="email" placeholder="you@yourdomain.com" value={artistForm.email} onChange={e=>setArtistForm(p=>({...p,email:e.target.value}))}/>
                <hr className="divider"/>
                <div className="section-label">Artist Representation</div>
                <label className="lbl">Agency Name <span style={{color:"#333"}}>(optional)</span></label><input className="inp" placeholder="e.g. CAA, WME..." value={artistForm.agencyName} onChange={e=>setArtistForm(p=>({...p,agencyName:e.target.value}))}/>
                <label className="lbl">Agency Email <span style={{color:"#333"}}>(optional)</span></label><input className="inp" type="email" placeholder="agent@agency.com" value={artistForm.agencyEmail} onChange={e=>setArtistForm(p=>({...p,agencyEmail:e.target.value}))}/>
                <hr className="divider"/>
                <div className="section-label">Artist Management</div>
                <label className="lbl">Management Name <span style={{color:"#333"}}>(optional)</span></label><input className="inp" placeholder="Manager or management company" value={artistForm.mgmtName} onChange={e=>setArtistForm(p=>({...p,mgmtName:e.target.value}))}/>
                <label className="lbl">Management Email <span style={{color:"#333"}}>(optional)</span></label><input className="inp" type="email" placeholder="manager@mgmt.com" value={artistForm.mgmtEmail} onChange={e=>setArtistForm(p=>({...p,mgmtEmail:e.target.value}))}/>
                <hr className="divider"/>
                <label className="lbl">Spotify Link <span style={{color:"#333"}}>(optional)</span></label><input className="inp" placeholder="spotify.com/artist/..." value={artistForm.spotify} onChange={e=>setArtistForm(p=>({...p,spotify:e.target.value}))}/>
                <div className="note">{E.info} Artist accounts are manually reviewed before going live.</div>
                <button className="btn btn-primary" style={{marginTop:20}} onClick={()=>go(SCREENS.ARTIST_SUCCESS)}>Submit Application</button>
              </div>
            )}
            {screen===SCREENS.RIDER_SUCCESS&&(
              <div className="card fade" style={{textAlign:"center"}}>
                <div className="success-icon">{E.ticket}</div><div className="logo logo-sm">you're on</div>
                <div className="logo-sub">Welcome, {riderForm.username||"Rider"}</div>
                <p className="subtext" style={{margin:"14px 0 26px"}}>Your account is ready. Head to the Station to find an artist and grab your $5 ticket.</p>
                <button className="btn btn-primary" onClick={()=>go(SCREENS.STREAM)}>Go to My Stream -></button>
              </div>
            )}
            {screen===SCREENS.ARTIST_SUCCESS&&(
              <div className="card fade" style={{textAlign:"center"}}>
                <div className="logo logo-sm">submitted</div>
                <div className="logo-sub">Application received</div>
                <p className="subtext" style={{margin:"14px 0 18px"}}>We'll reach out to <strong style={{color:darkMode?"#e6ff00":"#ff4d1a"}}>{artistForm.email||"your email"}</strong> within 2-3 business days.</p>
                <div className="note" style={{textAlign:"left",marginBottom:20}}>{E.note} Once approved, you'll earn $3 for every $5 ticket your riders purchase.</div>
                <button className="btn btn-ghost" onClick={()=>go(SCREENS.LANDING)}>Home</button>
              </div>
            )}
            {screen===SCREENS.ARTIST_CLOSED&&(
              <div className="card fade" style={{textAlign:"center"}}>
                <div className="logo logo-sm" style={{color:"#cc4444"}}>closed</div>
                <div className="logo-sub">Account closed</div>
                <p className="subtext" style={{margin:"14px 0 18px"}}>Your artist account has been closed. Your profile and posts have been removed from tourbus.</p>
                <div className="note" style={{textAlign:"left",marginBottom:20,borderColor:"#331111",color:"#884444"}}>If this was a mistake or you'd like to return to tourbus in the future, reach out to us at <span style={{color:darkMode?"#e6ff00":"#ff4d1a"}}>artists@tourbus.live</span>.</div>
                <button className="btn btn-ghost" onClick={()=>go(SCREENS.LANDING)}>Home</button>
              </div>
            )}
            {screen===SCREENS.RIDER_CLOSED&&(
              <div className="card fade" style={{textAlign:"center"}}>
                <div className="logo logo-sm" style={{color:"#cc4444"}}>closed</div>
                <div className="logo-sub">Account closed</div>
                <p className="subtext" style={{margin:"14px 0 18px"}}>Your rider account has been closed. We're sorry to see you go.</p>
                <div className="note" style={{textAlign:"left",marginBottom:20,borderColor:"#331111",color:"#884444"}}>If this was a mistake, reach out to us at <span style={{color:darkMode?"#e6ff00":"#ff4d1a"}}>hello@tourbus.live</span>.</div>
                <button className="btn btn-ghost" onClick={()=>go(SCREENS.LANDING)}>Home</button>
              </div>
            )}
          </div>
        )}

        {isLoggedIn&&(
          <div className="page-content">
            {screen===SCREENS.STREAM&&(
              <div className="stream fade" style={{width:"100%",maxWidth:"100%",overflowX:"hidden"}}>
                <p className="stream-greeting">Good to see you, <b>@{riderUser?.username||"rider"}</b></p>
                <div className="stream-label">Your buses</div>
                <div className="my-buses">
                  <div className="my-bus-chip" onClick={()=>go(SCREENS.TOURBUS_PROFILE)}>
                    <div className="tourbus-bus-avatar">tourbus</div>
                    <div className="my-bus-name" style={{color:darkMode?"#e6ff00":"#0e0e0e"}}>tourbus</div>
                  </div>
                  <div className="my-bus-chip" onClick={()=>go(SCREENS.SEARCH)}>
                    <div className="my-bus-avatar" style={{display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,color:"#444"}}>+</div>
                    <div className="my-bus-name" style={{color:"#3a3a00"}}>add</div>
                  </div>
                  {ARTISTS.filter(a=>purchased.has(a.id)&&!offBus[a.name]).map(a=>(
                    <div key={a.id} className="my-bus-chip-wrap" onClick={()=>{setSelectedArtist(a);go(SCREENS.PROFILE);}}>
                      <div style={{position:"relative"}}>
                        {LIVE_IDS.has(a.id)&&<div className="live-badge">LIVE</div>}
                        <ArtistThumb artist={a} className={LIVE_IDS.has(a.id)?"live-thumb":""} style={{width:52,height:52,borderRadius:2,border:LIVE_IDS.has(a.id)?"1px solid #ff2222":"1px solid #3a3a00"}}/>
                      </div>
                      <div className="my-bus-name">{a.name}</div>
                    </div>
                  ))}
                </div>
                {Object.keys(snoozed).filter(k=>snoozed[k]).map(name=>(
                  <div key={name} className="status-bar"><span>{E.sleep} {name} snoozed for 30 days</span><button className="status-bar-undo" onClick={()=>doUnsnooze(name)}>UNDO</button></div>
                ))}
                {Object.keys(hidden).filter(k=>hidden[k]).map(name=>(
                  <div key={name} className="status-bar"><span>{E.hide} {name} hidden from stream</span><button className="status-bar-undo" onClick={()=>doUnhide(name)}>UNDO</button></div>
                ))}
                {feedPosts.filter(p=>{
                  if(p.isTourbus) return true;
                  const a = ARTISTS.find(a=>a.name===p.artist);
                  return a && purchased.has(a.id) && !offBus[p.artist];
                }).map(p=>{
                  const isMuted=snoozed[p.artist]||hidden[p.artist];
                  if (p.isTourbus) return (
                    <div key={p.id} className="feed-post">
                      <div className="feed-post-header">
                        <div style={{width:32,height:32,borderRadius:2,background:darkMode?"#0e0e0e":"#ffffff",border:`2px solid ${darkMode?"#e6ff00":"#0e0e0e"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer"}} onClick={()=>go(SCREENS.TOURBUS_PROFILE)}>
                          <span style={{fontFamily:"'Caveat',cursive",fontSize:16,color:darkMode?"#e6ff00":"#0e0e0e",lineHeight:1}}>tb</span>
                        </div>
                        <div style={{cursor:"pointer"}} onClick={()=>go(SCREENS.TOURBUS_PROFILE)}><div className="feed-post-artist tourbus-author">tourbus</div></div>
                        <div className="feed-post-time">{p.time}</div>
                      </div>
                      {(p.type==="photo"||p.type==="video")&&(
                        <div className="feed-post-thumb" style={{background:"#111",border:"1px solid #2a2a00"}}>
                          <span style={{fontSize:64}}>{p.type==="photo"?E.photo:E.video}</span>
                        </div>
                      )}
                      <div className="tourbus-post-thumb">
                        <div className="tourbus-post-text">{parseCaption(p.label)}</div>
                      </div>
                      {(()=>{const topTags=Object.entries(tags[p.id]||{}).filter(([,cnt])=>cnt>=TAG_THRESHOLD).sort((a,b)=>b[1]-a[1]).slice(0,5);return topTags.length>0&&<div className="tag-pills">{topTags.map(([tag])=><span key={tag} className="tag-pill" style={{cursor:"pointer"}} onClick={()=>setTags(prev=>({...prev,[p.id]:{...prev[p.id],[tag]:(prev[p.id][tag]||0)+1}}))}>#{tag}</span>)}</div>;})()}
                      {activeTagInput===p.id&&(
                        <div className="tag-input-wrap">
                          <input className="tag-input" placeholder="add a tag..." autoFocus maxLength={30} value={tagDraft} onChange={e=>setTagDraft(e.target.value.replace(/\s/g,''))} onKeyDown={e=>{if(e.key==='Enter')addTag(p.id,tagDraft);if(e.key==='Escape'){setActiveTagInput(null);setTagDraft('');}}}/>
                          <button className="tag-submit" onClick={()=>addTag(p.id,tagDraft)}>ADD</button>
                        </div>
                      )}
                      <div className="feed-post-footer">
                        <button className={`like-btn${likes[p.id]?.liked?" liked":""}`} onClick={()=>toggleLike(p.id)}>{E.clap} {(likes[p.id]?.count||0).toLocaleString()}</button>
                        <button className={`like-btn${amps[p.id]?.amped?" liked":""}`} onClick={()=>toggleAmp(p.id)}>{E.fire} {(amps[p.id]?.count||0).toLocaleString()}</button>
                        <button className={`tag-btn${activeTagInput===p.id?" active":""}`} onClick={()=>{setActiveTagInput(activeTagInput===p.id?null:p.id);setTagDraft('');}}>&#35;</button>
                      </div>
                    </div>
                  );
                  return (
                    <div key={p.id} className={`feed-post${isMuted?" muted":""}`}>
                      <div className="feed-post-header" style={{position:"relative"}}>
                        {(()=>{const a=ARTISTS.find(a=>a.name===p.artist);return a?<ArtistThumb artist={a} style={{width:32,height:32,borderRadius:2,border:"1px solid #3a3a00",flexShrink:0,cursor:"pointer"}} onClick={()=>{setSelectedArtist(a);go(SCREENS.PROFILE);}}/>:<div className="feed-post-avatar" style={{background:"#1a1a1a"}}/>;})()} 
                        <div style={{cursor:"pointer",flex:1}} onClick={()=>{const a=ARTISTS.find(a=>a.name===p.artist);if(a){setSelectedArtist(a);go(SCREENS.PROFILE);}}}><div className="feed-post-artist">{p.artist}{p.isNew&&<span className="new-post-badge">NEW</span>}{(()=>{const a=ARTISTS.find(a=>a.name===p.artist);return a&&getArtistProfile(a).onTour?<span className="on-tour-badge">ON TOUR</span>:null;})()}</div><div className="feed-post-time">{p.time}</div></div>
                        <div className="post-menu-wrap" style={{flexShrink:0,marginLeft:"auto"}}>
                          <button className="post-menu-btn" onClick={()=>setArtistMenu(artistMenu===p.artist+p.id?null:p.artist+p.id)}>...</button>
                          {artistMenu===p.artist+p.id&&(
                            <div className="post-menu" style={{top:32,right:0}}>
                              <div className="post-menu-label">{p.artist}</div>
                              {!snoozed[p.artist]&&<div className="post-menu-item" onClick={()=>doSnooze(p.artist)}>{E.sleep} Snooze for 30 days</div>}
                              {snoozed[p.artist]&&<div className="post-menu-item" onClick={()=>doUnsnooze(p.artist)}>{E.bell} Unsnooze</div>}
                              {!hidden[p.artist]&&<div className="post-menu-item" onClick={()=>doHide(p.artist)}>{E.hide} Hide from stream</div>}
                              {hidden[p.artist]&&<div className="post-menu-item" onClick={()=>doUnhide(p.artist)}>{E.eye} Unhide</div>}
                              <div className="post-menu-item" onClick={()=>setArtistMenu(null)}>{E.flag} Report this post</div>
                              <div className="post-menu-item danger" onClick={()=>{setConfirmOff(p.artist);setArtistMenu(null);}}>{E.bus} Get off this bus</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="feed-post-thumb" style={{background:p.color}}>
                        {p.previewUrl?<img src={p.previewUrl} alt={p.label}/>:<span style={{fontSize:64}}>{p.type==="photo"?E.photo:E.video}</span>}
                      </div>
                      <div className="feed-post-label">{parseCaption(p.label)}</div>
                      {(()=>{const topTags=Object.entries(tags[p.id]||{}).filter(([,cnt])=>cnt>=TAG_THRESHOLD).sort((a,b)=>b[1]-a[1]).slice(0,5);return topTags.length>0&&<div className="tag-pills">{topTags.map(([tag])=><span key={tag} className="tag-pill" style={{cursor:"pointer"}} onClick={()=>setTags(prev=>({...prev,[p.id]:{...prev[p.id],[tag]:(prev[p.id][tag]||0)+1}}))}>#{tag}</span>)}</div>;})()}
                      {activeTagInput===p.id&&(
                        <div className="tag-input-wrap">
                          <input className="tag-input" placeholder="add a tag..." autoFocus maxLength={30} value={tagDraft} onChange={e=>setTagDraft(e.target.value.replace(/\s/g,''))} onKeyDown={e=>{if(e.key==='Enter')addTag(p.id,tagDraft);if(e.key==='Escape'){setActiveTagInput(null);setTagDraft('');}}}/>
                          <button className="tag-submit" onClick={()=>addTag(p.id,tagDraft)}>ADD</button>
                        </div>
                      )}
                      <div className="feed-post-footer">
                        <button className={`like-btn${likes[p.id]?.liked?" liked":""}`} onClick={()=>toggleLike(p.id)}>{E.clap} {(likes[p.id]?.count||0).toLocaleString()}</button>
                        <button className={`like-btn${amps[p.id]?.amped?" liked":""}`} onClick={()=>toggleAmp(p.id)}>{E.fire} {(amps[p.id]?.count||0).toLocaleString()}</button>
                        <button className={`tag-btn${activeTagInput===p.id?" active":""}`} onClick={()=>{setActiveTagInput(activeTagInput===p.id?null:p.id);setTagDraft('');}}>&#35;</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {confirmOff&&(
              <div className="modal-overlay">
                <div className="modal">
                  <div className="modal-title">Get off this bus?</div>
                  <p className="modal-desc">You'll lose access to <strong style={{color:"#f5f5f5"}}>{confirmOff}</strong>'s feed. Your $5 ticket is non-refundable.</p>
                  <div className="modal-btns">
                    <button className="btn btn-primary" style={{background:"#331100",color:"#ff6633",boxShadow:"none"}} onClick={()=>doGetOff(confirmOff)}>Get Off</button>
                    <button className="btn btn-ghost" onClick={()=>setConfirmOff(null)}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
            {showPolicy&&(
              <div className="modal-overlay" onClick={()=>setShowPolicy(null)}>
                <div className="policy-modal" onClick={e=>e.stopPropagation()}>
                  {showPolicy==="privacy"?(
                    <>
                      <div className="policy-modal-title">Privacy Policy</div>
                      <div className="policy-modal-body">
                        <p>Last updated: March 2026</p>
                        <h4>INFORMATION WE COLLECT</h4>
                        <p>We collect your username, zip code, and payment information when you create a Rider account. We collect your email address and professional information when you apply as an Artist.</p>
                        <h4>HOW WE USE YOUR INFORMATION</h4>
                        <p>We use your information to operate the tourbus platform, process payments, send you notifications about artists you follow, and improve our services. We do not sell your personal information to third parties.</p>
                        <h4>PAYMENT INFORMATION</h4>
                        <p>Payment information is processed securely. We store only the last four digits of your card for reference. Full card details are handled by our payment processor and are never stored on our servers.</p>
                        <h4>COMMUNICATIONS</h4>
                        <p>We may send you emails about new artists, platform updates, and activity on your account. You may opt out of promotional emails at any time.</p>
                        <h4>DATA RETENTION</h4>
                        <p>We retain your account data for as long as your account is active. You may request deletion of your account and associated data at any time by contacting support.</p>
                        <h4>CONTACT</h4>
                        <p>For privacy-related inquiries, contact us at privacy@tourbus.live.</p>
                      </div>
                    </>
                  ):(
                    <>
                      <div className="policy-modal-title">Terms of Use</div>
                      <div className="policy-modal-body">
                        <p>Last updated: March 2026</p>
                        <h4>ACCEPTANCE OF TERMS</h4>
                        <p>By creating an account on tourbus, you agree to these Terms of Use. If you do not agree, do not use the platform.</p>
                        <h4>RIDER ACCOUNTS</h4>
                        <p>Rider accounts are for personal, non-commercial use. You must be 13 years of age or older to create an account. You are responsible for maintaining the confidentiality of your account credentials.</p>
                        <h4>PURCHASES AND REFUNDS</h4>
                        <p>All $5 artist ticket purchases are final and non-refundable. This includes cases where an artist deactivates their tourbus account after your purchase. By purchasing a ticket, you acknowledge this policy.</p>
                        <h4>CONTENT</h4>
                        <p>All content on tourbus is owned by the respective artists. You may not reproduce, distribute, or commercially exploit any content without the explicit written consent of the artist.</p>
                        <h4>PROHIBITED CONDUCT</h4>
                        <p>You agree not to use tourbus to harass artists or other users, circumvent access controls, scrape or harvest content, or engage in any activity that disrupts the platform.</p>
                        <h4>LIVE LIVES HERE</h4>
                        <p>One dollar from every $5 ticket is donated to Live Lives Here, a charity supporting local music venues. tourbus does not guarantee any specific amount of donations.</p>
                        <h4>CHANGES TO TERMS</h4>
                        <p>We may update these terms at any time. Continued use of the platform after changes constitutes acceptance of the updated terms.</p>
                        <h4>CONTACT</h4>
                        <p>For questions about these terms, contact us at legal@tourbus.live.</p>
                      </div>
                    </>
                  )}
                  <button className="btn btn-primary" style={{marginBottom:0,flexShrink:0}} onClick={()=>{if(showPolicy==="privacy")setAgreedPrivacy(true);else setAgreedTerms(true);setShowPolicy(null);}}>I Agree</button>
                </div>
              </div>
            )}
            {screen===SCREENS.SEARCH&&(
              <div className="fade" style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
                <div className="station-header"><span style={{fontFamily:"'Caveat',cursive",fontSize:32,letterSpacing:-1,fontWeight:700,marginRight:16}}>the</span>STATION</div>
                <div className="station-tabs">
                  <button className={`station-tab${stationView==="artists"?" active":""}`} onClick={()=>setStationView("artists")}>ARTISTS</button>
                  <button className={`station-tab${stationView==="tags"?" active":""}`} onClick={()=>setStationView("tags")}>TAGS</button>
                </div>
                {stationView==="artists"&&(
                  <>
                    <div className="search-bar-wrap"><span className="search-icon">{E.search}</span><input className="search-bar" placeholder="Search artists, genres..." value={search} onChange={e=>{setSearch(e.target.value);setSuggestSubmitted(false);setSuggestNote("");}}/></div>
                    <div className="filter-row">
                      {GENRE_FILTERS.map(g=><button key={g} className={`filter-pill${genre===g?" active":""}`} onClick={()=>setGenre(g)}>{g}</button>)}
                      {GENRE_TAGS.map(g=><button key={g} className={`filter-pill${genre===g?" active":""}`} onClick={()=>setGenre(g)}>{g}</button>)}
                    </div>
                <div className="artist-cards">
                  {filteredArtists.map(a=>(
                    <div key={a.id} className={`artist-card${!a.active?" standby":""}`} onClick={()=>{setSelectedArtist(a);go(SCREENS.PROFILE);}}>
                      <div className="artist-card-main">
                        <div className="artist-card-top">
                          <div style={{display:"flex",alignItems:"center",gap:10}}>
                            <ArtistThumb artist={a} style={{width:56,height:56,borderRadius:2,flexShrink:0}}/>
                            <div><div className="artist-card-name">{a.name}</div><div className="artist-card-genre">{a.genre}</div></div>
                          </div>
                        </div>
                        <div className="artist-card-badges">
                          {a.onTour&&<span className="badge badge-tour">On Tour</span>}
                          {a.newlyAdded&&<span className="badge badge-new">New</span>}
                          {!a.active&&<span className="badge badge-standby">Not on tourbus yet</span>}
                        </div>
                      </div>
                      <div className="artist-card-stub">
                        <div className="stub-notch-top"/><div className="stub-notch-bot"/>
                        {a.active?(
                          <><div className="stub-count">{a.riders.toLocaleString()}</div><div className="stub-label">riders</div>
                          {purchased.has(a.id)
                            ? <div style={{fontFamily:"'Anton',sans-serif",fontSize:9,letterSpacing:1,color:darkMode?"#e6ff00":"#ff4d1a",marginTop:4,textAlign:"center"}}>&#10003; RIDING</div>
                            : <button className="stub-action" onClick={e=>{e.stopPropagation();setSelectedArtist(a);go(SCREENS.PROFILE);}}>Ride</button>
                          }</>
                        ):(
                          <><div className="stub-count">{(standbyCounts[a.id]||0).toLocaleString()}</div><div className="stub-label">on standby</div><button className="stub-action" onClick={e=>{e.stopPropagation();toggleStandby(a.id);}}>{standby[a.id]?"&#10003; Standby":"Go Standby"}</button></>
                        )}
                      </div>
                    </div>
                  ))}
                  {search.trim().length>1&&filteredArtists.length===0&&(
                    <div className="suggest-card">
                      {!suggestSubmitted?(
                        <>
                          <div className="suggest-title">Don't see {search}?</div>
                          <div className="suggest-sub">We're always adding new artists. Suggest them and we'll reach out.</div>
                          <label className="lbl">Artist name</label>
                          <input className="inp" value={search} readOnly style={{color:darkMode?"#e6ff00":"#ff4d1a",marginBottom:16}}/>
                          <button className="btn btn-primary" style={{marginBottom:0}} onClick={()=>setSuggestSubmitted(true)}>Suggest This Artist</button>
                        </>
                      ):(
                        <div className="suggest-success">
                          <div className="suggest-success-icon">{E.guitar}</div>
                          <div className="suggest-success-text">Suggestion received!</div>
                          <div className="suggest-success-sub">We'll look into bringing {search} onto tourbus.</div>
                        </div>
                      )}
                    </div>
                  )}
                  {search.trim().length>1&&filteredArtists.length>0&&(
                    <div style={{textAlign:"center",padding:"16px 0",borderTop:"1px solid #1e1e00",marginTop:4}}>
                      <span style={{fontSize:11,color:"#333",letterSpacing:1}}>Not seeing who you're looking for? </span>
                      <span style={{fontSize:11,color:darkMode?"#e6ff00":"#ff4d1a",letterSpacing:1,cursor:"pointer"}} onClick={()=>{setSuggestSubmitted(false);setSuggestNote("");}}>Suggest an artist -></span>
                    </div>
                  )}
                </div>
                  </>
                )}
                {stationView==="tags"&&(()=>{
                  // Aggregate all tags across all posts, sum counts, sort by total fire
                  const allTagTotals = {};
                  feedPosts.forEach(p=>{
                    const postTags = tags[p.id]||{};
                    const fire = amps[p.id]?.count||0;
                    Object.entries(postTags).filter(([,cnt])=>cnt>=TAG_THRESHOLD).forEach(([tag,cnt])=>{
                      if(!allTagTotals[tag]) allTagTotals[tag]={posts:0,tagCount:0,fire:0};
                      allTagTotals[tag].posts++;
                      allTagTotals[tag].tagCount+=cnt;
                      allTagTotals[tag].fire+=fire;
                    });
                  });
                  const sorted = Object.entries(allTagTotals).sort((a,b)=>b[1].tagCount-a[1].tagCount);
                  return (
                    <div className="tag-summary-cards">
                      {sorted.map(([tag,data])=>(
                        <div key={tag} className="tag-summary-card" onClick={()=>{setActiveTag(tag);go(SCREENS.TAG_FEED);}}>
                          <div>
                            <div className="tag-summary-name">#{tag}</div>
                            <div className="tag-summary-meta">{data.posts} POST{data.posts!==1?"S":""}</div>
                          </div>
                          <div style={{textAlign:"right"}}>
                            <div className="tag-summary-count">{data.tagCount.toLocaleString()}</div>
                            <div className="tag-summary-count-lbl">TOTAL TAGS</div>
                          </div>
                        </div>
                      ))}
                      {sorted.length===0&&<div style={{color:"#555",fontFamily:"'Inter',sans-serif",fontSize:13,textAlign:"center",padding:40}}>No tags yet. Add some from the stream.</div>}
                    </div>
                  );
                })()}
              </div>
            )}
            {screen===SCREENS.PROFILE&&selectedArtist&&(
              <div className="profile-wrap fade">
                {prevScreen===SCREENS.ARTIST_DASHBOARD
                  ? <button className="profile-back" onClick={()=>{setPrevScreen(null);go(SCREENS.ARTIST_DASHBOARD);}}>Back to Dashboard</button>
                  : purchased.has(selectedArtist.id)
                    ? <button className="profile-back" onClick={()=>go(SCREENS.STREAM)}>Back to My Stream</button>
                    : <button className="profile-back" onClick={()=>go(SCREENS.SEARCH)}>Back to Station</button>
                }
                {selectedArtist.active?(
                  <>
                    <div className="profile-header">
                      <div style={{position:"relative",width:"100%",maxWidth:"min(240px,100%)",marginBottom:14}}>
                        <ArtistThumb artist={selectedArtist} style={{width:"100%",height:160,borderRadius:2,border:LIVE_IDS.has(selectedArtist.id)?"2px solid #ff2222":"1px solid #2a2a00",boxShadow:LIVE_IDS.has(selectedArtist.id)?"0 0 20px rgba(255,30,30,0.4)":undefined}}/>
                        {LIVE_IDS.has(selectedArtist.id)&&<div className="live-badge" style={{top:8}}>LIVE</div>}
                      </div>
                      <div className="profile-name">{selectedArtist.name}</div>
                      <div className="profile-genre">{selectedArtist.genre}</div>
                      <p className="profile-bio">{getArtistProfile(selectedArtist).bio}</p>
                      {(getArtistProfile(selectedArtist).spotify||getArtistProfile(selectedArtist).website)&&(
                        <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center",marginBottom:16}}>
                          {getArtistProfile(selectedArtist).spotify&&<a href={getArtistProfile(selectedArtist).spotify} target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:"#1db954",border:"1px solid #1db954",borderRadius:1,padding:"5px 12px",letterSpacing:1,textDecoration:"none",fontFamily:"'Anton',sans-serif"}}>&#9654; Spotify</a>}
                          {getArtistProfile(selectedArtist).website&&<a href={getArtistProfile(selectedArtist).website} target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:darkMode?"#e6ff00":"#ff4d1a",border:darkMode?"1px solid #e6ff00":"1px solid #ff4d1a",borderRadius:1,padding:"5px 12px",letterSpacing:1,textDecoration:"none",fontFamily:"'Anton',sans-serif"}}>{E.globe} Website</a>}
                        </div>
                      )}
                      <div className="profile-stats" style={{alignItems:"center"}}>
                        <div className="stat"><div className="stat-num">{selectedArtist.riders.toLocaleString()}</div><div className="stat-lbl">Riders</div></div>
                        <div className="stat"><div className="stat-num">{selectedArtist.posts}</div><div className="stat-lbl">Posts</div></div>
                        {(artistRecos[selectedArtist.id]||[]).length>0&&(
                          <div style={{display:"flex",alignItems:"center",gap:6}}>
                            <div style={{fontFamily:"'Anton',sans-serif",fontSize:9,letterSpacing:2,color:"#444",flexShrink:0}}>RECOS</div>
                            <div style={{display:"flex",gap:4}}>
                              {(artistRecos[selectedArtist.id]||[]).map(a=>(
                                <div key={a.id} style={{cursor:"pointer"}} onClick={()=>{setSelectedArtist(a);go(SCREENS.PROFILE);}}>
                                  <ArtistThumb artist={a} style={{width:36,height:36,borderRadius:2,border:`1px solid ${darkMode?"#2a2a00":"#d0cfc0"}`,transition:"border-color 0.2s"}}/>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {purchased.has(selectedArtist.id)?(
                      <>
                        {LIVE_IDS.has(selectedArtist.id)&&(
                          <div style={{marginBottom:24}}>
                            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                              <div style={{width:8,height:8,borderRadius:"50%",background:"#ff2222",boxShadow:"0 0 6px #ff2222",animation:"live-glow 1.4s ease-in-out infinite"}}/>
                              <div style={{fontFamily:"'Anton',sans-serif",fontSize:11,letterSpacing:3,color:"#ff2222"}}>LIVE NOW</div>
                            </div>
                            <div style={{width:"100%",aspectRatio:"16/9",background:"#0a0000",border:"2px solid #ff2222",borderRadius:2,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:12,boxShadow:"0 0 30px rgba(255,30,30,0.2)",position:"relative",overflow:"hidden"}}>
                              <ArtistThumb artist={selectedArtist} style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.15}}/>
                              <div style={{position:"relative",textAlign:"center"}}>
                                <div style={{fontSize:40,marginBottom:8}}>{E.satellite}</div>
                                <div style={{fontFamily:"'Anton',sans-serif",fontSize:16,letterSpacing:3,color:"#f5f5f5",marginBottom:4}}>{selectedArtist.name} IS LIVE</div>
                                <div style={{fontSize:11,color:"#666",letterSpacing:1,fontFamily:"'Inter',sans-serif"}}>Live Feed Goes Here</div>
                              </div>
                              <div style={{position:"absolute",bottom:12,right:12,background:"rgba(0,0,0,0.7)",border:"1px solid #ff2222",borderRadius:1,padding:"4px 10px",fontSize:10,color:"#ff6666",fontFamily:"'Anton',sans-serif",letterSpacing:1}}>&#9679; LIVE</div>
                            </div>
                          </div>
                        )}
                        <div style={{fontSize:10,letterSpacing:3,color:"#444",marginBottom:12,fontFamily:"'Anton',sans-serif"}}>POSTS</div>
                        <div className="feed-grid">
                          {(()=>{
                            const realPosts = feedPosts.filter(p=>p.artist===selectedArtist.name);
                            const mockPostsFull = MOCK_POSTS.map((p,i)=>({...p,id:`mock-${i}`,label:"Exclusive post",time:"recently",artist:selectedArtist.name,likes:Math.floor((i+1)*47+83)}));
                            const allPosts = [...realPosts, ...mockPostsFull];
                            return allPosts.map(p=>(
                              <div key={p.id} className="feed-grid-item" style={{background:p.color}} onClick={()=>{setSelectedPost(p);setAllArtistPosts(allPosts);go(SCREENS.POST_VIEW);}}>
                                {p.previewUrl?<img src={p.previewUrl} alt={p.label}/>:<span>{p.type==="photo"?E.photo:E.video}</span>}
                              </div>
                            ));
                          })()}
                        </div>
                        <div style={{textAlign:"center",padding:"12px 0",fontSize:11,color:"#3a5a00",letterSpacing:2,fontFamily:"'Anton',sans-serif"}}>&#10003; YOU'RE ON THIS BUS</div>
                      </>
                    ):(
                      <>
                        <div className="feed-grid">
                          <div className="feed-grid-lock">{E.lock}</div>
                          {MOCK_POSTS.map((p,i)=><div key={i} className="feed-grid-item" style={{background:p.color,filter:"blur(5px)",cursor:"default"}}><span>{p.type==="photo"?E.photo:E.video}</span></div>)}
                        </div>
                        <div className="unlock-box">
                          <div className="unlock-desc">A one-time fee to ride on {selectedArtist.name}'s tourbus and access their exclusive feed.</div>
                          <button className="btn btn-primary" onClick={()=>go(SCREENS.CHECKOUT)}>Ride -></button>
                        </div>
                      </>
                    )}
                  </>
                ):(
                  <>
                    <div className="profile-header">
                      <div style={{width:"100%",maxWidth:"min(240px,100%)",height:160,background:selectedArtist.color,borderRadius:2,marginBottom:14,border:"1px solid #222",opacity:0.3}}></div>
                      <div className="profile-name" style={{color:"#555"}}>{selectedArtist.name}</div>
                    </div>
                    <div className="standby-box">
                      <div className="standby-count">{(standbyCounts[selectedArtist.id]||0).toLocaleString()}</div>
                      <div className="standby-lbl">riders waiting</div>
                      <button className={`btn btn-standby${standby[selectedArtist.id]?" on":""}`} onClick={()=>toggleStandby(selectedArtist.id)}>
                        {standby[selectedArtist.id]?"&#10003; You're On Standby -- Cancel":"Go Standby"}
                      </button>
                      {standby[selectedArtist.id]&&<p style={{fontSize:11,color:"#555",marginTop:12,letterSpacing:1}}>You'll be charged automatically when {selectedArtist.name} goes live.</p>}
                      <div className="no-refund-notice" style={{marginTop:16,marginBottom:0}}>All sales are final. Once charged, tickets are non-refundable.</div>
                    </div>
                  </>
                )}
              </div>
            )}
            {screen===SCREENS.POST_VIEW&&selectedPost&&selectedArtist&&(
              <div className="post-view-wrap fade">
                <button className="profile-back" onClick={()=>go(SCREENS.PROFILE)}>Back to {selectedArtist.name}</button>
                <div style={{width:"100%",aspectRatio:"16/9",background:selectedPost.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:64,position:"relative",overflow:"hidden",borderRadius:2,marginBottom:16}}>
                  {selectedPost.previewUrl?<img src={selectedPost.previewUrl} alt={selectedPost.label} style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",inset:0}}/>:<span style={{fontSize:48}}>{selectedPost.type==="photo"?E.photo:E.video}</span>}
                  {(()=>{const posts=allArtistPosts.length>0?allArtistPosts:feedPosts.filter(p=>p.artist===selectedArtist.name);const idx=posts.findIndex(p=>p.id===selectedPost.id);return(<>
                    {idx>0&&<button onClick={()=>setSelectedPost(posts[idx-1])} style={{position:"absolute",left:8,top:"50%",transform:"translateY(-50%)",background:"rgba(0,0,0,0.6)",border:"1px solid #444",borderRadius:2,color:"#fff",padding:"8px 12px",cursor:"pointer",fontSize:16,zIndex:2}}>&lt;</button>}
                    {idx<posts.length-1&&<button onClick={()=>setSelectedPost(posts[idx+1])} style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",background:"rgba(0,0,0,0.6)",border:"1px solid #444",borderRadius:2,color:"#fff",padding:"8px 12px",cursor:"pointer",fontSize:16,zIndex:2}}>&gt;</button>}
                    <div style={{position:"absolute",bottom:8,left:"50%",transform:"translateX(-50%)",background:"rgba(0,0,0,0.5)",borderRadius:10,padding:"3px 8px",fontSize:10,color:"#aaa",letterSpacing:1}}>{idx+1} / {posts.length}</div>
                  </>);})()}
                </div>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                  <ArtistThumb artist={selectedArtist} style={{width:32,height:32,borderRadius:2,border:"1px solid #2a2a00",flexShrink:0}}/>
                  <div style={{fontFamily:"'Anton',sans-serif",fontSize:14,letterSpacing:1,color:"#f5f5f5"}}>{selectedArtist.name}</div>
                  <div style={{fontSize:10,color:"#444",marginLeft:"auto",letterSpacing:1}}>{selectedPost.time}</div>
                </div>
                <div style={{fontFamily:"'Inter',sans-serif",fontSize:14,color:"#aaa",letterSpacing:0,lineHeight:1.7,marginBottom:16}}>{parseCaption(selectedPost.label)}</div>
                <button className={`like-btn${likes[selectedPost.id]?.liked?" liked":""}`} onClick={()=>toggleLike(selectedPost.id)}>{E.clap} {(likes[selectedPost.id]?.count||selectedPost.likes||0).toLocaleString()}</button>
              </div>
            )}
            {screen===SCREENS.CHECKOUT&&selectedArtist&&(
              <div className="card fade">
                <div className="logo logo-sm">tourbus</div><div className="logo-sub">Your ticket to ride</div>
                <div className="checkout-artist">
                  <ArtistThumb artist={selectedArtist} style={{width:48,height:48,borderRadius:2,border:"1px solid #2a2a00",flexShrink:0}}/>
                  <div><div style={{fontFamily:"'Anton',sans-serif",fontSize:16,letterSpacing:2,color:"#f5f5f5"}}>{selectedArtist.name}</div><div style={{fontSize:11,color:"#555",letterSpacing:2}}>{selectedArtist.genre}</div></div>
                </div>
                <label className="lbl">Card Number</label><input className="inp" placeholder=".... .... .... ...." value={ccForm.number} onChange={e=>setCcForm(p=>({...p,number:e.target.value}))}/>
                <div className="cc-row">
                  <div><label className="lbl">Expiry</label><input className="inp" placeholder="MM / YY" value={ccForm.exp} onChange={e=>setCcForm(p=>({...p,exp:e.target.value}))}/></div>
                  <div><label className="lbl">CVV</label><input className="inp" placeholder="..." maxLength={4} value={ccForm.cvv} onChange={e=>setCcForm(p=>({...p,cvv:e.target.value}))}/></div>
                  <div></div>
                </div>
                <hr className="divider"/>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#666",marginBottom:4}}><span>Ticket to {selectedArtist.name}</span><span style={{color:"#f5f5f5"}}>$5.00</span></div>
                <div style={{fontSize:10,color:"#444",marginBottom:14}}>$3 artist - $1 tourbus - $1 Live Lives Here</div>
                <div className="no-refund-notice">All sales are final. Tickets are non-refundable.</div>
                <button className="btn btn-primary" onClick={()=>{if(selectedArtist){const date=new Date();setPurchased(p=>{const m=new Map(p);m.set(selectedArtist.id,date);return m;});if(riderUser)riderUser.purchased.set(selectedArtist.id,date);}go(SCREENS.UNLOCKED);}}>Confirm Purchase - $5</button>
              </div>
            )}
            {screen===SCREENS.UNLOCKED&&selectedArtist&&(
              <div className="card fade" style={{textAlign:"center"}}>
                <div className="success-icon">{E.ticket}</div><div className="logo logo-sm">you're on</div>
                <div className="logo-sub">{selectedArtist.name}</div>
                <p className="subtext" style={{margin:"14px 0 26px"}}>You're on the bus. Welcome to {selectedArtist?.name}'s exclusive feed.</p>
                <button className="btn btn-primary" onClick={()=>go(SCREENS.STREAM)}>Go to My Stream -></button>
              </div>
            )}
            {screen===SCREENS.ACCOUNT&&(
              <div className="account-wrap fade">
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
                  <div style={{fontFamily:"'Anton',sans-serif",fontSize:28,letterSpacing:4,color:darkMode?"#e6ff00":"#ff4d1a"}}>@{(riderUser?.username||"rider").toUpperCase()}</div>
                  <button className="account-signout" onClick={()=>go(SCREENS.LANDING)} style={{marginBottom:0}}>Sign Out</button>
                </div>
                <div className="account-section">
                  <div className="account-section-title">Profile</div>
                  <div className="account-row"><div><div className="account-row-label">Username</div><div className="account-row-value">@{riderUser?.username||"rider"}</div></div><button className="account-edit-btn">Edit</button></div>
                  <div className="account-row"><div><div className="account-row-label">Email</div><div className="account-row-value">rider@email.com</div></div><button className="account-edit-btn">Edit</button></div>
                  <div className="account-row"><div><div className="account-row-label">Zip Code</div><div className="account-row-value">90210</div></div><button className="account-edit-btn">Edit</button></div>
                </div>
                <div className="account-section">
                  <div className="account-section-title">Settings</div>
                  <div className="account-row">
                    <div><div className="account-row-label">Appearance</div><div className="account-row-value">{darkMode?"Dark mode":"Light mode"}</div></div>
                    <button onClick={()=>setDarkMode(d=>!d)} style={{background:"transparent",border:"1px solid",borderColor:darkMode?"#2a2a00":"#d0cfc0",borderRadius:1,padding:"6px 10px",cursor:"pointer",fontSize:14,lineHeight:1,color:darkMode?"#e6ff00":"#ff4d1a"}}>{darkMode?E.sun:E.moon}</button>
                  </div>
                </div>
                <div className="account-section">
                  <div className="account-section-title">Payment</div>
                  <div className="account-row"><div><div className="account-row-label">Card on File</div><div className="account-row-value">.... 4242</div></div><button className="account-edit-btn">Update</button></div>
                  <div className="account-row"><div><div className="account-row-label">Total Spent</div><div className="account-row-value">${purchased.size*5}.00</div></div></div>
                </div>
                <div className="account-section">
                  <div className="account-section-title">Tickets</div>
                  {ARTISTS.filter(a=>purchased.has(a.id)&&!offBus[a.name]).map(a=>(
                    <div key={a.id} className="ticket-row">
                      <div className="ticket-color" style={{background:a.color}}></div>
                      <div style={{flex:1}}><div className="ticket-name">{a.name}</div><div className="ticket-genre">{a.genre}</div></div>
                      <div style={{textAlign:"right"}}>
                        <div className="ticket-status">ON THE BUS</div>
                        <div style={{fontSize:9,color:"#444",letterSpacing:1,marginTop:3}}>{purchased.get(a.id)?.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</div>
                      </div>
                    </div>
                  ))}
                  {ARTISTS.filter(a=>purchased.has(a.id)&&!offBus[a.name]).length===0&&(
                    <div style={{fontSize:11,color:"#444",letterSpacing:1}}>No tickets yet. Head to the Station to find an artist.</div>
                  )}
                </div>
                {Object.keys(standby).filter(k=>standby[k]).length>0&&(
                  <div className="account-section">
                    <div className="account-section-title">On Standby</div>
                    {[...ARTISTS,...SPOTIFY_ARTISTS].filter(a=>standby[a.id]).map(a=>(
                      <div key={a.id} className="ticket-row">
                        <div className="ticket-color" style={{background:a.color,opacity:0.4}}></div>
                        <div style={{flex:1}}><div className="ticket-name">{a.name}</div></div>
                        <div style={{textAlign:"right"}}>
                          <div style={{fontFamily:"'Anton',sans-serif",fontSize:9,letterSpacing:2,color:"#555"}}>STANDBY</div>
                          <button style={{fontSize:9,color:"#444",background:"transparent",border:"none",cursor:"pointer",letterSpacing:1,marginTop:4,padding:0}} onClick={()=>toggleStandby(a.id)}>Cancel</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{marginTop:40,paddingTop:24,borderTop:"1px solid #1e1e00"}}>
                  <div style={{fontSize:10,letterSpacing:3,color:"#663333",marginBottom:12,fontFamily:"'Anton',sans-serif"}}>DANGER ZONE</div>
                  <div style={{background:"#110000",border:"1px solid #331111",borderRadius:2,padding:"16px"}}>
                    <div style={{fontSize:12,color:"#884444",marginBottom:12,lineHeight:1.6}}>Closing your account will remove your profile and cancel all standby subscriptions. Your tickets are non-refundable. This action cannot be undone.</div>
                    <button onClick={()=>setCloseRiderAccountModal(true)} style={{fontFamily:"'Anton',sans-serif",fontSize:11,letterSpacing:2,color:"#cc4444",background:"transparent",border:"1px solid #663333",borderRadius:1,padding:"8px 16px",cursor:"pointer"}}>CLOSE MY ACCOUNT</button>
                  </div>
                </div>
              </div>
            )}
            {screen===SCREENS.ARTIST_DASHBOARD&&artistUser&&(
              <div className="dashboard-wrap fade">
                <div className="dashboard-header">
                  <ArtistThumb artist={artistUser} style={{width:56,height:56,borderRadius:2,flexShrink:0}}/>
                  <div><div className="dashboard-name">{artistUser.name}</div><div className="dashboard-genre">{artistUser.genre}</div></div>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginLeft:"auto"}}>
                    <button className="account-signout" style={{width:"auto",marginTop:0,padding:"8px 16px",fontSize:10}} onClick={()=>{setUserMode("rider");setArtistUser(null);go(SCREENS.LANDING);}}>Sign Out</button>
                  </div>
                </div>
                <div className="dashboard-stats">
                  <div className="dash-stat"><div className="dash-stat-num">{artistUser.riders.toLocaleString()}</div><div className="dash-stat-lbl">Total Riders</div></div>
                  <div className="dash-stat"><div className="dash-stat-num">{myArtistPosts.length+artistUser.posts}</div><div className="dash-stat-lbl">Posts</div></div>
                  <div className="dash-stat"><div className="dash-stat-num">${(artistUser.riders*3).toLocaleString()}</div><div className="dash-stat-lbl">Total Earned</div></div>
                </div>

                <div style={{background:darkMode?"#161616":"#ffffff",border:`1px solid ${darkMode?"#2a2a00":"#d0cfc0"}`,borderRadius:2,marginBottom:24,overflow:"hidden"}}>
                  <div onClick={()=>setGrowthOpen(o=>!o)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",cursor:"pointer",userSelect:"none"}}>
                    <div style={{fontSize:10,letterSpacing:3,color:darkMode?"#444":"#8a8aaa",fontFamily:"'Anton',sans-serif"}}>RIDER GROWTH</div>
                    <div style={{fontSize:20,color:darkMode?"#e6ff00":"#0e0e0e",transition:"transform 0.2s",transform:growthOpen?"rotate(180deg)":"rotate(0deg)"}}>&#9662;</div>
                  </div>
                  {growthOpen&&(
                    <>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",borderTop:`1px solid ${darkMode?"#1e1e00":"#e0dfd0"}`,borderBottom:`1px solid ${darkMode?"#1e1e00":"#e0dfd0"}`}}>
                        <div style={{padding:"6px 12px",fontSize:9,letterSpacing:2,color:darkMode?"#444":"#8a8aaa",fontFamily:"'Anton',sans-serif",textAlign:"center",borderRight:`1px solid ${darkMode?"#1e1e00":"#e0dfd0"}`}}>PERIOD</div>
                        <div style={{padding:"6px 12px",fontSize:9,letterSpacing:2,color:darkMode?"#444":"#8a8aaa",fontFamily:"'Anton',sans-serif",textAlign:"center",borderRight:`1px solid ${darkMode?"#1e1e00":"#e0dfd0"}`}}>NEW RIDERS</div>
                        <div style={{padding:"6px 12px",fontSize:9,letterSpacing:2,color:darkMode?"#444":"#8a8aaa",fontFamily:"'Anton',sans-serif",textAlign:"center"}}>EARNED</div>
                      </div>
                      {[
                        {label:"Month to Date", riders: Math.round(artistUser.riders*0.08)},
                        {label:"Year to Date",  riders: Math.round(artistUser.riders*0.31)},
                        {label:"All Time",      riders: artistUser.riders},
                      ].map((row,i,arr)=>(
                        <div key={row.label} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",borderBottom:i<arr.length-1?`1px solid ${darkMode?"#1e1e00":"#e0dfd0"}`:"none"}}>
                          <div style={{padding:"14px 12px",fontSize:11,color:darkMode?"#666":"#5a5a7a",letterSpacing:1,borderRight:`1px solid ${darkMode?"#1e1e00":"#e0dfd0"}`}}>{row.label}</div>
                          <div style={{padding:"14px 12px",textAlign:"center",borderRight:`1px solid ${darkMode?"#1e1e00":"#e0dfd0"}`}}>
                            <div style={{fontFamily:"'Anton',sans-serif",fontSize:18,color:darkMode?"#e6ff00":"#ff4d1a",letterSpacing:1}}>{row.riders.toLocaleString()}</div>
                            <div style={{fontSize:9,color:darkMode?"#444":"#8a8aaa",letterSpacing:1,marginTop:2}}>riders</div>
                          </div>
                          <div style={{padding:"14px 12px",textAlign:"center"}}>
                            <div style={{fontFamily:"'Anton',sans-serif",fontSize:18,color:darkMode?"#e6ff00":"#ff4d1a",letterSpacing:1}}>${(row.riders*3).toLocaleString()}</div>
                            <div style={{fontSize:9,color:darkMode?"#444":"#8a8aaa",letterSpacing:1,marginTop:2}}>@ $3 / rider</div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
                <div style={{display:"flex",gap:10,marginBottom:20}}>
                  <button className="btn btn-primary" style={{marginBottom:0,flex:1}} onClick={()=>go(SCREENS.NEW_POST)}>+ Create New Post</button>
                  <button onClick={()=>setGoLiveModal(true)} style={{flex:1,fontFamily:"'Anton',sans-serif",fontSize:13,letterSpacing:2,color:"#fff",background:"#cc0000",border:"none",borderRadius:1,padding:"12px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                    <span style={{width:8,height:8,borderRadius:"50%",background:"#fff",display:"inline-block",boxShadow:"0 0 6px #fff"}}/>
                    GO LIVE
                  </button>
                </div>

                <div style={{fontSize:10,letterSpacing:3,color:darkMode?"#444":"#8a8aaa",marginBottom:12,fontFamily:"'Anton',sans-serif"}}>YOUR PROFILE</div>
                <div className="account-section" style={{marginBottom:24}}>
                  {!editingProfile?(
                    <>
                      <div className="tour-toggle">
                        <div>
                          <div className="tour-toggle-label">On Tour</div>
                          <div className={`tour-toggle-status${getArtistProfile(artistUser).onTour?" on-tour":""}`} style={{marginTop:4}}>{getArtistProfile(artistUser).onTour?E.bus+" Currently on tour":"Not currently on tour"}</div>
                        </div>
                      </div>
                      <div className="account-row">
                        <div style={{flex:1}}>
                          <div className="account-row-label">Bio</div>
                          <div style={{fontSize:13,color:"#888",marginTop:4,lineHeight:1.6}}>{getArtistProfile(artistUser).bio||<span style={{color:"#333",fontStyle:"italic"}}>No bio yet</span>}</div>
                        </div>
                      </div>
                      <div className="account-row">
                        <div style={{flex:1}}>
                          <div className="account-row-label">Spotify</div>
                          <div style={{fontSize:13,color: getArtistProfile(artistUser).spotify?"#1db954":"#333",marginTop:4}}>{getArtistProfile(artistUser).spotify||"--"}</div>
                        </div>
                      </div>
                      <div className="account-row" style={{borderBottom:"none"}}>
                        <div style={{flex:1}}>
                          <div className="account-row-label">Website</div>
                          <div style={{fontSize:13,color: getArtistProfile(artistUser).website?darkMode?"#e6ff00":"#ff4d1a":"#333",marginTop:4}}>{getArtistProfile(artistUser).website||"--"}</div>
                        </div>
                      </div>
                      <button className="btn btn-outline" style={{marginTop:16,fontSize:12,padding:"10px",letterSpacing:2}} onClick={()=>{const p=getArtistProfile(artistUser);setProfileDraft({bio:p.bio,spotify:p.spotify,website:p.website,onTour:p.onTour});setEditingProfile(true);}}>Edit Profile</button>
                    </>
                  ):(
                    <>
                      <div className="tour-toggle" style={{marginBottom:8}}>
                        <div>
                          <div className="tour-toggle-label">On Tour</div>
                          <div className={`tour-toggle-status${profileDraft.onTour?" on-tour":""}`} style={{marginTop:4}}>{profileDraft.onTour?E.bus+" Currently on tour":"Not currently on tour"}</div>
                        </div>
                        <div className="toggle-switch" onClick={()=>setProfileDraft(p=>({...p,onTour:!p.onTour}))}>
                          <div className={`toggle-track${profileDraft.onTour?" on":""}`}>
                            <div className="toggle-thumb"></div>
                          </div>
                        </div>
                      </div>
                      <label className="lbl">Bio</label>
                      <textarea className="inp" style={{height:100}} placeholder="Tell your riders about yourself..." value={profileDraft.bio} onChange={e=>setProfileDraft(p=>({...p,bio:e.target.value.slice(0,300)}))}/>
                      <div className="char-count">{profileDraft.bio.length}/300</div>
                      <label className="lbl">Spotify URL</label>
                      <input className="inp" placeholder="https://open.spotify.com/artist/..." value={profileDraft.spotify} onChange={e=>setProfileDraft(p=>({...p,spotify:e.target.value}))}/>
                      <label className="lbl">Website</label>
                      <input className="inp" placeholder="https://yoursite.com" value={profileDraft.website} onChange={e=>setProfileDraft(p=>({...p,website:e.target.value}))}/>
                      <div style={{display:"flex",gap:10,marginTop:16}}>
                        <button className="btn btn-primary" style={{marginBottom:0}} onClick={handleSaveProfile}>Save Profile</button>
                        <button className="btn btn-ghost" style={{flex:"none"}} onClick={()=>setEditingProfile(false)}>Cancel</button>
                      </div>
                    </>
                  )}
                </div>

                <div style={{marginTop:32,paddingTop:24,borderTop:`1px solid ${darkMode?"#1e1e00":"#e0dfd0"}`,marginBottom:24}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
                    <div style={{fontFamily:"'Anton',sans-serif",fontSize:13,letterSpacing:3,color:darkMode?"#e6ff00":"#ff4d1a"}}>RECOS</div>
                    <div style={{fontSize:10,color:"#555",letterSpacing:1}}>{(artistRecos[artistUser?.id]||[]).length}/5</div>
                  </div>
                  <div style={{fontSize:11,color:"#555",letterSpacing:0.5,marginBottom:12,lineHeight:1.6}}>Spotlight up to 5 artists you love -- on tourbus or not.</div>
                  <div className="reco-grid">
                    {(artistRecos[artistUser?.id]||[]).map(a=>(
                      <div key={a.id} className="reco-chip">
                        <ArtistThumb artist={a} className="reco-chip-avatar"/>
                        <div className="reco-chip-name">{a.name}</div>
                        <button className="reco-chip-remove" onClick={()=>setArtistRecos(p=>({...p,[artistUser.id]:(p[artistUser.id]||[]).filter(r=>r.id!==a.id)}))}>&#10005;</button>
                      </div>
                    ))}
                    {(artistRecos[artistUser?.id]||[]).length<5&&(
                      <div className="reco-chip" onClick={()=>document.querySelector('.reco-search-input')?.focus()}>
                        <div className="reco-chip-avatar" style={{display:"flex",alignItems:"center",justifyContent:"center",background:"transparent",border:`1px dashed ${darkMode?"#3a3a00":"#c0c0b0"}`,color:darkMode?"#444":"#aaa",fontSize:22,cursor:"pointer"}}>+</div>
                        <div className="reco-chip-name" style={{color:darkMode?"#444":"#aaa"}}>add</div>
                      </div>
                    )}
                  </div>
                  {(artistRecos[artistUser?.id]||[]).length<5&&(
                    <div style={{marginTop:10,position:"relative"}}>
                      <input className="inp reco-search-input" style={{marginBottom:0}} placeholder="Search any artist..." value={recoSearch}
                        onChange={e=>{setRecoSearch(e.target.value);setRecoSearchActive(true);}}
                        onFocus={()=>setRecoSearchActive(true)}
                        onBlur={()=>setTimeout(()=>setRecoSearchActive(false),150)}
                      />
                      {recoSearchActive&&recoSearch.trim().length>1&&(()=>{
                        const existing=new Set((artistRecos[artistUser?.id]||[]).map(r=>r.id));
                        const results=[...ARTISTS,...SPOTIFY_ARTISTS].filter(a=>a.id!==artistUser?.id&&!existing.has(a.id)&&a.name.toLowerCase().includes(recoSearch.toLowerCase())).slice(0,6);
                        return results.length>0&&(
                          <div className="reco-search-results">
                            {results.map(a=>(
                              <div key={a.id} className="reco-result" onMouseDown={()=>{setArtistRecos(p=>({...p,[artistUser.id]:[...(p[artistUser.id]||[]),a]}));setRecoSearch("");setRecoSearchActive(false);}}>
                                <ArtistThumb artist={a} style={{width:28,height:28,borderRadius:1,flexShrink:0}}/>
                                <div style={{flex:1}}>
                                  <div className="reco-result-name">{a.name}</div>
                                  {a.genre&&<div className="reco-result-genre">{a.genre}</div>}
                                </div>
                                {!a.active&&<span style={{fontFamily:"'Anton',sans-serif",fontSize:8,letterSpacing:1,color:"#555",border:"1px solid #2a2a00",padding:"1px 5px",borderRadius:1}}>NOT ON TOURBUS</span>}
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>

                <div style={{fontSize:10,letterSpacing:3,color:darkMode?"#444":"#8a8aaa",marginBottom:12,fontFamily:"'Anton',sans-serif"}}>TOP CLAPPERS</div>
                <div style={{background:darkMode?"#161616":"#ffffff",border:`1px solid ${darkMode?"#2a2a00":"#d0cfc0"}`,borderRadius:2,marginBottom:24,overflow:"hidden"}}>
                  {MOCK_CLAPPERS.slice(0,5).map((r,i)=>(
                    <div key={r.username} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",borderBottom:i<4?`1px solid ${darkMode?"#1e1e00":"#e0dfd0"}`:"none"}}>
                      <div style={{fontFamily:"'Anton',sans-serif",fontSize:11,color:darkMode?"#444":"#8a8aaa",width:16,textAlign:"right"}}>{i+1}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:12,color:darkMode?"#f5f5f5":"#1a1a2e",letterSpacing:0.5}}>@{r.username}</div>
                        <div style={{fontSize:9,color:darkMode?"#444":"#8a8aaa",letterSpacing:1,marginTop:2}}>rider since {r.purchased.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontSize:10,color:darkMode?"#e6ff00":"#ff4d1a",fontFamily:"'Anton',sans-serif",letterSpacing:1}}>{E.clap}</div>
                        <div style={{fontSize:9,color:darkMode?"#444":"#8a8aaa",letterSpacing:1,marginTop:3}}>{r.zip}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{fontSize:10,letterSpacing:3,color:darkMode?"#444":"#8a8aaa",marginBottom:12,fontFamily:"'Anton',sans-serif"}}>RECENT POSTS</div>
                <div className="post-list">
                  {myArtistPosts.length===0&&<div style={{fontSize:12,color:"#333",letterSpacing:1,padding:"20px 0",textAlign:"center"}}>No posts yet. Create your first one.</div>}
                  {myArtistPosts.map(p=>(
                    <div key={p.id} className="post-list-item" style={{flexDirection:"column",alignItems:"stretch",gap:10}}>
                      <div style={{display:"flex",alignItems:"center",gap:12}}>
                        <div className="post-list-thumb" style={{background:p.color}}>
                          {p.previewUrl?<img src={p.previewUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:1}}/>:<span>{p.type==="photo"?E.photo:E.video}</span>}
                        </div>
                        <div style={{flex:1}}>
                          <div className="post-list-label">{p.label}</div>
                          <div className="post-list-likes" style={{cursor:"pointer",display:"inline-block"}} onClick={()=>setClapModal(p)}>{E.clap} {(likes[p.id]?.count||0).toLocaleString()} <span style={{fontSize:9,color:"#555",letterSpacing:1}}>SEE RIDERS</span></div>
                        </div>
                        <div className="post-list-meta">{p.time}<br/>{p.type.toUpperCase()}</div>
                      </div>
                      {editingPost?.id===p.id?(
                        <div>
                          <textarea className="inp" style={{height:80,marginBottom:4}} value={editPostCaption} onChange={e=>setEditPostCaption(e.target.value.slice(0,1340))}/>
                          <div className="char-count" style={{marginBottom:8}}>{editPostCaption.length}/1340</div>
                          <div style={{display:"flex",gap:8}}>
                            <button className="btn btn-primary" style={{marginBottom:0,padding:"8px",fontSize:12}} onClick={handleSaveEditPost}>Save</button>
                            <button className="btn btn-ghost" style={{padding:"8px"}} onClick={()=>{setEditingPost(null);setEditPostCaption("");}}>Cancel</button>
                          </div>
                        </div>
                      ):(
                        <div style={{display:"flex",gap:8,borderTop:"1px solid #1e1e00",paddingTop:8}}>
                          <button style={{fontFamily:"'Anton',sans-serif",fontSize:10,letterSpacing:2,color:"#555",background:"transparent",border:"1px solid #2a2a00",borderRadius:1,padding:"5px 12px",cursor:"pointer",transition:"all 0.2s"}} onMouseOver={e=>e.target.style.color=darkMode?"#e6ff00":"#ff4d1a"} onMouseOut={e=>e.target.style.color="#555"} onClick={()=>{setEditingPost(p);setEditPostCaption(p.label);}}>Edit</button>
                          <button style={{fontFamily:"'Anton',sans-serif",fontSize:10,letterSpacing:2,color:"#663333",background:"transparent",border:"1px solid #331111",borderRadius:1,padding:"5px 12px",cursor:"pointer",transition:"all 0.2s"}} onMouseOver={e=>e.target.style.color="#ff6633"} onMouseOut={e=>e.target.style.color="#663333"} onClick={()=>setConfirmDeletePost(p)}>Delete</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div style={{marginTop:40,paddingTop:24,borderTop:"1px solid #1e1e00"}}>
                  <div style={{fontSize:10,letterSpacing:3,color:"#663333",marginBottom:12,fontFamily:"'Anton',sans-serif"}}>DANGER ZONE</div>
                  <div style={{background:"#110000",border:"1px solid #331111",borderRadius:2,padding:"16px"}}>
                    <div style={{fontSize:12,color:"#884444",marginBottom:12,lineHeight:1.6}}>Closing your artist account will remove your profile and posts from tourbus. Your riders will lose access to your feed. This action cannot be undone.</div>
                    <button onClick={()=>setCloseAccountModal(true)} style={{fontFamily:"'Anton',sans-serif",fontSize:11,letterSpacing:2,color:"#cc4444",background:"transparent",border:"1px solid #663333",borderRadius:1,padding:"8px 16px",cursor:"pointer"}}>CLOSE MY ARTIST ACCOUNT</button>
                  </div>
                </div>
              </div>
            )}

            {closeRiderAccountModal&&(
              <div className="modal-overlay">
                <div className="modal">
                  <div className="modal-title" style={{color:"#cc4444"}}>Close Your Account?</div>
                  <p className="modal-desc">This will permanently close <strong style={{color:"#f5f5f5"}}>@{riderUser?.username||"rider"}</strong>'s account. Your tickets are non-refundable and your standby subscriptions will be cancelled. This cannot be undone.</p>
                  <div className="modal-btns">
                    <button className="btn btn-primary" style={{background:"#330000",color:"#ff4444",boxShadow:"none",marginBottom:0}} onClick={()=>{setCloseRiderAccountModal(false);setRiderUser(null);setUserMode("rider");go(SCREENS.RIDER_CLOSED);}}>Yes, Close My Account</button>
                    <button className="btn btn-ghost" onClick={()=>setCloseRiderAccountModal(false)}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
            {goLiveModal&&(
              <div className="modal-overlay">
                <div className="modal" style={{textAlign:"center"}}>
                  <div style={{fontSize:36,marginBottom:12}}>{E.red}</div>
                  <div className="modal-title">Ready to go live?</div>
                  <p className="modal-desc">Your riders will be notified that you're streaming. You can end the stream at any time.</p>
                  <div className="modal-btns">
                    <button className="btn btn-primary" style={{marginBottom:0,background:"#cc0000",boxShadow:"none"}} onClick={()=>{setGoLiveModal(false);setIsLive(true);go(SCREENS.ARTIST_LIVE);}}>Yes, Go Live</button>
                    <button className="btn btn-ghost" onClick={()=>setGoLiveModal(false)}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
            {closeAccountModal&&(
              <div className="modal-overlay">
                <div className="modal">
                  <div className="modal-title" style={{color:"#cc4444"}}>Close Artist Account?</div>
                  <p className="modal-desc">This will permanently close <strong style={{color:"#f5f5f5"}}>{artistUser?.name}</strong>'s tourbus account. Your riders will lose access to your feed and your posts will be removed. This cannot be undone.</p>
                  <div className="modal-btns">
                    <button className="btn btn-primary" style={{background:"#330000",color:"#ff4444",boxShadow:"none",marginBottom:0}} onClick={()=>{setCloseAccountModal(false);setArtistUser(null);setUserMode("rider");go(SCREENS.ARTIST_CLOSED);}}>Yes, Close My Account</button>
                    <button className="btn btn-ghost" onClick={()=>setCloseAccountModal(false)}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
            {clapModal&&(
              <div className="modal-overlay" onClick={()=>setClapModal(null)}>
                <div className="modal" onClick={e=>e.stopPropagation()} style={{maxHeight:"80vh",overflowY:"auto"}}>
                  <div className="modal-title">{E.clap} Riders Who Clapped</div>
                  <p style={{fontSize:11,color:darkMode?"#555":"#7a7a9a",letterSpacing:1,marginBottom:16,lineHeight:1.5}}>{clapModal.label.slice(0,60)}{clapModal.label.length>60?"...":""}</p>
                  {MOCK_CLAPPERS.map((r,i)=>(
                    <div key={r.username} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:i<MOCK_CLAPPERS.length-1?`1px solid ${darkMode?"#1e1e00":"#e0dfd0"}`:"none"}}>
                      <div style={{fontFamily:"'Anton',sans-serif",fontSize:11,color:darkMode?"#444":"#8a8aaa",width:20,textAlign:"right"}}>{i+1}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:12,color:darkMode?"#f5f5f5":"#1a1a2e",letterSpacing:0.5}}>@{r.username}</div>
                        <div style={{fontSize:9,color:darkMode?"#444":"#8a8aaa",letterSpacing:1,marginTop:2}}>rider since {r.purchased.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</div>
                      </div>
                      <div style={{fontSize:9,color:darkMode?"#444":"#8a8aaa",letterSpacing:1}}>{r.zip}</div>
                    </div>
                  ))}
                  <div className="modal-btns" style={{marginTop:16}}>
                    <button className="btn btn-ghost" onClick={()=>setClapModal(null)}>Close</button>
                  </div>
                </div>
              </div>
            )}
            {confirmDeletePost&&(
              <div className="modal-overlay">
                <div className="modal">
                  <div className="modal-title">Delete this post?</div>
                  <p className="modal-desc">"{confirmDeletePost.label}" will be permanently removed from your feed and your riders' streams.</p>
                  <div className="modal-btns">
                    <button className="btn btn-primary" style={{background:"#331100",color:"#ff6633",boxShadow:"none",marginBottom:0}} onClick={()=>handleDeletePost(confirmDeletePost.id)}>Delete</button>
                    <button className="btn btn-ghost" onClick={()=>setConfirmDeletePost(null)}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
            {screen===SCREENS.ARTIST_LIVE&&artistUser&&(
              <div className="fade" style={{width:"100%",maxWidth:"min(560px,100%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"70vh",textAlign:"center",gap:24,paddingBottom:80}}>
                <div style={{position:"relative",display:"inline-flex",alignItems:"center",justifyContent:"center"}}>
                  <div style={{width:220,height:220,borderRadius:"50%",background:"#1a0000",border:"2px solid #ff2222",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 40px 10px rgba(255,30,30,0.4)",animation:"live-glow 1.4s ease-in-out infinite",overflow:"hidden",position:"relative"}}>
                    <video ref={el=>{videoRef.current=el; if(el&&cameraStreamRef.current){el.srcObject=cameraStreamRef.current;el.play().catch(()=>{});}}} autoPlay playsInline muted style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%",transform:"scaleX(-1)"}}/>
                    <div style={{position:"absolute",inset:0,borderRadius:"50%",border:"2px solid rgba(255,30,30,0.3)"}}/>
                  </div>
                  <div className="live-badge" style={{position:"absolute",top:4,left:"50%",transform:"translateX(-50%)",fontSize:9,padding:"2px 8px"}}>LIVE</div>
                </div>
                <div>
                  <div style={{fontFamily:"'Anton',sans-serif",fontSize:32,letterSpacing:4,color:"#ff2222",marginBottom:6}}>YOU ARE LIVE</div>
                  <div style={{fontFamily:"'Inter',sans-serif",fontSize:13,color:"#666",letterSpacing:1}}>{artistUser.riders.toLocaleString()} riders can see you right now</div>
                </div>
                <div style={{background:"#161616",border:"1px solid #2a2a00",borderRadius:2,padding:"20px 32px",width:"100%"}}>
                  <div style={{fontSize:10,color:"#444",letterSpacing:3,fontFamily:"'Anton',sans-serif",marginBottom:16}}>STREAMING AS</div>
                  <div style={{fontFamily:"'Anton',sans-serif",fontSize:22,color:"#f5f5f5",letterSpacing:2,marginBottom:4}}>{artistUser.name}</div>
                  <div style={{fontSize:10,color:"#555",letterSpacing:2}}>{artistUser.genre.toUpperCase()}</div>
                </div>
                <div style={{fontSize:11,color:"#444",letterSpacing:1,fontFamily:"'Inter',sans-serif",lineHeight:1.7,maxWidth:360}}>
                  Livestream duration limits are coming soon. For now, stream as long as you need.
                </div>
                <button onClick={()=>{setIsLive(false);go(SCREENS.ARTIST_DASHBOARD);}} style={{fontFamily:"'Anton',sans-serif",fontSize:12,letterSpacing:2,color:"#ff4444",background:"#1a0000",border:"1px solid #663333",borderRadius:1,padding:"16px 48px",cursor:"pointer"}}>
                  END STREAM
                </button>
              </div>
            )}
            {screen===SCREENS.NEW_POST&&artistUser&&(
              <div className="new-post-wrap fade">
                <button className="back" onClick={()=>go(SCREENS.ARTIST_DASHBOARD)}>Back to Dashboard</button>
                <div style={{fontFamily:"'Anton',sans-serif",fontSize:28,letterSpacing:4,color:darkMode?"#e6ff00":"#ff4d1a",marginBottom:24}}>NEW POST</div>
                <div style={{fontSize:10,letterSpacing:3,color:"#555",marginBottom:10,fontFamily:"'Anton',sans-serif"}}>POST TYPE</div>
                <div className="post-type-row">
                  <button className={`post-type-btn${postType==="photo"?" selected":""}`} onClick={()=>setPostType("photo")}><div className="post-type-icon">{E.photo}</div><div className="post-type-label">PHOTO</div></button>
                  <button className={`post-type-btn${postType==="video"?" selected":""}`} onClick={()=>setPostType("video")}><div className="post-type-icon">{E.video}</div><div className="post-type-label">VIDEO</div></button>
                </div>
                <div style={{fontSize:10,letterSpacing:3,color:"#555",marginBottom:10,fontFamily:"'Anton',sans-serif"}}>UPLOAD {postType.toUpperCase()}</div>
                <div className={`upload-zone${postPreviewUrl?" has-file":""}`} onClick={()=>fileInputRef.current?.click()}>
                  <input ref={fileInputRef} type="file" accept={postType==="photo"?"image/*":"video/*"} onChange={handleFileChange} style={{display:"none"}}/>
                  {postPreviewUrl?(
                    postType==="photo"?<img src={postPreviewUrl} alt="preview" className="upload-preview"/>
                    :<div style={{width:"100%",aspectRatio:"16/9",background:"#1a1a00",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:8,borderRadius:2}}><span style={{fontSize:32}}>{E.video}</span><span style={{fontSize:11,color:"#888",letterSpacing:1}}>{postFile?.name}</span></div>
                  ):(
                    <div><div className="upload-placeholder-icon">{postType==="photo"?E.img:E.vidcam}</div><div className="upload-placeholder-text">Click to upload {postType}</div><div className="upload-placeholder-sub">{postType==="photo"?"JPG, PNG, WEBP / Max 20MB":"MP4, MOV - Max 500MB"}</div></div>
                  )}
                </div>
                <div style={{fontSize:10,letterSpacing:3,color:"#555",marginBottom:10,fontFamily:"'Anton',sans-serif"}}>CAPTION</div>
                <textarea className="inp" placeholder="Insert genius-level post content here. Or don't. Your call." value={postCaption} onChange={e=>setPostCaption(e.target.value.slice(0,1340))}/>
                <div className="char-count">{postCaption.length}/1340</div>
                {postCaption.trim()&&(
                  <>
                    <div style={{fontSize:10,letterSpacing:3,color:"#555",margin:"20px 0 10px",fontFamily:"'Anton',sans-serif"}}>PREVIEW</div>
                    <div className="post-preview">
                      <div style={{padding:"12px 14px",display:"flex",alignItems:"center",gap:10}}>
                        <div style={{width:32,height:32,borderRadius:2,background:artistUser.color,border:"1px solid #2a2a00"}}></div>
                        <div style={{fontFamily:"'Anton',sans-serif",fontSize:14,letterSpacing:1}}>{artistUser.name}</div>
                        <div style={{fontSize:10,color:"#444",marginLeft:"auto",letterSpacing:1}}>just now</div>
                      </div>
                      <div style={{width:"100%",aspectRatio:"16/9",background:artistUser.color,display:"flex",alignItems:"center",justifyContent:"center",borderTop:"1px solid #1e1e00",overflow:"hidden"}}>
                        {postPreviewUrl&&postType==="photo"?<img src={postPreviewUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontSize:36}}>{postType==="photo"?E.photo:E.video}</span>}
                      </div>
                      <div style={{padding:"10px 14px",fontSize:13,color:"#aaa",letterSpacing:1}}>{postCaption}</div>
                    </div>
                  </>
                )}
                <button className="btn btn-primary" style={{marginTop:20,opacity:postCaption.trim()?1:0.4}} onClick={handlePublishPost} disabled={!postCaption.trim()}>Publish Post</button>
                <button className="btn btn-ghost" onClick={()=>go(SCREENS.ARTIST_DASHBOARD)}>Cancel</button>
              </div>
            )}
            {screen===SCREENS.TAG_FEED&&activeTag&&(()=>{
              // Collate all posts across feedPosts that have this tag
              const taggedPosts = feedPosts.filter(p=>tags[p.id]&&tags[p.id][activeTag]);
              const sorted = [...taggedPosts].sort((a,b)=>(amps[b.id]?.count||0)-(amps[a.id]?.count||0));
              return (
                <div className="fade" style={{width:"100%",maxWidth:"min(560px,100%)",display:"flex",flexDirection:"column",alignItems:"center"}}>
                  <button className="profile-back" onClick={()=>go(SCREENS.STREAM)}>Back to My Stream</button>
                  <div style={{fontFamily:"'Anton',sans-serif",fontSize:36,letterSpacing:4,color:darkMode?"#e6ff00":"#ff4d1a",marginBottom:4}}>#{activeTag}</div>
                  <div style={{fontSize:10,color:"#555",letterSpacing:3,fontFamily:"'Anton',sans-serif",marginBottom:24}}>{sorted.length} POST{sorted.length!==1?"S":""}</div>
                  {sorted.length===0&&<div style={{color:"#555",fontFamily:"'Inter',sans-serif",fontSize:13}}>No posts tagged with #{activeTag} yet.</div>}
                  {sorted.map(p=>{
                    const artist = ARTISTS.find(a=>a.name===p.artist);
                    const isUnlocked = p.isTourbus || (artist && purchased.has(artist.id) && !offBus[p.artist]);
                    return (
                      <div key={p.id} style={{width:"100%",background:"#161616",border:"1px solid #2a2a00",borderRadius:2,marginBottom:16,overflow:"hidden"}}>
                        <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px"}}>
                          {p.isTourbus
                            ? <div style={{width:32,height:32,borderRadius:2,background:darkMode?"#0e0e0e":"#ffffff",border:`2px solid ${darkMode?"#e6ff00":"#0e0e0e"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontFamily:"'Caveat',cursive",fontSize:16,color:darkMode?"#e6ff00":"#0e0e0e",lineHeight:1}}>tb</span></div>
                            : artist?<ArtistThumb artist={artist} style={{width:32,height:32,borderRadius:2,border:"1px solid #3a3a00",flexShrink:0}}/>:<div style={{width:32,height:32,background:"#1a1a1a",borderRadius:2,flexShrink:0}}/>
                          }
                          <div style={{flex:1}}>
                            <div style={{fontFamily:"'Anton',sans-serif",fontSize:13,letterSpacing:1,color:darkMode?"#f5f5f5":"#1a1a2e"}}>{p.artist}</div>
                            <div style={{fontSize:10,color:"#555",letterSpacing:1}}>{p.time}</div>
                          </div>
                        </div>
                        <div style={{width:"100%",aspectRatio:"16/9",background:p.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:64,position:"relative",overflow:"hidden",filter:isUnlocked?"none":"blur(8px)"}}>
                          {p.previewUrl?<img src={p.previewUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:
                            <span>{p.type==="photo"?E.photo:E.video}</span>}
                        </div>
                        <div style={{padding:"10px 14px 4px",fontSize:13,color:darkMode?"#aaa":"#3a3a5a",fontFamily:"'Inter',sans-serif",lineHeight:1.6}}>{parseCaption(p.label)}</div>
                        {!isUnlocked&&(
                          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",background:darkMode?"#0e0e0e":"#f4f4f0",borderTop:`1px solid ${darkMode?"#2a2a00":"#e0dfd0"}`}}>
                            <div style={{fontSize:11,color:"#555",letterSpacing:1,fontFamily:"'Anton',sans-serif"}}>Ride {p.artist} to see photos & videos</div>
                            <button className="btn btn-primary" style={{width:"auto",padding:"6px 16px",fontSize:11,letterSpacing:2,marginBottom:0}} onClick={()=>{setSelectedArtist(artist);go(SCREENS.CHECKOUT);}}>Ride -></button>
                          </div>
                        )}
                        <div style={{display:"flex",alignItems:"center",gap:16,padding:"8px 14px 12px"}}>
                          <button className={`like-btn${likes[p.id]?.liked?" liked":""}`} onClick={()=>toggleLike(p.id)}>{E.clap} {(likes[p.id]?.count||0).toLocaleString()}</button>
                          <button className={`like-btn${amps[p.id]?.amped?" liked":""}`} onClick={()=>toggleAmp(p.id)}>{E.fire} {(amps[p.id]?.count||0).toLocaleString()}</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}

            {screen===SCREENS.TOURBUS_PROFILE&&(
              <div className="fade" style={{width:"100%",maxWidth:"min(560px,100%)",display:"flex",flexDirection:"column",alignItems:"center"}}>
                <button className="profile-back" onClick={()=>go(SCREENS.STREAM)}>Back to My Stream</button>
                {/* Header */}
                <div className="profile-header" style={{width:"100%"}}>
                  <div style={{width:"100%",maxWidth:"min(240px,100%)",height:160,borderRadius:2,background:"#0e0e0e",border:`2px solid ${darkMode?"#e6ff00":"#0e0e0e"}`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14}}>
                    <span style={{fontFamily:"'Caveat',cursive",fontSize:52,color:darkMode?"#e6ff00":"#0e0e0e",letterSpacing:-2,fontWeight:700}}>tourbus</span>
                  </div>
                  <div className="profile-name" style={{fontFamily:"'Caveat',cursive",letterSpacing:-1,color:darkMode?"#e6ff00":"#0e0e0e"}}>tourbus</div>
                  <div className="profile-genre">The Official tourbus Channel</div>
                  <p className="profile-bio">Artist spotlights, platform news, and exclusive editorial content. Always free. Always on your bus.</p>
                  <div className="profile-stats" style={{justifyContent:"center"}}>
                    <div className="stat"><div className="stat-num">{TOURBUS_STATS.tags.toLocaleString()}</div><div className="stat-lbl">Tags</div></div>
                  </div>
                </div>
                {/* Posts */}
                <div style={{width:"100%",marginTop:20,paddingTop:20,borderTop:`1px solid ${darkMode?"#1e1e00":"#e0dfd0"}`}}>
                  <div style={{fontSize:10,letterSpacing:3,color:"#444",marginBottom:12,fontFamily:"'Anton',sans-serif"}}>POSTS</div>
                  {feedPosts.filter(p=>p.isTourbus).map(p=>(
                    <div key={p.id} className="feed-post" style={{marginBottom:16,width:"100%"}}>
                      <div className="feed-post-header">
                        <div style={{width:32,height:32,borderRadius:2,background:darkMode?"#0e0e0e":"#ffffff",border:`2px solid ${darkMode?"#e6ff00":"#0e0e0e"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                          <span style={{fontFamily:"'Caveat',cursive",fontSize:16,color:darkMode?"#e6ff00":"#0e0e0e",lineHeight:1}}>tb</span>
                        </div>
                        <div><div className="feed-post-artist tourbus-author">tourbus</div><div className="feed-post-time">{p.time}</div></div>
                      </div>
                      {(p.type==="photo"||p.type==="video")&&(
                        <div className="feed-post-thumb" style={{background:"#111"}}>
                          <span style={{fontSize:64}}>{p.type==="photo"?E.photo:E.video}</span>
                        </div>
                      )}
                      <div className="tourbus-post-thumb">
                        <div className="tourbus-post-text">{parseCaption(p.label)}</div>
                      </div>
                      <div className="feed-post-footer">
                        <button className={`like-btn${likes[p.id]?.liked?" liked":""}`} onClick={()=>toggleLike(p.id)}>{E.clap} {(likes[p.id]?.count||0).toLocaleString()}</button>
                        <button className={`like-btn${amps[p.id]?.amped?" liked":""}`} onClick={()=>toggleAmp(p.id)}>{E.fire} {(amps[p.id]?.count||0).toLocaleString()}</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{textAlign:"center",padding:"12px 0",fontSize:11,color:darkMode?"#3a5a00":"#5a7a5a",letterSpacing:2,fontFamily:"'Anton',sans-serif"}}>&#10003; YOU'RE ON THIS BUS</div>
                <div style={{textAlign:"center",marginTop:8}}>
                  <span style={{fontSize:10,color:"#333",letterSpacing:1,cursor:"pointer",fontFamily:"'Anton',sans-serif"}} onClick={()=>go(SCREENS.TOURBUS_DASHBOARD)}>Admin -></span>
                </div>
              </div>
            )}

            {screen===SCREENS.TOURBUS_DASHBOARD&&(
              <div className="fade" style={{width:"100%",maxWidth:"min(560px,100%)"}}>
                <button className="profile-back" onClick={()=>go(SCREENS.TOURBUS_PROFILE)}>Back to Public Page</button>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
                  <div style={{fontFamily:"'Caveat',cursive",fontSize:38,color:darkMode?"#e6ff00":"#0e0e0e",letterSpacing:-2}}>tourbus</div>
                  <button className="nav-post-btn" onClick={()=>setTourbusNewPost(true)}>+ New Post</button>
                </div>
                <div style={{fontSize:10,letterSpacing:3,color:"#555",marginBottom:24,fontFamily:"'Anton',sans-serif"}}>ADMIN DASHBOARD</div>

                {/* New Post Form */}
                {tourbusNewPost&&(
                  <div style={{background:darkMode?"#161616":"#ffffff",border:`1px solid ${darkMode?"#2a2a00":"#d0cfc0"}`,borderRadius:2,padding:20,marginBottom:24}}>
                    <div style={{fontFamily:"'Anton',sans-serif",fontSize:13,letterSpacing:3,color:darkMode?"#e6ff00":"#ff4d1a",marginBottom:16}}>NEW TOURBUS POST</div>
                    <div className="post-type-row">
                      <button className={`post-type-btn${postType==="photo"?" selected":""}`} onClick={()=>setPostType("photo")}><div className="post-type-icon">{E.photo}</div><div className="post-type-label">PHOTO</div></button>
                      <button className={`post-type-btn${postType==="video"?" selected":""}`} onClick={()=>setPostType("video")}><div className="post-type-icon">{E.video}</div><div className="post-type-label">VIDEO</div></button>
                      <button className={`post-type-btn${postType==="announcement"?" selected":""}`} onClick={()=>setPostType("announcement")}><div className="post-type-icon">&#128226;</div><div className="post-type-label">ANNOUNCE</div></button>
                    </div>
                    <div style={{fontSize:10,letterSpacing:3,color:"#555",marginBottom:10,fontFamily:"'Anton',sans-serif"}}>CAPTION</div>
                    <textarea className="inp" placeholder="Write your post..." value={postCaption} onChange={e=>setPostCaption(e.target.value.slice(0,1340))}/>
                    <div className="char-count">{postCaption.length}/1340</div>
                    <div style={{display:"flex",gap:8,marginTop:8}}>
                      <button className="btn btn-primary" style={{marginBottom:0,opacity:postCaption.trim()?1:0.4}} disabled={!postCaption.trim()} onClick={()=>{
                        const p={id:Date.now(),artist:"tourbus",type:postType,color:"#0e0e0e",label:postCaption,time:"just now",likes:0,isTourbus:true};
                        setFeedPosts(prev=>[p,...prev]);
                        setLikes(prev=>({...prev,[p.id]:{count:0,liked:false}}));
                        setAmps(prev=>({...prev,[p.id]:{count:0,amped:false}}));
                        setPostCaption(""); setTourbusNewPost(false);
                      }}>Publish Post</button>
                      <button className="btn btn-ghost" style={{marginBottom:0}} onClick={()=>{setTourbusNewPost(false);setPostCaption("");}}>Cancel</button>
                    </div>
                  </div>
                )}

                {/* Platform Stats */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:28}}>
                  {[{label:"Total Riders",val:TOURBUS_STATS.riders.toLocaleString()},{label:"Active Artists",val:TOURBUS_STATS.artists},{label:"Total Posts",val:TOURBUS_STATS.posts},{label:"Tags Created",val:TOURBUS_STATS.tags.toLocaleString()}].map(s=>(
                    <div key={s.label} style={{background:darkMode?"#161616":"#ffffff",border:`1px solid ${darkMode?"#2a2a00":"#d0cfc0"}`,borderRadius:2,padding:"14px 16px"}}>
                      <div style={{fontFamily:"'Anton',sans-serif",fontSize:22,color:darkMode?"#e6ff00":"#ff4d1a",letterSpacing:1}}>{s.val}</div>
                      <div style={{fontSize:9,color:"#555",letterSpacing:2,marginTop:4,fontFamily:"'Anton',sans-serif"}}>{s.label.toUpperCase()}</div>
                    </div>
                  ))}
                </div>

                {/* Featured Artists */}
                <div style={{marginBottom:28}}>
                  <div style={{fontFamily:"'Anton',sans-serif",fontSize:11,letterSpacing:3,color:darkMode?"#e6ff00":"#ff4d1a",marginBottom:8}}>FEATURED ARTISTS</div>
                  <div style={{fontSize:11,color:"#555",marginBottom:12}}>These appear on the tourbus public page.</div>
                  <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:10}}>
                    {tourbusRecos.map(a=>(
                      <div key={a.id} style={{position:"relative"}}>
                        <ArtistThumb artist={a} style={{width:44,height:44,borderRadius:2,border:`1px solid ${darkMode?"#2a2a00":"#d0cfc0"}`}}/>
                        <button style={{position:"absolute",top:-4,right:-4,width:14,height:14,borderRadius:"50%",background:"#331111",border:"none",cursor:"pointer",fontSize:8,color:"#cc4444",display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>setTourbusRecos(p=>p.filter(r=>r.id!==a.id))}>&#10005;</button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trending Tags */}
                <div style={{marginBottom:28}}>
                  <div style={{fontFamily:"'Anton',sans-serif",fontSize:11,letterSpacing:3,color:darkMode?"#e6ff00":"#ff4d1a",marginBottom:12}}>TRENDING TAGS</div>
                  {(()=>{
                    const allTagTotals={};
                    feedPosts.forEach(p=>{Object.entries(tags[p.id]||{}).filter(([,cnt])=>cnt>=TAG_THRESHOLD).forEach(([tag,cnt])=>{if(!allTagTotals[tag])allTagTotals[tag]=0;allTagTotals[tag]+=cnt;});});
                    return Object.entries(allTagTotals).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([tag,cnt])=>(
                      <div key={tag} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 12px",background:darkMode?"#161616":"#ffffff",border:`1px solid ${darkMode?"#1e1e00":"#e0dfd0"}`,borderRadius:1,marginBottom:6,cursor:"pointer"}} onClick={()=>{setActiveTag(tag);go(SCREENS.TAG_FEED);}}>
                        <div style={{fontFamily:"'Anton',sans-serif",fontSize:13,color:darkMode?"#e6ff00":"#ff4d1a"}}>#{tag}</div>
                        <div style={{fontSize:10,color:"#555",letterSpacing:1,fontFamily:"'Anton',sans-serif"}}>{cnt} TAGS</div>
                      </div>
                    ));
                  })()}
                </div>

                {/* Recent Posts */}
                <div>
                  <div style={{fontFamily:"'Anton',sans-serif",fontSize:11,letterSpacing:3,color:darkMode?"#e6ff00":"#ff4d1a",marginBottom:12}}>RECENT POSTS</div>
                  {feedPosts.filter(p=>p.isTourbus).map(p=>(
                    <div key={p.id} style={{display:"flex",gap:10,padding:"10px 12px",background:darkMode?"#161616":"#ffffff",border:`1px solid ${darkMode?"#1e1e00":"#e0dfd0"}`,borderRadius:2,marginBottom:8}}>
                      <div style={{width:40,height:40,background:"#111",borderRadius:1,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{p.type==="photo"?E.photo:p.type==="video"?E.video:"&#128226;"}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:11,color:darkMode?"#aaa":"#3a3a5a",lineHeight:1.5,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.label}</div>
                        <div style={{fontSize:9,color:"#555",letterSpacing:1,marginTop:4}}>{p.time} - {E.clap} {(likes[p.id]?.count||0)} - {E.fire} {(amps[p.id]?.count||0)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
