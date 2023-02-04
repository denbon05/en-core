export type ValidatorKeys = 'required' | 'len' | 'emailValid';

type ErrKeyWithMsg = {
  [key in ValidatorKeys]?: string;
};

export type IRuleByKey = {
  [key in ValidatorKeys]: (
    message: string
  ) => (value: string) => boolean | string;
};

export default interface IValidator {
  getRules(msgByKey: ErrKeyWithMsg): ((value: string) => boolean | string)[];
}
