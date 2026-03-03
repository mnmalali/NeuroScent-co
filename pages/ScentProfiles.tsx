import React, { useEffect, useMemo, useState } from "react";
import { Section, SectionTitle } from "../components/Section";

type Accord = {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  emotional: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  color: string;
  image: string;
};

const NOTE_IMAGE_MAP: Record<string, string> = {
  citrus_note: "/images/notes/citrus-note.jpg",
  sparkling_aldehydic_note: "/images/notes/sparkling-aldehydic-note.jpg",
  bright_fresh_opening: "/images/notes/bright-fresh-opening.jpg",
  airy_freshness: "/images/notes/airy-freshness.jpg",
  soft_floral_freshness: "/images/notes/soft-floral-freshness.jpg",
  light_woody_smoothness: "/images/notes/light-woody-smoothness.jpg",
  fresh_floral_lift: "/images/notes/fresh-floral-lift.jpg",
  transparent_floral_note: "/images/notes/transparent-floral-note.jpg",
  soft_rose_like_note: "/images/notes/soft-rose-like-note.jpg",
  airy_petal_character: "/images/notes/airy-petal-character.jpg",
  clean_skin_floral_finish: "/images/notes/clean-skin-floral-finish.jpg",
  soft_musky_floral_warmth: "/images/notes/soft-musky-floral-warmth.jpg",
  soft_airy_freshness: "/images/notes/soft-airy-freshness.jpg",
  clean_skin_note: "/images/notes/clean-skin-note.jpg",
  soft_white_musk_bloom: "/images/notes/soft-white-musk-bloom.jpg",
  warm_subtle_woody_note: "/images/notes/warm-subtle-woody-note.jpg",
  comforting_musky_drydown: "/images/notes/comforting-musky-drydown.jpg",
  light_airy_wood_freshness: "/images/notes/light-airy-wood-freshness.jpg",
  modern_woody_note: "/images/notes/modern-woody-note.jpg",
  smooth_skin_wood_character: "/images/notes/smooth-skin-wood-character.jpg",
  creamy_sandalwood_impression:
    "/images/notes/creamy-sandalwood-impression.jpg",
  warm_dry_wood_structure: "/images/notes/warm-dry-wood-structure.jpg",
  long_lasting_woody_musky_trail:
    "/images/notes/long-lasting-woody-musky-trail.jpg",
  light_amber_lift: "/images/notes/light-amber-lift.jpg",
  resinous_warmth: "/images/notes/resinous-warmth.jpg",
  mineral_amber_glow: "/images/notes/mineral-amber-glow.jpg",
  deep_amber_note: "/images/notes/deep-amber-note.jpg",
  soft_sweetness: "/images/notes/soft-sweetness.jpg",
  sensual_warm_drydown: "/images/notes/sensual-warm-drydown.jpg",
  gentle_sweet_lift: "/images/notes/gentle-sweet-lift.jpg",
  creamy_vanilla_warmth: "/images/notes/creamy-vanilla-warmth.jpg",
  soft_balsamic_sweetness: "/images/notes/soft-balsamic-sweetness.jpg",
  cozy_warm_sweetness: "/images/notes/cozy-warm-sweetness.jpg",
  long_lasting_comforting_trail:
    "/images/notes/long-lasting-comforting-trail.jpg",
  fresh_spicy_sparkle: "/images/notes/fresh-spicy-sparkle.jpg",
  citrus_accent: "/images/notes/citrus-accent.jpg",
  aromatic_spice_warmth: "/images/notes/aromatic-spice-warmth.jpg",
  energetic_character: "/images/notes/energetic-character.jpg",
  soft_woody_spice_trail: "/images/notes/soft-woody-spice-trail.jpg",
  fresh_green_note: "/images/notes/fresh-green-note.jpg",
  leafy_brightness: "/images/notes/leafy-brightness.jpg",
  natural_green_body: "/images/notes/natural-green-body.jpg",
  airy_woody_freshness: "/images/notes/airy-woody-freshness.jpg",
  soft_earthy_grounding: "/images/notes/soft-earthy-grounding.jpg",
  clean_woody_musky_drydown: "/images/notes/clean-woody-musky-drydown.jpg",
};

