export interface CarEntry {
    vin: string;
    stockNum: number | null;
    marketingSeries: string;
    year: number;
    isTempVin: boolean;
    dealerCd: string;
    dealerCategory: string;
    distributorCd: string;
    holdStatus: string | null;
    isPreSold: boolean;
    dealerMarketingName: string;
    dealerWebsite: string;
    isSmartPath: boolean;
    distance: number;
    advertizedPrice: number;
    nonSpAdvertizedPrice: number;
    totalMsrp: number;
    sellingPrice: number;
    dph: null,
    dioTotalMsrp: number;
    dioTotalDealerSellingPrice: number;
    marketingTitle: string;
    intColorcolorFamilies: string[] | null;
    intColorcolorCd: string;
    extColorcolorFamilies: string[] | null;
    extColorcolorHexCd: string;
    marketingName: string;
    colorHexCd: string;
}