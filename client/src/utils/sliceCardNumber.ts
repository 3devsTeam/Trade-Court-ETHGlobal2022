export const sliceCardNumber = (cardNumber: string) => {
    
    return cardNumber.slice(0, 4) + "..." + cardNumber.slice(-4);
  
};