const ACCORDS: Accord[] = [
  {
    id: "01",
    name: "Fresh Lift",
    tagline: "Brightness, cleanliness, first impression",
    desc: "Blends cleanly with woods and ambers. No aggressive top notes. Strong freshness without sporty or detergent character.",
    emotional:
      "Bright citrus opening -> airy freshness -> clean, modern drydown",
    notes: {
      top: ["Citrus note", "Sparkling aldehydic note", "Bright fresh opening"],
      middle: ["Airy freshness", "Soft floral freshness"],
      base: ["Light woody smoothness"],
    },
    color: "bg-blue-50",
    image: "/images/accords/Fresh Lift.jpg",
  },
  {
    id: "02",
    name: "Soft Floral Air",
    tagline: "Lightness, openness, elegance",
    desc: "Adds elegance without dominance. Keeps blends breathable and modern. Enhances both fresh and warm accords.",
    emotional: "Transparent florals -> airy petals -> soft clean finish",
    notes: {
      top: ["Fresh floral lift"],
      middle: [
        "Transparent floral note",
        "Soft rose-like note",
        "Airy petal character",
      ],
      base: ["Clean skin floral finish", "Soft musky floral warmth"],
    },
    color: "bg-pink-50",
    image: "/images/accords/Soft Floral Air.jpg",
  },
  {
    id: "03",
    name: "Clean Skin Musk",
    tagline: "Comfort, safety, familiarity",
    desc: "Universally likable. Makes any blend more wearable. Acts as emotional glue.",
    emotional: "Clean skin -> soft warmth -> subtle musky trail",
    notes: {
      top: ["Soft airy freshness"],
      middle: ["Clean skin note", "Soft white musk bloom"],
      base: ["Warm subtle woody note", "Comforting musky drydown"],
    },
    color: "bg-stone-100",
    image: "/images/accords/Clean Skin Musk.jpg",
  },
  {
    id: "04",
    name: "Woody Skin",
    tagline: "Body, calm, modern skin-wood backbone",
    desc: "Extremely difficult to overdose harshly. Bridges fresh to warm seamlessly. Structural spine of the system.",
    emotional: "Soft woods -> warm skin -> slightly creamy, ultra-modern",
    notes: {
      top: ["Light airy wood freshness"],
      middle: ["Modern woody note", "Smooth skin wood character"],
      base: [
        "Creamy sandalwood impression",
        "Warm dry wood structure",
        "Long-lasting woody-musky trail",
      ],
    },
    color: "bg-stone-200",
    image: "/images/accords/Woody Skin.jpg",
  },
  {
    id: "05",
    name: "Warm Amber Depth",
    tagline: "Sensuality, intimacy, memorability",
    desc: "Sensual but not gourmand. Deep but not heavy. Adds longevity and emotional weight.",
    emotional: "Dry amber warmth -> subtle sweetness -> mineral skin glow",
    notes: {
      top: ["Light amber lift"],
      middle: ["Resinous warmth", "Mineral amber glow"],
      base: ["Deep amber note", "Soft sweetness", "Sensual warm drydown"],
    },
    color: "bg-orange-50",
    image: "/images/accords/Warm Amber Depth.jpg",
  },
  {
    id: "06",
    name: "Soft Sweet Comfort",
    tagline: "Pleasure, coziness, emotional warmth",
    desc: "Enhances emotional appeal. Softens dry or sharp blends. Keeps sweetness controlled and modern.",
    emotional: "Gentle sweetness -> creamy warmth -> soft comforting trail",
    notes: {
      top: ["Gentle sweet lift"],
      middle: ["Creamy vanilla warmth", "Soft balsamic sweetness"],
      base: ["Cozy warm sweetness", "Long-lasting comforting trail"],
    },
    color: "bg-yellow-50",
    image: "/images/accords/Soft Sweet Comfort.avif",
  },
  {
    id: "07",
    name: "Sparkle Spice Accent",
    tagline: "Energy, intrigue, personality accent",
    desc: "Adds interest without dominance. Works in fresh, woody, and warm blends. Prevents compositions from feeling flat.",
    emotional: "Fresh spice -> light warmth -> clean sparkling finish",
    notes: {
      top: ["Fresh spicy sparkle", "Citrus accent"],
      middle: ["Aromatic spice warmth", "Energetic character"],
      base: ["Soft woody spice trail"],
    },
    color: "bg-red-50",
    image: "/images/accords/Sparkle Spice Accent.jpg",
  },
  {
    id: "08",
    name: "Green Balance",
    tagline: "Balance, clarity, natural freshness",
    desc: "Balances sweet and warm accords. Adds natural freshness without sharpness. Keeps blends grounded and elegant.",
    emotional: "Soft green freshness -> airy woods -> clean earthiness",
    notes: {
      top: ["Fresh green note", "Leafy brightness"],
      middle: ["Natural green body", "Airy woody freshness"],
      base: ["Soft earthy grounding", "Clean woody-musky drydown"],
    },
    color: "bg-emerald-50",
    image: "/images/accords/Green Balance.jpg",
  },
];

const normalizeNoteKey = (note: string): string =>
  note
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const getNoteInitials = (note: string): string => {
  const words = note
    .replace(/[^a-zA-Z0-9 ]+/g, " ")
    .split(" ")
    .filter(Boolean);

  return words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
};

