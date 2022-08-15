import * as React from "react";
import { Link } from "react-router-dom";

export const History = () => {
    return (
        <>
            <div className="content" id="content-history">
                <h1 className="title">Welcome to the Lyon's Den</h1>
                <hr />
                <h2 className="subtitle">Home and Pride of the Mackenzie Lyons circa 1960</h2>
                <p className="text">
                    William Lyon Mackenzie C. I. is a Toronto District Secondary School opened in 1960 and located in North York.
                    Mackenzie was named after the historical prowess William Lyon Mackenzie, the political agitator who led the
                    government revolt in Toronto in 1837. In its years of establishing a home of blue and gold, William Lyon Mackenzie
                    Collegiate not only built an incredible student body of 1500 strong, but also a strong, tight knit community that
                    prides itself on multicultural diversity, inclusion, creativity and academic innovation. And, here is where the
                    heart and soul of the Lyon Pride resound.
                </p>
                <p className="text">
                    William Lyon Mackenzie Collegiate boasts scholastic excellence in its academic programing: the MaCS enrichment
                    program, the Gifted Program, the ELL program, the Advanced Placement Program, and the FIT program. Collectively,
                    these programs have helped nurture student voice and advocacy and inspire a variety of extracurricular
                    opportunities from clubs and councils to intramurals and athletics, to school-wide events and initiatives, all
                    of which beautifully reflect the spirit of membership - the roar of the Lyon Pride.
                </p>
            </div>
            <div className="content" id="content-about" style={{ display: "none" }}>
                <h1 className="title">Our Vision</h1>
                <hr />
                <p className="text">
                    By definition, a metropolis is a significant cultural center of a country or region
                    and a central hub for regional connections and communications.
                    Likewise, it is our goal at Project Metropolis to create a centralized website at WLMAC where all students can easily
                    access and share information with their peers, making this our own, online metropolis.
                </p>
                <h1 className="title">About the Site</h1>
                <hr />
                <p className="text">
                    The Mackenzie Lyon's Den (Project Metropolis) is a student-driven website that showcases the best of Mackenzie's pride;
                    a central microcosm and communication hub, rich in representing the diverse facets of student life.
                    Welcome to the Lyon's Den, the first stop to find out more about Mackenzie, its school-wide activities, events,
                    initiatives, clubs and councils, Student Council offerings, creative student voice and essential resources to enrich
                    Mackenzie student life!
                </p>
                <p className="text">
                    Our site will continue to roll out new features and updates in the coming months.
                    Users can look forward to a notification system, searching system, and a mobile app.
                </p>
            </div>
            <div className="content" id="content-team" style={{ display: "none" }}>
                <h1 className="title">Our Team</h1>
                <hr />
                <p className="text">
                    A diverse group of 28 developers, artists, and creators worked in tandem to build this site.
                </p>
                <h1 className="title">Members</h1>
                <hr />

                <div className="member-list">
                    <h2 className="subtitle">Project Manager</h2>

                    <Link to="/user/justinlu">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/7fdefdebc57e64f410fc3b750fcd9c3b.jpeg" />
                                </div>
                                <div className="member-text">
                                    Justin Lu
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                Saying Justin Lu is only the project manager would be an understatement. He has worked at all ends of development: designed the overall website, recruited/selected other team members, created front-end pages, and as a whole has championed Project Metropolis since its inception in May. When Justin's not dealing with Vice-President responsibilities or schoolwork, he fanboys Johnny Harris (like a true Canadian), grinds the heck out of Genshin Impact, and tries to "live without regret," to varying degrees of success. He's also obsessed with macOS keyboard shortcuts - some of his favourites are CMD + OPT + SHIFT + V and KLDSJFSDF.
                            </div>

                        </div>
                    </Link>

                </div>

                <div className="member-list">
                    <h2 className="subtitle">Frontend Developers</h2>

                    <Link to="https://maclyonsden.com/user/toaster203">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/9754b27ccb9a2ac1215d2386fddeb9b5" />
                                </div>
                                <div className="member-text">
                                    Hazel Guo
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                Just like her valued (and preferably spicy) noodles, Hazel is brimming with warmth, solace, and a dash of ardor. She is as relatable as a frontend developer can get, with her acknowledgement of procrastination and zeal for grinding Monkeytype. She is also as cool as one gets, being a spirited chess player and hockey fan. No true Canadian, nor Lyon for that matter, will ever feel lonely at a hockey game with Hazel who supports the Leafs (and especially enjoys watching them throw leads!) with all her heart.
                            </div>

                        </div>
                    </Link>

                    <Link to="https://maclyonsden.com/user/lindiana">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/86b23d037b2c9a97930f1d6e727f87bd" />
                                </div>
                                <div className="member-text">
                                    Diana Lin
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                Just like her work, Diana's taste is authentic; for her, life just wouldn't be the same without peanut sauce and noodles. Neither can she go without highly recommending Mini Motorways to anyone with an assignment due tomorrow.
                            </div>

                        </div>
                    </Link>

                    <Link to="https://maclyonsden.com/user/ji.mmyliu">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/df0681c6201aa5fb2928af7bf9b02019" />
                                </div>
                                <div className="member-text">
                                    Jimmy Liu
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                If one is in search of a teenager who manifests the spirit of a fresh, ambitious adolescent all with wholesomeness, they need not look further than Jimmy. An admirable conqueror of math, chess, competitive programming, and software development, Jimmy is also a badminton enthusiast. He takes his athletic abilities on screen too, surfing Nintendo Wii, and Mario Kart with a particular drive. On a final note, Jimmy, whose opinions are justified by his loving of sushi, lives by the words, "Try your best and forget the rest."
                            </div>

                        </div>
                    </Link>

                    <Link to="https://maclyonsden.com/user/AavaSapkota">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/9e6b8d23f6da43a8c4537b2272166622" />
                                </div>
                                <div className="member-text">
                                    Aava Sapkota
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                Passionate, avid, and bearing a sharp eye for masterful world-building and science, Aava designed the school map and its remarkable features. In addition, she is an adamant advocate of sci-fi fantasy author Brandon Sanderson and cherishes WLMAC's science and math teachers for their efforts and talents. Alas, physics lessons aren't enough to ward one away from daredevil stunts; Aava has bungee jumping on her bucket list.
                            </div>

                        </div>
                    </Link>

                    <Link to="https://maclyonsden.com/user/rcshim04">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/0eeae9c7eeb7bb5ecb6e0ae45d1462a7.jpeg" />
                                </div>
                                <div className="member-text">
                                    Eric Shim
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                Eric Shim may be the closest person within our staff to a weeb. He is somehow so sharp witted and sui generis that his talents would be wasted if he were not here, tasked with creating the announcement and blog pages as well as fixing much of the errors found during QA (quality assurance) testing. Eric is easygoing, knowledgeable, and a great source of inside jokes (case in point: 夜核). He spends his spare time writing music arrangements, reading manga and light novels, regularly updating his Discord statuses and names in Japanese, and immersing himself in new languages.
                            </div>

                        </div>
                    </Link>

                    <Link to="https://maclyonsden.com/user/V1ad20">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/f757e632464313749ed5aaf28af2027f" />
                                </div>
                                <div className="member-text">
                                    Vlad Surdu
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                Considering his breadth of initiatives and values, Vlad is at once human and superhuman. He applied his knowledge of HTML/CSS/JS and React Native to a broad range of tasks involving the styling of the app's window screens as well as polishing styles and functionalities pertaining to the website's map and calendar. Often you will find Vlad on a bike ride, at the gym, or in his room developing a website for his international students.
                            </div>

                        </div>
                    </Link>

                    <Link to="https://maclyonsden.com/user/Trentium">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/8d43abe4e1b9edf939344283117aa5c9.png" />
                                </div>
                                <div className="member-text">
                                    Daniel Ye
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                Although Daniel first joined the staff team as a learning experience, he has become someone reliable and integral to the development of Metropolis. Web development aside, he is not afraid to meet new people and help others, though he innately wishes for better social skills (and unlimited white tuna sushi, but that's beside the point). You can find Daniel on the Valorant grind with his friends or binging three anime seasons in one sitting.
                            </div>

                        </div>
                    </Link>

                    <Link to="https://maclyonsden.com/user/justinzhu">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/232c935ad6695b64b3e703edbca9bd1e.png" />
                                </div>
                                <div className="member-text">
                                    Justin Zhu
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                With wishes of becoming a video game director, Justin joined the team with the intentions of helping out and practicing his programming. Justin is the main developer behind the club pages, but he regularly assists with all parts of web development, spreading the twin gospels of Pokemon and anime along the way.
                            </div>

                        </div>
                    </Link>

                </div>

                <div className="member-list">
                    <h2 className="subtitle">Backend Developers</h2>

                    <Link to="https://maclyonsden.com/user/4yfc">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/a307bdbc3b0ca9ec1b0168324a82b514.png" />
                                </div>
                                <div className="member-text">
                                    Ivy Fan-Chiang
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                Ivy's back-end development duties entail some incredibly immersive work such as dealing with the site's REST API, database models, and calendar. A loyal and supportive friend through and through, Ivy joined the initiative upon hearing the call. They also save time for playing the flute and 3-D printing.
                            </div>

                        </div>
                    </Link>

                    <Link to="https://maclyonsden.com/user/enigma">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/35ff3331dedfa13707c8a63f450d4f0c" />
                                </div>
                                <div className="member-text">
                                    Paul Lee
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                Regarded as a central member of the team and known as a full stack developer, Paul is responsible for bringing the site and app to life through his work in API development and in the back-end framework Django. Paul's ingenuity and intelligence is matched with patience and a willingness to help others with whatever they need. He is not only a valuable member of Project Metropolis, but also a reliable friend to go to when you have absolutely no clue about how a database works. Aside from the outstanding work he does, Paul can be found on Discord using :monkey: to describe a variety of complex emotions.
                            </div>

                        </div>
                    </Link>

                    <Link to="https://maclyonsden.com/user/nyiyui">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/b2849e92834ef2f2525b035525308d59" />
                                </div>
                                <div className="member-text">
                                    Ken Shibata
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                Ken is "someone who tries to keep things unambiguous." The aspiring software developer is straightforward and ambitious in all his conquests. If he could retake a course, he would go for French to improve his past performance, and the man makes a habit of reading one book per two days; 240,000 English words, hence his mastery of sporadically using oxford commas. If you'd like to obtain guidance from this tech, EDM, and literature lover, Ken would recommend K-On!, The Last Human, and 君の名は.
                            </div>

                        </div>
                    </Link>

                    <Link to="https://maclyonsden.com/user/retep">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/1a6513ef7af252142ae6a434a9d65afe.png" />
                                </div>
                                <div className="member-text">
                                    Peter Ye
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                A man of classic and contemporary taste, Peter's all-time favourite music consists of "Bohemian Rhapsody" by Queen and "Night Burn" by Ben Segev. His wide range of interests, from "Lord of the Rings" and roller skating to coding and all boils down to dreams of being a software developer. He's certainly getting his training in - you can thank Peter for the timetable banner and authentication page updates. Being a Toronto Argonauts fan, one may find him throwing and kicking footballs during wellness breaks. In the meanwhile, he'll be relishing his dumplings and praying in advance to pass Grade 12 Chemistry next year.
                            </div>

                        </div>
                    </Link>

                </div>

                <div className="member-list">
                    <h2 className="subtitle">App Developers</h2>

                    <Link to="https://maclyonsden.com/user/ApocalypseCalculator">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/be07132d1837e31b9e123913dc261ffe.png" />
                                </div>
                                <div className="member-text">
                                    Patrick Lin
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                Patrick Lin is the main developer of the Metropolis app. An individual with distinct tastes and self-understanding, Patrick is both wildly talented and opinionated. His dev experience (and tech rep responsibilities) compelled him to join Project Metropolis, where he's managed to share his LEGO expertise and his love-hate relationship with programming. For Patrick, the greatest inventions of all time include hockey, science fiction dystopias, and thin-crust pizza (meat required).
                            </div>

                        </div>
                    </Link>

                    <Link to="https://maclyonsden.com/user/AZron">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/4ae56b64044b964f90cad0ee61ad9999" />
                                </div>
                                <div className="member-text">
                                    Aaron Zhu
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                Aaron is chivalrous, knowing and respecting his values, interests, and disinterests. He fittingly describes himself as outgoing - he likes being around other people and is passionate about what he pursues, so much so that on his bucket list is travelling the world. Currently, Aaron has taken on the excellent development opportunity that encompasses building Project Metropolis' mobile app. He loves programming (and school!) so much that his favourite subjects are ICS and TEJ, and he would even take ICS2 again, partial credits to Mr. Wong. A man who would wish for "more time" if he could, Aaron un(ironically) lives by the words "seek discomfort" and "work smart, not hard." You can find him playing Tetris, enjoying noodles and dumplings, listening to radio and Chinese pop, all while dreaming of being CEO of a company he founded and having a dog.
                            </div>

                        </div>
                    </Link>

                </div>

                <div className="member-list">
                    <h2 className="subtitle">Graphic Designers</h2>

                    <Link to="https://maclyonsden.com/user/aliciachung">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/09dd528b306ef4dd7c8758708f708f96" />
                                </div>
                                <div className="member-text">
                                    Alicia Chung
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                Just as her artistic touch is perfectly poignant, Alicia knows how to paint between the lines of on-point and venturesome; She has the drive and confidence to pursue her passions and yearnings given that they are genuinely her heart's desires. As of now, her affections lie with the book that enkindled 35 straight minutes of tears, "The Book Thief," and pho. In the future, Alicia intends to travel the world, alone or with company, and broaden her horizons of diverse cultures, foods, and landscapes.
                            </div>

                        </div>
                    </Link>

                    <Link to="https://maclyonsden.com/user/nisu">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/5f2df3b2844836244aa1f93f3b033166.jpeg" />
                                </div>
                                <div className="member-text">
                                    Nicole Cui
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                Mind constantly brimming with a myriad of ideas along with the drive to make them happen, Nicole yearns to both reach for heaven (see the northern lights) and stay grounded (go camping in Algonquin Park), all while keeping up to date with her MasterChef videos. She's also passionate about digital art and multiplayer video games like Overcooked, Stardew Valley, and (like half our staff) Valorant.
                            </div>

                        </div>
                    </Link>

                    <Link to="https://maclyonsden.com/user/zozoe_fc">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/97c77dfe5e67cc2c4c30e15f51facaa8.png" />
                                </div>
                                <div className="member-text">
                                    Zoe Fan-Chiang
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                To put it simply, Zoe knows what she's doing. Already a master of balancing when to listen to others and when to follow her own path, Zoe's joining Project Metropolis was a decision our dear graphic designer made because "Chelc said join and i listened because it's Chelc :D" A true Canadian, Zoe curls too, and a true artist with soul, she is also the only oboeist at WLMAC. Zoe intends to continue living her life listening (to Chelc), doing her best, and designing graphics.
                            </div>

                        </div>
                    </Link>

                    <Link to="https://maclyonsden.com/user/SidewalkSkunk">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/f10c88679075d6b1aab0aa27f6023c26" />
                                </div>
                                <div className="member-text">
                                    Derek Ma
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                Derek Ma has such a bland personality he knows it. While others describe him as intimidating, Derek uses his suspiciously unsourced British-ism to describe himself as "conscientious"  and embrace his appreciation for good manners. Jokes aside, Derek's a genuinely good person. Like anyone with decent taste, his favourite food is lasagna. Like any true WLMAC patriot, his favourite part about the school is the geese. And like any stereotypical tryhard, Derek would retake ICS if he could and he dreams of being an investment banker. On his bucket list, constructed from his stonks, cinematography, and computer hardware interests is building a computer, whaling on at least one character in Genshin Impact, and making it to retirement. Old age seems to be a genuine fear since Derek would wish, if he could, to advance healthcare to the point of curing ageing. However, we'll never know too much about the man who claims a cool fact about himself is that he likes starting fires. In a fireplace.
                            </div>

                        </div>
                    </Link>

                    <Link to="https://maclyonsden.com/user/cheollie">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/07eb7d43c09e6a8b541b0113846d41fa.png" />
                                </div>
                                <div className="member-text">
                                    Chelsea W
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                Chelsea is the shortest person in our staff. All illustrations on the website, from the map to the login graphics, are her original work, truly a testament to how height doesn't mean everything. All jokes aside, Chelsea also runs her own music corner, creates her own calligraphy, and wastes her own life away watching cheesy K-dramas.
                            </div>

                        </div>
                    </Link>

                    <Link to="https://maclyonsden.com/user/Neko">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/3ce2bd07d903482f99d0a111913f5b68" />
                                </div>
                                <div className="member-text">
                                    Connie Zhang
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                Connie Zhang is a fine example of someone who knows where and if her tastes lie, and based on that, makes the decisions that shape her authenticity. According to she who describes herself as "incredibly passive," Connie applied to Project Metropolis half-expecting to get rejected. However, her passion, including her fondness of horror, is exactly what our team values. Her spicy fancies, from dying her hair pastel pink to eating instant noodles so hot she can't taste anything else, make Connie super cool. If that isn't enough to get you to stop and stare, Connie's art is so good the artist herself states that she'd rather the fashion of the clothes she likes drawing over the world's mode manias.
                            </div>

                        </div>
                    </Link>

                </div>

                <div className="member-list">
                    <h2 className="subtitle">Content Creators</h2>

                    <Link to="https://maclyonsden.com/user/misheel.bt">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/ee83f2c6818c6891b878d44f25f7ba3a.jpeg" />
                                </div>
                                <div className="member-text">
                                    Misheel Batkhuu
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                The resident writer of Project Metropolis, Misheel has also taken up the role of 'chief tormentor of Bernie' within the Metropolis staff. Overwhelmingly brimming with energy and positivity, she sets herself apart from others not because of academic skill, but because of her willingness to try anything and everything. Not to say that she's academically lacking, however—her love of science would say otherwise. If you want to talk about karate, yoga, oatmeal, or are just a diehard romantic, Misheel is here for you.
                            </div>

                        </div>
                    </Link>

                    <Link to="https://maclyonsden.com/user/carminite">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/c643df5412333b47a4d948c9f1712fa2.png" />
                                </div>
                                <div className="member-text">
                                    Bernie Chen
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                Although Bernie has a tendency to portray himself as a typical nerd, one look at his character would suffice to prove he is anything but inauthentic. With a genuine love for the piano and sandbox games, he dreams of being a video game composer. However, just like the rest of us, Bernie admits WLMAC deserves what Project Metropolis will foster… in the meantime, he recommends broadening your horizons by trying some 小笼包.
                            </div>

                        </div>
                    </Link>

                    <Link to="https://maclyonsden.com/user/julianne.ylh">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/e682d8fe14389324d47019ca3a4dd625" />
                                </div>
                                <div className="member-text">
                                    Julianne Ho
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                A baker, gardener, painter, birdER, And dancer with five years of rhythmic gymnastics background, Julianne is raging with talent and passion of a caliber one would only believe if they saw it with their own eyes. Bright-eyed herself, Julianne describes herself as “a person who really enjoys the little things in life.” Diligent as she is, Julianne’s bucket list actually stands a chance at being realized because she’s already on it: getting back to rock climbing and learning ASL. If the girl is starting to look too intimidating, she offers her comfort song: Castle Town by Toby Fox. As for why she’s here on Project Metropolis, the Laufey lover intends to give WLMAC some fun content to enjoy and, definitely not more importantly, help the team get sleep.
                            </div>

                        </div>
                    </Link>

                    <Link to="https://maclyonsden.com/user/celine_celestium">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/98bdd04ab9b2ac08c35f133ee2493cb8" />
                                </div>
                                <div className="member-text">
                                    Celine Hwang
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                With her soulful heart, Celine is sure to make a lasting impact wherever she sets foot; quite literally, as she is a cardinal member of the Mac Dance Team. Her favourite movies are empowering rom-com hits from the 90s/200s, including Mean Girls and Legally Blonde, and her music taste extends from Ariana Grande to Blackpink. For Celine, Project Metropolis means an opportunity, not only to work with fellow (math) savants but to ensure WLMAC's ears are open to good music. For now, she would highly recommend listening to Eighteen by Key. To reinforce her wish for everyone to look back on life with no regrets, here are the song lyrics Celine lives by, "My mama said I'm living today for tomorrow, my daddy said it won't be easy but that's life, you only live once."
                            </div>

                        </div>
                    </Link>

                    <Link to="https://maclyonsden.com/user/hassankhan8868">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/16eee7097593979cb312ab378cddb9e3" />
                                </div>
                                <div className="member-text">
                                    Hassan Khan
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                Wholesome and compassionate, Hassan is a cinnamon bun that makes sweetness all but natural and life hopeful. He joined Project Metropolis because he wanted to contribute to a place that genuinely informs and connects students. To thank him for his heroism, or just to hear about his endeavours, you can find Hassan chilling with music - likely soft indie, - dystopian lits, thrillers, or, if you're lucky enough to find him tired, a cheesy romance. In the future, though, you'll be more likely to find the man a journalist or professor, living his dream.
                            </div>

                        </div>
                    </Link>

                </div>

                <div className="member-list">
                    <h2 className="subtitle">Game Developers</h2>

                    <Link to="https://maclyonsden.com/user/3xp3rtz">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/a02b6f6eef8301cdbee1b398bec869a8" />
                                </div>
                                <div className="member-text">
                                    Caleb Chue
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                Caleb is special in many ways, most good, some cool, and others still, merely special. There's the honest confession that he measures 154cm in height. Then there's the "orz"-inducing declaration that he spends his spare time programming, creating minigames like Mahjong and Tetris, and dedicating/sacrificing some more time/sleep to perfecting them. The most wonderful part about Caleb, though, asides from his love of glitch-hop/jpop, badminton, and curling, is that he is one of those rare golden souls that genuinely lives by words like, "treat others the way you want to be treated" and " you fail, you forget." Welp, everyone will be failing to forget Caleb.
                            </div>

                        </div>
                    </Link>

                    <Link to="https://maclyonsden.com/user/Maplefin">
                        <div className="member">
                            <div className="member-name">
                                <div className="member-image">
                                    <img className="circle" src="./About _ Metropolis_files/1a67ed933f725ecacab937b65c2fb9e2.jpeg" />
                                </div>
                                <div className="member-text">
                                    James Huynh
                                </div>
                            </div>

                            <hr />
                            <div className="member-bio">
                                A video game and keyboard hobbyist, the things that make James James are also what make him a slick game developer for Mac Lyons' Den. His favourite game is "Control" and he immerses himself wholeheartedly in the realm of alternative/modern rock like Twenty One Pilots, Half-Alive, and Weathers. He interestingly and genuinely considers ICS his favourite subject. Most fascinating, however, James proclaims a passionate food predilection for all vegetables, raw or cooked.
                            </div>

                        </div>
                    </Link>

                </div>

            </div>
            <div className="content" id="content-contact" style={{ display: "none" }}>
                <h1 className="title">Contact Us</h1>
                <hr />
                <p className="text">
                    If you ever find bugs or problems with the site, or need to be granted the staff status,
                    feel free to <Link className="link" to="mailto:hello@maclyonsden.com" target="_blank">email</Link> us
                    or use the form below.
                </p>
                <ul className="link-section">
                    <div>
                        <li>
                            <Link className="link" to="mailto:hello@maclyonsden.com" target="_blank">
                                <i className="zmdi zmdi-email zmdi-hc-lg" aria-hidden="true"></i>
                                <p>hello@maclyonsden.com</p>
                            </Link>
                        </li>
                        <li>
                            <Link className="link" to="https://github.com/wlmac" target="_blank">
                                <i className="zmdi zmdi-github zmdi-hc-lg" aria-hidden="true"></i>
                                <p>wlmac</p>
                            </Link>
                        </li>
                        <li>
                            <Link className="link" to="https://www.instagram.com/wlmac.sac/" target="_blank">
                                <i className="zmdi zmdi-instagram zmdi-hc-lg" aria-hidden="true"></i>
                                <p>@wlmac.sac</p>
                            </Link>
                        </li>
                        <li>
                            <Link className="link" to="https://www.facebook.com/groups/keeptrackofmac" target="_blank">
                                <i className="zmdi zmdi-facebook-box zmdi-hc-lg" aria-hidden="true"></i>
                                <p>Keep Track of MAC</p>
                            </Link>
                        </li>
                    </div>
                </ul>
                <br />
                <div className="content-embed">
                    <iframe src="./About _ Metropolis_files/viewform.html" frameBorder={0} marginHeight={0} marginWidth={0}>
                        Loading…
                    </iframe>
                </div>
            </div>
            <div className="content" id="content-school" style={{ display: "none" }}>
                <h1 className="title">Contact the School</h1>
                <hr />
                <p className="text">
                    Project Metropolis is a site affiliated with William Lyon Mackenzie Collegiate Institute.
                    To contact the school, please refer to the channels of communication listed below.
                </p>
                <ul className="link-section">
                    <div>
                        <li>
                            <Link className="link" to="https://wlmac.ca/" target="_blank">
                                <i className="zmdi zmdi-link zmdi-hc-lg" aria-hidden="true"></i>
                                <p>WLMCI Offical Website</p>
                            </Link>
                        </li>
                        <li>
                            <Link className="link" to="https://goo.gl/maps/WyfTKUqKrbecU4RE9" target="_blank">
                                <i className="zmdi zmdi-map zmdi-hc-lg" aria-hidden="true"></i>
                                <p>20 Tillplain Road, North York, ON M3H 5R2</p>
                            </Link>
                        </li>
                        <li>
                            <Link className="link" to="tel:4163953330">
                                <i className="zmdi zmdi-phone zmdi-hc-lg" aria-hidden="true"></i>
                                <p>(416) 395-3330</p>
                            </Link>
                        </li>
                    </div>
                </ul>
                <h2 className="subtitle">Admin</h2>
                <hr />
                <ul className="link-section">
                    <div>
                        <h3 className="section-title">Principal</h3>
                        <li>
                            <Link className="link" to="mailto:keith.johnson@tdsb.on.ca" target="_blank">
                                <i className="zmdi zmdi-email zmdi-hc-lg" aria-hidden="true"></i>
                                <p>Keith Johnson (keith.johnson@tdsb.on.ca)</p>
                            </Link>
                        </li>
                        <h3 className="section-title">Vice Principals</h3>
                        <li>
                            <Link className="link" to="mailto:joanne.d&#39;addio@tdsb.on.ca" target="_blank">
                                <i className="zmdi zmdi-email zmdi-hc-lg" aria-hidden="true"></i>
                                <p>Joanne D'Addio (joanne.d'addio@tdsb.on.ca)</p>
                            </Link>
                        </li>
                        <li>
                            <Link className="link" to="mailto:stephen.morris@tdsb.on.ca" target="_blank">
                                <i className="zmdi zmdi-email zmdi-hc-lg" aria-hidden="true"></i>
                                <p>Stephen Morris (stephen.morris@tdsb.on.ca)</p>
                            </Link>
                        </li>
                    </div>
                </ul>

            </div>
            {/* <script>
                $(document).ready(function() {
                    var urlParams = new URLSearchParams(window.location.search);
                    $(".content").hide();
                    if(!$("#content-"+urlParams.get("tab")).length) {
                        urlParams.set("tab", "history");
                        history.replaceState(null, null, "?"+urlParams.toString());
                    }
                    $("#content-"+urlParams.get("tab")).show();
                    $(".header").removeClass("active");
                    $("#"+urlParams.get("tab")).addClass("active");
                    //$(".card-authors-text").find("a").addClass("link");
                });
            </script> */}
        </>
    )
}