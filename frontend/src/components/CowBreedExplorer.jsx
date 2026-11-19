import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Heart,
  Thermometer,
  Activity,
  ShieldCheck,
  Sparkles,
  MapPin,
  Calculator,
  Stethoscope,
  Calendar,
  CheckCircle2,
  ChevronRight,
  AlertTriangle,
  Pill,
  Syringe,
  Info
} from 'lucide-react';
import AvatarGuide from './AvatarGuide';

const fallbackBreeds = [
  {
    _id: '1',
    name: 'Gir',
    category: 'Desi Cow Breeds',
    origin: {
      state: 'Gujarat',
      region: 'Gir Hills (Kathiawar region, Junagadh)',
      climateSuitability: 'Tropical, hot and humid conditions'
    },
    healthParameters: {
      normalTemperature: '38.5°C - 39.2°C (101.3°F - 102.5°F)',
      heartRateBPM: '60 - 75 bpm',
      respiratoryRate: '18 - 28 breaths/min',
      heatTolerance: 'High resistance to solar radiation and heat stress',
      diseaseResistance: ['Tropical tick resistance', 'Ectoparasite resistance', 'Low mastitis incidence']
    },
    milkAndProductivity: {
      avgDailyYieldLiters: '12 - 18 Liters/day',
      peakYieldLiters: '22+ Liters/day',
      fatPercentage: '4.5% - 5.2%',
      milkType: 'A2 Beta-Casein'
    },
    quickFacts: [
      'The convex forehead acts as a cooling radiator against harsh sunlight.',
      'Possesses a distinct hump that contains the Surya Ketu Nadi vein.',
      'One of the foundational breeds used to create the American Brahman breed.'
    ],
    avatarGuideNotes: {
      greeting: "Namaste! Welcome to GauRaksha. Inspect the Gir cow's vitals, feed needs, or common diseases.",
      vitalTip: "Normal temperature for a Gir cow is around 38.5°C. Any temperature above 39.5°C indicates fever or heat stress."
    }
  },
  {
    _id: '2',
    name: 'Sahiwal',
    category: 'Desi Cow Breeds',
    origin: {
      state: 'Punjab / Haryana Border',
      region: 'Montgomery district (dry arid plains)',
      climateSuitability: 'Dry, semi-arid, and extreme temperature regions'
    },
    healthParameters: {
      normalTemperature: '38.5°C - 39.0°C (101.3°F - 102.2°F)',
      heartRateBPM: '65 - 80 bpm',
      respiratoryRate: '15 - 25 breaths/min',
      heatTolerance: 'Exceptional tolerance to drought and dry heat',
      diseaseResistance: ['High resistance to tick-borne fever', 'Sturdy digestive immunity against roughage']
    },
    milkAndProductivity: {
      avgDailyYieldLiters: '14 - 20 Liters/day',
      peakYieldLiters: '25+ Liters/day',
      fatPercentage: '4.8% - 5.5%',
      milkType: 'A2 Beta-Casein'
    },
    quickFacts: [
      'Widely regarded as the heaviest milk producer among all indigenous zebu breeds.',
      'Characterized by very loose skin, giving it the local name "Lola" in some regions.',
      'High butterfat content makes its milk prime for traditional ghee preparation.'
    ],
    avatarGuideNotes: {
      greeting: "Namaste! Sahiwal is the gold standard for high milk yield among indigenous cows.",
      vitalTip: "Sahiwals thrive on high roughage, but always watch out for sudden bloat if introducing lush green legumes too fast."
    }
  },
  {
    _id: '3',
    name: 'Red Sindhi',
    category: 'Desi Cow Breeds',
    origin: {
      state: 'Sindh / Adjacent Border Belts',
      region: 'Kohistan arid region and western plains',
      climateSuitability: 'Extremely dry, high-temperature zones'
    },
    healthParameters: {
      normalTemperature: '38.5°C - 39.3°C (101.5°F - 102.7°F)',
      heartRateBPM: '60 - 75 bpm',
      respiratoryRate: '16 - 26 breaths/min',
      heatTolerance: 'Very high thermal regulation capacity',
      diseaseResistance: ['Tick and protozoan parasite resistance', 'Low foot infection rate']
    },
    milkAndProductivity: {
      avgDailyYieldLiters: '10 - 16 Liters/day',
      peakYieldLiters: '18+ Liters/day',
      fatPercentage: '4.5% - 5.0%',
      milkType: 'A2 Beta-Casein'
    },
    quickFacts: [
      'Deep reddish-brown coat that reflects strong UV rays.',
      'Compact, sturdy build making it easy to manage on small-scale farms.',
      'Docile temperament with strong maternal instincts.'
    ],
    avatarGuideNotes: {
      greeting: "Meet the Red Sindhi! A resilient, compact cow famous for thriving in harsh climates.",
      vitalTip: "A healthy Red Sindhi produces rich A2 milk even under low-input grazing conditions."
    }
  }
];

