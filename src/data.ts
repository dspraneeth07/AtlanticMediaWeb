// All site content lives here. Company details, services, clients and the PRIOR /
// production offering come from atlanticmedia.in. Creator profiles, case studies
// and blog posts are still PLACEHOLDERS — replace them with approved real data.
// Media in /public/media is royalty-free stock from Mixkit (mixkit.co/license);
// logos and photos in /public/brand and /public/clients come from atlanticmedia.in.

export const CONTACT_EMAIL = 'connect@atlanticmedia.in'
export const PHONES = ['+91 72079 74343', '+91 93922 56699'] as const
export const ADDRESS = {
  lines: ['Level 19 / Unit 3, One West – A Terminus Project', 'Narsing Nanakramguda Service Rd, Financial District', 'Hyderabad, Telangana 500008'],
  map: 'https://www.google.com/maps/search/?api=1&query=One+West+A+Terminus+Project+Financial+District+Hyderabad',
}
export const PRIOR_HANDLE = { label: '@prior_atlanticmedia', href: 'https://www.instagram.com/prior_atlanticmedia/' }
export const TAGLINE = 'Amplified. Elevated. Unstoppable.'

export const NAV_LINKS = [
  { to: '/#services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/creators', label: 'Creators' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/about', label: 'About' },
] as const

export const HERO = {
  title: ['Your Brand, Amplified.', 'Elevated. Unstoppable.'],
  sub: 'More than a digital media agency — a powerhouse of creativity, strategy and execution. Brand and talent managers, a production crew, editors and an MCN team, all working together to set the pace.',
  video: '/media/showreel.mp4',
  poster: '/media/showreel.jpg',
}

// ---------- Clients (logos from atlanticmedia.in) ----------
export type Client = { name: string; logo: string; sector: 'Fashion & Beauty' | 'Jewellery' | 'Lifestyle & More' }
const c = (name: string, file: string, sector: Client['sector']): Client => ({ name, logo: `/clients/${file}.webp`, sector })
export const CLIENTS: Client[] = [
  c('Samsung', 'samsung', 'Lifestyle & More'),
  c('Tata CLiQ', 'tata-cliq', 'Fashion & Beauty'),
  c('Tira Beauty', 'tira-beauty', 'Fashion & Beauty'),
  c('Rado', 'rado', 'Jewellery'),
  c('Snitch', 'snitch', 'Fashion & Beauty'),
  c('Telangana Tourism', 'telangana-tourism', 'Lifestyle & More'),
  c('Pond’s', 'ponds', 'Fashion & Beauty'),
  c('Air Arabia', 'airarabia-com', 'Lifestyle & More'),
  c('Royal Challenge', 'royal-challenge', 'Lifestyle & More'),
  c('Wondr Diamonds', 'wondr-diamonds', 'Jewellery'),
  c('Jaypore', 'jaypore', 'Fashion & Beauty'),
  c('Kesh King', 'kesh-king', 'Fashion & Beauty'),
  c('McDowell’s No.1', 'mc-dowell-s', 'Lifestyle & More'),
  c('Style Union', 'style-union', 'Fashion & Beauty'),
  c('Emma', 'emma-mattress', 'Lifestyle & More'),
  c('Agaro', 'agaro', 'Lifestyle & More'),
  c('Azorte', 'azorte', 'Fashion & Beauty'),
  c('ASBL', 'asbl', 'Lifestyle & More'),
  c('PMJ Jewels', 'pmj', 'Jewellery'),
  c('Siddhartha Jewellers', 'siddhartha-jewellers', 'Jewellery'),
  c('Taruni', 'taruni', 'Fashion & Beauty'),
  c('Neeru’s', 'neerus', 'Fashion & Beauty'),
  c('Highlander', 'highlander', 'Fashion & Beauty'),
  c('Mayuka', 'mayuka', 'Jewellery'),
  c('Hetafu Diamonds', 'hetafu', 'Jewellery'),
  c('Swadesh', 'swadesh', 'Fashion & Beauty'),
  c('Cream Stone', 'cream-stone', 'Lifestyle & More'),
  c('Century Mattresses', 'century-mattress', 'Lifestyle & More'),
  c('Truthin', 'truthin', 'Lifestyle & More'),
  c('Mebaz', 'mebaz', 'Fashion & Beauty'),
  c('MSU', 'msu', 'Fashion & Beauty'),
  c('Ladia', 'ladia', 'Jewellery'),
  c('Sri Venkatramana Jewellers', 'sri-venkatramana', 'Jewellery'),
  c('Brand Mandir', 'brand-mandir', 'Fashion & Beauty'),
  c('One Nation One Election', 'one-nation-one-elections', 'Lifestyle & More'),
  c('The Hidden Music Originals', 'the-hidden-music-originals', 'Lifestyle & More'),
]
export const CLIENT_SECTORS = ['Fashion & Beauty', 'Jewellery', 'Lifestyle & More'] as const

// ---------- Placeholder brands used only by the sample case studies ----------
export type BrandStyle = 'sans' | 'serif' | 'italic' | 'mono' | 'wide' | 'round' | 'stack' | 'script'
export type Brand = { name: string; style: BrandStyle; color: string; mark?: 'dot' | 'ring' | 'bolt' | 'leaf' | 'star' | 'square' }

export const BRANDS: Brand[] = [
  { name: 'northwind', style: 'round', color: '#4F8CFF', mark: 'ring' },
  { name: 'LUMEN&CO', style: 'wide', color: '#FFB020' },
  { name: 'Veloce', style: 'italic', color: '#FF4D4D', mark: 'bolt' },
  { name: 'orbitly', style: 'sans', color: '#7C5CFF', mark: 'dot' },
  { name: 'HARBOR', style: 'serif', color: '#2BD4A4' },
  { name: 'mintaro', style: 'round', color: '#3DDC84', mark: 'leaf' },
  { name: 'Solstice', style: 'serif', color: '#FF5FA2', mark: 'star' },
  { name: 'cobalt', style: 'mono', color: '#3A7BFF', mark: 'square' },
  { name: 'Evergreen', style: 'italic', color: '#34C77B' },
]

// Counts taken from atlanticmedia.in (client wall and the PRIOR roster).
export const STATS = [
  { value: 35, suffix: '+', label: 'Brands', sub: 'Across fashion, beauty, jewellery and lifestyle' },
  { value: 20, suffix: '+', label: 'PRIOR creators', sub: 'And growing' },
]

// ---------- Services (from atlanticmedia.in) ----------
export type Service = { title: string; body: string; bullets: string[]; video: string; poster: string; label: string }

export const SERVICES: Service[] = [
  {
    title: 'Digital Media Marketing',
    body: 'Because virality is a science. Precision-targeted campaigns, trend-jacking moments and 360° strategy — data-driven, creative-fuelled and results-obsessed, so your brand is seen, heard and shared.',
    bullets: ['Social media management', 'Content writing & management', 'SEO / ASO and ad management', 'Web & app development'],
    video: '/media/svc-influencer.mp4',
    poster: '/media/svc-influencer.jpg',
    label: 'Creators filming a social video',
  },
  {
    title: 'Integrated Brand Solutions',
    body: 'We partner with leading brands across fashion, beauty, lifestyle and entertainment, blending data-led strategy, sharp production and the right influencers into campaigns that don’t just get seen — they get felt.',
    bullets: ['Branding & strategy', 'Influencer campaigns that fit your mission', 'Production built for every platform', 'Lasting audience engagement'],
    video: '/media/svc-ips.mp4',
    poster: '/media/svc-ips.jpg',
    label: 'Behind the scenes of a shoot',
  },
  {
    title: 'PRIOR — Talent Management',
    body: 'PRIOR is our talent arm and matchmaker for brands and creators. We handpick the right talent for every brief and build long-term relationships with our creators, with ongoing support and mentorship.',
    bullets: ['Connect — brands meet top-tier creators', 'Collaborate — shared goals, seamless execution', 'Create — content that resonates', '20+ creators on the roster'],
    video: '/media/svc-talent.mp4',
    poster: '/media/svc-talent.jpg',
    label: 'Two creators vlogging on a city rooftop',
  },
  {
    title: 'Content & Production',
    body: 'Your launchpad on YouTube and beyond. Our MCN connects creators with audiences, brand partnerships and monetisation, while our crew handles everything from the first idea to the final cut.',
    bullets: ['YouTube CMS & content management', 'Pre-production and post-production', 'THM Originals — original music', 'The Hidden Mic podcast'],
    video: '/media/svc-studios.mp4',
    poster: '/media/svc-studios.jpg',
    label: 'Crew filming in the studio',
  },
]

// ---------- Creators ----------
export type Creator = { name: string; city: string; followers: string; views: string; niche: string; bio: string; img: string }

export const CREATORS: Creator[] = [
  { name: 'Riya Kapoor', city: 'Delhi', followers: '1.8M', views: '9.2M', niche: 'Vlogs', bio: 'Daily vlogger who turns ordinary errands into the most-watched part of her followers’ day.', img: '/media/creator-1.jpg' },
  { name: 'Kabir Rao', city: 'Bengaluru', followers: '3.4M', views: '12.1M', niche: 'Travel', bio: 'Travel vlogger who turns weekend trips into cinematic mini-documentaries.', img: '/media/creator-2.jpg' },
  { name: 'Tara Joshi', city: 'Pune', followers: '5.2M', views: '18.7M', niche: 'Lifestyle', bio: 'City-life storyteller with a sharp, budget-first eye and zero filter.', img: '/media/creator-3.jpg' },
  { name: 'Dev Malhotra', city: 'Chennai', followers: '9.6M', views: '15.4M', niche: 'Fitness', bio: 'Strength coach making training plans simple enough to actually stick to.', img: '/media/creator-4.jpg' },
  { name: 'Meher Sandhu', city: 'Udaipur', followers: '38.4M', views: '71.9M', niche: 'Outdoors', bio: 'Lakeside storyteller whose slow-living videos are a daily reset for millions.', img: '/media/creator-5.jpg' },
  { name: 'Ishaan Verma', city: 'Hyderabad', followers: '—', views: '4.6M', niche: 'Music', bio: 'Producer and composer sharing the making of every track, start to finish.', img: '/media/creator-6.jpg' },
  { name: 'Zoya Khan', city: 'Mumbai', followers: '36.1M', views: '48.3M', niche: 'Dance', bio: 'Choreographer whose neon-lit routines keep landing on every trending tab.', img: '/media/creator-7.jpg' },
  { name: 'Rohan Das', city: 'Kolkata', followers: '2.7M', views: '11.8M', niche: 'Podcasts', bio: 'Long-form interviewer getting founders and artists to say what they really think.', img: '/media/creator-8.jpg' },
  { name: 'Sana Iqbal', city: 'Mumbai', followers: '96.2K', views: '910K', niche: 'Fashion', bio: 'Street-style creator mixing thrift finds with designer pieces.', img: '/media/creator-9.jpg' },
  { name: 'Anjali Nair', city: 'Kochi', followers: '812K', views: '1.9M', niche: 'News', bio: 'Explainer journalist breaking down the week’s biggest stories in sixty seconds.', img: '/media/creator-10.jpg' },
  { name: 'Nisha Shah', city: 'Ahmedabad', followers: '18.9M', views: '24.6M', niche: 'Beauty', bio: 'Skincare and makeup tutorials grounded in real routines and honest reviews.', img: '/media/creator-11.jpg' },
  { name: 'Mira Sethi', city: 'Jaipur', followers: '790K', views: '26.4M', niche: 'Entertainment', bio: 'Moody short films and music edits with a cult following.', img: '/media/creator-12.jpg' },
]

// ---------- Case studies (home slider + /work + /work/:slug) ----------
// Metrics, dates and brands are PLACEHOLDERS.
export type Metric = { label: string; value: string }
export type CaseStudy = {
  slug: string
  title: string
  brand: Brand
  industry: string
  date: string
  tagline: string
  desc: string
  story: string[]
  highlights: { title: string; text: string }[]
  metrics: Metric[]
  video?: string
  poster: string
  still: string
  featured?: boolean
}

const brand = (name: string) => BRANDS.find((b) => b.name === name)!

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'open-road-diaries',
    title: 'Open Road Diaries',
    brand: brand('Veloce'),
    industry: 'Automotive',
    date: '14 Nov 2025',
    tagline: 'A six-city ride series built around one bike',
    desc: 'A six-episode travel series following two creators and a crew of riders across coastal and mountain routes — built to show the product in the places it was made for.',
    story: [
      'Veloce wanted riders to see its new tourer doing what it was designed for: long days, bad roads and good company. Instead of a spec-sheet launch film, we built a travel show.',
      'Two travel creators and four riders from our roster spent three weeks on the road, covering six destinations. Every episode was planned around a real route, a local host and one challenge the bike had to handle.',
    ],
    highlights: [
      { title: '6 destinations, 1 journey', text: 'Coastline, ghats and high passes, filmed as a single continuous trip.' },
      { title: 'Creator-led storytelling', text: 'Hosts wrote their own pieces to camera; we handled logistics and safety.' },
      { title: 'Built for every screen', text: 'Long-form episodes on YouTube, with 40+ vertical cut-downs for Reels and Shorts.' },
    ],
    metrics: [
      { label: 'Cumulative reach', value: '42M+' },
      { label: 'Episode views', value: '3.8M+' },
      { label: 'Engagements', value: '96K+' },
    ],
    video: '/media/case-road.mp4',
    poster: '/media/case-road.jpg',
    still: '/media/work-trail.jpg',
    featured: true,
  },
  {
    slug: 'colours-of-home',
    title: 'Colours of Home',
    brand: brand('LUMEN&CO'),
    industry: 'Home & Living',
    date: '02 Sep 2025',
    tagline: 'A regional-language content IP for first-time buyers',
    desc: 'A regional-language content IP made with rural creators to introduce a new product line to first-time buyers in smaller towns, one village story at a time.',
    story: [
      'Lumen&Co was launching an affordable paint range for smaller towns, where trust is built through people you already know, not billboards.',
      'We cast creators who live in the communities they film. Each episode follows a family refreshing a shared space — a school wall, a temple courtyard, a home — and the stories behind it.',
    ],
    highlights: [
      { title: 'Regional-first', text: 'Scripts written in four languages by the creators themselves.' },
      { title: 'Community stories', text: 'Every makeover centred on a space that matters to a whole village.' },
      { title: 'Retail tie-in', text: 'QR codes in every episode led to the nearest stockist.' },
    ],
    metrics: [
      { label: 'Cumulative reach', value: '28M+' },
      { label: 'Regional views', value: '5.1M+' },
      { label: 'Store enquiries', value: '12K+' },
    ],
    video: '/media/case-colours.mp4',
    poster: '/media/case-colours.jpg',
    still: '/media/about-team.jpg',
    featured: true,
  },
  {
    slug: 'room-swap',
    title: 'Room Swap',
    brand: brand('HARBOR'),
    industry: 'Services',
    date: '21 Jul 2025',
    tagline: 'Best friends. Each other’s homes. One weekend.',
    desc: 'Two creator best friends trade apartments and redesign each other’s space using on-demand home services — with a twist reveal in every episode.',
    story: [
      'Harbor offers everything from deep cleaning to carpentry on demand. The challenge was showing the whole range without it feeling like a catalogue.',
      'Room Swap turned it into a game: two friends, 48 hours, and a budget to transform each other’s homes. Every service used was part of the plot, not an ad break.',
    ],
    highlights: [
      { title: 'Format-first', text: 'A repeatable structure that works for any pair of creators.' },
      { title: 'Native integration', text: '11 services featured across the season, each driving a story beat.' },
      { title: 'Reveal moments', text: 'Reaction reveals were cut into short-form teasers ahead of each episode.' },
    ],
    metrics: [
      { label: 'Cumulative reach', value: '35M+' },
      { label: 'Episode views', value: '4.2M+' },
      { label: 'App installs', value: '60K+' },
    ],
    video: '/media/case-room.mp4',
    poster: '/media/case-room.jpg',
    still: '/media/work-interview.jpg',
    featured: true,
  },
  {
    slug: 'studio-sessions',
    title: 'Studio Sessions',
    brand: brand('Solstice'),
    industry: 'Music & Entertainment',
    date: '09 May 2025',
    tagline: 'Live music, hosted by creators',
    desc: 'A live-music format pairing independent artists with creator hosts, filmed at Atlantic Studios and cut for every platform.',
    story: [
      'Solstice wanted to back independent music in a way fans would actually watch. We paired rising artists with creator hosts for stripped-back live sets and honest conversations.',
      'Everything was recorded at Atlantic Studios in single takes, then cut into full sessions, audio-only releases and vertical highlights.',
    ],
    highlights: [
      { title: '10 artists', text: 'Across indie, hip-hop and folk, chosen with the Solstice music team.' },
      { title: 'One-take sessions', text: 'Multi-camera live recording with broadcast-grade audio.' },
      { title: 'Always-on', text: 'A new session every fortnight for five months.' },
    ],
    metrics: [
      { label: 'Cumulative reach', value: '19M+' },
      { label: 'Streams', value: '2.3M+' },
      { label: 'Subscribers gained', value: '41K+' },
    ],
    video: '/media/svc-studios.mp4',
    poster: '/media/svc-studios.jpg',
    still: '/media/work-studio.jpg',
  },
  {
    slug: 'the-real-routine',
    title: 'The Real Routine',
    brand: brand('mintaro'),
    industry: 'Beauty & Wellness',
    date: '18 Mar 2025',
    tagline: 'Twelve creators, twelve unfiltered mornings',
    desc: 'Twelve beauty and wellness creators document their unfiltered morning routines — a skincare launch told entirely through real habits.',
    story: [
      'Mintaro’s new skincare line was built for people who don’t have time for ten steps. So we asked creators to show what their mornings really look like.',
      'No scripts and no studio lighting — just real routines, filmed on their own phones, with the product slotted in where it genuinely fit.',
    ],
    highlights: [
      { title: '12 creators', text: 'Across beauty, fitness, parenting and student life.' },
      { title: 'Phone-shot', text: 'Every video filmed by the creator for an authentic feel.' },
      { title: 'Community remix', text: 'A duet challenge invited viewers to share their own routines.' },
    ],
    metrics: [
      { label: 'Cumulative reach', value: '24M+' },
      { label: 'UGC entries', value: '8.5K+' },
      { label: 'Engagement rate', value: '7.2%' },
    ],
    video: '/media/svc-talent.mp4',
    poster: '/media/svc-talent.jpg',
    still: '/media/work-ringlight.jpg',
  },
  {
    slug: 'the-podcast-room',
    title: 'The Podcast Room',
    brand: brand('cobalt'),
    industry: 'Technology',
    date: '27 Feb 2025',
    tagline: 'Founders and creators, one table',
    desc: 'A video podcast where founders sit down with creators to talk about building in public — produced for a fintech brand that wanted to be part of the conversation, not the ad.',
    story: [
      'Cobalt’s audience is young, ambitious and allergic to hard sells. A branded podcast gave the brand a regular, useful place in their feed.',
      'Each episode pairs a founder with a creator from a completely different world, recorded at Atlantic Studios with a full video set-up.',
    ],
    highlights: [
      { title: '24 episodes', text: 'Released weekly across YouTube, Spotify and Instagram.' },
      { title: 'Cross-audience', text: 'Every guest pairing brought two communities together.' },
      { title: 'Clip engine', text: 'Around 15 short clips cut from every episode.' },
    ],
    metrics: [
      { label: 'Cumulative reach', value: '15M+' },
      { label: 'Listens & views', value: '1.9M+' },
      { label: 'Avg. watch time', value: '31 min' },
    ],
    poster: '/media/work-podcast.jpg',
    still: '/media/work-podcast.jpg',
  },
  {
    slug: 'trail-notes',
    title: 'Trail Notes',
    brand: brand('Evergreen'),
    industry: 'Outdoors',
    date: '10 Jan 2025',
    tagline: 'A slow-travel series for an outdoor gear brand',
    desc: 'Three outdoor creators, three long-distance trails and gear that had to survive all of it — a series about the journey, not the destination.',
    story: [
      'Evergreen makes gear for people who spend real time outside. We built a series that proves it the slow way: weeks on the trail, in all weather.',
      'Each creator kept a filmed field journal, which our editors shaped into a three-part series and a library of gear-in-use clips.',
    ],
    highlights: [
      { title: '3 trails, 21 days', text: 'Filmed by the creators with a small support crew.' },
      { title: 'Gear in the wild', text: 'Every product shown in use, never on a table.' },
      { title: 'Evergreen content', text: 'A clip library the brand still uses in ads today.' },
    ],
    metrics: [
      { label: 'Cumulative reach', value: '11M+' },
      { label: 'Series views', value: '1.2M+' },
      { label: 'Saves', value: '38K+' },
    ],
    poster: '/media/work-trail.jpg',
    still: '/media/work-trail.jpg',
  },
  {
    slug: 'on-set-with',
    title: 'On Set With',
    brand: brand('orbitly'),
    industry: 'Media',
    date: '02 Dec 2024',
    tagline: 'Behind the scenes of creator productions',
    desc: 'A behind-the-scenes series showing how the internet’s favourite videos actually get made, produced for a streaming app launching in India.',
    story: [
      'Orbitly wanted to be known as the home of creator-made entertainment. We gave its audience a look behind the camera.',
      'Each episode drops into a creator’s shoot — from studio sets to one-person bedroom set-ups — and follows the video from idea to upload.',
    ],
    highlights: [
      { title: '8 creators', text: 'Across comedy, food, music and tech.' },
      { title: 'Idea to upload', text: 'Every episode tracks a single real video end to end.' },
      { title: 'App exclusive', text: 'Full episodes lived on the app; teasers ran everywhere else.' },
    ],
    metrics: [
      { label: 'Cumulative reach', value: '22M+' },
      { label: 'App sign-ups', value: '140K+' },
      { label: 'Completion rate', value: '64%' },
    ],
    poster: '/media/work-interview.jpg',
    still: '/media/about-vlog.jpg',
  },
]

