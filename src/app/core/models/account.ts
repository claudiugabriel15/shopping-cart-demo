export class AccountSettings {
  public name?: string;
  public account: {
    address?: string;
    city?: string;
    country?: string;
    zipCode?: string;
  };
  public shipping: {
    address?: string;
    city?: string;
    country?: string;
    zipCode?: string;
  };

  constructor(accountSettings: any) {
    this.name = accountSettings.name || '';
    this.account = accountSettings.account || {};
    this.shipping = accountSettings.shipping || {};
  }
}
