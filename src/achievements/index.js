export const validator = (stats, type) => {
  const { rolls, flips } = stats;
  if (rolls === 1 && type === "roll") {
    return { id: 0, text: "You rolled for the first time!" };
  }
  if (rolls === 10 && type === "roll") {
    return { id: 1, text: "Rolling Master!" };
  }
  if (rolls === 25 && type === "roll") {
    return { id: 7, text: "Rolling Guru!" };
  }
  if (rolls === 50 && type === "roll") {
    return { id: 8, text: "Rolling Ninja!" };
  }
  if (rolls === 100 && type === "roll") {
    return { id: 10, text: "Rolling and rolling." };
  }
  if (rolls === 250 && type === "roll") {
    return { id: 11, text: "Wow! Rolling away." };
  }
  if (rolls === 500 && type === "roll") {
    return { id: 12, text: "Rolling problem?" };
  }
  if (rolls === 1000 && type === "roll") {
    return { id: 13, text: "Nowhere else to roll" };
  }
  if (flips === 1 && type === "flip") {
    return { id: 3, text: "You flipped your first coin!" };
  }
  if (flips === 10 && type === "flip") {
    return { id: 4, text: "Look who's a flippling machine." };
  }
  if (flips === 100 && type === "flip") {
    return { id: 15, text: "Flipping Champion." };
  }
  if (flips === 250 && type === "flip") {
    return { id: 16, text: "Flipping Machine." };
  }
  if (flips === 750 && type === "flip") {
    return { id: 17, text: "Flipping Ninja." };
  }
};
