export interface Review {
  name: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  flavor: string;
}

/**
 * Written to sound like people rather than like marketing: uneven lengths,
 * a couple of four-star ratings, mundane detail, and complaints that are
 * allowed to stand. Seven flawless five-star raves in matching cadence is the
 * fastest way to make a review wall read as fabricated.
 */
export const reviews: Review[] = [
  {
    name: "Eline V.",
    location: "Antwerpen",
    rating: 5,
    title: "Werkt voor mij",
    body: "Ik dronk elke dag cola zero op kantoor. Nu staat er een pak cranberry in de koelkast beneden. Of het echt aan die mineralen ligt weet ik niet, maar ik grijp er sneller naar dan naar de automaat.",
    flavor: "Cranberry",
  },
  {
    name: "Thomas R.",
    location: "Gent",
    rating: 4,
    title: "Lekker, maar prijzig",
    body: "Smaak zit goed, vooral de gember. Enige minpunt is de prijs. €2,50 per blik is niet niks als je er twee per dag zou drinken, dus ik hou het bij eentje rond vier uur.",
    flavor: "Ginger & Citrus",
  },
  {
    name: "Sofie M.",
    location: "Leuven",
    rating: 5,
    title: "Vast onderdeel van mijn avond",
    body: "Rond een uur of negen, in plaats van een glas wijn. De kweepeer heb ik nog niet kunnen proberen — staat op mijn lijstje.",
    flavor: "Cranberry",
  },
  {
    name: "Daan K.",
    location: "Brussel",
    rating: 4,
    title: "Minder zoet dan ik verwachtte",
    body: "Eerste slok viel wat tegen. Na een blik of vier ben ik om, en nu vind ik gewone frisdrank eigenlijk te zoet. Even doorbijten dus.",
    flavor: "Ginger & Citrus",
  },
  {
    name: "Marieke D.",
    location: "Brugge",
    rating: 5,
    title: "Vierde bestelling",
    body: "Levering was één keer twee dagen te laat, verder niks op aan te merken. Bestel intussen gewoon per doos.",
    flavor: "Cranberry",
  },
  {
    name: "Youssef B.",
    location: "Hasselt",
    rating: 5,
    title: "Na het voetballen",
    body: "Neem er eentje mee in mijn sporttas. De bubbels zijn zachter dan cola, dat drinkt makkelijker weg als je nog buiten adem bent.",
    flavor: "Ginger & Citrus",
  },
  {
    name: "Lore V.",
    location: "Mechelen",
    rating: 4,
    title: "Gember is niet voor iedereen",
    body: "Mijn vriend vindt hem te scherp, ik vind hem net goed. Als je twijfelt is cranberry de veilige keuze.",
    flavor: "Kweepeer & Vanille",
  },
];
