import type { Review } from "../types/product";

export const velocityReviews: Review[] = [
{
  id: "r1",
  name: "Hamza R.",
  rating: 5,
  date: "2026-09-24",
  title: "My daily pair now",
  body: "Wore them to campus all week. Light on the feet and the silver panels look even better in person. Went with my usual 43 and it fits perfectly.",
  size: 43,
  fit: "True to size",
  verified: true
},
{
  id: "r2",
  name: "Ayesha K.",
  rating: 5,
  date: "2026-09-19",
  title: "Clean and comfortable",
  body: "Exactly what I wanted — sporty but still works with jeans and wide trousers. The cushioning feels soft without being bulky.",
  size: 40,
  fit: "True to size",
  verified: true
},
{
  id: "r3",
  name: "Bilal A.",
  rating: 4,
  date: "2026-09-16",
  title: "Great look, slightly snug",
  body: "Love the design and the mesh breathes well in the heat. Toe box is a little snug for my wide feet, so I'd say consider half a size up if that's you.",
  size: 44,
  fit: "Runs small",
  verified: true
},
{
  id: "r4",
  name: "Zainab M.",
  rating: 5,
  date: "2026-09-14",
  title: "Delivery was quick too",
  body: "Arrived in Lahore in three days, well packed. The quality of the materials feels premium for the price.",
  size: 41,
  fit: "True to size",
  verified: true
},
{
  id: "r5",
  name: "Usman T.",
  rating: 4,
  date: "2026-09-13",
  title: "Solid everyday sneaker",
  body: "Good grip, comfortable for long days at the office and on my evening walks. Would love the black/red colourway when it drops.",
  size: 42,
  fit: "True to size",
  verified: false
},
{
  id: "r6",
  name: "Fatima S.",
  rating: 5,
  date: "2026-09-12",
  title: "Gets compliments every time",
  body: "Bought them for my brother and ended up getting a pair for myself. They look sharp and the sizing guide was accurate.",
  size: 40,
  fit: "True to size",
  verified: true
}];


export const ratingDistribution = [
{ stars: 5, count: 74 },
{ stars: 4, count: 16 },
{ stars: 3, count: 4 },
{ stars: 2, count: 1 },
{ stars: 1, count: 1 }];