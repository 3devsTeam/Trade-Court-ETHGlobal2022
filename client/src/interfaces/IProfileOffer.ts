import { IOffer } from './IOffer'

export interface IProfileOffer extends IOffer {}

// export interface IProfileOffer {
//     _id: string;
//     maker: string;
//     payMethods: [
//       {
//         _id: string;
//         cardNumber: string;
//         paymentDescription: string;
//         bank: IBank;
//         region: IRegion;
//       }
//     ];
//     fiat: IFiat;
//     crypto: IToken;
//     offerType: string;
//     unitPrice: number;
//     amount: number;
//     quantity: number;
//     minLimit: number;
//     maxLimit: number;
//     offerComment: string;
//   }
