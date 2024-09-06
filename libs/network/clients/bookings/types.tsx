export type InputMaybe<T> = Maybe<T>
export type Maybe<T> = T | null
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any }
}

export enum SlotType {
  STUDIO,
  ONE_BEDROOM,
  TWO_BEDROOM,
  THREE_BEDROOM,
  PENTHOUSE,
}

export type CreateBookingInput = {
  customerId: Scalars['String']['input']
  endDate: Scalars['DateTime']['input']
  apartmentId: Scalars['Float']['input']
  phoneNumber?: InputMaybe<Scalars['String']['input']>
  pricePerDay?: InputMaybe<Scalars['Float']['input']>
  startDate: Scalars['DateTime']['input']
  totalPrice?: InputMaybe<Scalars['Float']['input']>
}