// Popular Cattle Diseases with Images and Treatment Details
const popularDiseases = [
  {
    id: 'lsd',
    name: 'Lumpy Skin Disease (LSD)',
    scientificCause: 'Capripoxvirus (Transmitted via biting flies, ticks & mosquitoes)',
    imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80',
    severity: 'High Contagion / Quarantine Required',
    symptoms: [
      'Firm, round nodules (2-5 cm) all over skin and mucosal membranes',
      'High recurring fever (>40°C / 104°F)',
      'Watery eyes, nasal discharge, and swollen superficial lymph nodes',
      'Sudden reduction in milk yield and loss of appetite'
    ],
    medications: [
      {
        type: 'Fever & Pain Relief',
        drug: 'Melloxicam + Paracetamol (Melonex Plus)',
        dosage: '15-20 ml IM daily for 3-4 days to bring down fever and inflammation.'
      },
      {
        type: 'Secondary Infection Prevention',
        drug: 'Enrofloxacin / Oxytetracycline LA',
        dosage: '1 ml per 10 kg body weight deep intramuscularly under vet advice.'
      },
      {
        type: 'Antihistamine / Anti-Allergy',
        drug: 'Chlorpheniramine Maleate (Avil / Cadistin)',
        dosage: '10 ml IM daily to alleviate skin itching and swelling.'
      },
      {
        type: 'Ayurvedic / Ethno-Veterinary Care',
        drug: 'Betel leaves + Black pepper + Cumin + Jaggery paste',
        dosage: 'Feed orally 3 times a day. Apply neem oil + turmeric paste on ruptured skin nodules.'
      }
    ]
  },
  {
    id: 'fmd',
    name: 'Foot and Mouth Disease (FMD)',
    scientificCause: 'Aphthovirus (Picornaviridae family)',
    imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=600&q=80',
    severity: 'Severe Viral Epidemic',
    symptoms: [
      'Blisters and painful erosions inside mouth, tongue, and dental pad',
      'Excessive ropy salivation and lip-smacking sounds',
      'Painful interdigital lesions on hooves resulting in severe limping',
      'Drastic milk drop and inability to graze'
    ],
    medications: [
      {
        type: 'Mouth & Hoof Antiseptic Wash',
        drug: 'Potassium Permanganate (1:1000 dilute solution)',
        dosage: 'Wash mouth and hoof wounds 2 times daily. Apply boro-glycerine inside the mouth.'
      },
      {
        type: 'Fly Repellent / Hoof Healing',
        drug: 'Himax Ointment / Topicure Spray',
        dosage: 'Apply directly to hoof clefts to prevent fly maggots and speed tissue repair.'
      },
      {
        type: 'Anti-Inflammatory & Analgesic',
        drug: 'Flunixin Meglumine or Meloxicam',
        dosage: 'Administer 15 ml IM to reduce mouth pain so the animal can consume soft gruel.'
      },
      {
        type: 'Dietary Support',
        drug: 'Soft cooked porridge (Ragi/Rice) with Jaggery',
        dosage: 'Feed easily swallowable, warm semi-liquid mash with electral/minerals.'
      }
    ]
  },
  {
    id: 'mastitis',
    name: 'Bovine Mastitis (Udder Infection)',
    scientificCause: 'Staphylococcus aureus, Streptococcus uberis, or E. coli',
    imageUrl: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=600&q=80',
    severity: 'Common Economic Disease in Lactating Cows',
    symptoms: [
      'Swollen, hot, red, and hard quarter of the udder',
      'Discolored milk containing clots, flakes, or watery/blood-tinged fluid',
      'Cow refuses milking and kicks due to acute localized tenderness'
    ],
    medications: [
      {
        type: 'Intramammary Infusion',
        drug: 'Cephalosporin (e.g., Ceff / Mammitel udder tubes)',
        dosage: 'Strip out infected quarter completely, disinfect teat, and infuse 1 tube every 24 hours for 3 days.'
      },
      {
        type: 'Systemic Antibiotic',
        drug: 'Ceftiofur Sodium / Amoxicillin-Sulbactam',
        dosage: 'Intramuscular veterinary injection for acute cases with high fever.'
      },
      {
        type: 'Udder Tissue Healing & Edema',
        drug: 'Serratiopeptidase + Isoflupredone / Meloxicam',
        dosage: 'Reduces hard udder swelling and dissolves internal fibrin clots.'
      },
      {
        type: 'Ethnoveterinary Udder Paste',
        drug: 'Fresh Aloe Vera + Turmeric Powder + Slaked Lime (Chuna)',
        dosage: 'Blend into a smooth paste and coat the swollen exterior of the quarter (never apply inside teat canal).'
      }
    ]
  },
  {
    id: 'bloat',
    name: 'Tympany / Acute Rumen Bloat',
    scientificCause: 'Excessive fermentation gas buildup due to lush legumes or spoiled feed',
    imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80',
    severity: 'Emergency Condition (Can cause suffocation)',
    symptoms: [
      'Severe swelling and drum-like tautness on the left flank',
      'Restlessness, frequent kicking at the belly, and groaning',
      'Labored mouth-breathing with extended tongue due to diaphragm pressure'
    ],
    medications: [
      {
        type: 'Anti-Foaming Agent (Carminative)',
        drug: 'Bloatosil / Tympol / Afanil',
        dosage: '100 ml drench orally mixed with 500 ml warm water or linseed oil.'
      },
      {
        type: 'Home Emergency Drench',
        drug: 'Mustard Oil (300 ml) + Turpentine Oil (30 ml) + Asafoetida (Hing 10g)',
        dosage: 'Administer slowly via drenching bottle. Keep the cow standing with front legs elevated.'
      },
      {
        type: 'Rumen Flora Restorative',
        drug: 'Live Yeast Bolus (Biosacc / RumenFS)',
        dosage: '2 boluses twice daily for 3 days once the acute gas pressure is relieved.'
      }
    ]
  }
];

