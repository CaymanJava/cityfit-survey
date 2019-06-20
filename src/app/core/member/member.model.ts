export class MemberRegisterRequest {
  name: string;
  surname: string;
  email: string;
  mobilePhone: string;
  lanf: string;
  personalDataProcessingAgreement: boolean;
  gymRulesAgreement: boolean;
  regulationAgreement: boolean;
  marketingAgreement: boolean;
  tradeAgreement: boolean;
  underage: boolean;
  originClubId: number;
  campaignIds: number[];
}
