/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface GnosisInterface extends utils.Interface {
  functions: {
    "getMessageHash(bytes)": FunctionFragment;
    "signMessage(bytes)": FunctionFragment;
    "isValidSignature(bytes32,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getMessageHash"
      | "signMessage"
      | "isValidSignature"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getMessageHash",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "signMessage",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isValidSignature",
    values: [BytesLike, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "getMessageHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "signMessage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isValidSignature",
    data: BytesLike
  ): Result;

  events: {
    "SignMsg(bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "SignMsg"): EventFragment;
}

export interface SignMsgEventObject {
  msgHash: string;
}
export type SignMsgEvent = TypedEvent<[string], SignMsgEventObject>;

export type SignMsgEventFilter = TypedEventFilter<SignMsgEvent>;

export interface Gnosis extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: GnosisInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getMessageHash(
      message: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    signMessage(
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isValidSignature(
      _dataHash: BytesLike,
      _signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string] & { magicValue: string }>;
  };

  getMessageHash(
    message: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  signMessage(
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isValidSignature(
    _dataHash: BytesLike,
    _signature: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    getMessageHash(
      message: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    signMessage(_data: BytesLike, overrides?: CallOverrides): Promise<void>;

    isValidSignature(
      _dataHash: BytesLike,
      _signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "SignMsg(bytes32)"(msgHash?: BytesLike | null): SignMsgEventFilter;
    SignMsg(msgHash?: BytesLike | null): SignMsgEventFilter;
  };

  estimateGas: {
    getMessageHash(
      message: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    signMessage(
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isValidSignature(
      _dataHash: BytesLike,
      _signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getMessageHash(
      message: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    signMessage(
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isValidSignature(
      _dataHash: BytesLike,
      _signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
