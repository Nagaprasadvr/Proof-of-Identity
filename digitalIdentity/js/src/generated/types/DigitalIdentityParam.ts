/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
export type DigitalIdentityParam = {
  name: string
  contactNumber: string
  dob: string
  residenceAddress: string
  panNumber: string
  aadharNumber: string
  passportId: string
}

/**
 * @category userTypes
 * @category generated
 */
export const digitalIdentityParamBeet =
  new beet.FixableBeetArgsStruct<DigitalIdentityParam>(
    [
      ['name', beet.utf8String],
      ['contactNumber', beet.utf8String],
      ['dob', beet.utf8String],
      ['residenceAddress', beet.utf8String],
      ['panNumber', beet.utf8String],
      ['aadharNumber', beet.utf8String],
      ['passportId', beet.utf8String],
    ],
    'DigitalIdentityParam'
  )