const CowBreedExplorer = () => {
  const [breeds, setBreeds] = useState(fallbackBreeds);
  const [selectedBreed, setSelectedBreed] = useState(fallbackBreeds[0]);
  const [guideSpeech, setGuideSpeech] = useState(fallbackBreeds[0].avatarGuideNotes.greeting);
  const [activeTab, setActiveTab] = useState('vitals'); // 'vitals' | 'ration' | 'symptoms' | 'vaccine' | 'diseases'

  // Daily Feed Calculator States
  const [cowWeight, setCowWeight] = useState(380);
  const [milkYieldInput, setMilkYieldInput] = useState(14);

  // Selected disease detail view
  const [selectedDisease, setSelectedDisease] = useState(popularDiseases[0]);

  // Quick Health Symptoms Checker State
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/breeds')
      .then(res => {
        if (res.data && res.data.length > 0) {
          setBreeds(res.data);
          setSelectedBreed(res.data[0]);
          setGuideSpeech(res.data[0].avatarGuideNotes?.greeting || fallbackBreeds[0].avatarGuideNotes.greeting);
        }
      })
      .catch(() => { });
  }, []);

  const handleSelectBreed = (breed) => {
    setSelectedBreed(breed);
    setGuideSpeech(breed.avatarGuideNotes?.greeting || `Selected ${breed.name} cow.`);
  };

  const triggerAvatarSpeech = (customText) => {
    setGuideSpeech(customText);
  };

  const toggleSymptom = (sym) => {
    if (selectedSymptoms.includes(sym.id)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== sym.id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, sym.id]);
      triggerAvatarSpeech(`Observation noted: "${sym.label}". Review the recommended veterinary action below.`);
    }
  };

  const symptomList = [
    { id: 'fever', label: 'Body Temp > 39.5°C (103°F)', warning: 'Possible infectious fever or tick-borne disease (Babesiosis/Theileriosis).' },
    { id: 'saliva', label: 'Excess Salivation & Lip Smacking', warning: 'Potential Foot & Mouth Disease (FMD) indicator. Check for mouth blisters immediately.' },
    { id: 'milk_drop', label: 'Sudden Milk Drop & Hard Udder', warning: 'High risk of early Mastitis. Perform California Mastitis Test (CMT).' },
    { id: 'bloat', label: 'Left Flank Swelling & Discomfort', warning: 'Rumen Bloat / Tympany. Administer antifoaming agent & consult vet.' },
    { id: 'limping', label: 'Limping or Foot Lesions', warning: 'Foot rot or FMD hoof lesion. Clean with antiseptic solution and keep floor dry.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28 selection:bg-emerald-200">

      {/* Top Navbar */}
      <nav className="bg-emerald-800 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🐄</span>
            <div>
              <h1 className="font-extrabold text-lg sm:text-xl text-emerald-50">GauRaksha</h1>
              <p className="text-[10px] text-emerald-200 uppercase font-semibold tracking-wider">Indigenous Cattle Health & Preservation</p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold bg-emerald-700 border border-emerald-600 px-3 py-1.5 rounded-full text-emerald-100">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> A2 Certified Indigenous DB
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-800 via-emerald-700 to-slate-50 pt-10 pb-16 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-200 bg-emerald-900/60 px-3.5 py-1 rounded-full border border-emerald-500/30">
            Veterinary Standards & Breed Encyclopedia
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Health, Vitals & Care for Desi Cows
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto">
            Monitor normal body temperature, disease visual diagnosis, veterinary medications, and customized daily ration plans.
          </p>

          {/* Breed Switcher */}
          <div className="pt-4 flex flex-wrap gap-3 justify-center">
            {breeds.map((b) => {
              const isSelected = selectedBreed?._id === b._id;
              return (
                <button
                  key={b._id}
                  onClick={() => handleSelectBreed(b)}
                  className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 shadow ${isSelected
                      ? 'bg-white text-emerald-900 ring-4 ring-emerald-300 scale-105 shadow-xl'
                      : 'bg-emerald-900/70 text-emerald-100 hover:bg-emerald-600/60 border border-emerald-500/30'
                    }`}
                >
                  <span>🐄</span> {b.name} Cow
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-lg flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTab('vitals')}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${activeTab === 'vitals' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
              }`}
          >
            <Activity className="w-4 h-4" /> Vitals & Breed Traits
          </button>
          <button
            onClick={() => setActiveTab('diseases')}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${activeTab === 'diseases' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
              }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-300" /> Diseases & Medication
          </button>
          <button
            onClick={() => setActiveTab('ration')}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${activeTab === 'ration' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
              }`}
          >
            <Calculator className="w-4 h-4" /> Daily Feed & Ration
          </button>
          <button
            onClick={() => setActiveTab('symptoms')}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${activeTab === 'symptoms' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
              }`}
          >
            <Stethoscope className="w-4 h-4" /> Quick Symptom Checker
          </button>
          <button
            onClick={() => setActiveTab('vaccine')}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${activeTab === 'vaccine' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
              }`}
          >
            <Calendar className="w-4 h-4" /> Vaccination Schedule
          </button>
        </div>

        {/* TAB: DISEASES & MEDICATIONS (NEW FEATURE) */}
        {activeTab === 'diseases' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Disease Selector Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {popularDiseases.map((dis) => {
                const isDisSelected = selectedDisease.id === dis.id;
                return (
                  <button
                    key={dis.id}
                    onClick={() => {
                      setSelectedDisease(dis);
                      triggerAvatarSpeech(`Inspecting ${dis.name}. Check the symptoms and veterinary dosage protocols below.`);
                    }}
                    className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${isDisSelected
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300 shadow-md'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                        {dis.severity.split('/')[0]}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 mt-2">{dis.name}</h4>
                    </div>
                    <span className="text-xs text-emerald-600 font-semibold mt-3 flex items-center gap-1">
                      View Treatment <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Disease Details Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">

                {/* Visual Reference Image */}
                <div className="w-full md:w-1/3 rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative group">
                  <img
                    src={selectedDisease.imageUrl}
                    alt={selectedDisease.name}
                    className="w-full h-56 object-cover transform group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-white text-xs font-semibold">Visual Clinical Reference</span>
                  </div>
                </div>

                {/* Disease Overview */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-amber-100 rounded-xl text-amber-800">
                      <AlertTriangle className="w-5 h-5" />
                    </span>
                    <h3 className="text-2xl font-black text-slate-900">{selectedDisease.name}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    <strong>Pathogen / Etiology:</strong> {selectedDisease.scientificCause}
                  </p>

                  {/* Symptoms Checklist */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-2">Key Diagnostic Signs:</h4>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {selectedDisease.symptoms.map((sym, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{sym}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Medication & Care Protocol */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div className="flex items-center gap-2">
                  <Pill className="w-5 h-5 text-emerald-700" />
                  <h4 className="font-extrabold text-lg text-slate-900">Recommended Medications & First Aid Protocols</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedDisease.medications.map((med, idx) => (
                    <div key={idx} className="bg-emerald-50/50 border border-emerald-200/80 p-4 rounded-2xl space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-emerald-900 uppercase bg-emerald-100 px-2 py-0.5 rounded-md">
                          {med.type}
                        </span>
                        <Syringe className="w-3.5 h-3.5 text-emerald-700" />
                      </div>
                      <h5 className="font-bold text-sm text-slate-900">{med.drug}</h5>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        <strong className="text-slate-800">Dosage / Administration:</strong> {med.dosage}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                  <Info className="w-4 h-4 flex-shrink-0 text-amber-700" />
                  <span>Always confirm dosages with a registered veterinary officer before injecting prescription antibiotics.</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 1: VITALS */}
        {activeTab === 'vitals' && selectedBreed && (
          <div className="space-y-8 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-emerald-400 transition cursor-pointer"
                onClick={() => triggerAvatarSpeech(`${selectedBreed.name} cows hail from ${selectedBreed.origin.state}, thriving in ${selectedBreed.origin.climateSuitability}.`)}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="p-3 bg-emerald-50 rounded-2xl text-emerald-700">
                    <MapPin className="w-6 h-6" />
                  </span>
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">Origin</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900">{selectedBreed.origin.state}</h3>
                <p className="text-xs text-slate-500 mb-4">{selectedBreed.origin.region}</p>
                <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border"><strong>Climate:</strong> {selectedBreed.origin.climateSuitability}</p>
              </div>

              <div
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-emerald-400 transition cursor-pointer"
                onClick={() => triggerAvatarSpeech(`A healthy ${selectedBreed.name} cow yields ${selectedBreed.milkAndProductivity.avgDailyYieldLiters} of nutrient-rich A2 milk with ${selectedBreed.milkAndProductivity.fatPercentage} fat.`)}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="p-3 bg-emerald-50 rounded-2xl text-emerald-700">
                    <Heart className="w-6 h-6" />
                  </span>
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">Milk Capacity</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900">{selectedBreed.milkAndProductivity.avgDailyYieldLiters}</h3>
                <p className="text-xs text-slate-500 mb-4">Peak: {selectedBreed.milkAndProductivity.peakYieldLiters}</p>
                <p className="text-xs text-emerald-900 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                  <strong>Butterfat:</strong> {selectedBreed.milkAndProductivity.fatPercentage} | <strong>Type:</strong> {selectedBreed.milkAndProductivity.milkType}
                </p>
              </div>

              <div
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-emerald-400 transition cursor-pointer"
                onClick={() => triggerAvatarSpeech(selectedBreed.avatarGuideNotes?.vitalTip || `Normal temp for ${selectedBreed.name} is ${selectedBreed.healthParameters.normalTemperature}.`)}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="p-3 bg-emerald-50 rounded-2xl text-emerald-700">
                    <Thermometer className="w-6 h-6" />
                  </span>
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">Vitals</span>
                </div>
                <h3 className="font-bold text-lg text-emerald-700">{selectedBreed.healthParameters.normalTemperature}</h3>
                <p className="text-xs text-slate-500 mb-4">Heart: {selectedBreed.healthParameters.heartRateBPM}</p>
                <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border"><strong>Heat Tolerance:</strong> {selectedBreed.healthParameters.heatTolerance}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-lg text-slate-900">Natural Disease Resistance</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedBreed.healthParameters.diseaseResistance.map((r, i) => (
                    <span key={i} className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-3 py-1.5 rounded-xl">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {r}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-lg text-slate-900">Unique Breed Facts</h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                  {selectedBreed.quickFacts.map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB: FEED CALCULATOR */}
        {activeTab === 'ration' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">Daily Fodder & Ration Calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Cow Body Weight: <span className="text-emerald-700 font-extrabold">{cowWeight} kg</span>
                </label>
                <input
                  type="range" min="250" max="600" step="10"
                  value={cowWeight} onChange={(e) => setCowWeight(Number(e.target.value))}
                  className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Daily Milk Production: <span className="text-emerald-700 font-extrabold">{milkYieldInput} Liters/day</span>
                </label>
                <input
                  type="range" min="0" max="30" step="1"
                  value={milkYieldInput} onChange={(e) => setMilkYieldInput(Number(e.target.value))}
                  className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl text-center">
                <span className="text-xs font-bold text-emerald-800 uppercase">Green Fodder</span>
                <p className="text-2xl font-black text-emerald-900 mt-1">{(cowWeight * 0.05).toFixed(1)} kg</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl text-center">
                <span className="text-xs font-bold text-emerald-800 uppercase">Dry Fodder</span>
                <p className="text-2xl font-black text-emerald-900 mt-1">{(cowWeight * 0.015).toFixed(1)} kg</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl text-center">
                <span className="text-xs font-bold text-emerald-800 uppercase">Concentrate Feed</span>
                <p className="text-2xl font-black text-emerald-900 mt-1">{(1.5 + (milkYieldInput * 0.4)).toFixed(1)} kg</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl text-center">
                <span className="text-xs font-bold text-emerald-800 uppercase">Mineral Mix</span>
                <p className="text-2xl font-black text-emerald-900 mt-1">50 - 60 g</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB: SYMPTOMS CHECKER */}
        {activeTab === 'symptoms' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">Cow Health Symptom Triage</h3>
            <div className="space-y-3">
              {symptomList.map((sym) => {
                const checked = selectedSymptoms.includes(sym.id);
                return (
                  <div
                    key={sym.id}
                    onClick={() => toggleSymptom(sym)}
                    className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-4 ${checked ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                  >
                    <input type="checkbox" checked={checked} onChange={() => { }} className="w-5 h-5 mt-0.5 text-emerald-600 rounded" />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-slate-900">{sym.label}</h4>
                      {checked && (
                        <p className="text-xs text-amber-900 font-medium mt-1.5 bg-amber-100/70 p-2.5 rounded-xl border border-amber-200">
                          <strong>⚠️ Advisory:</strong> {sym.warning}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB: VACCINATION SCHEDULE */}
        {activeTab === 'vaccine' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">National Cattle Vaccination Protocol</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-bold uppercase text-slate-500 bg-slate-50">
                    <th className="p-4 rounded-l-2xl">Disease</th>
                    <th className="p-4">Primary Age</th>
                    <th className="p-4">Booster / Frequency</th>
                    <th className="p-4 rounded-r-2xl">Ideal Season</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Foot & Mouth Disease (FMD)</td>
                    <td className="p-4 text-slate-600">4 Months & above</td>
                    <td className="p-4 text-slate-600">Every 6 Months</td>
                    <td className="p-4 font-semibold text-emerald-700">Pre-monsoon (Apr-May & Oct)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Haemorrhagic Septicaemia (HS)</td>
                    <td className="p-4 text-slate-600">6 Months</td>
                    <td className="p-4 text-slate-600">Annually</td>
                    <td className="p-4 font-semibold text-emerald-700">May - June (Before Rains)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Black Quarter (BQ)</td>
                    <td className="p-4 text-slate-600">6 Months</td>
                    <td className="p-4 text-slate-600">Annually</td>
                    <td className="p-4 font-semibold text-emerald-700">May - June</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* Floating Interactive Guide */}
      <AvatarGuide selectedBreed={selectedBreed} customMessage={guideSpeech} />
    </div>
  );
};

export default CowBreedExplorer;