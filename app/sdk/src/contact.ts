export interface Contact {
}

export class ContactModule implements Contact {
  constructor(token: string, url: string, sync: (flag: boolean) => void) {}
}

