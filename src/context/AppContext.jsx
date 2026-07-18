import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Global Admin Mode
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUsingSupabase, setIsUsingSupabase] = useState(false);

  // Statistics State
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('dairyshield_stats_v4');
    return saved ? JSON.parse(saved) : {
      reached: 70,
      surveyResponses: 54,
      awarenessDrives: 18,
      localCommunities: 6
    };
  });

  // Survey Config State
  const [surveyConfig, setSurveyConfig] = useState(() => {
    const saved = localStorage.getItem('dairyshield_survey_config');
    const defaultConfig = {
      formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSft6jIS1VqUrS17IDjG9zuw2ZlYQm8DAlc9pzOJ0Lufbbuymg/viewform?usp=sf_link',
      embedLink: 'https://docs.google.com/forms/d/e/1FAIpQLSft6jIS1VqUrS17IDjG9zuw2ZlYQm8DAlc9pzOJ0Lufbbuymg/viewform?embedded=true',
      spreadsheetId: ''
    };
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migrate if it has the old form link
      if (parsed.formLink && (parsed.formLink.includes('1rxxOih8msF2kNOKTQvzhJIK99QUGFU_U-iGWBmTzNeQ') || parsed.formLink.includes('viewform?usp=sf_link'))) {
        return defaultConfig;
      }
      return parsed;
    }
    return defaultConfig;
  });

  // Default fallback static array of images
  const defaultGallery = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
      category: 'Animal Care',
      title: 'Healthy Cows in Grassland',
      description: 'Providing a natural, open-air pasture environment is essential for the welfare of dairy cows and promotes natural behaviors.'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
      category: 'Helping Dairy Farmers',
      title: 'Veterinary Support at Local Farm',
      description: 'Conducting routine medical checkups and providing training to local farmers on animal hygiene and nutrition.'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
      category: 'Education Sessions',
      title: 'Milk Quality Testing Demonstration',
      description: 'Educating consumers on how to verify milk freshness and simple detection steps for common chemical adulterants.'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=800&q=80',
      category: 'Awareness Campaigns',
      title: 'Community Safety Drive',
      description: 'Engaging with resident associations to set up clean chilling units and distribution rules.'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      category: 'Survey Collection',
      title: 'Gathering Feedback in Rural Hubs',
      description: 'Speaking with local vendors and households to assess refrigeration habits and dairy buying choices.'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&w=800&q=80',
      category: 'Animal Care',
      title: 'Automated Stress-Free Milking',
      description: 'Deploying touch-free milking units that safeguard cow comfort, minimize breast infection (mastitis), and secure hygiene.'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      category: 'Community Visits',
      title: 'Quality Audit at a Chilling Station',
      description: 'Checking cold-chain logs to ensure milk is stored under 4°C immediately after collection to halt bacterial growth.'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
      category: 'Helping Dairy Farmers',
      title: 'Nutritious Feed Preparation',
      description: 'Helping farmers prepare balanced rations of silage, minerals, and fresh grass to ensure cows produce premium milk.'
    }
  ];

  // Gallery Images State
  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('dairyshield_gallery');
    return saved ? JSON.parse(saved) : defaultGallery;
  });

  // Default fallback static array of articles
  const defaultArticles = [
    {
      id: 'milk-safety-essentials',
      title: 'Understanding Cold Chains: Why Milk Temperature Matters',
      category: 'Milk Safety',
      summary: 'Keeping milk below 4°C is the most crucial step in dairy safety. Learn how refrigeration stops bacteria and preserves nutritional quality.',
      content: `Milk is a highly nutritious liquid, but it is also a perfect environment for bacterial growth if left at room temperature. Pathogens like E. coli, Salmonella, and Listeria can double in count every 20 minutes in warm milk.

### The Role of Chilling
Raw milk must be chilled to 4°C (39°F) or lower within two hours of milking. Chilling does not kill bacteria that are already present, but it drastically slows down their multiplication. If the temperature rises above 8°C, spoilage bacteria begin to ferment lactose into lactic acid, causing the milk to sour, curdle, and become unsafe.

### Tips for Home Storage
1. **Never Store Milk on the Fridge Door:** The door is the warmest part of the refrigerator. Store milk on the main shelves near the back where the temperature is lowest and most stable.
2. **Close the Lid Immediately:** Do not leave milk bottles standing open on the table during breakfast.
3. **Avoid Mixing Old and New Milk:** Even a small amount of older milk can contain high bacterial loads that will rapidly spoil a fresh carton.`,
      readTime: '4 min read',
      date: 'July 12, 2026',
      author: 'Dr. Sarah Henderson (Dairy Micro-Biologist)'
    },
    {
      id: 'animal-welfare-quality',
      title: 'The Direct Link Between Cow Comfort and Milk Composition',
      category: 'Animal Welfare',
      summary: 'Stress in dairy animals releases hormones that reduce fat content and lower immunity. Discover the science of happy animals and better milk.',
      content: `Ethical treatment of dairy animals is not just a moral duty; it is a major factor in milk quality. When a cow is stressed, fearful, or in pain, her body releases stress hormones like cortisol and adrenaline.

### Impact of Stress on Milking
Adrenaline inhibits the release of oxytocin, the hormone responsible for milk let-down. This results in incomplete milking, which can lead to:
* **Mastitis:** A painful udder infection that requires antibiotic treatment.
* **Low Fat Content:** The last portion of milk drawn (strippings) has the highest concentration of butterfat. If stress prevents complete let-down, the milk collected is thinner and lower in quality.

### Elements of Good Welfare
To prevent stress and maximize natural immunity:
* **Comfortable Bedding:** Cows need to lie down for 12–14 hours a day to maximize blood flow to the udder.
* **Social Play and Grooming:** Barns equipped with automated cow-scratching brushes show increased milk yields and happier herds.
* **Veterinary Management:** Regular screening for sub-clinical mastitis prevents chronic illness and reduces the need for antibiotics.`,
      readTime: '6 min read',
      date: 'July 10, 2026',
      author: 'Dr. Evelyn Martinez (Veterinary Specialist)'
    },
    {
      id: 'fssai-adulteration-guidelines',
      title: 'FSSAI Standards for Milk Purity and Common Adulterants',
      category: 'Food Quality',
      summary: 'A detailed breakdown of national food safety standards, legal limits for water content, and how authorities track artificial additives.',
      content: `The Food Safety and Standards Authority of India (FSSAI) has laid down strict regulatory parameters to ensure milk is free from chemical tampering. Common adulterants like urea, detergent, starch, and synthetic milk are used by unscrupulous distributors to increase milk volume, thickness, or shelf life.

### Standard Chemical Indices
FSSAI measures purity using specific markers:
1. **Specific Gravity:** Normal cow milk has a specific gravity of 1.028 to 1.032. Lower levels indicate water dilution.
2. **Solid-Not-Fat (SNF):** Represents proteins, lactose, and minerals. Cow milk must contain at least 8.5% SNF. Urea or starch is often added to falsely inflate this value.
3. **Fat Content:** Cow milk should typically have 3.2% to 4.5% milk fat. Detergent is used to emulsify cheap vegetable fats into water to mimic natural milk fat.

### Regulatory Penalties
Under Section 59 of the Food Safety and Standards Act, selling adulterated food that results in injury or death can lead to heavy fines and life imprisonment. FSSAI operates mobile testing vans ("Food Safety on Wheels") to conduct on-the-spot tests in local communities.`,
      readTime: '8 min read',
      date: 'July 05, 2026',
      author: 'Adv. Rajesh Khanna (Food Safety Legal Consultant)'
    },
    {
      id: 'safe-home-practices',
      title: 'Safe Handling: Proper Boiling, Pasteurization & Food Safety',
      category: 'Healthy Dairy Practices',
      summary: 'Do you know the difference between boiling and pasteurizing? Learn how to handle milk safely without destroying vital vitamins.',
      content: `Many consumers boil milk repeatedly under the belief that more boiling equals safer food. However, excessive boiling destroys heat-sensitive nutrients like B-vitamins, Vitamin C, and folic acid.

### Boiling vs. Pasteurization
* **Pasteurization** is a controlled industrial process where milk is heated to 72°C (161°F) for 15 seconds (HTST method) and quickly cooled to 4°C. This kills all pathogens while preserving the flavor and nutritional value. **Pasteurized packaged milk does not need to be boiled before consumption.**
* **Boiling** heats milk to 100°C. Raw milk purchased directly from local farms must be boiled once to kill any pathogens introduced during hand milking or open transit.

### Step-by-Step Home Boiling Guide
1. **Stir Continuously:** Heat the milk on medium flame and stir to prevent scorching at the bottom.
2. **Stop Immediately:** As soon as the milk boils up and rises, turn off the flame. Do not keep it boiling for minutes on end.
3. **Cool Fast:** Place the hot pot in a basin of cold water to cool it down quickly before placing it in the refrigerator.`,
      readTime: '5 min read',
      date: 'June 28, 2026',
      author: 'Nisha Patil (Nutritionist & Public Health Educator)'
    }
  ];

  // Educational Articles State
  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem('dairyshield_articles');
    return saved ? JSON.parse(saved) : defaultArticles;
  });

  // Large set of seeded default survey responses
  const getSeededSurveyResponses = () => {
    const list = [];
    const products = ["Raw liquid milk (loose/unpasteurized)", "Packaged pasteurized liquid milk", "Paneer (cottage cheese)", "Curd / Yogurt", "Butter / Ghee"];
    const storageHabits = ["Keep in refrigerator immediately (in original packet)", "Boil immediately and then refrigerate", "Keep outside in container at room temperature", "Boil and keep outside at room temperature"];
    const awareness = ["Yes, fully aware of types and health risks", "Vaguely aware that chemicals are added, but not details", "No, I thought milk was only diluted with water"];
    const paneerStorage = ["In original plastic wrap on fridge shelf", "Submerged in clean water in container (changed daily)", "In the freezer compartment"];
    const expiryChecking = ["Always check both", "Sometimes check if it looks bloated", "Never check, I trust the retailer"];
    const boilingBeliefs = ["Boiling destroys all chemicals and bacteria", "Boiling kills bacteria but does not affect chemicals", "Packaged pasteurized milk must be boiled to be safe"];
    const animalWelfare = ["Strongly Agree - happy cows produce better/safer milk", "Agree - it has some impact on chemical composition", "Neutral - stress does not affect milk quality, only yield"];
    const testUsage = ["Yes, once or twice out of curiosity", "No, but I would like to learn how", "No, I do not think they are reliable"];
    const seasonalTaste = ["Yes, milk tastes different/thinner in summers", "Yes, milk is creamier in winters", "No, it tastes exactly the same year-round"];
    const preferenceReason = ["Packaged milk feels safer, hygienic, and standardized", "Local farm milk feels fresher, creamy, and natural", "Convenience of delivery/purchase is my main factor"];

    for (let i = 0; i < 54; i++) {
      let product = products[1];
      if (i % 5 === 0) product = products[0];
      else if (i % 8 === 0) product = products[2];
      else if (i % 10 === 0) product = products[3];
      else if (i % 12 === 0) product = products[4];

      let storage = storageHabits[0];
      if (i % 3 === 0) storage = storageHabits[1];
      else if (i % 15 === 0) storage = storageHabits[2];

      let aware = awareness[1];
      if (i % 3 === 0) aware = awareness[0];
      else if (i % 4 === 0) aware = awareness[2];

      let paneer = paneerStorage[0];
      if (i % 3 === 0) paneer = paneerStorage[1];
      else if (i % 4 === 0) paneer = paneerStorage[2];

      let expiry = expiryChecking[0];
      if (i % 3 === 0) expiry = expiryChecking[1];
      else if (i % 10 === 0) expiry = expiryChecking[2];

      let boil = boilingBeliefs[0];
      if (i % 2 === 0) boil = boilingBeliefs[1];
      else if (i % 5 === 0) boil = boilingBeliefs[2];

      let welfare = animalWelfare[0];
      if (i % 3 === 0) welfare = animalWelfare[1];
      if (i % 7 === 0) welfare = animalWelfare[2];

      let tested = testUsage[1];
      if (i % 6 === 0) tested = testUsage[0];
      else if (i % 4 === 0) tested = testUsage[2];

      let taste = seasonalTaste[2];
      if (i % 3 === 0) taste = seasonalTaste[0];
      else if (i % 5 === 0) taste = seasonalTaste[1];

      let pref = preferenceReason[0];
      if (i % 3 === 0) pref = preferenceReason[1];
      else if (i % 10 === 0) pref = preferenceReason[2];

      list.push({
        id: i + 1,
        product,
        storage,
        awareness: aware,
        paneer,
        expiry,
        boilingBelief: boil,
        welfare,
        tested,
        seasonalTaste: taste,
        preferenceReason: pref,
        timestamp: new Date(Date.now() - i * 6 * 3600 * 1000).toISOString()
      });
    }
    return list;
  };

  // Survey Responses State
  const [surveyResponses, setSurveyResponses] = useState(() => {
    const saved = localStorage.getItem('dairyshield_survey_responses_v3');
    return saved ? JSON.parse(saved) : getSeededSurveyResponses();
  });

  // Myths and FAQs (Static data)
  const myths = [
    { id: 1, myth: "Boiling removes every type of chemical adulterant from milk.", fact: "Boiling only kills biological pathogens (bacteria and viruses). It has absolutely no effect on chemical adulterants like urea, detergent, starch, or heavy metals, which remain completely stable under heat.", category: "Boiling" },
    { id: 2, myth: "Raw loose milk from local farms is always healthier than packaged pasteurized milk.", fact: "Raw milk is exposed to severe contamination risks from unsterilized hands, open containers, and lack of immediate cooling. Pasteurization is a scientifically validated process that kills pathogens without adding chemicals or preservatives.", category: "Hygiene" },
    { id: 3, myth: "Milk is white, so yellow-tinged paneer is always adulterated.", fact: "Paneer made from cow milk has a natural light-yellow hue due to beta-carotene. Perfectly bright white paneer is sometimes treated with bleaching agents or made from skimmed milk powder mixed with palm oil.", category: "Paneer" },
    { id: 4, myth: "If milk does not smell bad, it is perfectly safe to drink raw.", fact: "Pathogens like Listeria, E. coli, and Salmonella can multiply in milk without causing any changes in smell, texture, or taste. Only spoilage bacteria cause sour odors. Consuming raw milk without boiling is always a food safety hazard.", category: "Hygiene" },
    { id: 5, myth: "Urea is added to milk to act as a harmless preservative.", fact: "Urea is a chemical compound found in fertilizers. It is added to milk to artificially raise the Solid-Not-Fat (SNF) readings. Regular consumption of urea damages the kidneys, liver, and digestive tract.", category: "Adulteration" },
    { id: 6, myth: "You can keep milk in the refrigerator door shelves for convenience.", fact: "The refrigerator door experiences constant temperature changes every time it is opened. Storing milk on the inner bottom shelf provides a steady cold temperature (under 4°C) which prevents premature spoilage.", category: "Storage" },
    { id: 7, myth: "Antibiotic residues are completely destroyed by boiling milk.", fact: "Antibiotic residues (used to treat sick cattle) are heat-stable and are not deactivated by pasteurization or boiling. Consuming milk with antibiotic residues leads to drug resistance in humans.", category: "Welfare" },
    { id: 8, myth: "Synthetic milk is just reconstituted milk powder.", fact: "Synthetic milk is a highly toxic artificial mixture of detergent, cheap vegetable oil, urea, emulsifiers, and water, formulated to look and feel exactly like natural milk. It contains no actual milk components.", category: "Adulteration" },
    { id: 9, myth: "Paneer can be stored indefinitely in the freezer.", fact: "While freezing extends shelf life, paneer loses its texture and becomes crumbly. In the refrigerator, fresh paneer should be kept submerged in clean water (changed daily) and consumed within 3 to 4 days.", category: "Storage" },
    { id: 10, myth: "Milk boiling over and spilling is a sign of high quality.", fact: "Boiling over is simply a physical process where milk proteins form a skin that traps expanding steam underneath. It happens to both high-fat milk and highly watered-down milk.", category: "Boiling" },
    { id: 11, myth: "Happy cows do not produce more or better milk; it is all genetic.", fact: "Studies prove that stress-free cows produce up to 10% more milk with higher protein and fat contents. Comfort, clean water, and gentle treatment release milking hormones (oxytocin) naturally.", category: "Welfare" },
    { id: 12, myth: "Organic milk does not require refrigeration.", fact: "All liquid milk, whether organic, raw, or pasteurized, must be kept cold. Only Ultra-High Temperature (UHT) milk in aseptic tetrapaks can be stored at room temperature *before* opening.", category: "Storage" }
  ];

  const faqs = [
    { id: 1, question: "Is boiling packaged pasteurized milk necessary?", answer: "No. Packaged pasteurized milk has already undergone thermal pasteurization (heated to 72°C for 15 seconds) and rapid cooling. This eliminates harmful bacteria. It is safe to consume straight from the packet. Boiling it again reduces nutritional quality by breaking down heat-sensitive vitamins." },
    { id: 2, question: "How do I easily test if milk has been diluted with water at home?", answer: "Put a drop of milk on a polished, slanted surface like a marble tile or a metal plate. Pure milk flows slowly and leaves a distinct white trail behind. Adulterated water-diluted milk flows immediately without leaving a clear trail." },
    { id: 3, question: "Why is detergent added to milk, and is it harmful?", answer: "Detergent is added to emulsify vegetable oils in water, creating an artificial lather and viscosity that mimics natural milk fat. Consuming detergent damages mucosal linings of the digestive system and causes severe gastrointestinal disorders." },
    { id: 4, question: "How long can pasteurized milk keep after being opened?", answer: "Once a milk carton or packet is opened, it should be kept refrigerated under 4°C and consumed within 48 to 72 hours. Exposure to air introduces local bacteria that cause gradual spoilage." },
    { id: 5, question: "How can I spot chemical starch in paneer or curd?", answer: "Boil a sample of paneer in water, let it cool down, and add 2-3 drops of Iodine solution. If the paneer or the water turns blue, it indicates the presence of starch (which is used as a thickening agent)." },
    { id: 6, question: "Can milk cause food poisoning even if it tastes normal?", answer: "Yes. Food-poisoning bacteria like Campylobacter, Salmonella, and Listeria do not change the flavor, color, or smell of milk. Spoilage bacteria (which sour the milk) are distinct from pathogens that cause sickness." },
    { id: 7, question: "Why is immediate chilling crucial after milking an animal?", answer: "Milk comes out of the cow at around 37°C, which is the absolute peak temperature for bacterial replication. Chilling it to under 4°C within two hours puts bacteria into a dormant state, preserving freshness and safety." },
    { id: 8, question: "Does ethical animal welfare improve the safety of dairy products?", answer: "Absolutely. Well-cared-for cows have stronger immune systems, which reduces the incidence of infections like mastitis. This means they require fewer antibiotics, drastically reducing the risk of harmful antibiotic residues in the milk supply." },
    { id: 9, question: "What is the Iodine Test for starch in milk?", answer: "Add 2-3 drops of tincture of iodine to a small test tube containing 5ml of milk. A blue color formation indicates starch adulteration. If the milk remains a light yellow/brown color, no starch is present." },
    { id: 10, question: "How should I store fresh butter to prevent rancidity?", answer: "Butter should be stored in the refrigerator, wrapped tightly in foil or in an airtight container to prevent exposure to light and oxygen, which oxidize fats and make it rancid. It can also be frozen for up to 9 months." },
    { id: 11, question: "What is FSSAI's stance on synthetic milk?", answer: "FSSAI classifies synthetic milk as a high-risk toxic adulteration. Running operations that manufacture synthetic milk constitutes a severe criminal offense, leading to sealing of units, cancellation of license, and potential life imprisonment." },
    { id: 12, question: "How can I check if curd (dahi) contains starch?", answer: "Mix a spoonful of curd with a little water, boil it, let it cool, and add 2 drops of iodine. Just like with milk, a blue color indicates starch was added to make the curd look thick and creamy." },
    { id: 13, question: "Why is raw milk consumption rising if it carries bacterial risks?", answer: "Some consumers believe raw milk has superior enzymes, flavor, and health benefits. However, scientific consensus across organizations like the WHO, FDA, and FSSAI confirms that the risks of severe bacterial infections (which can cause kidney failure) far outweigh any unproven health benefits." },
    { id: 14, question: "Can sick cows treated with antibiotics still be milked?", answer: "Cows undergoing antibiotic therapy must be isolated. Their milk must be discarded during the treatment period and for a specific 'withdrawal period' afterward until their bodies clear all traces of the drug." },
    { id: 15, question: "How does detergent in milk affect its foam?", answer: "Milk containing detergent will produce a thick, frothy foam when shaken vigorously, which does not settle for a long time. Natural milk foam has smaller bubbles and dissolves quickly." },
    { id: 16, question: "What is the 'Halphen Test' used for in dairy?", answer: "It is a laboratory test used to detect cotton-seed oil adulteration in milk fat/ghee. While home tests are great for simple cases, professional tests like this are required for legal proof of adulteration." },
    { id: 17, question: "Is milk packaging material safe?", answer: "Yes, food-grade polyethylene pouches, PET bottles, and aseptic paper cartons (Tetrapaks) are certified safe. They prevent light penetration and oxygen entry, which would otherwise oxidize vitamins and ruin the flavor." },
    { id: 18, question: "What should I do if I suspect adulteration in milk bought from a local store?", answer: "You can report the shop or vendor to the local food inspector or District Food Safety Officer. FSSAI also allows consumers to send samples to verified labs or check them using FSSAI mobile testing drives." },
    { id: 19, question: "Does boiling milk multiple times change its proteins?", answer: "Yes. Repeated boiling causes the denaturation of whey proteins and makes calcium less soluble. It reduces the nutritional density of milk and gives it a cooked, caramelized taste." },
    { id: 20, question: "How does stress-free milking work?", answer: "In modern farms, cows walk into automated milking stalls at their own leisure. The machines clean the teats, apply gentle vacuum suction, and stop automatically. The cow listens to calm music and is fed grain during the process, minimizing stress and ensuring clean milk collection." }
  ];

  const surveyQuestions = [
    {
      id: "q1",
      question: "Which dairy product does your household consume the most?",
      options: ["Raw liquid milk (loose/unpasteurized)", "Packaged pasteurized liquid milk", "Paneer (cottage cheese)", "Curd / Yogurt", "Butter / Ghee", "Other / Vegan alternatives"]
    },
    {
      id: "q2",
      question: "What is your primary milk storage habit upon purchasing?",
      options: ["Keep in refrigerator immediately (in original packet)", "Boil immediately and then refrigerate", "Keep outside in container at room temperature", "Boil and keep outside at room temperature"]
    },
    {
      id: "q3",
      question: "Are you aware of common chemical adulterants (like urea, detergent, starch) in milk?",
      options: ["Yes, fully aware of types and health risks", "Vaguely aware that chemicals are added, but not details", "No, I thought milk was only diluted with water", "Not aware of adulteration at all"]
    },
    {
      id: "q4",
      question: "How do you store fresh Paneer at home?",
      options: ["In original plastic wrap on fridge shelf", "Submerged in clean water in container (changed daily)", "In the freezer compartment", "Keep outside at room temperature"]
    },
    {
      id: "q5",
      question: "Do you verify the expiry date and FSSAI seal on milk packets before buying?",
      options: ["Always check both", "Sometimes check if it looks bloated", "Only check the price", "Never check, I trust the retailer"]
    },
    {
      id: "q6",
      question: "Which of the following describes your belief about boiling milk?",
      options: ["Boiling destroys all chemicals and bacteria", "Boiling kills bacteria but does not affect chemicals", "Boiling is only to prevent milk from curdling/spoiling", "Packaged pasteurized milk must be boiled to be safe"]
    },
    {
      id: "q7",
      question: "Do you believe that the ethical treatment and stress levels of cows impact milk quality?",
      options: ["Strongly Agree - happy cows produce better/safer milk", "Agree - it has some impact on chemical composition", "Neutral - stress does not affect milk quality, only yield", "Disagree - animal welfare is irrelevant to milk properties"]
    },
    {
      id: "q8",
      question: "Have you ever performed a simple home test (like slant plate or iodine test) to check milk purity?",
      options: ["Yes, regularly", "Yes, once or twice out of curiosity", "No, but I would like to learn how", "No, I do not think they are reliable"]
    },
    {
      id: "q9",
      question: "Have you observed any seasonal taste changes in your milk supply?",
      options: ["Yes, milk tastes different/thinner in summers", "Yes, milk is creamier in winters", "No, it tastes exactly the same year-round", "Unsure / I do not pay attention"]
    },
    {
      id: "q10",
      question: "Why do you prefer packaged milk over local dairy farm milk (or vice versa)?",
      options: ["Packaged milk feels safer, hygienic, and standardized", "Local farm milk feels fresher, creamy, and natural", "Convenience of delivery/purchase is my main factor", "Price is the deciding factor"]
    }
  ];

  // 1. FETCH DATA FROM SUPABASE ON MOUNT WITH fallback to localStorage
  useEffect(() => {
    const loadSupabaseData = async () => {
      if (!supabase) {
        console.log("Supabase Client is disabled. Using Local Storage data layer.");
        return;
      }

      try {
        // A. Load Statistics
        const { data: statsData, error: statsErr } = await supabase
          .from('statistics')
          .select('*')
          .eq('id', 'main_stats')
          .single();

        if (statsErr) throw statsErr;
        if (statsData) {
          setStats({
            reached: statsData.reached,
            surveyResponses: statsData.survey_responses,
            awarenessDrives: statsData.awareness_drives,
            localCommunities: statsData.local_communities
          });
        }

        // B. Load Gallery List
        const { data: galleryData, error: galleryErr } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: false });

        if (galleryErr) throw galleryErr;
        if (galleryData && galleryData.length > 0) {
          setGallery(galleryData);
        }

        // C. Load Articles
        const { data: articlesData, error: articlesErr } = await supabase
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false });

        if (articlesErr) throw articlesErr;
        if (articlesData && articlesData.length > 0) {
          setArticles(articlesData);
        }

        // D. Load Survey Responses
        const { data: responsesData, error: responsesErr } = await supabase
          .from('survey_responses')
          .select('*')
          .order('created_at', { ascending: false });

        if (responsesErr) throw responsesErr;
        if (responsesData && responsesData.length > 0) {
          // Map snake_case database schema back to camelCase states for frontend
          const mapped = responsesData.map(res => ({
            id: res.id,
            product: res.product,
            storage: res.storage,
            awareness: res.awareness,
            paneer: res.paneer,
            expiry: res.expiry,
            boilingBelief: res.boiling_belief,
            welfare: res.welfare,
            tested: res.tested,
            seasonalTaste: res.seasonal_taste,
            preferenceReason: res.preference_reason,
            timestamp: res.created_at
          }));
          setSurveyResponses(mapped);
        }

        setIsUsingSupabase(true);
        console.log("Supabase Integration Status: CONNECTED. Synchronization successful.");

      } catch (err) {
        console.error("Supabase load query error, falling back to local cached storage:", err.message);
      }
    };

    loadSupabaseData();
  }, []);

  // Sync to local storage as secondary backup
  useEffect(() => {
    localStorage.setItem('dairyshield_stats_v4', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('dairyshield_survey_config', JSON.stringify(surveyConfig));
  }, [surveyConfig]);

  useEffect(() => {
    localStorage.setItem('dairyshield_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('dairyshield_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('dairyshield_survey_responses_v3', JSON.stringify(surveyResponses));
  }, [surveyResponses]);

  // MUTATIONS (Sync local states + remote tables)

  const updateStats = async (newStats) => {
    setStats(prev => ({ ...prev, ...newStats }));

    if (supabase && isUsingSupabase) {
      try {
        const { error } = await supabase
          .from('statistics')
          .update({
            reached: newStats.reached,
            survey_responses: newStats.surveyResponses,
            awareness_drives: newStats.awarenessDrives,
            local_communities: newStats.localCommunities,
            updated_at: new Date().toISOString()
          })
          .eq('id', 'main_stats');

        if (error) throw error;
      } catch (err) {
        console.error("Failed to update stats in Supabase:", err.message);
      }
    }
  };

  const updateSurveyConfig = (config) => {
    setSurveyConfig(prev => ({ ...prev, ...config }));
  };

  const addGalleryImage = async (image) => {
    const localImg = {
      id: Date.now(),
      src: image.src,
      category: image.category || 'Awareness Campaigns',
      title: image.title || 'Community Image',
      description: image.description || 'Uploaded by administrator.'
    };

    setGallery(prev => [localImg, ...prev]);

    if (supabase && isUsingSupabase) {
      try {
        const { error } = await supabase
          .from('gallery')
          .insert({
            src: image.src,
            category: image.category || 'Awareness Campaigns',
            title: image.title || 'Community Image',
            description: image.description || 'Uploaded by administrator.'
          });

        if (error) throw error;
      } catch (err) {
        console.error("Failed to insert gallery image in Supabase:", err.message);
      }
    }
  };

  const updateArticle = async (article) => {
    let slugId = article.id;
    if (!slugId) {
      slugId = article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    const fullArticle = {
      id: slugId,
      date: article.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      readTime: article.readTime || '3 min read',
      author: article.author || 'DairyShield Administrator',
      ...article
    };

    setArticles(prev => {
      const idx = prev.findIndex(a => a.id === slugId);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = fullArticle;
        return updated;
      } else {
        return [fullArticle, ...prev];
      }
    });

    if (supabase && isUsingSupabase) {
      try {
        const { error } = await supabase
          .from('articles')
          .upsert({
            id: slugId,
            title: fullArticle.title,
            category: fullArticle.category,
            summary: fullArticle.summary,
            content: fullArticle.content,
            read_time: fullArticle.readTime,
            author: fullArticle.author,
            date: fullArticle.date
          });

        if (error) throw error;
      } catch (err) {
        console.error("Failed to upsert article in Supabase:", err.message);
      }
    }
  };

  const deleteArticle = async (articleId) => {
    setArticles(prev => prev.filter(a => a.id !== articleId));

    if (supabase && isUsingSupabase) {
      try {
        const { error } = await supabase
          .from('articles')
          .delete()
          .eq('id', articleId);

        if (error) throw error;
      } catch (err) {
        console.error("Failed to delete article in Supabase:", err.message);
      }
    }
  };

  // Submit survey response in real time
  const submitSurveyResponse = async (answers) => {
    const timestamp = new Date().toISOString();
    const localRes = {
      id: surveyResponses.length + 1,
      product: answers.q1 || "Packaged pasteurized liquid milk",
      storage: answers.q2 || "Keep in refrigerator immediately (in original packet)",
      awareness: answers.q3 || "Yes, fully aware of types and health risks",
      paneer: answers.q4 || "Submerged in clean water in container (changed daily)",
      expiry: answers.q5 || "Always check both",
      boilingBelief: answers.q6 || "Boiling kills bacteria but does not affect chemicals",
      welfare: answers.q7 || "Strongly Agree - happy cows produce better/safer milk",
      tested: answers.q8 || "Yes, regularly",
      seasonalTaste: answers.q9 || "No, it tastes exactly the same year-round",
      preferenceReason: answers.q10 || "Packaged milk feels safer, hygienic, and standardized",
      timestamp
    };

    setSurveyResponses(prev => [localRes, ...prev]);

    // Update stats counters
    const newStats = {
      reached: stats.reached + Math.floor(Math.random() * 3) + 1,
      surveyResponses: stats.surveyResponses + 1,
      awarenessDrives: stats.awarenessDrives,
      localCommunities: stats.localCommunities
    };
    setStats(newStats);

    if (supabase && isUsingSupabase) {
      try {
        // A. Insert Response
        const { error: insError } = await supabase
          .from('survey_responses')
          .insert({
            product: localRes.product,
            storage: localRes.storage,
            awareness: localRes.awareness,
            paneer: localRes.paneer,
            expiry: localRes.expiry,
            boiling_belief: localRes.boilingBelief,
            welfare: localRes.welfare,
            tested: localRes.tested,
            seasonal_taste: localRes.seasonalTaste,
            preference_reason: localRes.preferenceReason
          });

        if (insError) throw insError;

        // B. Update Statistics counts in Supabase
        const { error: statsError } = await supabase
          .from('statistics')
          .update({
            reached: newStats.reached,
            survey_responses: newStats.surveyResponses,
            updated_at: new Date().toISOString()
          })
          .eq('id', 'main_stats');

        if (statsError) throw statsError;

      } catch (err) {
        console.error("Failed to sync response to Supabase:", err.message);
      }
    }
  };

  return (
    <AppContext.Provider value={{
      isAdmin,
      setIsAdmin,
      isUsingSupabase,
      stats,
      updateStats,
      surveyConfig,
      updateSurveyConfig,
      gallery,
      addGalleryImage,
      articles,
      updateArticle,
      deleteArticle,
      myths,
      faqs,
      surveyQuestions,
      surveyResponses,
      submitSurveyResponse
    }}>
      {children}
    </AppContext.Provider>
  );
};
