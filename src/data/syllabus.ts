export const syllabus = {
  novel: {
    id: 'vendor-of-sweets',
    title: 'The Vendor of Sweets',
    author: 'R.K. Narayan',
    themes: ['Tradition vs Modernity', 'Generational Conflict', 'Self-discovery and Renunciation', 'East vs West', 'Materialism vs Spirituality'],
    characters: [
      { name: 'Jagan', description: 'A traditional sweet vendor, follower of Gandhi, struggles to understand his modern son.' },
      { name: 'Mali', description: 'Jagan\'s son who goes to America and returns with a half-Korean wife and a novel-writing machine.' },
      { name: 'Grace', description: 'Mali\'s half-Korean wife who tries to adapt to Indian culture but is ultimately rejected by it.' },
      { name: 'Cousin', description: 'The bridge between Jagan and Mali, a pragmatic man who helps Jagan navigate his problems.' }
    ],
    lessons: [
      { id: 'vos-1', title: 'Chapter 1-2: Jagan\'s Philosophy', content: 'Jagan is introduced as a man of contradictions. He follows Gandhi, reads the Gita, and advocates for simple living, yet he runs a highly profitable sweet shop and keeps a hidden stash of cash ("free cash") to avoid taxes.', quotes: [{ text: '"Conquer taste, and you will have conquered the self."', explanation: 'Jagan\'s hypocritical philosophy.' }] },
      { id: 'vos-2', title: 'Chapter 3-4: The Sweet Shop', content: 'The sweet shop is Jagan\'s domain. He controls the fryers and the cash register. The Cousin visits daily to sample sweets and act as a sounding board for Jagan.', quotes: [{ text: '"He sat at his desk and watched the frying... it was a spiritual experience."', explanation: 'Jagan equates his business with religion.' }] },
      { id: 'vos-3', title: 'Chapter 5-6: Mali\'s Rebellion', content: 'Mali suddenly announces he is dropping out of college to write a novel. Jagan is shocked but tries to be supportive, though he doesn\'t understand. Mali eventually steals Jagan\'s hidden money to buy a ticket to America.', quotes: [{ text: '"I can\'t study anymore... I want to write a book."', explanation: 'Mali\'s rejection of traditional education.' }] },
      { id: 'vos-4', title: 'Chapter 7-8: Letters from America', content: 'Mali sends letters from America, mostly about eating beef and the wonders of Western civilization. Jagan is horrified by the beef but proud of his son\'s letters, showing them off to everyone in Malgudi.', quotes: [{ text: '"He has eaten beef!"', explanation: 'Jagan\'s cultural shock.' }] },
      { id: 'vos-5', title: 'Chapter 9-10: The Return', content: 'Mali returns, but not alone. He brings Grace, a half-Korean, half-American woman. Jagan is thrown into a panic about where she will sleep and how the town will react.', quotes: [{ text: '"This is Grace. We are married."', explanation: 'Mali\'s casual introduction of a massive cultural shock.' }] },
      { id: 'vos-6', title: 'Chapter 11-12: The Novel-Writing Machine', content: 'Mali reveals his grand business plan: not writing a novel, but manufacturing and selling a novel-writing machine. He demands a massive investment from Jagan, who uses passive resistance to avoid paying.', quotes: [{ text: '"It\'s a machine that writes stories. All you do is press buttons."', explanation: 'The ultimate symbol of Western mechanization replacing traditional art.' }] },
      { id: 'vos-7', title: 'Chapter 13-14: Grace\'s Adaptation', content: 'Grace tries hard to be a good Indian daughter-in-law, transforming Jagan\'s house and cooking for him. Jagan grows fond of her, but the cultural barrier remains.', quotes: [{ text: '"I want to be a good Hindu wife."', explanation: 'Grace\'s genuine but ultimately doomed attempt to assimilate.' }] },
      { id: 'vos-8', title: 'Chapter 15-16: The Shocking Truth', content: 'Jagan discovers that Mali and Grace are not legally married. In traditional Malgudi, this is a massive scandal. Jagan feels his home is polluted and begins to withdraw from them.', quotes: [{ text: '"We are not married... We just live together."', explanation: 'The revelation that breaks Jagan\'s tolerance.' }] },
      { id: 'vos-9', title: 'Chapter 17-18: The Retreat', content: 'Overwhelmed by Mali\'s demands and the scandal of Grace, Jagan meets a sculptor who shows him a secluded grove. Jagan decides to enter the stage of "Sanyasa" (renunciation) and leave his worldly life behind.', quotes: [{ text: '"I am a free man. I\'ve never felt more free in my life."', explanation: 'Jagan\'s liberation.' }] },
      { id: 'vos-10', title: 'Chapter 19-20: Resolution', content: 'Mali is arrested for having alcohol in his car. Jagan refuses to bail him out immediately, believing a stint in jail will teach him a lesson. Jagan leaves for the grove, leaving the Cousin in charge of the shop and Mali\'s situation.', quotes: [{ text: '"A little prison life won\'t hurt him."', explanation: 'Jagan\'s final detachment from his son.' }] }
    ],
    quizzes: [
      { id: 'vos-q1', question: 'What is Jagan\'s primary business?', options: ['Selling books', 'Selling sweets', 'Making clothes', 'Farming'], correct: 1 },
      { id: 'vos-q2', question: 'What does Mali steal to go to America?', options: ['Jagan\'s car', 'Jagan\'s hidden cash', 'The shop\'s deed', 'Jewelry'], correct: 1 },
      { id: 'vos-q3', question: 'What is Mali\'s grand business idea upon returning?', options: ['A new sweet shop', 'A novel-writing machine', 'A clothing factory', 'A school'], correct: 1 },
      { id: 'vos-q4', question: 'What shocking truth does Grace reveal to Jagan?', options: ['She hates India', 'She is a spy', 'She and Mali are not married', 'She is stealing money'], correct: 2 },
      { id: 'vos-q5', question: 'What Hindu life stage does Jagan enter at the end?', options: ['Brahmacharya', 'Grihastha', 'Vanaprastha/Sanyasa', 'Karma'], correct: 2 },
      { id: 'vos-q6', question: 'Who acts as the intermediary between Jagan and Mali?', options: ['Grace', 'The Sculptor', 'The Cousin', 'The Tax Collector'], correct: 2 },
      { id: 'vos-q7', question: 'Why is Mali arrested at the end of the novel?', options: ['Stealing', 'Assault', 'Having alcohol in his car', 'Tax evasion'], correct: 2 },
      { id: 'vos-q8', question: 'What book does Jagan constantly read and quote?', options: ['The Bible', 'The Quran', 'The Bhagavad Gita', 'The Ramayana'], correct: 2 },
      { id: 'vos-q9', question: 'What does Jagan do with his "free cash"?', options: ['Puts it in the bank', 'Hides it in his house', 'Gives it to charity', 'Invests in stocks'], correct: 1 },
      { id: 'vos-q10', question: 'What is Jagan\'s reaction to Mali eating beef?', options: ['He doesn\'t care', 'He is horrified and feels polluted', 'He wants to try it', 'He tells the whole town'], correct: 1 }
    ]
  },
  poetry: [
    {
      id: 'the-eagle',
      title: 'The Eagle',
      author: 'Alfred Lord Tennyson',
      themes: ['Nature\'s Power', 'Isolation', 'Majesty', 'Predation'],
      lessons: [
        { id: 'eagle-1', title: 'Introduction & Context', content: 'Alfred Lord Tennyson was a Victorian poet. "The Eagle" is a short, powerful poem consisting of two rhyming triplets. It focuses on the raw, untamed power of nature, contrasting the static majesty of the eagle with its sudden, violent action.', quotes: [] },
        { id: 'eagle-2', title: 'Line 1: "He clasps the crag with crooked hands;"', content: 'The use of "He" personifies the eagle, giving it a sense of character and dominance. "Clasps" and "crooked hands" use hard "c" alliteration to mimic the sharp, unyielding grip of the eagle on the rock.', quotes: [{ text: '"He clasps the crag with crooked hands;"', explanation: 'Alliteration and Personification.' }] },
        { id: 'eagle-3', title: 'Line 2: "Close to the sun in lonely lands,"', content: 'This line uses hyperbole ("Close to the sun") to emphasize the eagle\'s extreme altitude. "Lonely lands" highlights its isolation; it exists in a realm above humanity.', quotes: [{ text: '"Close to the sun in lonely lands,"', explanation: 'Hyperbole and Alliteration.' }] },
        { id: 'eagle-4', title: 'Line 3: "Ring\'d with the azure world, he stands."', content: '"Azure world" refers to the blue sky. Being "ring\'d" by it suggests the eagle is the center of this universe. "He stands" reinforces its static, statuesque dominance in the first stanza.', quotes: [{ text: '"Ring\'d with the azure world, he stands."', explanation: 'Visual imagery of dominance.' }] },
        { id: 'eagle-5', title: 'Line 4: "The wrinkled sea beneath him crawls;"', content: 'The perspective shifts downward. From the eagle\'s immense height, the massive, powerful ocean looks like tiny "wrinkles" that merely "crawl." This personification diminishes the sea to elevate the eagle\'s power.', quotes: [{ text: '"The wrinkled sea beneath him crawls;"', explanation: 'Personification and Imagery.' }] },
        { id: 'eagle-6', title: 'Line 5: "He watches from his mountain walls,"', content: 'The eagle is depicted as a king or a guard on a fortress ("mountain walls"). It is observant, waiting for the perfect moment to strike.', quotes: [{ text: '"He watches from his mountain walls,"', explanation: 'Metaphor comparing the mountain to a fortress.' }] },
        { id: 'eagle-7', title: 'Line 6: "And like a thunderbolt he falls."', content: 'The poem ends with sudden, violent action. The simile "like a thunderbolt" conveys extreme speed, power, and destructive force. The word "falls" contrasts with "stands" in the first stanza, showing the transition from static observation to deadly predation.', quotes: [{ text: '"And like a thunderbolt he falls."', explanation: 'Simile emphasizing speed and power.' }] },
        { id: 'eagle-8', title: 'Form and Structure', content: 'The poem is written in iambic tetrameter. It consists of two stanzas, each a rhyming triplet (AAA, BBB). The first stanza focuses on height and stillness, while the second focuses on depth and action.', quotes: [] }
      ],
      quizzes: [
        { id: 'eagle-q1', question: 'What figure of speech is "crooked hands"?', options: ['Simile', 'Personification', 'Metaphor', 'Onomatopoeia'], correct: 1 },
        { id: 'eagle-q2', question: 'What does "azure world" refer to?', options: ['The ocean', 'The sky', 'The mountains', 'The sun'], correct: 1 },
        { id: 'eagle-q3', question: 'How is the sea described in the poem?', options: ['Raging and stormy', 'Calm and blue', 'Wrinkled and crawling', 'Deep and dark'], correct: 2 },
        { id: 'eagle-q4', question: 'What is the eagle compared to when it dives?', options: ['An arrow', 'A thunderbolt', 'A falling star', 'A bullet'], correct: 1 },
        { id: 'eagle-q5', question: 'What is the rhyme scheme of the poem?', options: ['AABB CC', 'ABAB CDCD', 'AAA BBB', 'ABC ABC'], correct: 2 },
        { id: 'eagle-q6', question: 'What does the word "clasps" suggest about the eagle?', options: ['It is falling', 'It has a weak grip', 'It has a firm, powerful grip', 'It is flying'], correct: 2 },
        { id: 'eagle-q7', question: 'What literary device is used in "Close to the sun"?', options: ['Hyperbole', 'Simile', 'Irony', 'Oxymoron'], correct: 0 },
        { id: 'eagle-q8', question: 'What is the main contrast between Stanza 1 and Stanza 2?', options: ['Day vs Night', 'Stillness vs Action', 'Life vs Death', 'Joy vs Sorrow'], correct: 1 }
      ]
    },
    {
      id: 'to-the-nile',
      title: 'To the Nile',
      author: 'John Keats',
      themes: ['Nature\'s Duality', 'Illusion vs Reality', 'The Power of the River'],
      lessons: [
        { id: 'nile-1', title: 'Introduction to the Sonnet', content: 'John Keats wrote this Petrarchan sonnet during a poetry competition with his friend Leigh Hunt. It addresses the River Nile, exploring its mythical grandeur versus its actual, life-giving reality.', quotes: [] },
        { id: 'nile-2', title: 'The Octave: Myth and Mystery', content: 'The first 8 lines (octave) focus on the mysterious and mythical aspects of the Nile. Keats calls it "Son of the old moon-mountains African!" highlighting its unknown, ancient origins.', quotes: [{ text: '"Son of the old moon-mountains African!"', explanation: 'Personification and mythical imagery.' }] },
        { id: 'nile-3', title: 'The Octave: The River\'s Journey', content: 'Keats describes the river flowing through "dark" and "sunburnt" landscapes, bringing life to barren deserts. He questions if the river is a "Chief" of the desert.', quotes: [{ text: '"Art thou so fruitful? or dost thou beguile / Such men to honour thee..."', explanation: 'Questioning the river\'s true nature.' }] },
        { id: 'nile-4', title: 'The Volta (The Turn)', content: 'In line 9, the poem shifts (the volta). Keats moves away from the grand, mythical questions and focuses on the immediate, pleasant reality of the river.', quotes: [{ text: '"\'Tis ignorance that makes a barren waste / Of all beyond itself."', explanation: 'The philosophical turning point.' }] },
        { id: 'nile-5', title: 'The Sestet: Reality and Greenery', content: 'The final 6 lines (sestet) describe the Nile not as a dark, mysterious god, but as a pleasant, life-giving stream that creates "green rushes" and "pleasant sunrise." It brings comfort and fertility.', quotes: [{ text: '"Thou dost bedew green rushes like our rivers..."', explanation: 'Comparing the exotic Nile to familiar English rivers.' }] },
        { id: 'nile-6', title: 'Themes of Illusion vs Reality', content: 'Keats argues that human imagination often creates grand, terrifying myths out of ignorance. When we look closely, nature (even the mighty Nile) is simply beautiful, life-giving, and familiar.', quotes: [] }
      ],
      quizzes: [
        { id: 'nile-q1', question: 'What type of poem is "To the Nile"?', options: ['A ballad', 'A Petrarchan sonnet', 'A Shakespearean sonnet', 'Free verse'], correct: 1 },
        { id: 'nile-q2', question: 'What does Keats call the Nile in the first line?', options: ['King of Rivers', 'Son of the old moon-mountains African', 'Dark water of the desert', 'Bringer of life'], correct: 1 },
        { id: 'nile-q3', question: 'What is the "volta" in a sonnet?', options: ['The ending', 'The rhyme scheme', 'The turning point in thought', 'The title'], correct: 2 },
        { id: 'nile-q4', question: 'In the sestet, what does Keats compare the Nile to?', options: ['An ocean', 'A desert', 'Familiar English rivers', 'A snake'], correct: 2 },
        { id: 'nile-q5', question: 'What does Keats say creates a "barren waste"?', options: ['The sun', 'Ignorance', 'The river', 'Time'], correct: 1 },
        { id: 'nile-q6', question: 'What is the main theme of the poem?', options: ['The danger of water', 'The contrast between myth and pleasant reality', 'The history of Egypt', 'The death of nature'], correct: 1 }
      ]
    }
  ],
  shortStories: [
    {
      id: 'lumber-room',
      title: 'The Lumber Room',
      author: 'Saki (H.H. Munro)',
      themes: ['Adult Hypocrisy vs Childish Imagination', 'Rebellion', 'Strict Victorian Upbringing', 'The Power of Imagination'],
      lessons: [
        { id: 'lumber-1', title: 'Introduction: The Restrictive Adult World', content: 'The story opens with Nicholas in disgrace. The adult world, represented by the "aunt-by-assertion," is depicted as rigid, unimaginative, and hypocritical. They invent arbitrary rules and punishments.', quotes: [{ text: '"He was in disgrace."', explanation: 'The opening line sets the tone of conflict.' }] },
        { id: 'lumber-2', title: 'The Frog Incident: Challenging Authority', content: 'Nicholas claims there is a frog in his bread-and-milk. The aunt dismisses this as impossible. Nicholas then proves her wrong because he put it there himself. This exposes the aunt\'s false omniscience.', quotes: [{ text: '"You said there couldn\'t possibly be a frog in my bread-and-milk... I put it there myself."', explanation: 'Nicholas outsmarting the adult.' }] },
        { id: 'lumber-3', title: 'The Jagborough Expedition: False Punishments', content: 'As punishment, the other children are sent to Jagborough sands. The aunt expects Nicholas to be devastated. Instead, he is indifferent, which infuriates her because her punishment failed to cause pain.', quotes: [{ text: '"It was her habit, whenever one of the children fell from grace, to improvise something of a festival nature from which the offender would be rigorously debarred."', explanation: 'The aunt\'s cruel disciplinary tactics.' }] },
        { id: 'lumber-4', title: 'The Decoy', content: 'Nicholas pretends he wants to enter the gooseberry garden to keep the aunt occupied guarding it. This is a brilliant tactical move to leave his true target unguarded.', quotes: [{ text: '"It was probably the first time for twenty years that anyone had smiled in that lumber-room."', explanation: 'The joy of outwitting the aunt.' }] },
        { id: 'lumber-5', title: 'Entering the Lumber Room', content: 'Nicholas sneaks into the forbidden Lumber Room. To the aunt, it\'s just a place for old junk. To Nicholas, it is a magical sanctuary, a "storehouse of unimagined treasures."', quotes: [{ text: '"It was a storehouse of unimagined treasures."', explanation: 'The contrast between adult and child perspectives.' }] },
        { id: 'lumber-6', title: 'The Tapestry: Storytelling and Art', content: 'Nicholas is fascinated by a piece of tapestry depicting a hunter and a stag. He uses his imagination to create a whole narrative around it, showing his deep appreciation for art and story, unlike the dull aunt.', quotes: [{ text: '"Nicholas sat for many golden minutes revolving the possibilities of the scene."', explanation: 'The power of a child\'s imagination.' }] },
        { id: 'lumber-7', title: 'The Climax: The Aunt in the Tank', content: 'The aunt falls into the empty rain-water tank while looking for Nicholas. She calls for him to rescue her. Nicholas uses her own strict rules against her to refuse.', quotes: [{ text: '"I was told I wasn\'t to go into the gooseberry garden," said Nicholas promptly.', explanation: 'Malicious compliance used brilliantly.' }] },
        { id: 'lumber-8', title: 'The Strawberry Jam Incident: Turning the Tables', content: 'Nicholas asks if she will give him strawberry jam. She says yes. He claims she must be the Evil One tempting him, because the real aunt said there was no jam. He walks away, leaving her trapped.', quotes: [{ text: '"Now I know that you are the Evil One and not aunt," shouted Nicholas gleefully.', explanation: 'Using the aunt\'s lies against her.' }] },
        { id: 'lumber-9', title: 'The Resolution', content: 'The aunt is eventually rescued by a kitchen maid. Dinner that night is silent. The aunt is furious, the other children had a terrible time at Jagborough, but Nicholas is perfectly happy, lost in his imagination about the hunter in the tapestry.', quotes: [{ text: '"Nicholas was also silent, in the absorption of one who has much to think about."', explanation: 'Nicholas\'s ultimate victory.' }] }
      ],
      quizzes: [
        { id: 'lumber-q1', question: 'What did Nicholas put in his bread-and-milk?', options: ['A spider', 'A frog', 'A fly', 'A beetle'], correct: 1 },
        { id: 'lumber-q2', question: 'Where are the other children sent as a "treat"?', options: ['The circus', 'Jagborough sands', 'London', 'The park'], correct: 1 },
        { id: 'lumber-q3', question: 'What is the aunt\'s relationship to Nicholas?', options: ['His biological aunt', 'His mother', 'His grandmother', 'An "aunt-by-assertion" (guardian)'], correct: 3 },
        { id: 'lumber-q4', question: 'What does Nicholas pretend he wants to do to trick the aunt?', options: ['Go to the beach', 'Sneak into the gooseberry garden', 'Eat all the jam', 'Run away'], correct: 1 },
        { id: 'lumber-q5', question: 'What object in the Lumber Room fascinates Nicholas the most?', options: ['A teapot', 'A book of birds', 'A piece of tapestry', 'A wooden horse'], correct: 2 },
        { id: 'lumber-q6', question: 'Where does the aunt get trapped?', options: ['In the closet', 'In the rain-water tank', 'In the basement', 'In the gooseberry bushes'], correct: 1 },
        { id: 'lumber-q7', question: 'Why does Nicholas refuse to help the aunt?', options: ['He is not strong enough', 'He claims he was forbidden to enter the garden', 'He doesn\'t hear her', 'He is afraid of the dark'], correct: 1 },
        { id: 'lumber-q8', question: 'What does Nicholas accuse the trapped aunt of being?', options: ['A liar', 'The Evil One', 'A ghost', 'A thief'], correct: 1 },
        { id: 'lumber-q9', question: 'Who eventually rescues the aunt?', options: ['Nicholas', 'The uncle', 'A kitchen maid', 'The police'], correct: 2 },
        { id: 'lumber-q10', question: 'What is Nicholas thinking about at the end of the story?', options: ['The frog', 'The beach', 'The hunter and the stag from the tapestry', 'Getting in trouble'], correct: 2 }
      ]
    }
  ],
  drama: [
    {
      id: 'the-bear',
      title: 'The Bear',
      author: 'Anton Chekhov',
      themes: ['The Absurdity of Human Emotion', 'Gender Roles', 'Grief vs Passion', 'Hypocrisy'],
      lessons: [
        { id: 'bear-1', title: 'Introduction to the Farce', content: 'Chekhov\'s "The Bear" is a one-act farce. A farce is a comedy that aims at entertaining the audience through situations that are highly exaggerated, extravagant, and thus improbable.', quotes: [] },
        { id: 'bear-2', title: 'Character: Elena Popova', content: 'Popova is a young, attractive widow who has sworn to mourn her late husband forever. However, her mourning is highly performative and hypocritical, as she secretly wants to be rescued from her self-imposed isolation.', quotes: [{ text: '"I shall never go out... Why should I? My life is already at an end."', explanation: 'Popova\'s melodramatic performance of grief.' }] },
        { id: 'bear-3', title: 'Character: Grigory Smirnov', content: 'Smirnov is a middle-aged landowner. He arrives angry and desperate to collect a debt. He is boorish, loud, and claims to hate women, yet he is easily swayed by passion.', quotes: [{ text: '"I\'m not a woman, I\'m an honorable man!"', explanation: 'Smirnov\'s aggressive assertion of masculinity.' }] },
        { id: 'bear-4', title: 'Character: Luka', content: 'Luka is Popova\'s old, faithful servant. He acts as the voice of reason and common sense, constantly urging Popova to stop mourning and live her life. He provides comic relief through his fear of Smirnov.', quotes: [{ text: '"It\'s not right, madam... You\'re just destroying yourself."', explanation: 'Luka\'s practical advice.' }] },
        { id: 'bear-5', title: 'The Inciting Incident: The Debt', content: 'Smirnov arrives demanding 1,200 rubles that Popova\'s late husband owed him for oats. Popova says her steward is away and she will pay him the day after tomorrow. Smirnov refuses to leave until he gets the money.', quotes: [{ text: '"I need the money today, not the day after tomorrow!"', explanation: 'The conflict that drives the plot.' }] },
        { id: 'bear-6', title: 'The Rising Action: The Argument', content: 'The argument escalates from money to a battle of the sexes. Smirnov rants about how women are deceitful and shallow. Popova counters by revealing her late husband was unfaithful and cruel, yet she remains faithful to his memory to prove she is better than him.', quotes: [{ text: '"You call that love? I call it madness!"', explanation: 'Smirnov challenging Popova\'s performative grief.' }] },
        { id: 'bear-7', title: 'The Climax: The Duel', content: 'The argument becomes so heated that Smirnov challenges Popova to a duel with pistols. Surprisingly, Popova accepts and goes to get her husband\'s guns. Smirnov is suddenly struck by her fiery spirit and falls in love with her.', quotes: [{ text: '"I\'ll shoot you down like a partridge!"', explanation: 'Popova\'s unexpected and aggressive response.' }] },
        { id: 'bear-8', title: 'The Resolution: The Proposal', content: 'Instead of shooting her, Smirnov confesses his love and proposes. After a brief moment of hesitation and telling him to leave, Popova orders Luka not to give the horse any oats, signaling she accepts Smirnov\'s advances and her period of mourning is over.', quotes: [{ text: '"Luka, tell them in the stables that Toby isn\'t to have any oats at all today."', explanation: 'The symbolic end of her mourning.' }] }
      ],
      quizzes: [
        { id: 'bear-q1', question: 'What type of play is "The Bear"?', options: ['Tragedy', 'Farce', 'Historical Drama', 'Melodrama'], correct: 1 },
        { id: 'bear-q2', question: 'Why is Popova in deep mourning?', options: ['Her father died', 'Her child died', 'Her husband died', 'Her dog died'], correct: 2 },
        { id: 'bear-q3', question: 'Why does Smirnov visit Popova?', options: ['To propose to her', 'To collect a debt of 1,200 rubles', 'To buy her estate', 'To apologize for an insult'], correct: 1 },
        { id: 'bear-q4', question: 'What did Popova\'s late husband buy from Smirnov?', options: ['Horses', 'Wheat', 'Oats', 'Carriages'], correct: 2 },
        { id: 'bear-q5', question: 'How does Popova describe her late husband\'s behavior?', options: ['He was a saint', 'He was unfaithful and cruel', 'He was a great businessman', 'He was very romantic'], correct: 1 },
        { id: 'bear-q6', question: 'What does Smirnov challenge Popova to do?', options: ['A horse race', 'A spelling bee', 'A duel with pistols', 'A drinking contest'], correct: 2 },
        { id: 'bear-q7', question: 'What is Smirnov\'s reaction when Popova accepts the duel?', options: ['He runs away in fear', 'He falls in love with her fiery spirit', 'He shoots her immediately', 'He laughs at her'], correct: 1 },
        { id: 'bear-q8', question: 'What is the final order Popova gives to Luka?', options: ['To shoot Smirnov', 'To give Toby extra oats', 'Not to give Toby any oats today', 'To pack her bags'], correct: 2 },
        { id: 'bear-q9', question: 'Who is Luka?', options: ['Popova\'s late husband', 'Smirnov\'s servant', 'Popova\'s old servant', 'The local priest'], correct: 2 },
        { id: 'bear-q10', question: 'What does the title "The Bear" refer to?', options: ['A literal bear in the woods', 'Smirnov\'s boorish and aggressive behavior', 'Popova\'s late husband', 'A nickname for Luka'], correct: 1 }
      ]
    }
  ]
};