export const INDUSTRIES = [...new Set(CASE_STUDIES.map((c) => c.industry))].sort()

// Only the PRIOR Instagram is listed on atlanticmedia.in — add the others when known.
export const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/prior_atlanticmedia/', icon: 'instagram' },
  { label: 'YouTube', href: '#', icon: 'youtube' },
  { label: 'X', href: '#', icon: 'x' },
  { label: 'LinkedIn', href: '#', icon: 'linkedin' },
] as const

// ---------- Blog (/blogs + /blog/:slug) ----------
export type Block = { h: string } | { p: string } | { quote: string } | { list: string[] }
export type Post = {
  slug: string
  title: string
  category: string
  date: string
  readTime: string
  author: string
  excerpt: string
  cover: { top: string; big: string; hue: number }
  body: Block[]
  featured?: boolean
}

export const POSTS: Post[] = [
  {
    slug: 'creators-are-the-new-search-bar',
    title: 'Creators Are the New Search Bar',
    category: 'Innovation',
    date: '12 Sep 2025',
    readTime: '3 min read',
    author: 'Atlantic Media',
    excerpt: 'Where to eat, what to buy, which phone to trust — more and more of those questions start in a creator’s comments, not a search engine.',
    cover: { top: 'Before you search,', big: 'Ask a Creator', hue: 265 },
    featured: true,
    body: [
      { p: 'Think about the last time you looked for a café in a new city. There’s a good chance you didn’t type it into a search box. You opened a short-video app, typed the neighbourhood, and watched three people walk you through the menu.' },
      { p: 'That behaviour has quietly become the default for a whole generation. Discovery now happens through people, and it changes how brands need to show up.' },
      { h: 'Why people trust faces over links' },
      { p: 'A list of blue links tells you what exists. A creator shows you what it’s actually like — the portion size, the queue, the lighting at 7pm. That context is hard to fake, and audiences know it.' },
      { quote: 'Search tells you what’s out there. Creators tell you what’s worth it.' },
      { h: 'What this means for brands' },
      { list: [
        'Be findable inside creator content, not just next to it.',
        'Brief creators on the questions your customers ask, not just on key messages.',
        'Treat comments as a search results page — answer them.',
      ] },
      { p: 'The brands that win the next few years won’t just optimise for algorithms. They’ll make sure the people their customers already trust have something honest to say about them.' },
    ],
  },
  {
    slug: 'short-video-is-where-discovery-happens',
    title: 'Short Video Is Where Discovery Happens Now',
    category: 'Platforms',
    date: '28 Aug 2025',
    readTime: '4 min read',
    author: 'Atlantic Media',
    excerpt: 'Short-form isn’t just a cheaper version of long-form. It’s the front door — and most brands are still treating it like a side entrance.',
    cover: { top: 'Everyone’s sleeping on', big: '60 Seconds', hue: 20 },
    body: [
      { p: 'For years, short video was treated as a teaser: cut something down from the real campaign and post it for reach. That thinking is out of date.' },
      { h: 'The front door, not the trailer' },
      { p: 'Most people now meet a new creator, product or show through a short clip. If that clip doesn’t stand on its own, there is no second chance to make a first impression.' },
      { list: [
        'Write short-form natively — start with the hook, not the logo.',
        'Build series, not one-offs, so viewers have a reason to come back.',
        'Measure saves and shares, not just views.',
      ] },
      { h: 'Where long-form still wins' },
      { p: 'Long-form is where trust deepens. Our most successful campaigns use short video to open the door and longer episodes to keep people in the room.' },
    ],
  },
  {
    slug: 'scale-without-losing-the-story',
    title: 'Scale Without Losing the Story',
    category: 'Marketing',
    date: '09 Aug 2025',
    readTime: '3 min read',
    author: 'Atlantic Media',
    excerpt: 'Running a campaign with hundreds of creators is a logistics problem. Keeping it feeling personal is a creative one.',
    cover: { top: 'One brief,', big: '500 Voices', hue: 350 },
    body: [
      { p: 'Big creator programmes are having a moment. When hundreds of voices talk about the same product in the same week, the effect is hard to ignore. But scale has a cost: everything starts to sound the same.' },
      { h: 'Brief the idea, not the script' },
      { p: 'The fastest way to flatten a campaign is to hand everyone identical talking points. We brief the tension or question at the heart of the idea, then let each creator answer it in their own way.' },
      { h: 'Tier the roster' },
      { list: [
        'A small group of lead creators sets the tone with hero content.',
        'Mid-tier creators adapt the idea for their niche.',
        'Micro-creators bring it to local, high-trust communities.',
      ] },
      { quote: 'Scale is a distribution decision. Story is still a creative one.' },
    ],
  },
  {
    slug: 'imperfect-is-the-new-premium',
    title: 'Imperfect Is the New Premium',
    category: 'Culture',
    date: '22 Jul 2025',
    readTime: '2 min read',
    author: 'Atlantic Media',
    excerpt: 'Audiences are scrolling past polish. The content that performs increasingly looks like it was made by a person, not a production line.',
    cover: { top: 'Less gloss,', big: 'More Real', hue: 150 },
    body: [
      { p: 'There’s a reason a shaky phone video of a real kitchen often beats a flawless studio ad: it feels like it was made for you, not at you.' },
      { h: 'Craft still matters' },
      { p: '“Imperfect” doesn’t mean careless. The best creators are meticulous about story, pacing and sound — they just don’t hide the seams.' },
      { list: ['Keep the bloopers.', 'Film where people actually live.', 'Let creators say “I didn’t like this part.”'] },
    ],
  },
  {
    slug: 'from-comment-to-campaign-in-48-hours',
    title: 'How to Turn a Comment into a Campaign in 48 Hours',
    category: 'Case Notes',
    date: '30 Jun 2025',
    readTime: '3 min read',
    author: 'Atlantic Media',
    excerpt: 'A playbook for turning a viral complaint into a brand’s best week — and why speed beats polish.',
    cover: { top: 'One comment.', big: '48 Hours.', hue: 45 },
    body: [
      { p: 'Sometimes the best brief is written by the internet. When a customer’s jokey complaint about your brand starts trending, you have a choice: ignore it, or join in.' },
      { h: 'Hour 0–12: listen' },
      { p: 'Map who is talking and what the joke really is. Often the complaint isn’t anger — it’s affection wrapped in sarcasm.' },
      { h: 'Hour 12–36: make' },
      { p: 'Brief a handful of creators to film replies in their own styles, while the brand team signs off a playful response from the official account.' },
      { h: 'Hour 36–48: amplify' },
      { p: 'Launch the replies together. Done well, the conversation turns from a complaint into a running joke the brand is in on.' },
      { quote: 'Speed is a creative skill. The window for joining a moment is measured in hours.' },
    ],
  },
  {
    slug: 'seven-habits-that-quietly-kill-channels',
    title: 'Seven Habits That Quietly Kill Channels',
    category: 'Creators',
    date: '11 Jun 2025',
    readTime: '4 min read',
    author: 'Atlantic Media',
    excerpt: 'Most channels don’t crash. They slowly stall. Here are the patterns we see most often — and how to fix them.',
    cover: { top: 'Growth mistakes', big: 'We’ve All Made', hue: 210 },
    body: [
      { p: 'After working with hundreds of creators, we see the same patterns behind stalled growth again and again. None of them are fatal on their own. Together, they add up.' },
      { list: [
        'Chasing every trend instead of building a format.',
        'Posting on a schedule you can’t sustain.',
        'Ignoring the first three seconds.',
        'Never reading your own analytics.',
        'Saying yes to every brand deal.',
        'Copying a bigger creator’s style instead of finding your own.',
        'Treating your community as an audience, not a group of people.',
      ] },
      { h: 'The fix is usually boring' },
      { p: 'Pick a format, commit to a realistic rhythm, and review what worked every month. Consistency beats intensity almost every time.' },
    ],
  },
]

