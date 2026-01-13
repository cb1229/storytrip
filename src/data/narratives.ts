import { Narrative } from '../types';

export const narratives: Narrative[] = [
  {
    id: 'rivalry',
    title: 'Rivalry Conquest',
    tagline: '"We came. We saw. We conquered."',
    color: 'from-red-500 to-orange-500',
    desc: 'Invade enemy territory and claim victory',
    iconName: 'Swords',
  },
  {
    id: 'family',
    title: 'Family Legacy',
    tagline: '"Three generations, one team, forever."',
    color: 'from-purple-500 to-pink-500',
    desc: 'Connect generations through shared passion',
    iconName: 'Heart',
  },
  {
    id: 'underdog',
    title: 'Underdog Redemption',
    tagline: '"Against all odds..."',
    color: 'from-green-500 to-teal-500',
    desc: 'Triumph when no one believed',
    iconName: 'Trophy',
  },
  {
    id: 'origin',
    title: 'The Origin Story',
    tagline: '"This is where it all began..."',
    color: 'from-blue-500 to-indigo-500',
    desc: "Discover your team's roots",
    iconName: 'BookOpen',
  },
  {
    id: 'bucket',
    title: 'Bucket List Quest',
    tagline: '"30 stadiums. One lifetime."',
    color: 'from-yellow-500 to-amber-500',
    desc: 'Epic achievement unlocked',
    iconName: 'Star',
  },
  {
    id: 'custom',
    title: 'Custom Story',
    tagline: '"Your narrative, your way"',
    color: 'from-gray-500 to-slate-500',
    desc: 'Create your own adventure',
    iconName: 'Sparkles',
  },
];
