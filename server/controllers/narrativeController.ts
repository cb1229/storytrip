import { Request, Response } from 'express';

// Sample narratives data
const narratives = [
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

export const getNarratives = async (req: Request, res: Response) => {
  try {
    res.json({ success: true, data: narratives });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch narratives' });
  }
};

export const getNarrativeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const narrative = narratives.find((n) => n.id === id);

    if (!narrative) {
      return res.status(404).json({ success: false, error: 'Narrative not found' });
    }

    res.json({ success: true, data: narrative });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch narrative' });
  }
};

export const generateItinerary = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { gameInfo } = req.body;

    // In a real implementation, this would use AI to generate a custom itinerary
    // For now, return a sample itinerary structure
    const sampleItinerary = {
      1: {
        title: 'ACT I: The Gathering',
        events: [
          {
            time: '6:00 PM',
            title: 'The War Room',
            location: 'Airport Bar',
            iconName: 'Beer',
            story: 'Meet fellow fans, record your pre-battle speech',
            type: 'story',
          },
        ],
      },
      2: {
        title: 'ACT II: The Conquest',
        events: [
          {
            time: '7:20 PM',
            title: 'THE BATTLE',
            location: gameInfo?.venue || 'Stadium',
            iconName: 'Trophy',
            story: 'The reason we came',
            type: 'climax',
          },
        ],
      },
      3: {
        title: 'ACT III: The Return',
        events: [
          {
            time: '5:00 PM',
            title: 'Heroes Return',
            location: 'Home',
            iconName: 'Home',
            story: 'Changed forever',
            type: 'story',
          },
        ],
      },
    };

    res.json({ success: true, data: sampleItinerary });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to generate itinerary' });
  }
};