export const POST_CATEGORIES = [...new Set(POSTS.map((p) => p.category))].sort()

// ---------- About ----------
export const ABOUT_PAGE = {
  intro: 'A digital media, brand solutions, talent management and production company — based in Hyderabad.',
  photos: [
    { src: '/brand/team.jpg', alt: 'The Atlantic Media team', label: 'The team' },
    { src: '/brand/prior-3.jpg', alt: 'PRIOR by Atlantic Media — 20+ creators', label: 'PRIOR' },
    { src: '/brand/office-building.jpg', alt: 'One West, the Atlantic Media office building in Hyderabad', label: 'Our home' },
    { src: '/media/work-studio.jpg', alt: 'A photo shoot in progress', label: 'On set' },
  ],
  story: [
    'At Atlantic Media we’re more than a digital media agency — we’re a powerhouse of creativity, strategy and execution.',
    'Our team is built on relentless talent: brand and talent managers securing impactful deals, a production crew and marketers bringing ideas to life, editors refining every detail and an MCN team scaling a thriving creator network.',
    'From brand identities and eye-catching photo and video to SEO and social media, we mix strong visuals with clever tactics to drive real results.',
    'Together, we don’t just keep up with the industry — we set the pace.',
  ],
  storyImage: { src: '/brand/office-building.jpg', alt: 'One West, Financial District, Hyderabad' },
  stats: [
    { label: 'Brands', value: 35, suffix: '+' },
    { label: 'PRIOR creators', value: 20, suffix: '+' },
    { label: 'Service verticals', value: 4, suffix: '' },
    { label: 'Production offerings', value: 6, suffix: '' },
  ],
}

// How we work — the three steps from atlanticmedia.in
export const PROCESS = [
  { title: 'Strategize', text: 'We dive deep into your brand and audience to craft tailored strategies that drive measurable results.', icon: 'compass' },
  { title: 'Secure', text: 'We lock in the right partnerships, resources and opportunities, setting you up for success from the start.', icon: 'lock' },
  { title: 'Succeed', text: 'With sharp execution, we deliver impactful campaigns that elevate your brand and leave a lasting impression.', icon: 'star' },
] as const

// ---------- Contact form ----------
export const COUNTRY_CODES = ['+91', '+1', '+44', '+61', '+65', '+971'] as const
export const ENQUIRY_TYPES = ['Brand', 'Creator', 'Agency', 'Job applicant', 'Other'] as const
export const SERVICE_OPTIONS = ['Digital Media Marketing', 'Integrated Brand Solutions', 'Talent Management (PRIOR)', 'Content & Production', 'YouTube CMS / MCN', 'Other'] as const
export const BUDGETS = ['Under ₹5 lakh', '₹5–20 lakh', '₹20–50 lakh', '₹50 lakh+', 'Not sure yet'] as const