const NoteTile: React.FC<{ note: string }> = ({ note }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const noteKey = useMemo(() => normalizeNoteKey(note), [note]);
  const imageSrc = NOTE_IMAGE_MAP[noteKey];
  const showPlaceholder = imageFailed || !imageSrc;

  return (
    <div className="rounded-md overflow-hidden bg-white/95 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-md">
      <div className="h-20 bg-gray-100">
        {showPlaceholder ? (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 text-gray-700 font-semibold text-xs tracking-wide">
            {getNoteInitials(note)}
          </div>
        ) : (
          <img
            src={imageSrc}
            alt={`${note} note`}
            className="w-full h-full object-cover"
            onError={() => setImageFailed(true)}
          />
        )}
      </div>
      <p className="px-2 py-1.5 text-[11px] leading-tight text-neuro-black font-medium min-h-[2.75rem]">
        {note}
      </p>
    </div>
  );
};

const NOTE_SECTIONS: Array<{
  key: keyof Accord["notes"];
  label: string;
}> = [
  { key: "top", label: "Top Notes" },
  { key: "middle", label: "Middle Notes" },
  { key: "base", label: "Base Notes" },
];

export const ScentProfiles: React.FC = () => {
  const [activeOverlayId, setActiveOverlayId] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const updateTouchMode = () => setIsTouchDevice(mediaQuery.matches);

    updateTouchMode();
    mediaQuery.addEventListener("change", updateTouchMode);

    return () => mediaQuery.removeEventListener("change", updateTouchMode);
  }, []);

  const toggleOverlay = (accordId: string) => {
    setActiveOverlayId((current) => (current === accordId ? null : accordId));
  };

  return (
    <>
      <Section className="bg-neuro-ivory pt-32">
        <SectionTitle
          eyebrow="The Architecture"
          title="Building Blocks of Emotion"
          description="Our machine does not mix random notes. It composes with master accords-complex pre-blended structures designed to interact harmoniously in any ratio."
        />
      </Section>

      <div className="flex flex-col">
        {ACCORDS.map((accord) => (
          <div
            key={accord.id}
            className={`sticky top-0 min-h-screen flex items-center justify-center py-20 px-6 ${accord.color}`}
          >
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 space-y-8 animate-fade-in">
                <div className="flex items-center space-x-4">
                  <span className="font-serif text-6xl text-neuro-gold opacity-50">
                    {accord.id}
                  </span>
                  <div className="h-px bg-neuro-black w-20"></div>
                </div>
                <h2 className="font-serif text-5xl md:text-6xl text-neuro-black">
                  {accord.name}
                </h2>
                <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
                  {accord.tagline}
                </p>

                <div className="space-y-6 pt-8">
                  <div>
                    <h4 className="font-serif text-xl mb-2">Why It Works</h4>
                    <p className="font-light text-gray-700 leading-relaxed">
                      {accord.desc}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-2">Smell Profile</h4>
                    <p className="font-light text-gray-700 italic">
                      {accord.emotional}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-2">
                      Composition Start
                    </h4>
                    <p className="font-mono text-xs text-gray-500">
                      {accord.notes.top.join(", ")}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="group order-1 md:order-2 h-[500px] relative overflow-hidden rounded-sm bg-white shadow-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neuro-gold focus-visible:ring-offset-2"
                aria-label={`Reveal notes that make up ${accord.name}`}
                aria-expanded={activeOverlayId === accord.id}
                onClick={() => {
                  if (isTouchDevice) {
                    toggleOverlay(accord.id);
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    toggleOverlay(accord.id);
                  }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent z-10 pointer-events-none"></div>
                <img
                  src={accord.image}
                  alt={`${accord.name} accord visualization`}
                  className="w-full h-full object-cover opacity-90"
                />

                <div
                  className={`absolute inset-0 z-20 bg-black/45 p-4 md:p-5 transition-all duration-300 ${
                    activeOverlayId === accord.id
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-white text-xs uppercase tracking-[0.2em] font-semibold">
                      Notes
                    </p>
                    {isTouchDevice && activeOverlayId === accord.id && (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/20 text-white text-sm leading-none">
                        x
                      </span>
                    )}
                  </div>

                  <div className="h-[calc(100%-2rem)] overflow-auto pr-1 space-y-4">
                    {NOTE_SECTIONS.map(({ key, label }) => (
                      <div key={`${accord.id}-${key}`}>
                        <p className="text-[11px] text-white/85 uppercase tracking-[0.16em] font-semibold mb-2">
                          {label}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {accord.notes[key].map((note) => (
                            <NoteTile
                              key={`${accord.id}-${key}-${note}`}
                              note={note}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ScentProfiles;
